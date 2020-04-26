import {
    ISetSignInLicenseFieldAction,
    SignInTypeKeys,
    ISetSignInPasswordFieldAction,
    ISetSignInLocationFieldAction,
    ISetSignInErrorAction
  } from '../types'
  import { IValidatedInputField } from '../../models'
  
  export function setSignInLicenseFieldAction(payload: IValidatedInputField<string>): ISetSignInLicenseFieldAction {
    return { type: SignInTypeKeys.SET_SIGN_IN_LICENSE_FIELD, payload }
  }
  
  export function setSignInPasswordFieldAction(payload: IValidatedInputField<string>): ISetSignInPasswordFieldAction {
    return { type: SignInTypeKeys.SET_SIGN_IN_PASSWORD_FIELD, payload }
  }
  
  export function setSignInLocationFieldAction(payload: IValidatedInputField<string>): ISetSignInLocationFieldAction {
    return { type: SignInTypeKeys.SET_SIGN_IN_LOCATION_FIELD, payload }
  }

  export function setSignInErrorAction(payload: any): ISetSignInErrorAction {
    return { type: SignInTypeKeys.SET_SIGN_IN_ERROR, payload }
  }
  