const { ICommand } = require('@libs/builders/command')
const { anime } = require('@libs/xfarr')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['otakusearch'],
    category: 'Anime',
    description: 'Search anime at otakudesu',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<title>',
    example: '{prefix}{command} Bleach',
    callback: async ({ msg, fullArgs }) => {
        let result = await anime.otakudesu(fullArgs)
        return console.log(result)
        if (!result) return msg.reply('Server dalam perbaikkan')
        if (!result[0]) return msg.reply('Anime not found')

        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`
        for (var i of result) {
            shannMsg += `\n\n──────────────────────`
            shannMsg += `\n\n⦿ Judul: ${i.judul}`
            shannMsg += `\n⦿ Link: ${i.link}`
        }

        msg.replyImage({ url: result[0].thumbnail }, shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })
    }
}