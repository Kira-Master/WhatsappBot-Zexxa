const { ICommand } = require ('@libs/builders/command')

const x = require ('mumaker')

module.exports = {

    category: 'Maker',

description: 'make style text',

waitMessage: true,

minArgs: 1,

expectedArgs: '<text>',

example: '{prefix}{command) Zexxa',

callback: async({msg, fullArgs}) => {

msg.replyImage({url: `https://api.botcahx.live/api/ephoto/blackpink?text=${fullArgs}&apikey=DeHBriJv`}, `success`)

}

}