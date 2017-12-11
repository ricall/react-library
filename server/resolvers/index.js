import { Post, Comment } from './associations';
import Query from './query';
import Mutation from './mutation';
import Subscription from './subscription';

const resolvers = {
  Query,
  Post,
  Comment,
  Mutation,
  Subscription,
};
export default resolvers;