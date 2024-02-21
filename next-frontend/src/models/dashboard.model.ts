import { Record } from 'pocketbase';

export type TDashboard = {
  id: string;
  user_id: string;
  word: string;
  created: Date;
};

export type JoinedDataItem = {
  collectionId: string;
  collectionName: string;
  expand: {
    [key: string]: Record | Record[];
  };
  id: string;
  created: string;
  updated: string;
  name: string;
};
