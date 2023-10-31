const { ICommand } = require('@libs/builders/command')
const dhn = require('dhn-api')

/**
 * @type { ICommand }
 */
module.exports = {
    category: 'Search',
    description: 'Search for WhatsApo Modification',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} Fouad Whatsapp',
    callback: async ({ msg, fullArgs }) => {
        let result = await dhn.WAModsSearch(fullArgs)
        if (!result) return msg.reply('Server dalam perbaikkan')
        if (!result[0]) return msg.reply('File not found')
        let zexxaMsg = ''
for (let i of result) {
        zexxaMsg += `*App Name:${i.apk_name}*\n\nStatus: ${i.status}\nCreator: ${i.creator}\nDescription: ${i.apk_desc}\nType: 'Apk'\nLink: ${i.apk_url}\n\n`
        }
        
            msg.replyImage({ url: result[0].apk_image }, zexxaMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
        
    },
}
