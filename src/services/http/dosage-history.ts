import { BaseService } from './base'
import { store } from '../../components/Provider'
import { setDosageHistoryAction} from '../../store/actions'
import {
    IDosageHistoryRequest,
    IDosageHistoryResponse
} from '../../models'
class DosageHistoryService extends BaseService{
    private _clientID = ''
    private _siteID = ''
    private _segment = 'dosage_history'
    public get clientID(): string{
        return this._clientID
    }

    public get siteID(): string{
        return this._siteID
    }

    public async requestDosageHistory(request: IDosageHistoryRequest): Promise<IDosageHistoryResponse>{
        const response : IDosageHistoryResponse = await this.get(this._segment, request)
        console.log(response)
        store.dispatch(setDosageHistoryAction(response))
        return response

    }
}

export default new DosageHistoryService()
