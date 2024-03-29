/** @format */

import WebSocket from 'ws'
import { ChatMessage, ChatResponse, TaskResponse } from '../../interface/IModel'
import {
    SPKChatMessage,
    SPKChatRequest,
    SPKChatResponse,
    SPKImagineRequest,
    SPKImagineResponse
} from '../../interface/IFlyTek'
import {
    ChatRoleEnum,
    IFlyTekChatModel,
    SPKChatRoleEnum,
    SparkDomain,
    IFlyTekImagineModel,
    SPKTaskType
} from '../../interface/Enum'
import { createHmac } from 'crypto'
import { hostname } from 'os'
import { PassThrough, Readable } from 'stream'
import $ from '../util'

const SPARK_API = 'wss://spark-api.xf-yun.com'
const IMAGINE_API = 'https://spark-api.cn-huabei-1.xf-yun.com'
const STORAGE_KEY = 'task_iflytek'

export default class IFlyTek {
    private appid?: string
    private key?: string
    private secret?: string

    constructor(appid?: string, key?: string, secret?: string) {
        this.appid = appid
        this.key = key
        this.secret = secret
    }

    /**
     * Initiates a chat conversation with IFLYTEK Spark API.
     *
     * @param messages - An array of chat messages.
     * @param model - The Spark model version to use (default: SPARK_DEFAULT_MODEL_VERSION).
     * @param stream - Whether to use stream response (default: false).
     * @param top - Top probability to sample (optional).
     * @param temperature - Temperature for sampling (optional).
     * @param maxLength - Maximum token length for response (optional).
     * @returns A promise resolving to the chat response or a stream.
     */
    chat(
        messages: ChatMessage[],
        model: IFlyTekChatModel = IFlyTekChatModel.SPARK_V3,
        stream: boolean = false,
        top?: number,
        temperature?: number,
        maxLength?: number
    ) {
        if (!this.appid) throw new Error('IFlyTek APP ID is not set in config')
        if (!Object.values(IFlyTekChatModel).includes(model)) throw new Error('IFlyTek chat model not found')

        // get specific generated URL
        const url = this.getSparkURL(model)
        const ws = new WebSocket(url)

        // top is integer in [1,6]
        if (typeof top === 'number') {
            top = Math.floor(top * 10)
            top = top < 1 ? 1 : top
            top = top > 6 ? 6 : top
        }
        // temperature is float in (0,1]
        if (typeof temperature === 'number') {
            if (temperature <= 0) temperature = 0.1
            if (temperature > 1) temperature = 1
        }

        const input: SPKChatRequest = {
            header: { app_id: this.appid },
            parameter: { chat: { domain: SparkDomain[model], temperature, max_tokens: maxLength, top_k: top } },
            payload: { message: { text: this.formatMessage(messages) } }
        }

        return new Promise<ChatResponse | Readable>((resolve, reject) => {
            const data: ChatResponse = {
                content: '',
                model: `spark-${model}`,
                object: '',
                promptTokens: 0,
                completionTokens: 0,
                totalTokens: 0
            }
            ws.on('open', () => ws.send(JSON.stringify(input)))
            if (stream) {
                // transfer to SSE data stream
                const output = new PassThrough()
                ws.on('message', (e: Buffer) => {
                    const res = $.json<SPKChatResponse>(e.toString('utf-8'))
                    if (!res) {
                        ws.close()
                        output.destroy(new Error('Response data is not JSON'))
                    } else {
                        if (res && res.header.code === 0 && res.payload) {
                            data.content = res.payload.choices.text[0].content
                            data.promptTokens = res.payload?.usage?.text.prompt_tokens || 0
                            data.completionTokens = res.payload?.usage?.text.completion_tokens || 0
                            data.totalTokens = res.payload?.usage?.text.total_tokens || 0
                            data.object = `chat.completion.chunk`
                            output.write(JSON.stringify(data))
                        } else {
                            output.destroy(new Error(res.header.message))
                            ws.close()
                        }

                        if (res.header.status === 2) ws.close()
                    }
                })
                ws.on('close', () => output.end())
                ws.on('error', e => output.destroy(e))
                resolve(output as Readable)
            } else {
                ws.on('message', (e: Buffer) => {
                    const res = $.json<SPKChatResponse>(e.toString('utf-8'))
                    if (!res) return reject(new Error('Response data is not JSON'))

                    if (res.header.code === 0 && res.payload) {
                        data.content += res.payload.choices.text[0].content
                        data.promptTokens = res.payload.usage?.text.prompt_tokens || 0
                        data.completionTokens = res.payload.usage?.text.completion_tokens || 0
                        data.totalTokens = res.payload.usage?.text.total_tokens || 0
                        data.object = `chat.completion`
                    } else {
                        reject(new Error(res.header.message))
                        ws.close()
                    }

                    if (res.header.status === 2) ws.close()
                })
                ws.on('close', () => resolve(data))
                ws.on('error', e => reject(e))
            }
        })
    }

    /**
     * Generate an image based on the given prompt.
     * @param prompt The prompt for image generation.
     * @param width The width of the image, default is 512.
     * @param height The height of the image, default is 512.
     * @param model The model to use for generating the image, default is IFlyTekImagineModel.V2.
     */
    async imagine(
        prompt: string,
        width: number = 512,
        height: number = 512,
        model: IFlyTekImagineModel = IFlyTekImagineModel.V2
    ) {
        if (!this.appid) throw new Error('IFlyTek APP ID is not set in config')
        // get specific generated URL
        const url = this.getImagineURL(model)
        const res = await $.post<SPKImagineRequest, SPKImagineResponse>(url, {
            header: { app_id: this.appid },
            payload: { message: { text: [{ role: 'user', content: prompt }] } },
            parameter: { chat: { domain: 'general', width, height } }
        })
        if (res.header.code !== 0) throw new Error(res.header.message)
        if (!res.payload) throw new Error('Fail to generate image, empty payload')

        const id = $.getRandomId()
        const imgs: string[] = []
        for (const i in res.payload.choices.text)
            imgs.push(await $.writeFile(res.payload.choices.text[i].content, `${id}-${i}.png`))

        const time = Date.now()
        const task: TaskResponse = {
            id,
            type: SPKTaskType.GENERATION,
            info: 'success',
            progress: 100,
            imgs,
            fail: '',
            created: time,
            model
        }

        const tasks: TaskResponse[] = $.getItem(STORAGE_KEY) || []
        tasks.push(task)
        $.setItem(STORAGE_KEY, tasks)
        return { taskId: task.id, time }
    }

    /**
     * Simulate tasks.
     *
     * @param id - The task ID to retrieve (optional).
     * @returns An array of task responses or a specific task by ID.
     */
    task(id?: string) {
        const tasks: TaskResponse[] = $.getItem(STORAGE_KEY) || []

        if (id) return tasks.filter(v => v.id === id)
        else return tasks
    }

    /**
     * Generates the WebSocket URL for the Spark API request.
     *
     * @param version - The Spark model version.
     * @returns The WebSocket URL.
     */
    private getSparkURL(version: IFlyTekChatModel) {
        if (!this.secret) throw new Error('IFlyTek API secret is not set in config')
        if (!this.key) throw new Error('IFlyTek API key is not set in config')

        const host = hostname()
        const date = new Date().toUTCString()
        const algorithm = 'hmac-sha256'
        const headers = 'host date request-line'
        const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /${version}/chat HTTP/1.1`
        const signatureSha = createHmac('sha256', this.secret).update(signatureOrigin).digest('hex')
        const signature = Buffer.from(signatureSha, 'hex').toString('base64')
        const authorizationOrigin = `api_key="${this.key}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
        const authorization = Buffer.from(authorizationOrigin).toString('base64')
        return `${SPARK_API}/${version}/chat?authorization=${authorization}&date=${date}&host=${host}`
    }

    // get imagine url
    private getImagineURL(model: IFlyTekImagineModel) {
        if (!this.secret) throw new Error('IFlyTek API secret is not set in config')
        if (!this.key) throw new Error('IFlyTek API key is not set in config')

        const host = 'spark-api.xf-yun.com'
        const date = new Date().toUTCString()
        const algorithm = 'hmac-sha256'
        const headers = 'host date request-line'
        const signatureOrigin = `host: ${host}\ndate: ${date}\nPOST /${model}/tti HTTP/1.1`
        const signatureSha = createHmac('sha256', this.secret).update(signatureOrigin).digest('hex')
        const signature = Buffer.from(signatureSha, 'hex').toString('base64')
        const authorizationOrigin = `api_key="${this.key}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
        const authorization = Buffer.from(authorizationOrigin).toString('base64')
        return `${IMAGINE_API}/${model}/tti?authorization=${authorization}&date=${date}&host=${host}`
    }

    private formatMessage(messages: ChatMessage[]) {
        const prompt: SPKChatMessage[] = []
        let input = ''
        for (const { role, content } of messages) {
            if (!content) continue
            if (role !== ChatRoleEnum.ASSISTANT) input += `\n${content}`
            else {
                prompt.push({ role: SPKChatRoleEnum.USER, content: input.trim() || ' ' })
                prompt.push({ role: SPKChatRoleEnum.ASSISTANT, content })
                input = ''
            }
        }
        if (!input.trim()) throw new Error('User input nothing')
        prompt.push({ role: SPKChatRoleEnum.USER, content: input.trim() })
        return prompt
    }
}
