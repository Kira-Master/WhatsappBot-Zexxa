const { ICommand } = require('@libs/builders/command')

/**

 * @type { ICommand }

 */

module.exports = {

    aliases: ['seberapagay'],

    category: 'Gabut',

    description: '-',

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} temen saya',

    callback: async ({ msg, fullArgs }) => {

        let bisakah = ['0%', '100%', 'Gay Maksimal', 'Suami Ragil', 'Mungkin Saja Gay', 'Najis Lu Gay', 'Tidak Mungkin', 'Coba Ulangi', '1000000% Gay', 'Gay Banget Anjink']

        let random = bisakah[Math.floor(Math.random() * bisakah.length)]

        let jawab = `*Seberapa Gay ${fullArgs}*\n\nJawabannya : ${random}`

        msg.reply(jawab).catch(() => { return msg.reply('terjadi kesalahan') })

    },

}