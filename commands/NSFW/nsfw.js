const { ICommand } = require('@libs/builders/command')
const axios = require ('axios').default

module.exports = {
category: 'NSFW',
description: 'search nsfw picture',
premiumOnly: true,
waitMessage: 'bang tobat bang',
minArgs: 1,
expectedArgs: 'ahegao, ass, cuckold, bdsm, blowjob, cum, ero, femdom, foot, gangbang, glasses, hentai, hentaigif, jahy, maid, manga, masturbation, pussy, yuri, nsfwneko, netorare, mobilewall, orgy, panties, sfwneko, tentacles, thighs, zettairyouiki',
example: '{prefix}{command} mobilewall',
callback: async({msg, fullArgs}) => {
msg.replyImage({url: 'https://api.zahwazein.xyz/api/morensfw/{text}?apikey=zenzkey_8bc01f5847'.format({text: fullArgs})}, `success generate ${fullArgs}`).catch(() => { return msg.reply('kesalahan saat mengirim media')})
}
}