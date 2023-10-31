const { ICommand } = require('@libs/builders/command')

const { pinterest } = require('@libs/scraper')

/**

 * @type { ICommand }

 */

module.exports = {

    category: 'Search',

    description: 'Search Image At Pinterest',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} Patrick Star',

    callback: async ({ msg, fullArgs }) => {

        let zexxa = await pinterest(fullArgs)

        if (!zexxa) return msg.reply('Server dalam perbaikkan')

        if (!zexxa[0]) return msg.reply('File not found')

        

        result = zexxa[Math.floor(Math.random() * zexxa.length)]

       let zexxaMsg = `Generate from pinterest by ZexxaBot`

            msg.replyImage({ url: result }, zexxaMsg).catch(() => { return msg.reply('Terjadi kesalahan') })

            

            },

    }

            

        

        