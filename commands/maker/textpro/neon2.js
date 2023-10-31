const { ICommand } = require ('@libs/builders/command')

const x = require ('mumaker')

module.exports = {

    category: 'Maker',

description: 'make neon style text',

waitMessage: true,

minArgs: 1,

expectedArgs: '<text>',

example: '{prefix}{command) Zexxa',

callback: async({msg, fullArgs}) => {

const url = await x.photooxy('https://photooxy.com/elegant-3d-neon-dark-metal-text-effect-online-free-416.html', fullArgs)

msg.replyImage({url: url}, `success`)

}

}