import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { subscriptionManager } from './subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import bodyParser from 'body-parser';
import express from 'express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import schema from './schema';
import cors from 'cors'
import { connect } from './models'

const URL = 'http://localhost';
const PORT = 3001;
const WS_GQL_PATH = '/subscriptions';
const MONGO_URL = 'mongodb://localhost:27017/blog';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}${WS_GQL_PATH}`,
}));
const server = createServer(app);

server.listen(PORT, async () => {
  await connect(MONGO_URL);
  console.log(`API Server is now running on http://${URL}:${PORT}`);
  console.log(`API Server over web socket with subscriptions is now running on ws://localhost:${PORT}${WS_GQL_PATH}`);
});
SubscriptionServer.create({ schema, execute, subscribe }, { server, path: WS_GQL_PATH });
