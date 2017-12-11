import { MongoClient } from 'mongodb'

const state = {
  db: null,
};

export const connect = async (url) => {
  state.db = await MongoClient.connect(url);
};
export const Posts = () => state.db.collection('posts');
export const Comments = () => state.db.collection('comments');

export const prepare = (o) => {
  o._id = o._id.toString();
  return o;
};
