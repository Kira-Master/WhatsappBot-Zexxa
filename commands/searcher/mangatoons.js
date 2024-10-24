const { ICommand } = require('@libs/builders/command')
const x = require('@libs/xfarr')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['mangatoon'],
    category: 'Search',
    description: 'Mangatoons Search',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} love',
    callback: async ({ msg, fullArgs }) => {
        let result = await x.search.mangatoons(fullArgs)
        //return console.log(result)
        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`

        for (var i of result) {
            shannMsg += `\n\n──────────────────────`
            shannMsg += `\n\nJudul: ${i.judul}`
            shannMsg += `\nGenre: ${i.genre}`
            shannMsg += `\nLink: ${i.link}`
        }

        msg.reply(shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
    },
}
