const { ICommand } = require("@libs/builders/command")

const axios = require('axios').default

const config = require('@config')

const { TelegraPh } = require('@libs/converter/upload')

const fs = require('fs')

/**

 * @type { ICommand }

 */

module.exports = {

    aliases: ['filterai'],

    category: 'Convert',

    description: 'AI Filter',

    waitMessage: true,

    callback: async ({ msg, client, message, args, fullArgs }) => {

        const image = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))

        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {

            await fs.writeFileSync('./database/src/shanndev.jpg', image)

            let file = await TelegraPh('./database/src/shanndev.jpg')
            
            let { data } = await axios.get(`https://xzn.wtf/api/aimirror?&apikey=zexxabot&url=${file}&filter=${fullArgs}`)
            if (data.status !== 200) return msg.reply(`*FILTER TIDAK ADA*\n\n*List Filter*: ${data.list_filter}`)

            client.sendMessage(msg.from, { document: { url: data.generated_image_addresses[0] }, mimetype: 'image/jpg', fileName: 'aifilter.jpg' }, { quoted: message }).catch(() => { return msg.reply('Terjadi kesalahan') })

            fs.unlinkSync('./database/src/shanndev.jpg')

        } else return msg.reply('Send/reply image dengan caption #aifilter')

    }

}