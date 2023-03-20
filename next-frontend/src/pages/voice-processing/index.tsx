import React from 'react';
import '../../styles/audio-recorder.module.css';
import AudioRecorder from '@/components/audio-recorder';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import {
  Container,
  Container2,
  Container3,
  TextInput,
  Header1,
} from '@/styles/voiceprocessing.style';
import LayoutProvider from '@/providers/layout.provider';

const VoiceProcessingPage: React.FC = () => {
  return (
    <LayoutProvider>
      <Container>
        <Header1>AI Recorder</Header1>
        <TextInput disabled />
        <Container2>
          <AudioRecorder />
          <UploadFileAudio />
        </Container2>
      </Container>
    </LayoutProvider>
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

export default VoiceProcessingPage;
