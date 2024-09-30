import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Check, UploadIcon } from './Icon';
import { FaImage } from 'react-icons/fa6';
import { MdDeleteForever } from 'react-icons/md';
import { GrInProgress } from 'react-icons/gr';
import { uploadPortfolio } from '../forms/formService';

const Upload = styled.div`
  border: 1px dashed #dadbdf;
  width: 360px;
  height: 200px;
  margin: auto;
  border-radius: 8px;
`;

const InfoText = styled.div`
  font-size: 12px;
  color: #484848;
  text-align: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dadbdf;
  margin: 10px 0;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin: 0 20px;
`;

const Btn1 = styled.div`
  font-size: 15px;
  color: #232222;
  border: 1px solid #cbcbcb;
  padding: 10px 15px;
  background-color: #ffffff;
  border-radius: 8px;
  /* width: 50px; */
  text-align: center;
  cursor: pointer;
`;

const Btn2 = styled.div`
  font-size: 15px;
  color: #ffffff;
  border: 1px solid #cbcbcb;
  padding: 11px 16px;
  width: 80px;
  text-align: center;
  background-color: #4aa398;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const FormatText = styled.div`
  font-size: 12px;
  color: #9d9d9d;
  text-align: center;
`;

const BrowseBtn = styled.button`
  font-size: 14px;
  background-color: #ffffff;
  box-shadow: 0px 1.702708125114441px 8.513540267944336px 0px #00000040;
  border-radius: 8px;
  text-align: center;
  color: #2e90fa;
  padding: 10px 15px;
  border: none;
  transition: all 0.5s ease;
  width: 110px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hover};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  cursor: pointer;
`;

const FileNameList = styled.div`
  padding: 10px;
  margin: 5px;
  height: 220px;
  overflow-y: auto;
  background-color: #f9f9f9;
  border: 1px solid #dadbdf;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const FileNameItem = styled.li`
  font-size: 14px;
  color: #484848;
  text-align: center;
`;

const FileTemplate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const File = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #cbcbcb;
  padding: 5px 8px;
  border-radius: 8px;
`;

const Img = styled.img`
  height: 20px;
  width: 20px;
`;

const ProgressIcon = styled.img`
  height: 20px;
  cursor: pointer;
`;

const Line2 = styled.div`
  width: 360px;
  height: 1px;
  background-color: #dadbdf;
  margin: auto;
`;

const Files = styled.div`
  font-size: 13px;
  color: #525252;
  height: 0px;
  width: 360px;
  margin: auto;
  padding-top: 10px;
`;

const MyDropzone = (props) => {
  const [fileNames, setFileNames] = useState([]);
  const [hoveredFileIndex, setHoveredFileIndex] = useState(null);
  const [file, setFile] = useState(null);
  const [dataForm, setDataForm] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('files', file); // Append each file separately
    });
    formData.append('ref', 'api::client.client');
    formData.append('refId', localStorage.getItem('hinyn-cid'));
    formData.append('field', 'files');
    setDataForm(formData);

    setFileNames(acceptedFiles.map((file) => file.name));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleMouseEnter = (index) => {
    setHoveredFileIndex(index);
    console.log(index);
  };

  const deselectFile = (index) => {
    setFileNames((prevFileNames) =>
      prevFileNames.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  const handleMouseLeave = () => {
    setHoveredFileIndex(null);
  };
  const handleFileChange = (event) => {
    console.log('FILES', file);
    //   setSelectedImage(URL.createObjectURL(file));
    // setFilename(file.name);
    //   setFiletype(file.type);
    const formData = new FormData();
    formData.append('files', file);
    formData.append('ref', 'api::client.client');
    formData.append('refId', localStorage.getItem('hinyn-cid'));
    formData.append('field', 'files');
    setDataForm(formData);
  };

  const handleSave = async () => {
    if (dataForm) {
      try {
        const res = await uploadPortfolio(dataForm);
        if (res.status) {
          props.CancelAction();
          console.log('Upload successful:', res.data);
        } else {
          console.error('Upload failed:', res.data);
        }
      } catch (error) {
        console.error(
          'Upload failed:',
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <>
      <Upload {...getRootProps()}>
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <UploadIcon />
          </div>

          <input
            {...getInputProps()}
            onChange={handleFileChange}
            type="file"
            multiple
          />

          <InfoText>Choose a file or drag it here</InfoText>
          <FormatText>JPEG,PNG</FormatText>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BrowseBtn hover={'none'}>Browse File</BrowseBtn>
          </div>
        </Container>
      </Upload>

      <div style={{ margin: '20px 0' }}>
        <Line2 />
      </div>
      <FileNameList>
        {fileNames.length === 0 ? (
          <div
            style={{
              fontSize: '14px',
              color: '#9d9d9d',
              textAlign: 'center',
              paddingTop: '50px',
            }}
          >
            No files uploaded yet
          </div>
        ) : (
          fileNames.map((fileName, index) => (
            <FileTemplate key={index}>
              <File>
                <FaImage />
                <div style={{ fontSize: '13px', color: '#606260' }}>
                  {fileName}
                </div>
              </File>
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => deselectFile(index)}
                style={{ cursor: 'pointer' }}
              >
                {hoveredFileIndex === index ? (
                  <MdDeleteForever size={20} color="#4aa398" />
                ) : (
                  <Check size={20} color="#0000ff" />
                )}
              </div>
            </FileTemplate>
          ))
        )}
      </FileNameList>
      <Line />
      <ActionButtons>
        <Btn1 onClick={props.CancelAction}>Cancel</Btn1>
        <Btn2 onClick={handleSave}>Save</Btn2>
      </ActionButtons>
    </>
  );
};

export default MyDropzone;
