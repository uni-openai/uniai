/** @format */

// model providers

export enum ChatModelProvider {
    OpenAI = 'openai',
    IFlyTek = 'iflytek',
    Baidu = 'baidu',
    Google = 'google',
    GLM = 'glm',
    MoonShot = 'moonshot'
}

export enum EmbedModelProvider {
    OpenAI = 'openai',
    Other = 'other'
}

export enum ImagineModelProvider {
    OpenAI = 'openai',
    MidJourney = 'midjourney',
    StabilityAI = 'stability.ai',
    IFlyTek = 'iflytek'
}

export type ModelProvider = ChatModelProvider | EmbedModelProvider | ImagineModelProvider
export const ModelProvider = { ...ChatModelProvider, ...EmbedModelProvider, ...ImagineModelProvider }

// openai embed models
export enum OpenAIEmbedModel {
    ADA = 'text-embedding-ada-002',
    LARGE = 'text-embedding-3-large',
    SMALL = 'text-embedding-3-small'
}

// local embedding models
export enum OtherEmbedModel {
    BASE_CHN = 'text2vec-base-chinese',
    LARGE_CHN = 'text2vec-large-chinese',
    BGE_LARGE_CHN = 'text2vec-bge-large-chinese',
    BASE_CHN_PARA = 'text2vec-base-chinese-paraphrase'
}

export type EmbedModel = OpenAIEmbedModel | OtherEmbedModel
export const EmbedModel = { ...OpenAIEmbedModel, ...OtherEmbedModel }

// openai chat models
export enum OpenAIChatModel {
    GPT3 = 'gpt-3.5-turbo',
    GPT3_16K = 'gpt-3.5-turbo-16k',
    GPT4_TURBO = 'gpt-4-turbo-preview',
    GPT4_VISION = 'gpt-4-vision-preview',
    GPT4 = 'gpt-4'
}

// google chat models
export enum GoogleChatModel {
    GEM_PRO = 'gemini-pro',
    GEM_VISION = 'gemini-pro-vision',
    GEM_ULTRA = 'gemini-ultra'
}

// glm chat models
export enum GLMChatModel {
    GLM_6B = 'chatglm3-6b-32k',
    GLM_3_TURBO = 'glm-3-turbo',
    GLM_4 = 'glm-4',
    GLM_4V = 'glm-4v'
}

// https://cloud.baidu.com/doc/WENXINWORKSHOP/s/clntwmv7t
export enum BaiduChatModel {
    ERNIE4 = 'completions_pro', // ERNIE 4.0
    ERNIE_3_5_8K = 'completions', // ERNIE-3.5-8K
    ERNIE_SPEED = 'ernie_speed', // ERNIE-Speed-8K
    ERNIE_LITE = 'eb-instant' // ERNIE-Lite-8K-0922
}

// iFlyTek spark model
export enum IFlyTekChatModel {
    SPARK_V1 = 'v1.1',
    SPARK_V2 = 'v2.1',
    SPARK_V3 = 'v3.1',
    SPARK_V3_5 = 'v3.5'
}
export const SparkDomain = {
    [IFlyTekChatModel.SPARK_V1]: 'general',
    [IFlyTekChatModel.SPARK_V2]: 'generalv2',
    [IFlyTekChatModel.SPARK_V3]: 'generalv3',
    [IFlyTekChatModel.SPARK_V3_5]: 'generalv3.5'
}

export enum MoonShotChatModel {
    MOON_V1_8K = 'moonshot-v1-8k',
    MOON_V1_32K = 'moonshot-v1-32k',
    MOON_V1_128K = 'moonshot-v1-128k'
}

// All chat models
export type ChatModel =
    | OpenAIChatModel
    | BaiduChatModel
    | GLMChatModel
    | IFlyTekChatModel
    | GoogleChatModel
    | MoonShotChatModel

export const ChatModel = {
    ...OpenAIChatModel,
    ...BaiduChatModel,
    ...GLMChatModel,
    ...IFlyTekChatModel,
    ...GoogleChatModel,
    ...OpenAIChatModel,
    ...MoonShotChatModel
}

// image models
export enum MidJourneyImagineModel {
    MJ = 'midjourney'
}
export enum OpenAIImagineModel {
    DALL_E_2 = 'dall-e-2',
    DALL_E_3 = 'dall-e-3'
}
export enum StabilityAIImagineModel {
    SD_1_6 = 'stable-diffusion-v1-6',
    SD_XL_1024 = 'stable-diffusion-xl-1024-v1-0'
}
export enum IFlyTekImagineModel {
    V2 = 'v2.1'
}

export const ImagineModel = {
    ...OpenAIImagineModel,
    ...MidJourneyImagineModel,
    ...StabilityAIImagineModel,
    ...IFlyTekImagineModel
}
export type ImagineModel = OpenAIImagineModel | MidJourneyImagineModel | StabilityAIImagineModel | IFlyTekImagineModel

export type ModelModel = ChatModel | ImagineModel | EmbedModel
export const ModelModel = { ...ChatModel, ...ImagineModel, ...EmbedModel }

export enum MJTaskType {
    IMAGINE = 'IMAGINE',
    UPSCALE = 'UPSCALE',
    VARIATION = 'VARIATION',
    REROLL = 'REROLL',
    DESCRIBE = 'DESCRIBE',
    BLEND = 'BLEND'
}

export enum DETaskType {
    GENERATION = 'generations',
    EDIT = 'edits',
    VARIATION = 'variation'
}

export enum SDTaskType {
    GENERATION = 'generation'
}

export enum SPKTaskType {
    GENERATION = 'generation'
}

export const ImgTaskType = { ...MJTaskType, ...DETaskType, ...SDTaskType, ...SPKTaskType }
export type ImgTaskType = MJTaskType | DETaskType | SDTaskType | SPKTaskType

// UniAI specified model roles
export enum ChatRoleEnum {
    SYSTEM = 'system',
    USER = 'user',
    ASSISTANT = 'assistant',
    FUNCTION = 'function'
}

// OpenAI GPT model roles
export enum GPTChatRoleEnum {
    SYSTEM = 'system',
    USER = 'user',
    ASSISTANT = 'assistant',
    FUNCTION = 'function',
    TOOL = 'tool'
}

// IflyTek Spark model roles
export enum SPKChatRoleEnum {
    USER = 'user',
    ASSISTANT = 'assistant'
}

// ChatGLM model roles
export enum GLMChatRoleEnum {
    SYSTEM = 'system',
    USER = 'user',
    ASSISTANT = 'assistant',
    OBSERVATION = 'observation',
    TOOL = 'tool'
}

// Google Gemini
export enum GEMChatRoleEnum {
    USER = 'user',
    MODEL = 'model'
}

// Baidu WenXin Workshop
export enum BDUChatRoleEnum {
    USER = 'user',
    ASSISTANT = 'assistant'
}
