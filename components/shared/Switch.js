import React, { useState } from 'react';
import styled from '@emotion/styled';

const SwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #e1f7f5;
    border: 1px solid #4aa398;
  }

  &:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + span:before {
    transform: translateX(26px);
    background-color: #4aa398;
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: 5px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SwitchWrapper>
      <SwitchInput
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <SwitchSlider />
    </SwitchWrapper>
  );
};

export default Switch;
