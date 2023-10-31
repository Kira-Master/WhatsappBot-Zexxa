const { ICommand } = require ('@libs/builders/command')
const fetch = require ('node-fetch')
const axios = require ('axios')
module.exports = {
    aliases: ['play'],
    category: 'youtube',
    description: 'play music server 2',
    cooldown: 20 * 1000,
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} lagu jorok - baon cikadap',
    callback: async ({client, message, msg, fullArgs }) => {
        try {
            let { data } = await axios.get('https://zerooneapi.my.id/api/search/ytplay?apikey=81d9ca3d&text={txt}'.format({txt: fullArgs}))
            if (data.ZeroOne_API.status !== 'true') return msg.reply('not found, please try again')
            client.sendMessage(msg.from, { document: { url: data.ZeroOne_API.result.mp3.result }, mimetype: 'audio/mpeg', fileName: data.ZeroOne_API.result.title , quoted: message }).catch(() => { return msg.reply('Terjadi kesalahan, coba lagi!') })
            //msg.replyAudio({url: data.ZeroOne_API.result.mp3.result}).catch(() => { return msg.reply('gagal')})
    
            } catch(err) {
                throw err
                console.log(err)
                }
    }
    }

