import { Posts, Comments, prepare } from '../../models';
import { ObjectId } from 'mongodb'

const post = async (root, {_id}) => prepare(await Posts().findOne(ObjectId(_id)));

const posts = async () => (await Posts().find({}).toArray())
  .map(prepare);

const comment = async (root, {_id}) => prepare(await Comments().findOne(ObjectId(_id)));

const Query = { post, posts, comment };
export default Query;
