import { useRef, useState } from 'react';
import {
  CssBaseline,
  InputAdornment,
  IconButton,
  Grid,
  Box,
  Container,
  CircularProgress,
} from '@mui/material';
import styled from '@emotion/styled';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Button from '../shared/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Modal from '../shared/Modal';

import { OutlinedTextField } from '../shared/Textfield';
import { loginUser, registerUser, logoutUser } from '../forms/formService';

import Text from '../shared/Typography';
import { CrossForModal } from '../shared/Icon';

const Logo = styled.div`
  position: relative;
  width: 8rem;
  height: auto;
  margin-bottom: 20px;
`;
const TypoDiv = styled.div`
  padding: 20px;
  margin: auto;
`;
const TypoDiv2 = styled.div`
  margin-left: 15px;
`;

// const router = useRouter();

const StyledButton = styled(Button)`
  margin: auto;
  width: 100%;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  border-radius: 20px;
`;

// const AgreeCheckbox = styled.div`
//   font-size: 14px;
//   margin: 3rem;
//   cursoe: pointer;
// `;
const AgreeDiv = styled.div`
  margin-top: 1.5rem;
  /* margin-bottom: 1.5rem; */
  display: flex;
  direction: row;
  gap: 10px;
`;
const TextLink = styled.span`
  margin-left: 8px;
  cursor: pointer;
  color: #4aa398;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;
const ConInput = styled.div`
  margin: 10px;
`;
const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ConBox = styled.div``;
const ConText = styled.div``;
function RegistrationForm({ openLogin, data }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  console.log(data, 'as');
  const [pwValues, setPWValues] = useState({
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
  });
  const [isValid, setValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    form: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const checkIsEmail = (event) => {
    var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(event.target.value)) {
      setErrorMessage((prevState) => ({
        ...prevState,
        ['email']: 'Invalid email',
      }));
    } else {
      event.target.style.border = 'none';
      setErrorMessage((prevState) => ({
        ...prevState,
        ['email']: null,
      }));
      setValid((prevState) => ({
        ...prevState,
        ['email']: true,
      }));
    }
  };

  const checkIsPassword = (event) => {
    //at least 8 chars long, at least  one uppercase at least one number
    var regex =
      /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9!@#$&()\\-`.+,/"])(.{8,})$/;
    if (!regex.test(event.target.value)) {
      if (event.target.id === 'password') {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['password']:
            'Must contain at least 8 characters with an uppercase and a number',
        }));
      }
    } else {
      event.target.style.border = 'none';
      if (event.target.id === 'password') {
        setErrorMessage((prevState) => ({
          ...prevState,
          ['password']: null,
        }));
        setValid((prevState) => ({
          ...prevState,
          ['password']: true,
        }));
        setPWValues({ ...pwValues, ['password']: event.target.value });
      }
    }
    return isValid.password;
  };

  const checkIsConfirmPassword = (event) => {
    if (checkIsPassword(event)) {
      if (
        passwordInputRef.current.value ===
        (event.target.value || pwValues['confirmPassword'])
      ) {
        setValid((prevState) => ({
          ...prevState,
          ['confirmPassword']: true,
        }));
        setErrorMessage((prevState) => ({
          ...prevState,
          ['confirmPassword']: null,
        }));
        setPWValues({ ...pwValues, ['confirmPassword']: event.target.value });
      } else {
        setValid((prevState) => ({
          ...prevState,
          ['confirmPassword']: false,
        }));
        setErrorMessage((prevState) => ({
          ...prevState,
          ['confirmPassword']: 'Passwords do not match',
        }));
      }
    }
  };

  const handlePWChange = (prop) => (event) => {
    setPWValues({ ...pwValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPWValues({
      ...pwValues,
      showPassword: !pwValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setPWValues({
      ...pwValues,
      showConfirmPassword: !pwValues.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleRegisterUser = async (clientData) => {
    logoutUser();
    setLoading(true);
    return registerUser(clientData).then((response) => {
      if (response.status === true) {
        localStorage.setItem('hinyn-tempid', response.data.id);
        router.push({
          pathname: '/VerifyEmailPage',
          query: {
            name: clientData.email,
            email: clientData.email,
            id: response.data.id,
          },
        });
        setLoading(false);
      } else {
        setMessage(response.data);
        setOpen(true);
        setLoading(false);
      }
      return false;
    });
  };

  const handleLoginUser = async (clientData) => {
    return loginUser(clientData).then((response) => {
      if (response.status === true) return response.data;
      else {
        setMessage(response.data);
        setOpen(true);
      }
      return false;
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isChecked) {
      if (loading) return;

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      if (enteredEmail && isValid.email && enteredPassword) {
        isValid.form = true;
      }
      if (isValid.form) {
        const clientData = {
          email: enteredEmail,
          password: enteredPassword,
        };
        handleRegisterUser(clientData).then((res) => {
          if (res) {
            console.log(res, 'qwe');
          }
        });
      } else {
        setOpen(true);
      }
    } else {
      setCheckError(true);
      setLoading(false);
    }
  };
  const handleUserAgree = (value) => {
    if (value == '1') {
      window.open('/UserAgreement', '_blank');
    } else {
      window.open('/Privacy', '_blank');
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the state of the checkbox
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '2rem' }}>
        <CssBaseline />
        <FormContainer>
          {/* <Logo /> */}
          <TypoDiv>
            <Logo>
              <Image
                src={require('../../public/assets/img/logo-normal.svg')}
                alt="hinyn logo"
              />
            </Logo>
            <TypoDiv2>
              <Text size="large">
                <b>Sign Up</b>
              </Text>
            </TypoDiv2>
          </TypoDiv>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OutlinedTextField
                  required
                  fullWidth
                  id="emailAddress"
                  placeholder="Email Address"
                  name="emailAddress"
                  autoComplete="email"
                  onKeyUp={checkIsEmail}
                  inputRef={emailInputRef}
                />
                {errorMessage.email && <Error>{errorMessage.email}</Error>}
              </Grid>
              <Grid item xs={12}>
                <OutlinedTextField
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  id="password"
                  type={pwValues.showPassword ? 'text' : 'password'}
                  onKeyUp={checkIsPassword}
                  autoComplete="new-password"
                  inputRef={passwordInputRef}
                  onChange={handlePWChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <ConInput>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {pwValues.showPassword ? <FiEyeOff /> : <FiEye />}
                          </IconButton>
                        </ConInput>
                      </InputAdornment>
                    ),
                  }}
                />
                {errorMessage.password && (
                  <Error>{errorMessage.password}</Error>
                )}
              </Grid>
              <Grid item xs={12}>
                <OutlinedTextField
                  required
                  fullWidth
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  type={pwValues.showConfirmPassword ? 'text' : 'password'}
                  onKeyUp={checkIsConfirmPassword}
                  inputRef={confirmPasswordInputRef}
                  onChange={handlePWChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <ConInput>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {pwValues.showConfirmPassword ? (
                              <FiEyeOff />
                            ) : (
                              <FiEye />
                            )}
                          </IconButton>
                        </ConInput>
                      </InputAdornment>
                    ),
                  }}
                />
                {errorMessage.confirmPassword && (
                  <Error>{errorMessage.confirmPassword}</Error>
                )}
              </Grid>
              <Grid item xs={12}>
                <OutlinedTextField
                  required
                  fullWidth
                  name="referalId"
                  placeholder="Referral Id"
                  // id="confirmPassword"
                  type={'text'}
                  onKeyUp={checkIsConfirmPassword}
                  inputRef={confirmPasswordInputRef}
                  onChange={handlePWChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {/* <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {pwValues.showConfirmPassword ? (
                            <FiEyeOff />
                          ) : (
                            <FiEye />
                          )}
                        </IconButton> */}
                      </InputAdornment>
                    ),
                  }}
                />
                {/* {errorMessage.confirmPassword && (
                  <Error>{errorMessage.confirmPassword}</Error>
                )} */}
              </Grid>
            </Grid>
            <div style={{ marginBottom: 12 }}>
              <AgreeDiv>
                <ConBox>
                  <input type="checkbox" onChange={handleCheckboxChange} />
                </ConBox>

                <ConText>
                  <div style={{ color: 'red', fontSize: '15px' }}>
                    <span style={{ color: '#525252', marginRight: 3 }}>
                      I agree to the HINYN
                    </span>
                    <a
                      onClick={() => handleUserAgree(1)}
                      style={{ cursor: 'pointer' }}
                    >
                      User Agreement
                    </a>{' '}
                    <span style={{ color: '#525252' }}>and</span>
                    <a
                      onClick={() => handleUserAgree(2)}
                      style={{ cursor: 'pointer' }}
                    >
                      {' '}
                      Privacy Policy
                    </a>
                  </div>
                </ConText>
              </AgreeDiv>
              {checkError ? (
                <div
                  style={{
                    color: 'red',
                    fontSize: 12,
                    marginLeft: 36,
                  }}
                >
                  You must agree to the privacy policy to register.
                </div>
              ) : null}
            </div>
            {loading ? (
              <StyledButton
                disabled={true}
                style={{ pointerEvents: 'none', cursor: 'none' }}
              >
                <CircularProgress size={15} color="inherit" />
              </StyledButton>
            ) : (
              <StyledButton onClick={submitHandler}> Join HINYN</StyledButton>
            )}

            <Grid
              container
              sx={{ marginTop: '2rem', justifyContent: 'center' }}
            >
              <Grid item>
                <Text>
                  Already have an account?{' '}
                  <TextLink color="green" onClick={openLogin}>
                    Login
                  </TextLink>
                </Text>
              </Grid>
            </Grid>
          </Box>
        </FormContainer>
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
          <div
            style={{
              position: 'absolute',
              top: 13,
              right: 23,
              cursor: 'pointer',
            }}
            onClick={handleClose}
          >
            <CrossForModal />
          </div>
          {message ?? 'Oops! All fields are required.'}
        </Box>
      </Modal>
    </>
  );
}

export default RegistrationForm;
