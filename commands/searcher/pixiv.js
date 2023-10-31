const { ICommand } = require('@libs/builders/command')

const axios = require('axios').default

module.exports = {

    category: 'Search',

    description: 'Search Pixiv Image',

    waitMessage: true,
    
    groupOnly: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} Anime',

    callback: async ({ msg, fullArgs }) => {

        let xxx = await axios.get('https://api.zahwazein.xyz/searching/pixiv?query={query}&apikey=zenzkey_8bc01f5847'.format({ query: fullArgs })).catch(() => { return msg.reply('foto tidak ditemukan') })
/*return console.log(data)*/
        if (xxx.data.status !== 'OK') return msg.reply('no picture or error\nplease try again')
        let zexxaMsg = `*DONE GENERATE IMAGE FROM PIXIV*`
        for (let x of xxx.data.result) {
            zexxaMsg += `\n\n──────────────────────`

            zexxaMsg += `\n\n⦿ Title: ${x.title}`

            zexxaMsg += `\n⦿ Author: ${x.author}\n\n`
        msg.replyImage({ url: x.urls.regular }, zexxaMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
           }
    },

}