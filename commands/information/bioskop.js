const x = require ('axios').default
const { ICommand } = require ('@libs/builders/command')
module.exports = {
description: 'search jadwal bioskop',
category: 'Information',
waitMessage: true,
minArgs: 1,
expectedArgs: '<title>',
example: '{prefix}{command} pekalongan',
callback: async({msg, client, fullArgs}) => {
let { data } = await x.get('https://api.zahwazein.xyz/webzone/jadwalbioskop?kota={kota}&apikey=zenzkey_8bc01f5847'.format({kota: fullArgs})).catch(() => { return msg.reply('jadwal tidak ditemukan/error')})
//onsole.log(data)
let msgX = `*JADWAL BIOSKOP KOTA ${fullArgs}*\n\n`
for ( let i of data.result ) {
    msgX += `*Tempat: ${i.title}*\n`
    msgX += `*Jadwal: ${i.url}*\n\n`
 client.sendMessage(msg.from, { image: { url: i.thumb }, caption: msgX }).catch(() => { return msg.reply('gagal mengirim media')})
    }
},
}