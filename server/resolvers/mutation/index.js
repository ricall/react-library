import { Posts, Comments, prepare } from '../../models';
import { pubsub } from '../../subscriptions';

const createPost = async (root, args, context, info) => {
  const res = await Posts().insertOne(args);
  const post = prepare(await Posts().findOne({_id: res.insertedId}));

  pubsub.publish('postAdded', { postAdded: post });

  return post;
};

const createComment = async (root, args) => {
  const res = await Comments().insertOne(args);
  return prepare(await Comments().findOne({_id: res.insertedId}));
};

const Mutation = { createPost, createComment };
export default Mutation;