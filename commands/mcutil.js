const mcUtil = require('minecraft-server-util');
const dotenv = require('dotenv');
dotenv.config();
const prefix = process.env.BOT_PREFIX;
const discordAdminRole = process.env.DISCORD_ADMIN_ROLE;
const mcServerIP = process.env.MC_SERVER_IP;
const mcRconPort = process.env.MC_RCON_PORT;
const mcRconPassword = process.env.MC_RCON_PASSWORD;

module.exports = {
    name: 'mcutil',
    description: 'Execute a Minecraft console command on the server. Only Tobias Admins can do this.',
    usage: `[minecraft console command]\n(ex: ${prefix}mcutil whitelist add [username])`,
    execute(message, args) {
        let messageReply = '';
        // This command shouldn't be able to be executed by someone that doesn't have the specified admin role in the Discord server
        if (!message.member.roles.cache.some(role => role.name === discordAdminRole)) {
            message.reply(`You must be a Tobias Admin to run this.`);
            return;
        }

        if(!args.length) {
            message.reply(`This command needs an argument. Run \`${prefix}help mcutil\` for help.`);
            return;
        }

        const client = new mcUtil.RCON();
        
        (async () => {
            await client.connect(mcServerIP, parseInt(mcRconPort));
            await client.login(mcRconPassword);
            
            const result = await client.execute(args.join(' '));

            messageReply += '**Response:**';
            messageReply += '\n`' + result + '`';

            await client.close();
            return message.reply(`${messageReply}`);
        })();
    }
}