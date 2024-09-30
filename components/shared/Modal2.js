import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import Button from '../shared/Button';
import breakpoint from '../utils/Breakpoints';
import { CloseIconCircle } from './Icon';

const CustomDialog = styled(Dialog)`
  font-family: 'DM Sans', sans-serif !important;
  .MuiDialog-paper {
    background-color: #f8f8f8;
    box-shadow: 0px 3px 20px #0000003c;
    border-radius: ${(props) => (props.popupWidth ? '25px' : '13px')};
    min-height: ${(props) => (props.popupWidth ? '22rem' : '42rem')};

    min-width: ${(props) => (props.Widthmax ? '40rem' : '57rem')};
    @media (max-width: 768px) {
      min-width: 90%;
    }
  }
`;
const StyledButton = styled(Button)`
  padding: 0.5rem 1.25rem;
  @media ${breakpoint.device.md} {
    padding: 0.5rem 1rem;
  }
`;

const StyledCloseIcon = styled(CloseIconCircle)`
  position: absolute;
  top: 3%;
  right: 5%;
  color: #525252;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }
`;

const StyledHeader = styled.div`
  border-bottom: 1px solid #bababa50;
`;
const Modal2 = ({
  isOpen,
  handleClose,
  handleSubmit,
  title,
  btnText,
  hasHeader,
  hasFooter,
  maxWidth,
  children,
  Widthmax,
  popupWidth,
  capture,
}) => {
  return (
    <>
      <CustomDialog
        popupWidth={popupWidth}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={maxWidth ? maxWidth : 'xs'}
        Widthmax={Widthmax}
      >
        {hasHeader === true ? (
          <StyledHeader>
            <DialogTitle
              id="alert-dialog-title"
              sx={{
                fontSize: '15px',
                color: '#525252',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {title}
            </DialogTitle>
          </StyledHeader>
        ) : null}
        {/* <StyledCloseIcon onClick={() => handleClose()} /> */}
        <DialogContent
          sx={{
            height: { xs: '10rem', md: 'auto' },
            display: 'flex',
            alignItems: 'top',
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: '#444',
              marginTop: '0.5rem',
              fontSize: { xs: '0.8rem', lg: '1.25rem', width: '100%' },
            }}
          >
            {children}
          </DialogContentText>
        </DialogContent>
        {hasFooter === true ? (
          <DialogActions sx={{ alignSelf: 'center', marginBottom: '2rem' }}>
            <StyledButton
              autoFocus
              type="submit"
              onClick={() => handleSubmit()}
            >
              {btnText ? btnText : 'SUBMIT'}
            </StyledButton>
          </DialogActions>
        ) : null}
        {capture === true ? (
          <DialogActions sx={{ alignSelf: 'center', marginBottom: '2rem' }}>
            <StyledButton
              autoFocus
              type="submit"
              onClick={() => handleSubmit()}
            >
              {btnText ? btnText : 'Capture Photo'}
            </StyledButton>
          </DialogActions>
        ) : null}
      </CustomDialog>
    </>
  );
};

export default Modal2;
