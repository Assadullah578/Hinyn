import { useEffect, useRef, useState } from 'react';
import {
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import styled from '@emotion/styled';
import Logo from '../shared/Logo';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import LogoImage from '/public/assets/img/logo-hinyn.svg';
import { useRouter } from 'next/router';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import Image from 'next/image';
import Axios from 'axios';
Axios.defaults.withCredentials = true;
import { loginUser, getClientData, getLoggedInUserData } from './formService';
import { OutlinedTextField } from '../shared/Textfield';

const origin = 'https://ancient-crag-30921.herokuapp.com/api';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  color: #444;
`;

const StyledButton = styled(Button)`
  margin: auto;
  width: 100%;
  margin-top: 2rem;
`;

function LoginForPost(props) {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  console.log(props.data, 'asd');

  const MAX_REGISTRATION_STEP = 10;

  const handleClose = () => {
    setOpen(false);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    setLoading(() => true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    if (!loginData.email || !loginData.password) {
      setMessage('Please provide your registered username and password.');
      setOpen(true);
      setLoading(() => false);
      return;
    }

    loginUser(loginData).then((response) => {
      if (response.status === true && response?.data?.jwt) {
        localStorage.setItem('hinyn-uid', response.data.user.id);
        localStorage.setItem('hinyn-cid', response.data.user.id);
        localStorage.setItem('hinyn-cjwt', response?.data?.jwt);
        // const userId = localStorage.getItem('hinyn-tempid');
        if (
          response?.data.user?.step === 10 ||
          response?.data.user?.step === 8
        ) {
          //   router.push('/dashboard');
          props.closeLogin();
        } else if (response?.data.user?.step >= 3) {
          getClientData({ id: response?.data?.user?.id }).then((res) => {
            if (res?.status) {
              const accountType = parseInt(
                res?.data?.data?.attributes?.accountType
              );
              if (accountType === 1) router.push('/professional');
              else if (accountType === 2) router.push('/Client');
            }
          });
        } else if (response?.data.user?.step <= 2) {
          router.push({
            pathname: '/registration',
            query: { email: enteredEmail },
          });
        }
      } else {
        setMessage(response.data);
        setOpen(true);
      }
      setLoading(() => false);
      return false;
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginBottom: '10rem' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#fff',
          }}
        >
          <FormContainer>
            <Logo>
              <Image src={LogoImage} alt="hinyn logo" />
            </Logo>
            <Typography component="h1" variant="h5">
              <b>Login</b>
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={loginHandler}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <OutlinedTextField
                    required
                    fullWidth
                    id="emailAddress"
                    label="Email Address"
                    name="emailAddress"
                    autoComplete="email"
                    inputRef={emailInputRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <OutlinedTextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    type={values.showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    inputRef={passwordInputRef}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <FiEyeOff /> : <FiEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              {loading ? (
                <StyledButton
                  disabled={true}
                  style={{ pointerEvents: 'none', cursor: 'none' }}
                >
                  <CircularProgress size={15} color="inherit" />
                </StyledButton>
              ) : (
                <StyledButton onClick={loginHandler}> Login </StyledButton>
              )}
              {props.formType === 'professional' ? (
                <>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/register">
                        <a>Dont have an account yet? Register</a>
                      </Link>
                    </Grid>
                  </Grid>
                </>
              ) : (
                ''
              )}
            </Box>
          </FormContainer>
        </Box>
      </Container>

      <Modal
        handleClose={handleClose}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {message ?? 'Oops! All fields are required.'}
        </Box>
      </Modal>
    </>
  );
}

export default LoginForPost;
