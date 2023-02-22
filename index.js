const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); // Initiates the client
client.commands = new Collection(); // Creates an empty list in the client object to store all commands
const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands')).filter(file => file.endsWith('.js')); // Loads the code for each command from the "commands" folder

const prefix = process.env.BOT_PREFIX;

// Loops over each file in the command folder and sets the commands to respond to their name
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// const cooldowns = new Discord.Collection(); // Creates an empty list for storing timeouts so people can't spam with commands

// Starts the bot and makes it begin listening for commands.
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

/**
 * This function controls how the bot reacts to messages it receives
 */
client.on('messageCreate', message => {
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

// client.on(Events.MessageCreate, async interaction => {
// 	// if (!interaction.isChatInputCommand()) return;

//     console.log(interaction)

// 	const command = interaction.client.commands.get(interaction.commandName);

// 	if (!command) {
// 		console.error(`No command matching ${interaction.commandName} was found.`);
// 		return;
// 	}

// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(`Error executing ${interaction.commandName}`);
// 		console.error(error);
// 	}
// });

client.login(process.env.BOT_TOKEN);