import React, { useRef, useState } from 'react';
import { passwordChange } from '../../forms/formService';
import Text from '../../shared/Typography';
import { SimpleTextField } from '../../shared/Textfield';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { GreenButton } from '../../shared/Button';
import { IconButton, InputAdornment } from '@mui/material';
import styled from '@emotion/styled';
const ConInput = styled.div`
  margin: 10px;
`;
const ContentBox4 = styled.div`
  background: white;
  border-radius: 20px;
  padding: 35px 45px;
  width: 72%;
  @media (max-width: 700px) {
    width: 85vw;
    padding: 25px 15px;
  }
`;
const Line = styled.div`
  background: #f0f3f4;
  height: 1.5px;
  margin: 18px 0;
`;
const Bdiv = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const PasswordUpdate = () => {
  const [pwValues, setPWValues] = useState({
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
  });
  const handleClickShowConfirmPassword = () => {
    setPWValues({
      ...pwValues,
      showConfirmPassword: !pwValues.showConfirmPassword,
    });
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const npasswordInputRef = useRef();
  const cpasswordInputRef = useRef();
  const copasswordInputRef = useRef();
  const submitPassword = async () => {
    const cp = cpasswordInputRef.current.value;
    const np = npasswordInputRef.current.value;
    const cop = copasswordInputRef.current.value;

    const password = {
      password: np,
      currentPassword: cp,
      passwordConfirmation: cop,
    };
    console.log('ajsdfsdfb', password);
    passwordChange(password).then((res) => {
      console.log(res);
    });
  };
  return (
    <ContentBox4>
      <Text color="red" size="large" font="bold">
        Password
      </Text>
      <Line></Line>
      <Text color="green" size="md" marginTop="30px">
        Current Password
      </Text>
      <SimpleTextField
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
                  {pwValues.showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </IconButton>
              </ConInput>
            </InputAdornment>
          ),
        }}
        required
        fullWidth
        id="cpassword"
        name="cpassword"
        inputRef={cpasswordInputRef}
      />
      <Text color="green" size="md" marginTop="30px">
        New Password
      </Text>
      <SimpleTextField
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
                  {pwValues.showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </IconButton>
              </ConInput>
            </InputAdornment>
          ),
        }}
        required
        fullWidth
        id="npassword"
        name="npassword"
        inputRef={npasswordInputRef}
      />
      <Text color="green" size="md" marginTop="30px">
        Confirm Password
      </Text>
      <SimpleTextField
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
                  {pwValues.showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </IconButton>
              </ConInput>
            </InputAdornment>
          ),
        }}
        required
        fullWidth
        id="copassword"
        name="copassword"
        inputRef={copasswordInputRef}
      />
      <Bdiv>
        <GreenButton onClick={submitPassword}>Submit</GreenButton>
      </Bdiv>
    </ContentBox4>
  );
};

export default PasswordUpdate;
