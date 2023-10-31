const x = require ('caliph-api')
const logger = require('@libs/utils/logger')
module.exports = {
    category: 'youtube',
    description: 'download ytmp3 server 2',
    waitMessage: true,
    cooldown: 30 * 1000,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://youtube.com/watch/xxxx',
    
    callback: async({msg, args, client, message}) => {
        let xxx = await x.downloader.yt.mp3(args[0])
        //console.log(data)
        let msgX = `*_BERHASIL MENDAPAT AUDIO_*\n\n*Judul: ${xxx.result.title}*\n*Ukuran: ${xxx.result.size}*\n*Durasi: ${xxx.result.duration}*\n*Penonton: ${xxx.result.views}*\n*Tanggal Upload: ${xxx.result.uploadDate}*\n*Deskripsi*: ${xxx.result.desc}*\n\n*_AUDIO SEDANG DIKIRIM, MOHON MENUNGGU!!!_*`
        
        try {
            await msg.replyImage({url: xxx.result.thumb}, msgX)
            client.sendMessage(msg.from, { document: { url: xxx.result.result }, mimetype: 'audio/mpeg', fileName: xxx.result.title }, { quoted: message }).catch(() => { return msg.reply('Terjadi kesalahan') })
        } catch(err) {
            logger.error(err)
        }
    }
}