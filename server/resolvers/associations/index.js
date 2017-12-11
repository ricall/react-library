import { Posts, Comments, prepare } from '../../models';
import { ObjectId } from 'mongodb'

export const Post = {
  comments: async ({_id}) => {
    return (await Comments().find({postId: _id}).toArray()).map(prepare)
  }
};

export const Comment = {
  post: async ({postId}) => {
    return prepare(await Posts().findOne(ObjectId(postId)))
  }
};
