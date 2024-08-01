const FlexMessageJson = require('../Template/FlexMessage.json');
const ButtonMessageJson = require('../Template/ButtonMessage.json');
const ErrorMessageJson = require('../Template/ErrorMessage.json');

exports.SendMessage = (client, event) => {
    const text = event.message.text;
    const replyToken = event.replyToken;

    if (text === '#案内！') {
        client.replyMessage(replyToken, FlexMessageJson);
    } else if (text === '#ヘルプ！') {
        client.replyMessage(replyToken, ButtonMessageJson);
    } else {
        client.replyMessage(replyToken, ErrorMessageJson);
    }
};
