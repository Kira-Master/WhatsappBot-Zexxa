const { ICommand } = require ('@libs/builders/command')

const axios = require ('axios')

module.exports = {

    category: 'Maker',

    description: 'fake trump tweet maker',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<halo>',

    example: '{prefix}{command} ',

    callback: async ({ msg, fullArgs }) => {

    msg.replyImage({ url: 'https://api.zahwazein.xyz/creator/trump?text={query}&apikey=zenzkey_8bc01f5847'.format({ query: fullArgs})}).then(() => { return msg.reply('success')

    }).catch(() => { return msg.reply('failed send image')

    })

    }

    }

    