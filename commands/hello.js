let quotes = [
    "Ah, the clumsy adolescence. It's a phase we've all been through. Except for me. I was like a cat.",
    "I'm afraid I just blue myself.",
    "Okay, lindsay, are you forgetting that I was a professional twice-over? An analyst and a therapist. An analrapist.",
    "Oh, mercy me! I keep forgetting I'm in the colonies!",
    "Oh boy, I got some looks on the bus cause of this!",
    "Excuse me, do these effectively hide my thunder?",
    "I'm afraid it's merely a cloaking agent from a sadly blunderous afternoon.",
    "When a man needs to prove to a woman that he's actually...",
    "With fully formed libidos, not two young men playing grab-ass in the shower.",
    "Even if I have to take a chubby, I'm willing to suck it up!",
    "I had no idea a ninety year-old man could cave in my chest cavity like that.",
    "Well excuse me for liking the way they shape my junk.",
    "I realized it was for being a leading man. Oh, I can just taste those meaty leading man parts in my mouth!",
    "I will be a bigger and hairier mole than the one on your inner left thigh!",
    "Oh, I've a list of men that could fill every opening you have.",
    "I just found out that my cellular telephone was a lemon. It didn't work.",
    "Michael, you are quite the cupid. You can stick an arrow in my buttocks any time.",
    "Okay, Lindsay, are you forgetting that I was a professional twice over – an analyst and a therapist. The world's first analrapist.",
    "You know, first of all, we are doing this for her, because neither one of us wants to get divorced. And second-of-ly, I know you're the big marriage expert – oh, I'm sorry, I forgot, your wife is dead!",
    "Come on. Let's see some bananas and nuts. Oh, perhaps we should just pull their pants off."
]

module.exports = {
    name: 'hello',
    aliases: ['sup', 'wazzup'],
    description: 'Say hello to Tobias, he\'ll have something fun to say.',
    usage: '',
    execute(message, args) {
        return message.reply(`${quotes[Math.floor(Math.random() * (quotes.length))]}`)
    }
}