const mcUtil = require('minecraft-server-util');
const { prefix, discordAdminRole, mcServerIP, mcRconPort, mcRconPassword } = require('../config.json');

module.exports = {
    name: 'mcutil',
    description: 'Execute a Minecraft console command on the server. Only Tobias Admins can do this.',
    usage: `[minecraft console command]\n(ex: ${prefix}mcutil whitelist add [username])`,
    execute(message, args) {
        const data = [];
        // This command shouldn't be able to be executed by someone that doesn't have the specified admin role in the Discord server
        if (!message.member.roles.cache.some(role => role.name === discordAdminRole)) {
            message.channel.send(`You must be a Tobias Admin to run this.`);
            return;
        }

        if(!args.length) {
            message.channel.send(`This command needs an argument. Run \`${prefix}help mcutil\` for help.`);
            return;
        }

        const client = new mcUtil.RCON();
        
        (async () => {
            await client.connect(mcServerIP, mcRconPort);
            await client.login(mcRconPassword);
            
            const result = await client.execute(args.join(' '));

            data.push('**Response:**');
            data.push('`' + result + '`');

            await client.close();
            message.channel.send(data, { split: true });
        })();
    }
}