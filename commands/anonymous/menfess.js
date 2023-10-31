const { ICommand } = require('@libs/builders/command')
const knex = require('@database/connection')
const x = require('validasi-nomor-telpon')
const y = require('validator')

/**
* @type { ICommand }
*/

module.exports = {
    category: 'Anonymous',
    description: 'Send your secret message',
    privateOnly: true,
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<number>|<pesan>',
    example: '{prefix}{command} 62xxxx|halo',
    callback: async ({ msg, client, args }) => {
		let users = await knex('users').where({ user_jid: msg.senderNumber }).first()

        let mon = args.join(' ')
        let m1 = mon.split('|')[0]
        let m2 = mon.split('|')[1]
        
		let hpNya = await x.validasiNomor(m1)
        if (hpNya === 'awali dengan 62') return msg.reply('pastikan nomor hp berawalan 62')
        
        let isHp = await y.isNumeric(m1, 'ar')
        if (!isHp) return msg.reply(`nomor tujuan salah, pastikan tidak ada simbol dan spasi pada nomor tujuan`)
        
        let mq1 = m1 + '@s.whatsapp.net'
        let pjtxt = `Hi saya BOT, seseorang Kirim Pesan Untuk Kamu\n\nIsi Pesan:\n${m2}\n\n_*Geser ke kanan untuk membalas >>>*_`
        
        await knex('menfess').insert({ room_a: msg.senderNumber, room_b: m1, message: m2, status: true }).then(async () => {
            client.sendMessage(mq1, {text: pjtxt}).then(() => { return msg.reply('success') }).catch(() => { return msg.reply('gagal kirim pesan jir wkwk') })
        }).catch(() => { return msg.reply('error database jir wkwk') })
	}
}