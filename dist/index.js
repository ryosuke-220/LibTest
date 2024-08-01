const express = require('express');
const linebot = require('@line/bot-sdk');
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const app = express();

app.set('port', (process.env.PORT || 80));
app.post('/', linebot.middleware(config), (req, res) => {
    res.status(200).end();
    Promise
        .all(req.body.events.map(handleEvent))
        .then(result => res.json(result));
});

const client = new linebot.Client(config);
function handleEvent(event) {
    this.line = event;
    switch(event.type) {
        case 'message':
            messageEvent();
            break;
        case 'follow':
            followEvent();
            break;
        case 'unfollow':
            unfollowEvent();
            break;
        default:
            return Promise.resolve(null);
    }
}

function messageEvent() {
    const {
        type,
        text,
    } = this.line.message;

    if (type !== 'text') {
        return Promise.resolve(null);
    }

    if (text.includes('疲れた') || text.includes('つかれた') || text.includes('ツカレタ')) {
        return client.replyMessage(this.line.replyToken, {
            "type": "image",
            "originalContentUrl": "<猫の画像Url>",
            "previewImageUrl": "<猫の画像Url>"
        });
    }
    return client.replyMessage(this.line.replyToken, {
        type: 'text',
        text: text
    });
}

app.listen(app.get('port'), function() {
    console.log('Node app is running -> port:', app.get('port'));
});
