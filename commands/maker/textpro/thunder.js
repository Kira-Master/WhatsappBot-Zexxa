const { ICommand } = require('@libs/builders/command')

const x = require('mumaker')

/**

 * @type { ICommand }

 */

module.exports = {

    category: 'Maker',

    description: 'Thunder maker',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<text>',

    example: '{prefix}{command} holyshit',

    callback: async ({ msg, fullArgs }) => {

        const url = await x.textpro(`https://textpro.me/create-thunder-text-effect-online-881.html`, fullArgs)

        msg.replyImage({ url }, `success`).catch(() => { return msg.reply('Terjadi kesalahan') })

    }

}