import { useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  TextareaAutosize,
  CircularProgress,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal from '../shared/Modal';
import { Button as CustomButton } from '@mui/material';
import { BackIcon, UploadIcon } from '../shared/Icon';
import { WebcamCapture } from '../shared/WebcamCapture';
import AvatarUpload from '../shared/AvatarUpload';
import Image from 'next/image';
import { addDocData, updateClientData, uploadFiles } from './formService';
import Filter from '../shared/Filter';
import { BiDockBottom } from 'react-icons/bi';
import Modal2 from '../shared/Modal2';
import Webcam from 'react-webcam';

const StyledButton = styled(Button)`
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  height: 2.5rem;
  width: 6rem;
`;

const StyledUploadIcon = styled(UploadIcon)`
  font-size: 24px;
  font-weight: 600;
  color: #0f7669;
`;
const AvatarDiv = styled.div`
  margin: 40px 40px;
  background: red;
`;
const UploadButton = styled(CustomButton)`
  border: 1px solid #0f7669;
  color: #0f7669;
  border-radius: 5px;
  background: #cce0de;
  width: 100%;
  font-size: 12px;
  padding: 30px 16px;
  display: flex;
  flex-direction: column;

  &:hover {
    background: #cce0de;
    color: #0f7669;
    border: 1px solid #0f7669;
  }
`;
const UploadButton2 = styled(CustomButton)`
  background: #eb4c60;
  color: white;
  border-radius: 50;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  border-radius: 20px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.75rem;
  font-family: 'Roboto', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 78%;
  margin-left: 5.2rem;
  margin-top: 5rem;
`;
const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;
const BackCon = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;
const TextDiv = styled.div`
  width: 80%;
  @media (max-width: 430px) {
    width: 78%;
  }
`;
const IconCon = styled.div``;
export const UserIcon = styled(BiDockBottom)`
  color: ${(props) =>
    props.variant === 'red'
      ? '#EB4C60'
      : props.variant === 'green'
      ? '#4AA398'
      : '#D3D3D3'};
  font-size: 70px;
`;
const CameraModel = styled.div`
  display: flex;
  height: 30rem;
  width: 55rem;
  border-radius: 20px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;
const UploadButton3 = styled(CustomButton)`
  color: #0f7669;
  border-radius: 70rem;
  background: white;
  width: 170px;
  height: 170px;
  font-size: 12px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const BoxDiv = styled(Box)``;
function UploadDoc({ handleNextClick, handleBack, handleSkip }) {
  const [open, setOpen] = useState(false);
  const [openCameraModal, setOpenCameraModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseCameraModal = () => {
    setOpenCameraModal(false);
  };
  const toggleOpenCameraModal = () => {
    setOpenCameraModal(!openCameraModal);
  };

  const [isValid, setValid] = useState({
    uploadedFiles: false,
    avatarSelfie: false,
    form: true,
  });
  const [errorMessage, setErrorMessage] = useState({
    uploadedFiles: null,
    avatarSelfie: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filename, setFilename] = useState('');
  const [filetype, setFiletype] = useState('');
  const [filepath, setFilepath] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [dataForm, setDataForm] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const webcamRef = useRef(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setLoading(true);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFilename(file.name);
      setFiletype(file.type);
      const formData = new FormData();
      formData.append('files', file);
      setDataForm(formData);
      uploadFiles(formData).then((res) => {
        setLoading(false);
        if (res.status) {
          const url = res.data.data[0].url;
          setImageUrl(url);
          console.log(url, filename, filetype);
        }
      });
    }
  };
  const handleFileUploadFromCamera = async (imageSrc) => {
    setLoading(true);
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const formData = new FormData();
    formData.append('files', blob);
    setFilename('webcam_image.jpg');
    setFiletype('image/jpeg');
    setDataForm(formData);
    uploadFiles(formData).then((res) => {
      setLoading(false);
      if (res.status) {
        const url = res.data.data[0].url;
        setImageUrl(url);
        console.log(url, filename, filetype);
      }
    });
  };
  const capturePhotoHandler = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedImage2(imageSrc);
    handleFileUploadFromCamera(imageSrc);
    setOpenCameraModal(false);
  };
  async function submitHandler(event) {
    event.preventDefault();

    if (imageUrl) {
      const docData = {
        path: imageUrl,
        filename: filename,
        type: filetype,
        status: true,
      };

      try {
        const res = await addDocData(docData);

        if (res.status) {
          const ID = res.data.id;
          const data = {
            documents: ID,
            isDocumentVerified: false,
          };
          console.log('done', res);
          console.log(res.data.id);
          handleNextClick(data);
        } else {
          console.log('Not done');
        }
      } catch (error) {
        console.error('Error adding document data:', error);
      }
    }
  }
  const Skip = () => {
    handleSkip();
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '6rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          <Text size="xxl" marginBottom="6px">
            <b>Let&apos;s make your profile</b>
          </Text>
          <Text>
            Fill out your profile for clients to better understand your
          </Text>
          <Text>services.</Text>
          <VerticalDivider />
          <Text color="green" marginBottom="10px">
            Upload your document
          </Text>
          <TextDiv>
            <Text fontSize="13px" align="center">
              We will need to verify your identity. Kindly upload a scanned ID
              (Either your Passport, Government ID, or Driver’s License)
            </Text>
          </TextDiv>
          <VerticalDivider />
          <BoxDiv
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{
              mt: 1.5,
              width: '100%',
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                marginBottom: '3.6rem',

                justifyContent: 'center',
              }}
            >
              <Grid item xs={9}>
                <UploadButton
                  component="label"
                  variant="outlined"
                  sx={{}}
                  startIcon={<StyledUploadIcon />}
                >
                  <br />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      flexDirection: 'column',
                    }}
                  >
                    {filename
                      ? filename
                      : 'Drag or click to upload your document'}
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Selected Image"
                        style={{
                          width: 50,
                          height: 50,
                          marginTop: 4,
                          borderRadius: 100,
                        }}
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    hidden
                    onChange={handleFileUpload}
                    multiple
                  />
                </UploadButton>
                {errorMessage.uploadedFiles && (
                  <Error>{errorMessage.uploadedFiles}</Error>
                )}
              </Grid>
            </Grid>

            <Text marginTop="20px" align="center" marginBottom={3}>
              Click the button below to take a selfie with your document
            </Text>
            <UploadButton3
              component="label"
              sx={{ marginRight: '1rem' }}
              onClick={() => setOpenCameraModal(true)}
            >
              {selectedImage2 ? (
                <Image
                  src={selectedImage2}
                  width="180px"
                  height="180px"
                  style={{ borderRadius: '70rem', overflow: 'hidden' }}
                  alt="asd"
                />
              ) : (
                <>
                  <IconCon>
                    <UserIcon isabsolute={false} />
                  </IconCon>
                  <Text color="green" fontSize="small">
                    Take a photo
                  </Text>
                </>
              )}
            </UploadButton3>

            <ButtonContainer>
              <BackCon onClick={handleBack}>
                <BackIcon
                  isabsolute={false}
                  style={{ margin: 'auto', fontSize: '16.5px' }}
                />
                <Text
                  style={{
                    marginLeft: '1rem',
                    fontSize: '12.5px',
                    marginTop: '2px',
                  }}
                >
                  Go Back
                </Text>
              </BackCon>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {loading ? (
                  <StyledButton className="disabled">
                    {loading ? <CircularProgress size={10} /> : 'Next'}
                  </StyledButton>
                ) : (
                  <StyledButton>NEXT</StyledButton>
                )}{' '}
                <div style={{ paddingLeft: 10, paddingRight: 10 }}>or</div>
                <StyledButton onClick={Skip}>Skip</StyledButton>
              </div>
            </ButtonContainer>
          </BoxDiv>
        </FormContainer>
      </Container>

      <Modal
        handleClose={handleClose}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        <div>Oops! All fields are required.</div>
      </Modal>

      <Modal2
        isOpen={openCameraModal}
        handleClose={() => setOpenCameraModal(false)}
        hasHeader={true}
        title={'Take a photo with your document'}
        // hasFooter={true}
        capture={true}
        handleSubmit={capturePhotoHandler}
      >
        <CameraModel>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: '100%', height: '100%', borderRadius: '20px' }}
          />
          {/* <UploadButton2 onClick={capturePhotoHandler}>
            Capture Photo
          </UploadButton2> */}
        </CameraModel>
      </Modal2>
    </>
  );
}

export default UploadDoc;
