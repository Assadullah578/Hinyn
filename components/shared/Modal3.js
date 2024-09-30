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
    border-radius: 23px;
    min-height: 15rem;
  }
`;
const StyledButton = styled(Button)`
  padding: 0.5rem 1.25rem;
  @media ${breakpoint.device.md} {
    padding: 0.5rem 1rem;
  }
`;

// const StyledCloseIcon = styled(CloseIconCircle)`
//   position: absolute;
//   top: 3%;
//   right: 5%;
//   color: #525252;
//   font-size: 20px;
//   cursor: pointer;
//   opacity: 0.3;

//   &:hover {
//     opacity: 1;
//   }
// `;

const StyledHeader = styled.div`
  border-bottom: 1px solid #bababa50;
`;
const Modal3 = ({
  isOpen,
  handleClose,
  handleSubmit,
  title,
  btnText,
  hasHeader,
  hasFooter,
  maxWidth,
  children,
}) => {
  return (
    <>
      <CustomDialog open={isOpen}>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
      </CustomDialog>
    </>
  );
};

export default Modal3;
