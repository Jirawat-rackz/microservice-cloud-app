import type { GetServerSidePropsContext } from 'next';
import connectPocketBase from './connect-pocketbase.helper';

const initPocketBase = async (context: GetServerSidePropsContext) => {
  const pb = connectPocketBase();

  try {
    pb.authStore.isValid && (await pb.collection('users').authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }

  // Update the last active date
  if (pb.authStore.isValid && pb.authStore.model) {
    await pb.collection('users').update(pb.authStore.model.id, {
      lastActive: new Date(),
    });
  }

  return pb;
};

export default initPocketBase;
