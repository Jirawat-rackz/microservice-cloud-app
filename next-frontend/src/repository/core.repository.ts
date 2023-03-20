import connectPocketBase from '@/helpers/connect-pocketbase.helper';
import { ListResult } from 'pocketbase';

const collection = 'core';

export const getListSubscribeCore = async (
  page: number,
  pageSize: number,
  callback: Function
) => {
  const pb = await connectPocketBase();

  pb.collection('core').subscribe('*', async function (e) {
    if (e.action === 'create') {
      const result = await pb.collection(collection).getList(page, pageSize);
      callback(result.items);
    }
  });
  return pb;
};

export const getCoreList = async (page: number, pageSize: number) => {
  const pb = await connectPocketBase();
  const result = await pb.collection(collection).getList(page, pageSize);
  return result;
};
