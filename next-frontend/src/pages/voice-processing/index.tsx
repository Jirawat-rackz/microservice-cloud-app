import React, { useEffect } from 'react';
import AudioRecorder from '@/components/audio-recorder';

import {
  Container,
  TextInput,
  Header1,
  Content,
} from '@/styles/voice-processing.style';
import LayoutProvider from '@/providers/layout.provider';
import { pb } from '../_app';
import { TDashboard } from '@/models/dashboard.model';
import UploadFileAudio from '@/components/upload-audio';

const VoiceProcessingPage: React.FC = () => {
  const [text, setText] = React.useState<string>('');

  useEffect(() => {
    pb.collection('dashboard').subscribe<TDashboard>('*', (data) => {
      if (
        data.action === 'create' &&
        data.record.user_id === pb.authStore.model?.id
      ) {
        setText(data.record.word);
      }
    });

    return () => {
      pb.collection('dashboard').unsubscribe();
    };
  }, []);

  return (
    <LayoutProvider>
      <Container>
        <Header1>X-Stack Speech to Text</Header1>
        <TextInput disabled value={text} />
        <Content>
          <AudioRecorder />
          <UploadFileAudio />
        </Content>
      </Container>
    </LayoutProvider>
  );
};

export default VoiceProcessingPage;
