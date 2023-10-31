const { ICommand } = require ('@libs/builders/command')

const axios = require ('axios')

module.exports = {

    aliases: ['tts'],
    category: 'Convert',

    description: 'Text to audio',

    limit: true,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<text>|id-ID, en-US, ja-JP, fr-FR, ru-RU, de-DE, fil-PH',

    example: '{prefix}{command} halo zexxa|en-US',

    callback: async ({client, msg, fullArgs, message }) => {
let [text1, lang] = fullArgs.split('|')
let { data } = await axios.get(`https://api.botcahx.live/api/sound/texttosound?text1=${text1}&lang=${lang}&apikey=DeHBriJv`)

if (data.status !==true) return msg.reply('bahasa tidak ada/error')
//console.log(data)

msg.replyAudio({url: data.result})
        }
    }