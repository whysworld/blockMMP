import { ISetDosageHistoryAction, DosageHistoryTypeKeys } from '../types'
import { IDosageHistoryState } from '../states'

export function setDosageHistoryAction(payload: IDosageHistoryState): ISetDosageHistoryAction {
  return { type: DosageHistoryTypeKeys.SET_DOSAGE_HISTORY, payload }
}
