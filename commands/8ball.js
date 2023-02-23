let responses = [
    "Yes",
    "No",
    "Maybe",
    "Try again",
    "I don't know",
    "POGGERS",
    "Stfu!"
]

module.exports = {
    name: '8ball',
    description: 'Get a response to a question you have for Tobias\' 8 ball.',
    usage: '[question]',
    run: async (client, channel, message, args) => {
        return channel.send(`${responses[Math.floor(Math.random() * (responses.length))]}`)
    }
}