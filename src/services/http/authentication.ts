import { BaseService } from './base'
import { ISignInInfo, ISession } from '../../models'
class AuthenticationService extends BaseService {
  private segment = 'auth'

  public signIn(credentials: ISignInInfo): Promise<ISession> {
    const { licenseID, location, SHApassword } = credentials
    return this.post(`${this.segment}`, { licenseID, location, SHApassword })
  }
}

export default new AuthenticationService()
