import React, { useEffect, useRef, useState } from 'react';
import { getClientData, updateClientData } from '../../forms/formService';
import styled from '@emotion/styled';
import { SimpleTextField2 } from '../../shared/Textfield';
import Text from '../../shared/Typography';
import { GreenButton } from '../../shared/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal2 from '../../shared/Modal2';
import { CheckIcon, Congrats } from '../../shared/Icon';

const ContentBox3 = styled.div`
  background: white;
  border-radius: 20px;
  padding: 35px 45px;
  width: 72%;
  @media (max-width: 700px) {
    width: 85vw;
    padding: 15px 15px;
  }
`;

const InnerView = styled.div`
  margin: 40px 0 0 0;
`;
const Line = styled.div`
  background: #f0f3f4;
  height: 1.5px;
  margin: 18px 0;
`;
const FieldWrap = styled.div`
  display: flex;
  gap: 20px;
`;
const Bdiv = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const CustomCheckIcon = styled(CheckIcon)`
  font-size: 4rem;
`;
export const Profile = () => {
  const [clientData, setClientData] = useState({});
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const Data = {
        id: localStorage.getItem('hinyn-cid'),
      };

      const res = await getClientData(Data);
      if (res) {
        // console.log(res.data.data);
        setClientData(res?.data?.data.attributes);
        setFirstname(res?.data?.data.attributes.firstName);
        setCity(res?.data?.data.attributes.city);
        setCountry(res?.data?.data.attributes.country);
        setCountryCode(res?.data?.data.attributes.countryCode);
        setLastname(res?.data?.data.attributes.lastName);
        setMobile(res?.data?.data.attributes.mobileNumber);
      }
    };

    fetchData();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };
  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };
  const handlePostalCodeChange = (event) => {
    setCountryCode(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const [fieldsEmpty, setFieldsEmpty] = useState(false);
  const addressInputRef = useRef();
  const stateInputRef = useRef();
  const TimezoneInputRef = useRef();
  const LocationInputRef = useRef();

  const submitHandler = async () => {
    setLoading(true);

    const getStoredClient = async () => {
      const req = localStorage.getItem('hinyn-clientData');
      return await JSON.parse(req);
    };

    const data = {
      firstName: firstname,
      lastName: lastname,
      mobileNumber: mobile,
      country: country,
      city: city,
      countryCode: countryCode,
    };

    const clientId = localStorage.getItem('hinyn-cid');
    let clientData = await getStoredClient();

    const newData = {
      ...data,
    };

    clientData = {
      ...clientData.attributes,
      ...newData,
    };

    // Remove uuid from clientData if present
    if ('uuid' in clientData) {
      delete clientData.uuid;
    }

    console.log('data', data);

    updateClientData(clientData, clientId).then(async (result) => {
      if (result?.data) {
        setLoading(false);
        setOpen(true);
        console.log('stringify client -', JSON.stringify(result?.data));
      }
    });
  };

  return (
    <>
      <ContentBox3 sx={{}}>
        <Text color="red" size="large" font="bold">
          Name
        </Text>
        <Line></Line>
        <FieldWrap>
          <div style={{ width: '100%' }}>
            <Text color="green" size="md">
              First Name
            </Text>
            <SimpleTextField2
              required
              fullWidth
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={handleFirstnameChange}
              height="more"
              placeholder="Enter firstname"
            />
          </div>
          <div style={{ width: '100%' }}>
            <Text color="green" size="md">
              Last Name
            </Text>
            <SimpleTextField2
              required
              fullWidth
              id="lasttname"
              name="lasttname"
              value={lastname}
              onChange={handleLastnameChange}
              height="more"
              placeholder="Enter lastname"
            />
          </div>
        </FieldWrap>
        <InnerView>
          <Text color="red" size="large" font="bold">
            Address
          </Text>
          <Line></Line>
          {/* <Text color="green" size="md">
            Address Line 1
          </Text>
          <SimpleTextField2
            required
            fullWidth
            id="address"
            name="address"
            inputRef={addressInputRef}
            height="more"
            placeholder="Enter address"
          /> */}
          <Text color="green" size="md" sx={{ marginTop: '20px' }}>
            City / Town
          </Text>
          <SimpleTextField2
            required
            fullWidth
            id="city"
            value={city}
            onChange={handleCityChange}
            height="more"
            placeholder="Enter city"
          />
          <FieldWrap>
            <div style={{ width: '100%' }}>
              <Text color="green" size="md" sx={{ marginTop: '20px' }}>
                Zip / Postal Code
              </Text>
              <SimpleTextField2
                required
                fullWidth
                id="zip"
                value={countryCode}
                onChange={handlePostalCodeChange}
                height="more"
                placeholder="Enter zip code"
              />
            </div>
            <div style={{ width: '100%' }}>
              <Text color="green" size="md" sx={{ marginTop: '20px' }}>
                State / Region
              </Text>
              <SimpleTextField2
                required
                fullWidth
                id="state"
                name="state"
                inputRef={stateInputRef}
                height="more"
                placeholder="Enter state"
              />
            </div>
          </FieldWrap>
          <Text color="green" size="md" sx={{ marginTop: '20px' }}>
            Country
          </Text>
          <SimpleTextField2
            required
            fullWidth
            id="country"
            value={country}
            onChange={handleCountryChange}
            height="more"
            placeholder="Enter country"
          />
          <FieldWrap>
            {/* <div style={{ width: '100%' }}>
              <Text color="green" size="md" sx={{ marginTop: '20px' }}>
                Timezone
              </Text>
              <SimpleTextField2
                required
                fullWidth
                id="Timezone"
                name="Timezone"
                inputRef={TimezoneInputRef}
                height="more"
                placeholder="Enter timezone"
              />
            </div> */}
            {/* <div style={{ width: '100%' }}>
              <Text color="green" size="md" sx={{ marginTop: '20px' }}>
                Location
              </Text>
              <SimpleTextField2
                required
                fullWidth
                id="Location"
                name="Location"
                inputRef={LocationInputRef}
                height="more"
                placeholder="Enter location"
              />
            </div> */}
          </FieldWrap>
          <Text color="red" size="large" font="bold" sx={{ marginTop: '40px' }}>
            Contact Details
          </Text>
          <Line></Line>
          <Text color="green" size="md">
            Phone Number
          </Text>
          <SimpleTextField2
            required
            fullWidth
            id="Phone"
            value={mobile}
            onChange={handleMobileChange}
            height="more"
            placeholder="Enter phone"
          />
          <Bdiv>
            <GreenButton onClick={submitHandler} disabled={loading}>
              {loading ? <CircularProgress size={13} /> : 'Submit'}
            </GreenButton>
            {fieldsEmpty ? (
              <div style={{ color: 'red', marginTop: 10 }}>
                Please fill all fields
              </div>
            ) : (
              ''
            )}
          </Bdiv>
        </InnerView>
      </ContentBox3>
      <Modal2
        isOpen={open}
        handleClose={handleClose}
        hasHeader={false}
        hasFooter={false}
        popupWidth={true}
        Widthmax={true}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Text
            color="green"
            style={{ fontWeight: 'bold', fontSize: '30px', marginTop: 90 }}
          >
            Updated Successfully!
          </Text>
          {/* <CustomCheckIcon variant="red" /> */}
        </div>
      </Modal2>
    </>
  );
};
