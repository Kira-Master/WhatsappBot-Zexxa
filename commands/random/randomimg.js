const { ICommand } = require('@libs/builders/command')

const axios = require('axios').default

const { apikey } = require('@config')

/**

 * @type { ICommand }

 */

module.exports = {

   

    category: 'Random',

    description: 'Random Picture',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: 'darkjoke, memeindo, cosplay, meme, wallhp, onecak, profil, aesthetic, blackpink, hacker, patrick',

    example: '{prefix}{command} rose',

    callback: async ({ msg, fullArgs }) => {

        

 

        let zexxaMsg = `Random Image`

        msg.replyImage({ url: 'https://api.zahwazein.xyz/randomimage/{query}?apikey=zenzkey_8bc01f5847'.format({ query: fullArgs})}, zexxaMsg).catch(() => { return msg.reply('Terjadi kesalahan') })

    },

}