import { IValidatedInputField } from '../../models'

export enum SignInTypeKeys {
  SET_SIGN_IN_LICENSE_FIELD = 'SET_SIGN_IN_LICENSE_FIELD',
  SET_SIGN_IN_PASSWORD_FIELD = 'SET_SIGN_IN_PASSWORD_FIELD',
  SET_SIGN_IN_LOCATION_FIELD = 'SET_SIGN_IN_LOCATION_FIELD',
  SET_SIGN_IN_ERROR = 'SET_SIGN_IN_ERROR'
}

export interface ISetSignInLicenseFieldAction {
  type: typeof SignInTypeKeys.SET_SIGN_IN_LICENSE_FIELD
  payload: IValidatedInputField<string>
}

export interface ISetSignInPasswordFieldAction {
  type: typeof SignInTypeKeys.SET_SIGN_IN_PASSWORD_FIELD
  payload: IValidatedInputField<string>
}

export interface ISetSignInLocationFieldAction {
  type: typeof SignInTypeKeys.SET_SIGN_IN_LOCATION_FIELD
  payload: IValidatedInputField<string>
}

export interface ISetSignInErrorAction {
  type: typeof SignInTypeKeys.SET_SIGN_IN_ERROR
  payload: Error
}

export type SignInActionTypes =
  | ISetSignInLicenseFieldAction
  | ISetSignInPasswordFieldAction
  | ISetSignInLocationFieldAction
  | ISetSignInErrorAction
