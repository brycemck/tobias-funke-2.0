const https = require('https');

const adviceUrl = "https://api.adviceslip.com";
let endpoint = "/advice";

module.exports = {
    name: 'advice',
    aliases: ['givemeadvice'],
    description: '',
    execute(message, args) {
        https.get(adviceUrl + endpoint, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                response = JSON.parse(data);
                return message.channel.send(response.slip.advice);
            })
        }).on('error', (err) => {
            return message.channel.send("There was an error when accessing the advice API.")
        })
    }
}