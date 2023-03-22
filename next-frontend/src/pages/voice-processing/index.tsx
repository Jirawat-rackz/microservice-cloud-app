import React, { useEffect } from 'react';
import '../../styles/audio-recorder.module.css';
import AudioRecorder from '@/components/audio-recorder';
import { Button, notification, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  Container,
  Container2,
  Container3,
  TextInput,
  Header1,
} from '@/styles/voiceprocessing.style';
import LayoutProvider from '@/providers/layout.provider';
import axios from 'axios';
import { pb } from '../_app';
import { TDashboard } from '@/models/dashboard.model';

const VoiceProcessingPage: React.FC = () => {
  const [text, setText] = React.useState<string>('');

  useEffect(() => {
    pb.collection('dashboard').subscribe<TDashboard>('*', (data) => {
      if (
        data.action === 'create' &&
        data.record.id === pb.authStore.model?.id
      ) {
        setText(data.record.word);
      }
    });
    return () => {
      pb.collection('dashboard').unsubscribe('*');
    };
  }, []);

  return (
    <LayoutProvider>
      <Container>
        <Header1>AI Recorder</Header1>
        <TextInput disabled value={text} />
        <Container2>
          <AudioRecorder />
          <UploadFileAudio />
        </Container2>
      </Container>
    </LayoutProvider>
  );
};

const UploadFileAudio: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        resolve(reader.result);
      };
    });
  };

  const handleUpload = async (file: Blob) => {
    const b64 = await blobToBase64(file);

    try {
      await axios.post(`/speech-upload`, {
        user_id: pb.authStore.model?.id,
        data: b64,
      });
      api.success({
        message: 'Upload Success',
      });
    } catch (error: any) {
      api.error({
        message: 'Upload Failed',
        description: error?.message,
      });
    }
  };

  return (
    <Container3>
      {contextHolder}
      <h2>Upload File</h2>
      <Upload beforeUpload={handleUpload}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Container3>
  );
};

export default VoiceProcessingPage;
