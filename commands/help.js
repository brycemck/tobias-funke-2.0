const dotenv = require('dotenv');
dotenv.config();
const prefix = process.env.BOT_PREFIX;

module.exports = {
    name: 'help',
    description: 'List all available commands, or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    execute(message, args) {
        let replyMessage = '';
        const { commands } = message.client;
        const commandsList = Array.from(commands.keys()).join(', ')

        // Send help replyMessage about ALL commands
        if(!args.length) {
            replyMessage += 'Here\'s a list of all my commands: \n';
            replyMessage += commandsList;
            replyMessage += `\n\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`;

            // return message.author.send(replyMessage, { split: true })
            //     .then(() => {
            //         if (message.channel.type === 'dm') return;
            //         message.reply('I\'ve sent you a DM with all my commands!');
            //     })
            //     .catch(error => {
            //         console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
            //         message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            //     });
            return message.reply(`${replyMessage}`)
        }

        // Send help data about the specific command
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        replyMessage += `**Name:** ${command.name}`;

        if (command.aliases) replyMessage += `\n**Aliases:** ${command.aliases.join(', ')}`;
        if (command.description) replyMessage += `\n**Description:** ${command.description}`;
        if (command.usage) replyMessage += `\n**Usage:** ${prefix}${command.name} ${command.usage}`;

        if (command.cooldown) replyMessage += `\n**Cooldown:** ${command.cooldown || 3} second(s)`;

        return message.reply(`${replyMessage}`);
    }
}