const mcUtil = require('minecraft-server-util');
const { prefix, mcServerIP } = require('../config.json');

module.exports = {
    name: 'mcstatus',
    aliases: ['status'],
    description: 'Queries the Minecraft server to see status and active players.',
    usage: '',
    execute(message, args) {
        const data = [];

        mcUtil.status(mcServerIP, 25565)
            .then((result) => {
                data.push(`**Server:** ${mcServerIP}`);
                data.push(`**Online Players:** ${result.players.online} (${result.players.sample.map(player => player.name).join(', ')})`);
                data.push(`**Server Version:** ${result.version.name}`);
                data.push(`**Round Trip Latency:** ${result.roundTripLatency}`);

                data.push(`\nFor connection information, use \`${prefix}mc\`.`)

                console.log(result.players.sample);
                message.channel.send(data, { split: true })
            })
            .catch((error) => {
                 console.log(error);
                 message.channel.send('There was an error reaching the server.');
            });
    }
}