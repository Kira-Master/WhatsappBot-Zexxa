const { ICommand } = require("@libs/builders/command")

const axios = require('axios').default

const config = require('@config')

const { TelegraPh } = require('@libs/converter/upload')

const fs = require('fs')

/**

 * @type { ICommand }

 */

module.exports = {

    aliases: ['enhance'],

    category: 'Convert',

    description: 'Enhance Image',

    waitMessage: true,

    callback: async ({ msg, client, message }) => {

        const image = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))

        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {

            await fs.writeFileSync('./database/src/shanndev.jpg', image)

            let file = await TelegraPh('./database/src/shanndev.jpg')

            client.sendMessage(msg.from, { document: { url: `https://xzn.wtf/api/waifu2x?url=${file}&apikey=zexxabot` }, mimetype: 'image/jpeg', fileName: 'waifu2px.jpeg' }, { quoted: message }).catch(() => { return msg.reply('Terjadi kesalahan') })

            fs.unlinkSync('./database/src/shanndev.jpg')

        } else return msg.reply('Send/reply image dengan caption #waifu2px')

    }

}