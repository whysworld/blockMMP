import { combineReducers } from 'redux'
import signIn from './sign-in'
import session from './session'
import dosageHistory from './dosage-history'

export default combineReducers({
    signIn,
    session,
    dosageHistory
})