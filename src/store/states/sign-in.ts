import { IValidatedInputField } from '../../models'

export interface ISignInState {
  license: IValidatedInputField<string>
  location: IValidatedInputField<string>
  password: IValidatedInputField<string>
  error: Error | string
}
