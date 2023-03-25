import { Button, notification, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Container } from './index.style';
import axios from 'axios';
import { pb } from '@/pages/_app';

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
    <Container>
      {contextHolder}
      <h2>Upload File</h2>
      <Upload beforeUpload={handleUpload}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Container>
  );
};

export default UploadFileAudio;
