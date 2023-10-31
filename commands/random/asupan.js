const { ICommand } = require('@libs/builders/command')

const axios = require('axios').default

const { apikey } = require('@config')

/**

 * @type { ICommand }

 */

module.exports = {
    aliases: ['notnot', 'rose', 'ryujin', 'kayes', 'cecan', 'vietnam', 'thailand', 'kpop', 'aeunicetjoaa', 'china', 'justina'],

    category: 'Random',

    description: 'Random Picture',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: 'notnot, rose, ryujin, kayes, cecan, vietnam, thailand, kpop, aeunicetjoaa, china, justina',

    example: '{prefix}{command} rose',

    callback: async ({ msg, fullArgs }) => {

        
 
        let zexxaMsg = `Random Asupan`
        msg.replyImage({ url: 'https://api.zahwazein.xyz/randomasupan/{query}?apikey=zenzkey_8bc01f5847'.format({ query: fullArgs})}, zexxaMsg).catch(() => { return msg.reply('Terjadi kesalahan') })

    },

}