const { ICommand } = require('@libs/builders/command')

const x = require('@libs/xfarr')

/**

 * @type { ICommand }

 */

module.exports = {

    aliases: ['chord'],

    category: 'Search',

    description: 'Chord Search',

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} gedang klutuk',

    callback: async ({ msg, fullArgs }) => {

        let xxx = await x.search.chord(fullArgs)
console.log(xxx)
        if (xxx.status !== 200) return msg.reply('chord not found')
        let shannMsg = `「 SUKSES MENDAPATKAN DATA 」`


            shannMsg += `\n\n──────────────────────`

            shannMsg += `\n\nLagu: ${xxx.title}`

            shannMsg += `\nArtist: ${xxx.artist}`

            shannMsg += `\nChord: ${xxx.chord}`

        
        msg.reply(shannMsg).catch(() => { return msg.reply('Terjadi kesalahan') })

    },

}

