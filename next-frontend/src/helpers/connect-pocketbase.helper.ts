import PocketBase from 'pocketbase';

const connectPocketBase = async () => {
  const pb = new PocketBase('http://127.0.0.1:8090');
  return pb;
};

export default connectPocketBase;
