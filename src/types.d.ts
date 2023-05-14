import {type SIZE_SM, type SIZE_SML} from "./consts"
export type SizeSMValue = (typeof SIZE_SM)[keyof typeof SIZE_SM];
export type SizeSMLValue = (typeof SIZE_SML)[keyof typeof SIZE_SML]