const { ICommand } = require('@libs/builders/command')

const axios = require('axios').default

module.exports = {

    aliases: ['lyrics'],
    
    category: 'Search',

    description: 'Search Lyrics Your Fav Music',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} Anime',

    callback: async ({ msg, fullArgs }) => {

        let { data } = await axios.get('https://api.zahwazein.xyz/searching/liriklagu?query={query}&apikey=zenzkey_8bc01f5847'.format({ query: fullArgs })).catch(() => { return msg.reply('tidak ditemukan') })
/*return console.log(data)*/
      if (data.status !== 'OK') return msg.reply('Lyrics not found!')

        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`


            shannMsg += `\n\n──────────────────────`

            shannMsg += `\n⦿ Link: ${data.result.lirik}`

          

        

        msg.replyImage({ url: data.result.thumb }, shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })

        

    },

}