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

const url = await x.photooxy('https://photooxy.com/other-design/create-dark-metal-text-with-special-logo-160.html', fullArgs)

msg.replyImage({url: url}, `success`)
}
}

