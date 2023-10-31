const { ICommand } = require('@libs/builders/command')
const util = require ('util')
const fs = require ('fs')
/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['setppgrup', 'setppgc'],
    category: 'Group',
    description: '-',
    groupOnly: true,
    adminOnly: true,
    waitMessage: true,
    callback: async ({m, msg, client }) => {
        let image = (await msg.download('buffer')) || (msg.quoted && (await msg.quoted.download('buffer')))
        let media = 'database/src/ppgc.jpg'
            await fs.writeFileSync(media, image)
     try {
       client.updateProfilePicture(msg.isSelf, image).then(() => { return msg.reply('Update success.') }).catch(() => { return msg.reply('Update failed.') })
        
         } catch(error) {
             throw error
             console.log(error)
             await client.sendMessage("6282135278036@s.whatsapp.net", {text: util.format(error),
                                                                       })
             }
                                      
    }
}