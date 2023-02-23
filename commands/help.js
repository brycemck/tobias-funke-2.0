const dotenv = require('dotenv');
dotenv.config();
const prefix = process.env.BOT_PREFIX;

module.exports = {
    name: 'help',
    description: 'List all available commands, or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    run: async (client, channel, message, args) => {
        let replyMessage = '';
        const { commands } = message.client;
        const commandsList = Array.from(commands.keys()).join(', ')

        // Send help replyMessage about ALL commands
        if(!args.length) {
            replyMessage += 'Here\'s a list of all my commands: \n';
            replyMessage += commandsList;
            replyMessage += `\n\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`;

            return channel.send(`${replyMessage}`)
        }

        // Send help data about the specific command
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return channel.send('that\'s not a valid command!');
        }

        replyMessage += `**Name:** ${command.name}`;

        if (command.aliases) replyMessage += `\n**Aliases:** ${command.aliases.join(', ')}`;
        if (command.description) replyMessage += `\n**Description:** ${command.description}`;
        if (command.usage) replyMessage += `\n**Usage:** ${prefix}${command.name} ${command.usage}`;

        if (command.cooldown) replyMessage += `\n**Cooldown:** ${command.cooldown || 3} second(s)`;

        return channel.send(`${replyMessage}`);
    }
}