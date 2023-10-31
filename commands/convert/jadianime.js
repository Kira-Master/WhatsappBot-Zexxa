const { ICommand } = require('@libs/builders/command')
const x = require('axios').default
const { TelegraPh } = require('@libs/converter/upload')
const fs = require('fs')
const { apikey } = require('@config')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Convert',
    description: 'turn your photo to anime',
    waitMessage: true,
    callback: async ({ msg, client, message, fullArgs }) => {
        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
            let image = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
            let media = 'database/src/whatanime.jpg'
            await fs.writeFileSync(media, image)

            let buffer = await TelegraPh(media)
            if (!buffer) return msg.reply('Server dalam perbaikkan')
            msg.replyImage({url: 'https://xzn.wtf/api/toanime?url={buffer}&apikey=zexxabot'.format({buffer: buffer})}, `*awoakwoak lucu ngab*`).catch(() => { return msg.reply('gagal, mohon menggunakan foto orang')})
        } else return msg.reply('kirim/reply foto kamu dengan caption #jadianime untuk mengubah nya ke anime')
    },
}
