import SignIn from './pages/SignIn'
import Splash from './pages/Splash'
import Disclaimer from './pages/Disclaimer'
import DosageHistory from './pages/DosageHistory'
import Filter from './pages/Filter'

export const urls = {
    signIn: '/sign-in',
    disclaimer: '/disclaimer',
    dosageHistory: '/dosage_history',
    filter: '/filter',
    root: '/'
}

export const routes = [
    { url: urls.signIn, content: SignIn, isAuthenticated: false },
    { url: urls.disclaimer, content: Disclaimer, isAuthenticated: true },
    { url: urls.dosageHistory, content: DosageHistory, isAuthenticated: true },
    { url: urls.filter, content: Filter, isAuthenticated: true },
    { url: urls.root, content: Splash, isAuthenticated: false },
]
