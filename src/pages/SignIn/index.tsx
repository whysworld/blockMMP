import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Icon from '../../components/Icon'
import Page from '../../components/Page'
import { urls } from '../../routing'
import { SessionService } from '../../services'
import { Section } from './styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';

import { store } from '../../components/Provider'

import { ISignInInfo } from '../../models'

import { SHA3 } from 'sha3';

const SignIn: React.FC = () => {
    const { push } = useHistory()

    //
    const [validationError, setValidationError] = useState({
        isError: false,
        message: ''
    })

    const [credentials, setCredentials] = useState({
        licenseID: '',
        location: '',
        SHApassword: '',
        showPassword: false,
    });

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(2),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '350px',
        },
    }));
    const classes = useStyles();

    const handleSignIn = async () => {
        const hash = new SHA3(256);
        const userInfo: ISignInInfo = {
            licenseID: credentials.licenseID,
            location: credentials.location,
            SHApassword: hash.reset().update(credentials.SHApassword).digest('hex')
        }
        const result = await SessionService.signIn(userInfo)
        //navigate to disclaimer page if credentials match
        if (result)
            push(urls.disclaimer)
        else{
        //show error message if credentials mismatch
        setValidationError({
            ...validationError,
            isError: true,
            message: store.getState().signIn.error?.toString()
        })
        }
    }

    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCredentials({ ...credentials, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setCredentials({ ...credentials, showPassword: !credentials.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault();
    };


    const isSignInDisabled = credentials.licenseID.length < 1 || credentials.location.length < 1 || credentials.SHApassword.length < 1

    return (
        <Page style={{}}>
            <Section style={{ backgroundColor: 'rgb(41,51,114)' }}>
                <Icon style={{ width: 275 }} icon="logo.png" className="logo" />
            </Section>
            <Section style={{ backgroundColor: 'white' }}>
                {
                    validationError.isError &&
                    <Alert severity="error">
                        {validationError.message}
                    </Alert>
                }
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-license">License</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-license"
                        type="text"
                        value={credentials.licenseID}
                        onChange={handleChange('licenseID')}
                        labelWidth={70}
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-location">Location</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-location"
                        type="text"
                        value={credentials.location}
                        onChange={handleChange('location')}
                        labelWidth={70}
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={credentials.showPassword ? 'text' : 'password'}
                        value={credentials.SHApassword}
                        onChange={handleChange('SHApassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {credentials.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleSignIn} disabled={isSignInDisabled} style={{ marginTop: 20, padding: '10px 25px' }}><ExitToAppIcon style={{ marginRight: 10 }} />Sign In</Button>
            </Section>
        </Page>
    )
}

export default SignIn
