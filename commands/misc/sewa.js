const { ICommand } = require('@libs/builders/command')

/**
 * @type { ICommand }
 */
module.exports = {
    aliases: ['premium'],
    category: 'about',
    description: 'Sewa bot.',
    callback: async ({ msg, message }) => {
        const shannMsg = `*LIST HARGA*
5k/Bulan

*Catatan:*
- Lakukan konfirmasi pembayaran melalui #owner
- Payment Dana/ShopeePay/BCA`

        return msg.replyImage({ url: 'https://telegra.ph/file/dc13c0137da4da4ec4a58.jpg' }, shannMsg)
    },
}