const https = require('https');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'weather',
    description: 'Gets the weather for 5 default cities, or a specified location.',
    usage: '[location]',
    embeddedMessage: {
        color: 0x0099FF,
        title: 'Current weather patterns',
        fields: [],
        timestamp: new Date().toISOString(),
        footer: {
            text: `Please report any bugs to @${process.env.DISCORD_ADMIN_ROLE}`
        }
    },
    process: (city) => {
        const weatherUrl = "https://api.weatherapi.com/v1";
        const weatherAPIKey = "7e297d20c6dc4fd891911335220805";
        let endpoint = "/current.json";

        let query = `&q=${city}`
        let request = `${weatherUrl}${endpoint}?key=${weatherAPIKey}${query};`

        return new Promise((resolve, reject) => {
            https.get(request, response => {
                let data = '';
    
                response.on('data', chunk => {
                    data += chunk;
                });
    
                response.on('end', () => {
                    try {
                        let weatherInfo = JSON.parse(data);
                        let weatherMessage = `**${weatherInfo.location.name}, ${weatherInfo.location.region}:**
*Current temperature:* ${weatherInfo.current.temp_f}°F
*Feels like:* ${weatherInfo.current.feelslike_f}°F
*Condition:* ${weatherInfo.current.condition.text}
*Local Time:* ${weatherInfo.location.localtime}
`
                        let responseField = { name: city, value: weatherMessage };
                        resolve(responseField)
                    } catch (error) {
                        reject(error)
                    }
                })
            }).on('error', err => {
                console.log(err)
            })
        })
        
    },
    run: async (client, channel, message, args) => {
        return channel.send('test weather message')
    },
    SlashCommand: {
        options: [
            {
              name: "city",
              value: "city",
              type: 3,
              description: "Specify your city",
            },
        ],
        run: async (client, interaction) => {
            const that = module.exports;
            let defaultCities = [ "Portland, OR", "San Clemente, CA", "Vancouver, B.C.", "Lincoln, CA", "San Diego, CA" ]

            if (interaction.options.getString('city')) { // specified city
                that.embeddedMessage.description = interaction.options.getString('city');
                that.process(interaction.options.getString('city')).then((responseField) => {
                    console.log(responseField)
                    that.embeddedMessage.fields.push(responseField)
                    
                    return interaction.reply({embeds: [that.embeddedMessage]})
                })
            } else { // didn't specify city
                for (city in defaultCities) {
                    that.embeddedMessage.fields.push(that.process(city))
                }
            }
            // console.log(that.embeddedMessage)
            // console.log(that.embeddedMessage.fields)

        }
    }
}