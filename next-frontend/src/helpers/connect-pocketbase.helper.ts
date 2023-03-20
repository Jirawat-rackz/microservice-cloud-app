import PocketBase from 'pocketbase';

let pocketContext = new PocketBase('http://127.0.0.1:8090');

const connectPocketBase = () => {
  const pb = pocketContext;
  return pb;
};

export default connectPocketBase;
