const { ICommand } = require('@libs/builders/command')

const axios = require ('axios').default

/**

 * @type { ICommand }

 */

module.exports = {

    aliases: ['wr'],

    category: 'Information',

    description: 'Count your target Winrate Mobile Legends',

    minArgs: 1,

    expectedArgs: '<totalmatch>|<wrsekarang>|<wrtarget>',

    example: '{prefix}{command} 90|60|87',

    callback: async ({ msg, fullArgs, args }) => {

        let [m1, m2, m3] = fullArgs.split('|')

        let { data } = await axios.get(`https://api.zahwazein.xyz/information/hitungwr?apikey=zenzkey_8bc01f5847&text=${m1}&text2=${m2}&text3=${m3}`)
        /*return console.log(wr)*/
        

        if (data.status !== 'OK') return msg.reply('wr lu terlalu burik, susah')

        let zexxaMsg = `*_BERHASIL MENGHITUNG_*\n\n`

        

        zexxaMsg += `*Total Match: ${data.result.total_match}*\n`

        zexxaMsg += `*Total Winrate: ${data.result.total_winrate}*\n`

        zexxaMsg += `*Target Winrate: ${data.result.req_winrate}*\n`

        zexxaMsg += `*Description: ${data.result.description}*\n`

        

        msg.reply(zexxaMsg).catch(() => { return msg.reply('gagal mengirim pesan')})

        

        

    },

}