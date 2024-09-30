import { useEffect, useState } from 'react';
import Modal from '../components/shared/Modal';
import UsernameForm from '../components/forms/UsernameForm';
import AccountTypeForm from '../components/forms/AccountTypeForm';
import {
  updateUserUsername,
  addClientData,
  updateUserData,
  getMeData,
  updateClientData,
  getClientData,
} from '../components/forms/formService';
import { useRouter } from 'next/router';

function Registration() {
  const router = useRouter();

  const { query } = useRouter();

  const name = query.email;
  // const value = query.value;
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState(true);
  const [currentActiveForm, setCurrentActiveForm] = useState('default');
  const [currRegistrationStep, setCurrRegistrationStep] = useState(0);
  const [hasClientProfile, setHasClientProfile] = useState(false);

  useEffect(() => {
    getMeData().then(async (result) => {
      const userid = result?.data?.id;
      if (result && result?.data?.step) {
        setCurrRegistrationStep(result?.data?.step);
      }

      getClientData({ id: userid }).then((res) => {
        if (res?.status) {
          setHasClientProfile(true);
        }
      });
    });
  }, []);

  const handleClose = (e, reason) => {
    if (reason !== 'backdropClick') setOpen(false);
  };

  const handleSubmit = () => {
    console.log('submitted');
  };

  const handleUsernameSubmit = (data) => {
    const userId = localStorage.getItem('hinyn-uid');
    const jwt = localStorage.getItem('hinyn-cjwt');
    const clientId = localStorage.getItem('hinyn-cid');
    const clientData = {
      id: userId,
      username: data,
      jwt: jwt,
      step: 2,
    };

    updateUserUsername(clientData).then((result) => {
      if (result) {
        setCurrRegistrationStep((prev) => prev + 1);
      } else {
        setMessage('Incorrect input.');
      }
    });
  };

  const generateHashKey = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let hashKey = '';
    const charactersLength = characters.length;

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      hashKey += characters.charAt(randomIndex);
    }

    return hashKey;
  };

  const accountType = (type) => {
    const userId = localStorage.getItem('hinyn-uid');

    const clientId = localStorage.getItem('hinyn-cid');
    let clientType = type === 'professional' ? 1 : 2;
    const uuid = `client-${userId}-` + generateHashKey();

    const jwt = localStorage.getItem('hinyn-cjwt');
    const clientData = {
      accountType: clientType,
      user: userId,
      uuid: uuid,
    };

    if (hasClientProfile && clientId) {
      const newData = {
        accountType: clientType,
      };

      updateClientData(newData, clientId)
        .then(async (result) => {
          if (result?.data) {
            const userData = {
              user: userId,
              cid: clientId,
              step: 3,
            };
            updateUserData(userData).then((res) => {
              if (res.status === true) {
                if (clientType === 1) router.push('/professional');
                else router.push('/Client');
              }
            });
          }
        })
        .catch((e) => console.log('request update', e));
    } else {
      addClientData(clientData, jwt).then((res) => {
        if (res?.status) {
          localStorage.setItem('hinyn-cid', res?.data?.id);
          localStorage.setItem('hinyn-clientData', JSON.stringify(res?.data));
          const userData = {
            user: userId,
            cid: clientId,
            step: 3,
          };
          updateUserData(userData).then((res) => {
            if (res.status === true) console.log('done');
          });
          if (clientType === 1) router.push('/professional');
          else router.push('/Client');
        }
      });
    }
  };

  const formsSequence = () => {
    switch (currRegistrationStep) {
      case 1:
        return (
          <UsernameForm onUsernameSubmit={handleUsernameSubmit} name={name} />
        );
      case 2:
        return <AccountTypeForm accountType={accountType} />;
      default:
        null;
    }
  };

  return (
    <>
      <Modal
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        {formsSequence()}
      </Modal>
    </>
  );
}

export default Registration;
