import React, { useEffect, useState } from 'react'
import Page from '../../components/Page'
import Icon from '../../components/Icon'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useHistory } from 'react-router-dom'

import { store } from '../../components/Provider'
import { urls } from '../../routing'
import {
  Header,
  Section,
  Content,
  Center
} from './styles'
import {
  IDosageHistoryRequest,
  IDosageHistoryResponse
} from '../../models'
import { DosageHistoryService } from '../../services'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  errPopup:{
    minWidth: 500
  }
}));
const Filter: React.FC = () => {

  const { push } = useHistory()
  const classes = useStyles();
  const [state, setState] = React.useState({
    clientID: '',
    siteID: '',
    isFormValid: true,
    formVlidationMsg: '',
    isClientIDError: false,
    clientErrorMsg: ''
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClientID = (prop: string) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleSiteID = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    const value = event.target.value as string
    console.log(value);
    setState({
      ...state,
      siteID: value
    })
  }

  useEffect(() => {
    const isAccepted = localStorage.getItem("didTCAccepted")
    if(!isAccepted)
      push(urls.disclaimer)
  })

  const handleRequest = async () => {
    let message = ''
    let isFormValid: boolean
    if (state.clientID.length === 0 && state.siteID.length === 0) {
      message = "Please select Client ID and Site ID"
      isFormValid = false
    }
    else if (state.clientID.length === 0) {
      message = "Please select Client ID"
      isFormValid = false
    }
    else if (state.siteID.length === 0) {
      message = "Please select Site ID"
      isFormValid = false
    }
    else {
      message = ''
      isFormValid = true
    }
    setState({
      ...state,
      formVlidationMsg: message,
      isFormValid: isFormValid
    })
    if (isFormValid) {
      const request: IDosageHistoryRequest = {
        site_id: state.siteID,
        client_id: state.clientID
      }
      const response : IDosageHistoryResponse = await DosageHistoryService.requestDosageHistory(request)
      if (response.status === 422) {
        const errorMsg = response.errors === null ? '' : response.errors.message
        setState({
          ...state,
          isClientIDError: true,
          clientErrorMsg: errorMsg,
          formVlidationMsg: '',
          isFormValid: true
        })
        setOpen(true)
      }
      else
        push(urls.dosageHistory)
    }

  }
  return (
    <Page style={{ backgroundColor: 'white', display: 'block' }}>
      <Header style={{ backgroundColor: 'rgb(41,51,114)', textAlign: 'center' }}>
        <Icon style={{ height: 200 }} icon="logo.png" className="logo" />
      </Header>
      <Center style={{ marginTop: 0 }}>
        {
          !state.isFormValid && <Alert style={{ justifyContent: 'center', textTransform: 'none' }} severity="error">{state.formVlidationMsg}</Alert>
        }
      </Center>
      <Section>
        <Content>
          <div>Please choose site ID of patient's primary clinic</div>
          <FormControl style={{ marginTop: 30, width: 300 }} variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="filter-site-id">Site ID</InputLabel>
            <Select
              required
              native
              value={state.siteID}
              onChange={handleSiteID}
              label="Site ID"
              inputProps={{
                name: 'siteID',
                id: 'filter-site-id',
              }}
            >
              <option aria-label="None" value="" />
              <option value="01">01VICTA_Providence</option>
            </Select>
          </FormControl>
        </Content>
        <Content>
          <div>Please enter patient's client ID</div>
          <FormControl style={{ width: 300, marginTop: 30 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-license">License</InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-license"
              type="text"
              value={state.clientID}
              onChange={handleClientID('clientID')}
              labelWidth={70}
            />
          </FormControl>
        </Content>
      </Section>
      <Center>
        <Button onClick={handleRequest} variant="contained" color="primary">
          Request
          </Button>
      </Center>
      <Dialog
        style={{textAlign: 'center'}}
        fullWidth={ true }  
        maxWidth={"xs"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><Alert style={{ backgroundColor: 'transparent', justifyContent: 'center', textTransform: 'uppercase' }} severity="error">Alert!</Alert></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {state.clientErrorMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
              </Button>
        </DialogActions>
      </Dialog>
    </Page>
  )
}
export default Filter
