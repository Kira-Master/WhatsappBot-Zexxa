const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default

module.exports = {
    category: 'Premium',
    description: 'Search XNXX videos',
    premiumOnly: true,
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} Anime',
    callback: async ({ msg, fullArgs }) => {
        let { data } = await axios.get('https://site.zexxa.tech/api/search/xnxx?query={query}&apikey=Zexxabot'.format({ query: fullArgs })).catch(() => { return msg.reply('tidak ditemukan') })
        //return console.log(data)
      if (data.result.code !== 200) return msg.reply('Fitur sedang error')
        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`
        for (let i of data.result.result) {
            
            shannMsg += `\n\n──────────────────────`
            shannMsg += `\n\n⦿ Title: ${i.title}`
            shannMsg += `\n⦿ Link: ${i.link}`
            }
        
        
        msg.reply(shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
        
    },
}