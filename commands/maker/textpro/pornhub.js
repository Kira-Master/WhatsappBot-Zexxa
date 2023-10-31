const { ICommand } = require('@libs/builders/command')

const axios = require('axios').default

/**

 * @type { ICommand }

 */

module.exports = {

    category: 'Maker',

    description: 'Pornhub maker',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<text1>|<text2>',

    example: '{prefix}{command} zexxa|bot',

    callback: async ({ msg, fullArgs }) => {

    let [text1, text2] = fullArgs.split('|')

        msg.replyImage({url: `https://api.zahwazein.xyz/textpro/pornhub?text=${text1}&text2=${text2}&apikey=zenzkey_8bc01f5847` }, `success`).catch(() => { return msg.reply('Terjadi kesalahan') })

    }

}