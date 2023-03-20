import React from 'react';
import { useState, useRef, SetStateAction } from 'react';
import '../../styles/audio-recorder.module.css';
import AudioRecorder from '@/components/audio-recorder';
import initPocketBase from '@/helpers/init-pocketbase.helper';
import { GetServerSidePropsContext } from 'next/types';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Button, Form, message, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import {
  Container,
  Container2,
  Container3,
  TextInput,
  Header1,
} from '@/styles/voiceprocessing.style';

function playAud() {
  const audioFileInput = document.getElementById('audioFileInput') as any;
  const audioPlayer = document.getElementById('audioPlayer') as any;

  audioFileInput?.addEventListener('change', function () {
    const file = audioFileInput.files[0];
    audioPlayer.src = URL.createObjectURL(file);
  });
}

const App = () => {
  let [recordOption, setRecordOption] = useState('video');
  const toggleRecordOption = (type: SetStateAction<string>) => {
    return () => {
      setRecordOption(type);
    };
  };

  return (
    <Container>
      <Header1>AI Recorder</Header1>
      <AppInput></AppInput>
      <Container2>
        {<AudioRecorder />}
        <UploadFileAudio></UploadFileAudio>
      </Container2>
    </Container>
  );
};

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  accept: '.wav',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UploadFileAudio: React.FC = () => (
  <Container3>
    <h2>Upload File</h2>
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  </Container3>
);

const AppInput: React.FC = () => (
  <>
    <TextInput disabled></TextInput>
  </>
);

export default App;
