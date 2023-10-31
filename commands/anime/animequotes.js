const { ICommand } = require('@libs/builders/command')

const axios = require('axios').default

module.exports = {

    category: 'Anime',

    description: 'Quotes Anime',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} Boruto',

    callback: async ({ msg, fullArgs }) => {
        let { data } = await axios.get('https://api.zahwazein.xyz/searching/animequotes?query={query}&apikey=zenzkey_8bc01f5847'.format({ query: fullArgs }))
        if ( data.status !== 'OK') return msg.reply('feature error, try again')
        
        let zexxaMsg = `*QUOTES ANIME*\n\n\n*Chara: ${data.result.character}*\n*From: ${data.result.anime}*\n\n────────────────\n\n*Quotes: ${data.result.quotes}*`

         msg.replyImage({ url: data.result.thumb}, zexxaMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
        }
    }