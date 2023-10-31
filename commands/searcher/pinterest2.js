const x = require ('axios').default
const { ICommand } = require ('@libs/builders/command')

module.exports = {
category: 'Search',
description: 'search image',
cooldown: 3 *1000,
limit: true,
waitMessage: true,
minArgs: 1,
expectedArgs: '<title>',
example: '{prefix}{command} anime aesthetic',
callback: async({msg, fullArgs}) => {
msg.replyImage({url: 'https://api.zahwazein.xyz/searching/pinterest2?query={text}&apikey=zenzkey_8bc01f5847'.format({text: fullArgs})}, `success generate ${fullArgs}`)
}
}