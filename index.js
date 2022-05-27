const fs = require('fs');                               // Loads the Filesystem library
const Discord = require('discord.js');                  // Loads the discord API library
const { prefix, token } = require('./config.json');     // Loads the "token" and "prefix" values from the config file
const path = require("path");

const client = new Discord.Client(); // Initiates the client
client.commands = new Discord.Collection(); // Creates an empty list in the client object to store all commands
const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands')).filter(file => file.endsWith('.js')); // Loads the code for each command from the "commands" folder

// Loops over each file in the command folder and sets the commands to respond to their name
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection(); // Creates an empty list for storing timeouts so people can't spam with commands

// Starts the bot and makes it begin listening for commands.
client.on('ready', () => {
    console.log('Tobias initiated');
});

/**
 * This function controls how the bot reacts to messages it receives
 */
client.on('message', message => {
    // Ignore bot messages and messages that dont start with the prefix defined in the config file
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // Split commands and arguments from message so they can be passed to functions
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    // If the command isn't in the  command folder, move on
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if(!command) return;

        // If the command requires arguments, make sure they're there.
        if (command.args && !args.length) {
            let reply = 'That command requires more details!';

            // If we have details on how to use the args, provide them
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            // Send a reply from the bot about any error encountered
            return message.channel.send(reply);
        }

    try {
        // Run the command
        command.execute(message, args);
    } catch(error) {
        console.error(error);
        message.reply('Sorry! I ran into an error trying to do that!');
    }

});

client.login(token); // Log the bot in using the token provided in the config file