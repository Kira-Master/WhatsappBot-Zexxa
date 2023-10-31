const { ICommand } = require('@libs/builders/command')
const axios = require('axios').default
const { apikey } = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['ttmp3'],
    category: 'Download',
    description: 'Tiktok audio downloader',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://vt.tiktok.com/ZSwWCk5o/',
    callback: async ({ msg, args }) => {
        let { data } = await axios.get('https://api.botcahx.live/api/dowloader/tiktok?url={url}&apikey=DeHBriJv'.format({ url: args[0] })).catch(() => { return msg.reply('link tidak valid') })

        return msg.replyAudio({ url: (data.result.audio ? data.result.audio : '') }).catch(() => { return msg.reply('Terjadi kesalahan saat mengirim media') })
    },
}

