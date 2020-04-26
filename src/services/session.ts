import jwtDecode from 'jwt-decode'
import { store } from '../components/Provider'
import { ISession } from '../models'
import {
  setSessionAction,
  setSignInLicenseFieldAction,
  setSignInLocationFieldAction,
  setSignInErrorAction
} from '../store/actions'
import { AuthenticationService } from './http'
import { ISignInInfo } from '../models'
import { ISessionState } from '../store/states'
class SessionService {
  private sessionTokenKey: string = 'blockmmp_session_token'
  private refreshTokenKey: string = 'blockmmp_refresh_token'
  private location: string = 'location'
  private licenseID: string = 'licenseID'

  public get token(): string | null {
    return localStorage.getItem(this.sessionTokenKey)
  }

  public get refToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey)
  }

  public get isSessionActive(): boolean {
    return !!this.token
  }

  public async signIn(credentials: ISignInInfo): Promise<ISession | null> {
    const response: ISession = await AuthenticationService.signIn(credentials)
    return this.setSession(response)
  }

  public getSession(): ISession | null {
    if (!this.isSessionActive) return null
    if (this.token == null)
      return null;
    const data: ISession = jwtDecode(this.token)
    if (data !== undefined)
      return data
    else
      return null
  }

  public signOut(): void {
    localStorage.removeItem(this.sessionTokenKey)
    localStorage.removeItem(this.refreshTokenKey)
    store.dispatch(setSessionAction(null))
    store.dispatch(setSignInErrorAction('There was a problem logging in. Check your licennse ID and password or create an account.'))
    store.dispatch(setSignInLicenseFieldAction({
      value: '',
      isValid: false
    }))
    store.dispatch(setSignInLocationFieldAction({
      value: '',
      isValid: false
    }))
  }

  private setSession(response: any): ISession | null {
    if (response.status === 'failure') {
      this.signOut()
      return null
    }
    const data: ISession = jwtDecode(response.token)
    localStorage.setItem(this.sessionTokenKey, response.token)
    const payload: ISessionState = {
      licenseID: data.licenseID,
      location: data.location
    }
    // set store values
    store.dispatch(setSessionAction(payload))
    store.dispatch(setSignInLicenseFieldAction({
      value: data.licenseID,
      isValid: true
    }))
    store.dispatch(setSignInLocationFieldAction({
      value: data.location,
      isValid: true
    }))
    store.dispatch(setSignInErrorAction(null))

    return payload
  }
}

export default new SessionService()
