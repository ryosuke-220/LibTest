const FlexMessageTemplate = require('../Template/FlexMessageTemplate.js');
const ErrorMessageTemplate = require('../Template/ErrorMessageTemplate.js');

exports.SendMessage = (client, event) => {
    const text = event.message.text;
    const replyToken = event.replyToken;

    if (text === 'おはよう') {
        client.replyMessage(replyToken, FlexMessageTemplate.Template());
    } else {
        client.replyMessage(replyToken, ErrorMessageTemplate.Template());
    }
};