const { youtube } = require('@libs/utils/scrapper/download/youtube')
const axios = require('axios')
/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['yta', 'ytaudio'],
    category: 'youtube',
    description: 'Youtube audio downloader.',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://www.youtube.com/watch?v=eZskFo64rs8',
    callback: async ({ msg, args, client, message }) => {
        try {
        let { data } = await axios.get('https://zerooneapi.my.id/api/download/ytmp3?apikey=81d9ca3d&url={url}'.format({url: args[0]}))
       // console.log(data)
        //let xxx = await axios.get('https://xzn.wtf/api/y2mate?url={url}&apikey=zexxabot'.format({url: args[0]}))
        if ( data.ZeroOne_API.status !== 'true') return msg.reply('error')
        let msgX = `*DATA DIDAPATKAN*\n\n`
        msgX += `*Title*: *${data.ZeroOne_API.result.title}*`
        msgX += `\n*Upload Date*: *${data.ZeroOne_API.result.uploadDate}*`
        msg.replyImage({url: data.ZeroOne_API.result.thum}, msgX).catch(() => { return msg.reply('gagal mengirim data')}).then(() => { return msg.reply('mengirim lagu!!!')})
        //client.sendMessage(msg.from, { document: { url: data.ZeroOne_API.result.download.result }, mimetype: 'audio/mpeg', fileName: data.ZeroOne_API.result.title }, { quoted: message }).catch(() => { return msg.reply('Terjadi kesalahan') })
            msg.replyAudio({url: data.ZeroOne_API.result.download.result}).catch(() => { return msg.reply('Terjadi Kesalahan')})
            }catch(error) {
                console.log(error)
                }



    },
}
