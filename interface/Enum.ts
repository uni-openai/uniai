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
    Google = 'google',
    GLM = 'glm',
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
    BASE_CHN_PARAPH = 'text2vec-base-chinese-paraphrase',
    BASE_CHN_SENTENCE = 'text2vec-base-chinese-sentence',
    BASE_MUL = 'text2vec-base-multilingual',
    PARAPH_MUL_MINI = 'paraphrase-multilingual-MiniLM-L12-v2'
}

export enum GLMEmbedModel {
    EMBED_2 = 'embedding-2'
}

export enum GoogleEmbedModel {
    EMBED_4 = 'text-embedding-004'
}

export type EmbedModel = OpenAIEmbedModel | OtherEmbedModel | GLMEmbedModel | GoogleEmbedModel
export const EmbedModel = { ...OpenAIEmbedModel, ...OtherEmbedModel, ...GLMEmbedModel, ...GoogleEmbedModel }

// openai chat models
export enum OpenAIChatModel {
    GPT3 = 'gpt-3.5-turbo',
    GPT4_O = 'gpt-4o',
    GPT4_TURBO = 'gpt-4-turbo',
    GPT4 = 'gpt-4'
}

// google chat models
export enum GoogleChatModel {
    GEM_PRO_1_5 = 'gemini-1.5-pro',
    GEM_FLASH_1_5 = 'gemini-1.5-flash',
    GEM_PRO_1 = 'gemini-1.0-pro'
}

// glm chat models
export enum GLMChatModel {
    GLM_6B = 'chatglm3-6b',
    GLM_9B = 'glm-4-9b-chat',
    GLM_3_TURBO = 'glm-3-turbo',
    GLM_4 = 'glm-4',
    GLM_4_AIR = 'glm-4-air',
    GLM_4_AIRX = 'glm-4-airx',
    GLM_4_FLASH = 'glm-4-flash',
    GLM_4V = 'glm-4v'
    // GLM_4_ALL = 'glm-4-alltools'
}

// https://cloud.baidu.com/doc/WENXINWORKSHOP/s/clntwmv7t
export enum BaiduChatModel {
    ERNIE_3_5 = 'completions', // ERNIE-3.5-8K
    ERNIE_4 = 'completions_pro', // ERNIE 4.0 8K
    ERNIE_LITE = 'eb-instant', // ERNIE-Lite-8K-0922
    ERNIE_SPEED = 'ernie_speed', // ERNIE-Speed-8K
    ERNIE_SPEED_128K = 'ernie-speed-128k', // ERNIE-Speed-128kK
    ERNIE_TINY = 'ernie-tiny-8k', // ERNIE-Tiny-8K
    ERNIE_CHAR = 'ernie-char-8k' // ERNIE-Character-8K-0321
}

// iFlyTek spark model
export enum IFlyTekChatModel {
    SPARK_LITE = 'lite',
    SPARK_PRO = 'pro',
    SPARK_MAX = 'max',
    SPARK_ULTRA = 'ultra'
}
// iFlyTek spark model version
export const IFlyTekModelVersion = {
    [IFlyTekChatModel.SPARK_LITE]: 'v1.1',
    [IFlyTekChatModel.SPARK_PRO]: 'v3.1',
    [IFlyTekChatModel.SPARK_MAX]: 'v3.5',
    [IFlyTekChatModel.SPARK_ULTRA]: 'v4.0'
}
export const SparkDomain = {
    [IFlyTekChatModel.SPARK_LITE]: 'general',
    [IFlyTekChatModel.SPARK_PRO]: 'generalv3',
    [IFlyTekChatModel.SPARK_MAX]: 'generalv3.5',
    [IFlyTekChatModel.SPARK_ULTRA]: '4.0Ultra'
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
    SYSTEM = 'system',
    USER = 'user',
    ASSISTANT = 'assistant',
    FUNCTION = 'function'
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
