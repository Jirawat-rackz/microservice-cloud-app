import PocketBase from 'pocketbase';

let pocketContext = new PocketBase(process.env.NEXT_PUBLIC_API_DB);

const connectPocketBase = () => {
  const pb = pocketContext;
  return pb;
};

export default connectPocketBase;
