import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react'
import { useHistory } from 'react-router-dom'
import Page from '../../components/Page'
import { sleep } from '../../helpers/dom'
import { urls } from '../../routing'
import { SessionService } from '../../services'

const Splash: React.FC = () => {
  const { push } = useHistory()

  const checkSession = async () => {
    await sleep(2000)
    SessionService.isSessionActive
      ? push(urls.disclaimer)
      : push(urls.signIn)
  }

  checkSession()

  return (
    <Page style={{alignItems: 'center', justifyContent: 'center'}}>
      <CircularProgress />
    </Page>
  )
}

export default Splash
