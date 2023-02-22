const dotenv = require('dotenv');
dotenv.config();
const prefix = process.env.BOT_PREFIX;
const mcServerIP = process.env.MC_SERVER_IP;
const discordAdminRole = process.env.DISCORD_ADMIN_ROLE;

module.exports = {
    name: 'mc',
    aliases: ['minecraft'],
    description: 'Shows connection information for our Minecraft server.',
    usage: '',
    execute(message, args) {
        let messageReply = '';

        messageReply += `**Hostname:** ${mcServerIP}`;
        messageReply += `\n**Mod and Connection info:** https://docs.google.com/document/d/1ezJyz8PI91PytmQFkD_DCyB3pS-YXTrWKMvP4vX6Fq8/edit`
        messageReply += `\n\nA whitelist is enforced. If this is your first time connecting, make sure to tag @${discordAdminRole} and send your Minecraft username so that they can whitelist you.`;
        messageReply += `\n\nYou can check who's online with \`${prefix}mcstatus\`.`;

        return message.reply(`${messageReply}`)
    }
}