import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../subscriptions';

const Subscription = {
  postAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator('postAdded'),
      (payload, args) => true
    ),
  },
};

export default Subscription;