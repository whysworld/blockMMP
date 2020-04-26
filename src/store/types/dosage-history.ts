import { IDosageHistoryResponse } from '../../models'

export enum DosageHistoryTypeKeys {
    SET_DOSAGE_HISTORY = 'SET_DOSAGE_HISTORY',
}

export interface ISetDosageHistoryAction {
    type: typeof DosageHistoryTypeKeys.SET_DOSAGE_HISTORY
    payload: IDosageHistoryResponse
}

export type DosageHistoryActionTypes = ISetDosageHistoryAction