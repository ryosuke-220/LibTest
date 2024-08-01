'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
require("dotenv").config();

const ButtonOrErrorMessage = require('../src/Common/Send/ButtonOnErrorMessage.js');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

const app = express();

const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post("/webhook", line.middleware(config), (req, res) => {
    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

const client = new line.Client(config);

async function handleEvent(event) {
    
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    } else if (event.message.type === 'text') {
        await ButtonOrErrorMessage.SendMessage(client, event);
    }
}

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
