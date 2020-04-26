import { IDosageHistoryState } from '../states'
import { DosageHistoryActionTypes, DosageHistoryTypeKeys } from '../types'

const initialState: IDosageHistoryState = {
  data: null,
  status: null,
  errors: null
}

export default (state: IDosageHistoryState = initialState, action: DosageHistoryActionTypes): IDosageHistoryState => {
  switch (action.type) {
    case DosageHistoryTypeKeys.SET_DOSAGE_HISTORY:
      return action.payload
    default:
      return state
  }
}
