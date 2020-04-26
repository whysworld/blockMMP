import { ISignInState } from '../states'
import { SignInActionTypes, SignInTypeKeys } from '../types'

const initialState: ISignInState = {
  license: {
    value: '',
    isValid: false
  },
  location: {
    value: '',
    isValid: false
  },
  password: {
    value: '',
    isValid: false
  },
  error: ''
}

export default (state: ISignInState = initialState, action: SignInActionTypes): ISignInState => {
  switch (action.type) {
    case SignInTypeKeys.SET_SIGN_IN_LICENSE_FIELD:
      return { ...state, license: action.payload }
    case SignInTypeKeys.SET_SIGN_IN_LOCATION_FIELD:
      return { ...state, location: action.payload }
    case SignInTypeKeys.SET_SIGN_IN_PASSWORD_FIELD:
      return { ...state, password: action.payload }
    case SignInTypeKeys.SET_SIGN_IN_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
