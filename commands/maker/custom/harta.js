const { ICommand } = require ('@libs/builders/command')

const axios = require ('axios')

module.exports = {

    category: 'Maker',

    description: 'Make Text Like Harta Tahta Style',

    limit: true,

    waitMessage: true,

    minArgs: 3,

    expectedArgs: '<text1>|<text2>|<text3>',

    example: '{prefix}{command} lo|itu|jelek',

    callback: async ({ msg, fullArgs }) => {

    let [m1, m2, m3] = fullArgs.split('|')

    msg.replyImage({ url: `https://api.zahwazein.xyz/creator/tahtacustom?text=${m1}&text2=${m2}&text3=${m3}&apikey=zenzkey_8bc01f5847`}, `success`).then(() =>

    { return msg.reply('limit terpakai')

    }).catch(() =>

    { return msg.reply('error data')

    })

         }

    }