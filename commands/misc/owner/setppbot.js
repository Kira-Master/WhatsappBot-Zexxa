const { ICommand } = require('@libs/builders/command')
const util = require('util')
module.exports = {
	category: 'Owner',
    description: '-',
    ownerOnly: true,
    waitMessage: true,
    
    callback: async ({ msg, client }, { quoted, mime, command }) => {
    
	if (!/image/.test(mime)) return msg.reply(`Kirim/Reply Image Dengan Caption ${command}`)
	if (/webp/.test(mime)) return msg.reply(`ini kan stiker bos coba,\nKirim Image Dengan Caption ${command}`)
	try {
	let file = (await msg.download('buffer') || (msg.quoted && (await msg.quoted.download('buffer'))))
	//let media = await client.downloadMediaMessage(file)
	await client.updateProfilePicture(file).then(() => msg.reply('Success update profile picture bot')).catch(msg.reply)
	} catch (err) {
			console.log(err)
			await client.sendMessage("6282223104865@s.whatsapp.net", {
			text: util.format(err),
		})
		}
	},
}