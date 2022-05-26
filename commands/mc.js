const { prefix, discordAdminRole, mcServerIP } = require('../config.json');

module.exports = {
    name: 'mc',
    aliases: ['minecraft'],
    description: 'Shows connection information for our Minecraft server.',
    usage: '',
    execute(message, args) {
        const data = [];

        data.push(`**Hostname:** ${mcServerIP}`);
        data.push(`**Port:** N/A`);
        data.push(`**Mod Pack:** http://mods.celerygaming.xyz`)
        data.push(`\nA whitelist is enforced. If this is your first time connecting, make sure to tag @${discordAdminRole} and send your Minecraft username so that they can whitelist you.`);
        data.push(`\nYou can check who's online with \`${prefix}mcstatus\`.`);

        message.channel.send(data, { split: true })
    }
}