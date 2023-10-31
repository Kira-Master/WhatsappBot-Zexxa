const { ICommand } = require('@libs/builders/command')

const axios = require('axios').default

module.exports = {

    category: 'Search',

    description: 'Search Whatsapp Group',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} Editor',

    callback: async ({ msg, fullArgs }) => {

        let data = await axios.get('https://api.zahwazein.xyz/searching/wagroup?query={query}&apikey=zenzkey_8bc01f5847'.format({ query: fullArgs })).catch(() => { return msg.reply('tidak ditemukan') })
/*return console.log(data)*/
      if (data.data.status !== 'OK') return msg.reply('Grup Tidak Ditemukan')

        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`

        for (let i of data.data.result) {

            

            shannMsg += `\n\n──────────────────────`

            shannMsg += `\n\n⦿ Title: ${i.nama}`

            shannMsg += `\n⦿ Link: ${i.link}`

            

        }

        

        msg.reply(shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })

        

    },

}