const x = require ('axios').default

module.exports = {
description: 'informasi gempa',
category: 'Information',
callback: async({msg}) => {
let { data } = await x.get('https://api.botcahx.live/api/search/gempa?apikey=DeHBriJv').catch(() => { return msg.reply('informasi tidak ada')})

let msgX = `*INFORMASI GEMPA HARI INI*`
msgX += `\n\n*Wilayah: ${data.result.Wilayah}*`
msgX += `\n*Waktu: ${data.result.Waktu}*`
msgX += `\n*Lintang: ${data.result.Lintang}*`
msgX += `\n*Bujur: ${data.result.Bujur}*`
msgX += `\n*Magnitudo: ${data.result.Magnitudo}*`
msgX += `\n*Kedalaman: ${data.result.Kedalaman}*`

msg.replyImage({url: data.result.Map}, msgX)
}
}
