const { ICommand } = require ('@libs/builders/command')
const axios = require ('axios').default
const { writeExif } = require('@libs/converter/exif')

module.exports = {
    category: 'Search',
    description: 'search whatsapp sticker',
    cooldown: 10 * 1000,
    limit: true,
    waitMessage: true,
    minArgs: 1,
    expectedArgs: 'gojosatoru, among, anime, animegif, bucin, rabbit, manusialidi, dinokuning, pentol, doge, gura, mukalu, spongebob, kawanspongebob, patrick, patrickgif, random, paimon, chat',
    example: '{prefix}{command} dinokuning',
    callback: async({ msg, fullArgs, client }) => {
        let text = fullArgs
		let { headers, data } = await axios({ method: 'get', url: `https://site.zexxa.tech/api/sticker/${text}?&apikey=Zexxabot`, headers: { 'DNT': 1, 'Upgrade-Insecure-Request': 1 }, responseType: 'arraybuffer' })
        if (!data || !headers) return msg.reply('Gagal mendapatkan gambar')
        
        let buffer = await writeExif({ data: data, mimetype: headers['content-type'] }, { packname: 'Zexxa', author: 'Bot' })
        if (!buffer) return msg.reply('Gagal mengkonversi gambar')
        
        msg.replySticker({ url: buffer })
	}
}