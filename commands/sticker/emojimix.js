const { ICommand } = require('@libs/builders/command')
const { writeExifImg } = require('@libs/converter/exif')
const fs = require('fs')
const x = require('axios').default
const api = require('caliph-api')


//api.other.emojimix(😅, 😌)
//.then(console.log);

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Sticker',
    description: 'Sticker Maker',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<emoji1>+<emoji2>',
    example: '{prefix}{command} 😅+🤔',
    callback: async ({ msg, client, message, fullArgs }) => {
        const [m1, m2] = fullArgs.split('+')
        if (!m1) return msg.reply('cth: #emojimix 😅+🤔')
        if (!m2) return msg.reply('cth: #emojimix 😅+🤔')
        let { data } = await axios.get(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${m1 ? encodeURIComponent(m1) : ""}${m2 ? "_" : ""}${m2 ? encodeURIComponent(m2) : ""}`)

            let ppk = data.results[0].url
            let tobuff = await axios.get(ppk, {responseType: 'arraybuffer'})
            let tolkontol = await writeExifImg(tobuff.data, { packname: 'ZexxaBeta', author: 'Bot' })
            msg.replySticker({url: tolkontol})
        }
    }