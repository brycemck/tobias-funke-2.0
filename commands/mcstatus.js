const mcUtil = require('minecraft-server-util');
const dotenv = require('dotenv');
dotenv.config();
const prefix = process.env.BOT_PREFIX;
const mcServerIP = process.env.MC_SERVER_IP;
const mcServerHostname = process.env.MC_SERVER_HOSTNAME;
const mcQueryPort = process.env.MC_QUERY_PORT;

module.exports = {
    name: 'mcstatus',
    aliases: ['status'],
    description: 'Queries the Minecraft server to see status and active players.',
    usage: '',
    run: async (client, channel, message, args) => {
        let messageReply = '';

        mcUtil.status(mcServerIP, parseInt(mcQueryPort))
            .then((result) => {
                messageReply += `**Server:** ${mcServerHostname}`;
                messageReply += `\n**Online Players:** ${result.players.online}`;
                if (result.players.online > 0) messageReply += ` (${result.players.sample.map(player => player.name).join(', ')})`
                messageReply += `\n**Server Version:** ${result.version.name}`;
                messageReply += `\n**Round Trip Latency:** ${result.roundTripLatency}`;

                messageReply += `\n\nFor connection information, use \`${prefix}mc\`.`
                return channel.send(`${messageReply}`)
            })
            .catch((error) => {
                console.log(error);
                return channel.send('There was an error reaching the server.');
            });
    }
}