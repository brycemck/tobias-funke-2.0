const https = require('https');

const adviceUrl = "https://api.adviceslip.com";
let endpoint = "/advice";

module.exports = {
    name: 'advice',
    aliases: ['givemeadvice'],
    description: 'Random advice from an advice-giving API.',
    usage: '',
    run: async (client, channel, message, args) => {
        https.get(adviceUrl + endpoint, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                response = JSON.parse(data);
                return channel.send(`${response.slip.advice}`);
            })
        }).on('error', (err) => {
            return channel.send(`There was an error when accessing the advice API.`)
        })
    }
}