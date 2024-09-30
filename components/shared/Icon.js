import styled from '@emotion/styled';
import { FaChevronLeft, FaSearch, FaLongArrowAltLeft } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import { MdOutlinePhotoSizeSelectActual, MdBrokenImage } from 'react-icons/md';
import { GiPartyPopper } from 'react-icons/gi';
import {
  FiUploadCloud,
  FiRss,
  FiAlertCircle,
  FiUsers,
  FiCheckSquare,
  FiXSquare,
  FiAward,
  FiChevronDown,
  FiLogOut,
} from 'react-icons/fi';
import {
  AiOutlineMail,
  AiTwotoneLock,
  AiOutlineBell,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import {
  BsArrowRight,
  BsArrowLeft,
  BsChevronRight,
  BsChatLeft,
  BsExclamationOctagon,
  BsChat,
  BsCardImage,
  BsTelephone,
  BsThreeDotsVertical,
  BsCheck2,
  BsFillCheckCircleFill,
} from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { RiSuitcaseLine } from 'react-icons/ri';
import { GoLocation } from 'react-icons/go';
import { PiProjectorScreen } from 'react-icons/pi';
import { IoIosSend } from 'react-icons/io';
import { FaCircleUser } from 'react-icons/fa6';
export const Cross = styled(RxCross1)`
  font-size: 12px;
`;
export const CrossForModal = styled(RxCross1)`
  font-size: 17px;
`;
export const CrossForModals = styled(RxCross1)`
  font-size: 15px;
`;
export const ProjectIcon = styled(PiProjectorScreen)`
  font-size: 20px;
`;
export const SendIcon = styled(IoIosSend)`
  font-size: 20px;
`;
export const AddIcon = styled(IoAdd)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : props.variant === 'white'
      ? 'white'
      : '#525252'};
  font-size: 24px;
`;
export const BackIconForDetails = styled(FaLongArrowAltLeft)`
  color: white;
  font-size: 24px;
`;
export const Congrats = styled(GiPartyPopper)`
  color: skyblue;
  font-size: 80px;
`;
export const Check = styled(BsCheck2)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
  font-size: 20px;
`;
export const CheckBig = styled(BsCheck2)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
  font-size: 80px;
`;
// export const CheckMember = styled(BsFillCheckCircleFill)`
//   color: ${(props) =>
//     props.variant === 'red'
//       ? '#EB4C60'
//       : props.variant === 'green'
//       ? '#4AA398'
//       : '#8c8b8b'};
//   font-size: 30px;
// `;
export const AlertIcon = styled(FiAlertCircle)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const AwardIcon = styled(FiAward)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const BackIcon = styled(FaChevronLeft)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
  position: ${(props) =>
    props.isabsolute === false ? 'relative' : 'absolute'};
  left: 7%;
  top: 10%;
  cursor: pointer;
`;

export const BellIcon = styled(AiOutlineBell)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const BrokenImageIcon = styled(MdBrokenImage)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const CaseIcon = styled(RiSuitcaseLine)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const CautionIcon = styled(BsExclamationOctagon)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const ChatIcon = styled(BsChatLeft)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const CheckIcon = styled(AiOutlineCheck)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
  font-size: 18px;
`;

export const CheckSquareIcon = styled(FiCheckSquare)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const ChevronDownIcon = styled(FiChevronDown)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const CloseIcon = styled(AiOutlineClose)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const CloseIconCircle = styled(AiOutlineCloseCircle)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const EmailIcon = styled(AiOutlineMail)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const ImageIcon = styled(BsCardImage)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const LeftArrowIcon = styled(BsArrowLeft)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const LocationIcon = styled(GoLocation)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
  font-size: 16px;
`;

export const LogoutIcon = styled(FiLogOut)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const LockIcon = styled(AiTwotoneLock)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;
export const Dots = styled(BsThreeDotsVertical)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
  margin: 15px 0 0 0;
  font-size: 17px;
  cursor: pointer;
`;

export const OutlineSearchIcon = styled(AiOutlineSearch)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const PhotoIcon = styled(MdOutlinePhotoSizeSelectActual)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const RightArrowIcon = styled(BsArrowRight)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const RightChevronIcon = styled(BsChevronRight)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const RoundChatIcon = styled(BsChat)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const RssIcon = styled(FiRss)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const SearchIcon = styled(FaSearch)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : props.variant === 'gray'
      ? '#939393'
      : '#525252'};
  font-size: ${(props) => (props.siz === 'large' ? '20px' : '14px')};
`;

export const TelephoneIcon = styled(BsTelephone)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const UploadIcon = styled(FiUploadCloud)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

export const UserIcon = styled(BiUser)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#D3D3D3'};
  font-size: 70px;
`;

export const UsersIcon = styled(FiUsers)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;
export const UserImagePro = styled(FaCircleUser)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;
export const XSquareIcon = styled(FiXSquare)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#525252'};
`;

const Icon = styled.span`
  color: ${(props) =>
    props.color === 'red'
      ? '#EB4C60'
      : props.color === 'green'
      ? '#4AA398'
      : '#525252'};
  font-size: 14px;
`;

export default Icon;
