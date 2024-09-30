import { useRef, useState } from 'react';
import {
  CssBaseline,
  Grid,
  Box,
  Container,
  CircularProgress,
} from '@mui/material';
import styled from '@emotion/styled';
import Text from '../shared/Typography';
import Button from '../shared/Button';
import Modal2 from '../shared/Modal2';
import StyledTextField from '../shared/Textfield';
import { BackIcon, UploadIcon, UserIcon } from '../shared/Icon';
import Router from 'next/router';
import Image from 'next/image';
import { Button as CustomButton } from '@mui/material';
import {
  addDocData,
  getDocs,
  getImage,
  updateClientData,
  updateUserData,
  uploadFiles,
  uploadImage,
} from '../forms/formService';
import Webcam from 'react-webcam';

const StyledButton = styled(Button)`
  height: 2.5rem;
  width: 6rem;
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* @media (max-width: 430px) {
    width: 90%;
  } */
  /* border-radius: 20px; */
  /* background-color: red; */
`;

const ImageDiv2 = styled.div`
  border-radius: 20px;
  overflow: hidden;
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
  width: 80%;
  margin-top: 3rem;
  /* margin-left: 50px; */
  cursor: pointer;
`;
const CameraModel = styled.div`
  display: flex;
  height: 30rem;
  width: 55rem;
  border-radius: 20px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  /* margin: auto; */
`;
const TextDiv = styled.div`
  display: flex;
  direction: row;
  margin-left: 22rem;
  margin-top: 43px;
`;
const UploadButton = styled(CustomButton)`
  color: #0f7669;
  border-radius: 70rem;
  background: #f0f0f0;
  width: 170px;
  height: 170px;
  font-size: 12px;
  margin: auto;
  display: flex;
  flex-direction: column;
  /* @media (min-width: 1000px) {
    width: 150px;
    height: 150px;
  } */
`;
const TextCon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const TextDivMobile = styled.div`
  /* @media (max-width: 769px) {
    width: 80%;
  } */
`;
const UploadButton2 = styled(CustomButton)`
  background: #eb4c60;
  color: white;
  border-radius: 50;
`;
const StyledUploadIcon = styled(UploadIcon)`
  font-size: 24px;
  font-weight: 600;
  color: #0f7669;
`;
const UploadButton3 = styled(CustomButton)`
  border: 1px solid #0f7669;
  color: #0f7669;
  border-radius: 5px;
  background: #cce0de;
  width: 25rem;
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
const IconCon = styled.div``;
const FieldDiv = styled.div`
  display: flex;
  width: 30rem;
  @media (max-width: 430px) {
    width: 25rem;
  }
`;
const VerticalDivider = styled.div`
  height: 2rem;
  width: 100%;
`;
function FirstLastName2({ handleNextClick }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [filename, setFilename] = useState('');
  const [filetype, setFiletype] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [docId, setDocId] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [dataForm, setDataForm] = useState(null);
  const [openCameraModal, setOpenCameraModal] = useState(false);
  const webcamRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState({
    firstname: null,
    lastname: null,
    uploadPhoto: null,
  });
  const firstnameInputRef = useRef();
  const lastnameInputRef = useRef();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage2(URL.createObjectURL(file));
      setFilename(file.name);
      setFiletype(file.type);
      const formData = new FormData();
      formData.append('files', file);
      setDataForm(formData);
    }
    // if (dataForm) {
    //   uploadFiles(dataForm);
    // }
  };
  const handleFileUploadFromCamera = async (imageSrc) => {
    // try {
    //   if (!imageSrc) {
    //     throw new Error('No image source provided');
    //   }
    const blob = await fetch(imageSrc).then((res) => res.blob());
    console.log(blob);
    const formData = new FormData();

    formData.append('files', blob);
    console.log('as', formData);
    // setFilename('qwe');
    setFiletype('image/jpeg');
    setDataForm(formData);
    // } catch (error) {
    //   console.error('Error uploading file from camera:', error);
    //   setErrorMessage((prevState) => ({
    //     ...prevState,
    //     uploadPhoto: 'Failed to capture image from webcam',
    //   }));
    // }
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const enteredFirstname = firstnameInputRef.current.value;
    const enteredLastname = lastnameInputRef.current.value;

    if (
      !enteredFirstname?.length < 2 &&
      !enteredLastname?.length < 2 &&
      dataForm
    ) {
      setErrorMessage(() => ({
        firstname: null,
        lastname: null,
        uploadPhoto: null,
      }));

      await uploadFiles(dataForm)
        .then((res) => {
          setLoading(false);
          if (res.status) {
            const url = res.data.data[0].url;
            setImageUrl(url);

            // Now that imageUrl is set, construct the data object
            const data = {
              firstName: enteredFirstname,
              lastName: enteredLastname,
              displayPhoto: url, // Use url directly here
              isEmailVerified: true,
            };
            if (data) {
              handleNextClick(data);
            }
          }
        })
        .catch((error) => {
          // Handle error if upload fails
          console.error('Error uploading files:', error);
        });
    } else {
      setOpen(true);

      if (enteredFirstname?.length < 2)
        setErrorMessage((prevState) => ({
          ...prevState,
          ['firstname']: 'Please provide first name',
        }));
      if (enteredLastname?.length < 2)
        setErrorMessage((prevState) => ({
          ...prevState,
          ['lastname']: 'Please provide last name',
        }));
      if (!dataForm)
        setErrorMessage((prevState) => ({
          ...prevState,
          ['uploadPhoto']: 'Please provide profile photo',
        }));

      setLoading(false);
    }
  };

  const requestUpdate = async () => {
    const clientId = await localStorage.getItem('hinyn-cid');
    const userId = await localStorage.getItem('hinyn-uid');

    const newData = {
      accountType: null,
    };

    const userData = {
      user: userId,
      cid: clientId,
      step: 2,
    };
    updateUserData(userData).then((res) => {
      if (res.status === true) {
        console.log(res);
      }
    });

    updateClientData(newData, clientId)
      .then(async (result) => {
        if (result?.data) {
          goBack();
        }
      })
      .catch((e) => console.log('request update', e));
  };

  const goBack = () => {
    Router.push({
      pathname: '/registration',
    });
  };
  const capturePhotoHandler = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setSelectedImage(imageSrc);
    if (imageSrc) {
      handleFileUploadFromCamera(imageSrc);
    }
    setOpenCameraModal(false);
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: '0rem', marginTop: '5rem' }}>
        <CssBaseline />
        <FormContainer>
          {/* <TextDivMobile> */}
          <Text size="xxl" align="center">
            <b>Let&apos;s make your account</b>
          </Text>
          {/* </TextDivMobile> */}
          <div style={{ marginTop: 10, gap: 10 }}>
            <UploadButton
              component="label"
              sx={{ marginRight: '1rem' }}
              onClick={() => setOpenCameraModal(true)}
            >
              {selectedImage ? (
                <Image
                  src={selectedImage}
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
            </UploadButton>
            <div style={{ padding: 10 }}>
              <UploadButton3
                component="label"
                variant="outlined"
                sx={{}}
                startIcon={<StyledUploadIcon />}
              >
                {
                  // loading ? (
                  //   <CircularProgress size={20} />
                  // ) :
                  filename ? (
                    <>
                      {filename} <br />
                      <Image
                        src={selectedImage2}
                        width="50px"
                        height="50px"
                        style={{ borderRadius: '10rem', marginTop: '10px' }}
                        alt="thumbnail"
                      />
                    </>
                  ) : (
                    'Drag or click to upload your Picture'
                  )
                }
                <input
                  type="file"
                  accept="image/*,.pdf"
                  hidden
                  onChange={handleFileUpload}
                  multiple
                />
              </UploadButton3>
            </div>
          </div>

          {errorMessage.uploadPhoto && (
            <Error>{errorMessage.uploadPhoto}</Error>
          )}

          <Text color="green" marginBottom="10px" marginTop="20px">
            What is your name?
          </Text>
          <Text align="center">
            Please use your real name as this will be required for identity
            verification.
          </Text>
          {/* <Text>identity verification.</Text> */}
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{
              mt: 3,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {/* <Grid
              container
              spacing={2}
              sx={{ marginBottom: '2rem', marginLeft: '3.5rem' }}
            >
              <Grid item xs={9}> */}
            <FieldDiv>
              <StyledTextField
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                inputRef={firstnameInputRef}
              />
              {errorMessage.firstname && (
                <Error>{errorMessage.firstname}</Error>
              )}
            </FieldDiv>
            <VerticalDivider />
            {/* </Grid> */}
            {/* </Grid> */}
            {/* <Grid
              container
              spacing={2}
              sx={{ marginBottom: '2rem', marginLeft: '3.5rem' }}
            >
              <Grid item xs={9}> */}
            <FieldDiv>
              <StyledTextField
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                inputRef={lastnameInputRef}
              />
              {errorMessage.lastname && <Error>{errorMessage.lastname}</Error>}
            </FieldDiv>
            <VerticalDivider />
            {/* </Grid> */}
            {/* </Grid> */}
            <ButtonContainer>
              <TextCon onClick={requestUpdate}>
                <BackIcon isabsolute={false} />
                <span style={{ marginLeft: '1rem' }}>Go Back</span>
              </TextCon>
              <StyledButton>
                {loading ? <CircularProgress size={10} /> : 'Next'}
              </StyledButton>
            </ButtonContainer>
          </Box>
        </FormContainer>
        <VerticalDivider />
      </Container>
      <Modal2
        isOpen={openCameraModal}
        handleClose={() => setOpenCameraModal(false)}
        capture={true}
        handleSubmit={capturePhotoHandler}
        title={'Use your camera to Take a photo'}
        hasHeader={true}
      >
        <CameraModel>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          />
          {/* <UploadButton2 onClick={capturePhotoHandler}>
            Capture Photo
          </UploadButton2> */}
        </CameraModel>
      </Modal2>
    </>
  );
}

export default FirstLastName2;
