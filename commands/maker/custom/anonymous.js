const { ICommand } = require ('@libs/builders/command')
const x = require ('axios')

module.exports = {

    category: 'Maker',

    description: 'anonymous text',

    limit: true,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<query>',

    example: '{prefix}{command} zexxa dev',

    callback: async ({ msg, fullArgs }) => {
msg.replyImage({url: `https://api.zahwazein.xyz/ephoto/anonymous?text=${fullArgs}&apikey=zenzkey_8bc01f5847`}, `success generated`)
}
}
    