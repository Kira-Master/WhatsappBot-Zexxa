const { ICommand } = require ('@libs/builders/command')

const axios = require ('axios')

module.exports = {

    category: 'Maker',

    description: 'make images mobile legends',

    limit: true,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} zexxa',

    callback: async ({ msg, fullArgs }) => {

msg.replyImage({url: `https://api.zahwazein.xyz/ephoto/aov?text=${fullArgs}&apikey=zenzkey_8bc01f5847`}, `success generated`)

}

}

    