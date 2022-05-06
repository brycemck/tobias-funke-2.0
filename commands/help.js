module.exports = {
    name: 'help',
    execute(message, args) {
        
        console.log("hello")
        return message.channel.send("hello")
    }
}