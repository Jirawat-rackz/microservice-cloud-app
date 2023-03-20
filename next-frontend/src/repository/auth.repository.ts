import connectPocketBase from '@/helpers/connect-pocketbase.helper';

const collection = 'users';

export const authWithPassword = async (username: string, password: string) => {
  const pb = await connectPocketBase();
  const userCollection = pb.collection(collection);
  const result = await userCollection.authWithPassword(username, password);
  return result;
};

export const removeAuthorized = async () => {
  const pb = await connectPocketBase();
  pb.authStore.clear();
};
