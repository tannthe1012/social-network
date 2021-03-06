/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const { Model } = require('objection');
const cors = require('cors');

// setup socket.io
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: [process.env.FRONT_END_URL, 'http://localhost:3001'],
    credentials: true,
  },
});

dotenv.config({ path: '.env' }); // don't move this line under routes

const routes = require('./app/routes');
const knex = require('./database/knex');
const middlewares = require('./app/http/middlewares');

// socket
const { addUser, removeUser } = require('./socket/user');
const { newFriendRequest, acceptFriendRequest } = require('./socket/friendRequest');
const { newMessage } = require('./socket/chat');

Model.knex(knex);

const port = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(middlewares.me);

Object.keys(routes).map((route) => app.use('/', routes[route]));

app.use((req, res) => {
  res.send('Api not found');
});

io.on('connection', (socket) => {
  console.log('Made socket connection');

  socket.on('addUser', ({ token }) => {
    console.log('addUser');

    addUser(token, socket.id);
  });

  socket.on('new message', async (data, cb) => {
    const res = await newMessage(data);

    if (res.me && res.user) {
      socket.to(res.user.socketId).emit('newMessage', res.me, res.message);
    }

    if (res) cb(true);
    cb(false);
  });

  socket.on('disconnection', () => {
    console.log('disconnect');

    socket.on('removeUser', async ({ token }) => {
      removeUser(token, socket.id);
    });
  });

  socket.on('newFriendRequest', async (data, cb) => {
    const res = await newFriendRequest(data);

    if (res.me && res.user) {
      socket.to(res.user.socketId).emit('friendRequest', res.me);
    }

    if (res) cb(true);
    cb(false);
  });

  socket.on('acceptFriendRequest', async (data, cb) => {
    const res = await acceptFriendRequest(data);

    if (res.me && res.user) {
      socket.to(res.user.socketId).emit('friendRequestAccept', res.me);
    }

    if (res) cb(true);
    cb(false);
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
