const { TelegraPh } = require('@libs/converter/upload')
const { ICommand } = require ('@libs/builders/command')
const i18n = require('i18n')
const fs = require ('fs')
const axios = require ('axios')

module.exports = {
    category: 'Convert',
    description: 'upload image to url',
    waitMessage: true,
    minArgs: 0,
    expectedArgs: '',
    example: '{prefix}{command} ',
    callback: async ({ msg, client, message, fullArgs }) => {
    const file = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
        if (msg.typeCheck.isImage || msg.typeCheck.isQuotedImage) {
        await fs.writeFileSync('shanndev.jpg', file)
        let media = ('./shanndev.jpg')
    let url = await TelegraPh(media)
    msg.replyImage({url: media}, url)
    }
    }
    }