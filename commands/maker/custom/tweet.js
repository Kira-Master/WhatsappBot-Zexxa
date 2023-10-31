const { ICommand } = require ('@libs/builders/command')

const axios = require ('axios')

module.exports = {

    category: 'Maker',

    description: 'Create custom tweet maker',

    limit: true,

    waitMessage: true,

    minArgs: 2,

    expectedArgs: '<text1>|<text2>',

    example: '{prefix}{command} Donald Trump | Fuck You!',

    callback: async ({ msg, fullArgs }) => {

    let [m1, m2] = fullArgs.split('|')

    

    msg.replyImage({ url: `https://api.zahwazein.xyz/creator/maketweet?text2=${m1}&text=${m2}&apikey=zenzkey_8bc01f5847`}, `success`).then(() =>

    { return msg.reply('used one limit')

    }).catch(() =>

    { return msg.reply('gagal mengirim file')

    })

    }

    }

    