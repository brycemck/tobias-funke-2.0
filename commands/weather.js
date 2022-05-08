const https = require('https');

const weatherUrl = "https://api.weatherapi.com/v1";
const weatherAPIKey = "7e297d20c6dc4fd891911335220805";

let defaultCities = [ "Portland, OR", "San Clemente, CA", "Vancouver, B.C.", "Lincoln, CA", "San Diego, CA" ]

let endpoint = "/current.json";

let weatherCards = [];


let callWeather = (message, request) => {
    https.get(request, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            response = JSON.parse(data);
            weatherCards.push(response);
        
            let weatherMessage = `**${response.location.name}, ${response.location.region}:**
*Current temperature:* ${response.current.temp_f}°F
*Feels like:* ${response.current.feelslike_f}°F
*Condition:* ${response.current.condition.text}
*Local Time:* ${response.location.localtime}
`

            return message.channel.send(weatherMessage);
        })
    }).on('error', (err) => {
        return message.channel.send("There was an error connecting to the Weather API.");
    })
}

module.exports = {
    name: 'weather',
    description: 'Gets the weather for 5 default cities, or a specified location by providing a city, state/province or ZIP code.',
    usage: '[location]',
    execute(message, args) {
        let query = "&q=";
        let request = '';

        if (!args.length) {
            for (const city of defaultCities) {
                query += city;
                request = weatherUrl + endpoint + "?key=" + weatherAPIKey + query;
                callWeather(message, request);
                query = "&q=";
            }
        } else {
            args = args.join(" ");
            query += args;
            request = weatherUrl + endpoint + "?key=" + weatherAPIKey + query;
            callWeather(message, request);
        }
    }
}