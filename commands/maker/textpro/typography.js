const { ICommand } = require ('@libs/builders/command')

const x = require ('mumaker')

module.exports = {

    category: 'Maker',

description: 'make style text',

waitMessage: true,

minArgs: 1,

expectedArgs: '<text>',

example: '{prefix}{command} Zexxa',

callback: async({msg, fullArgs}) => {

const url = await x.textpro('https://textpro.me/create-artistic-typography-online-1086.html', fullArgs)

msg.replyImage({url: url}, `success`)

}

}