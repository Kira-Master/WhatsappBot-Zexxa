const { ICommand } = require ('@libs/builders/command')

const x = require ('axios')

module.exports = {

    category: 'Download',

    description: 'download tiktok slide',

    limit: true,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<link>',

    example: '{prefix}{command} https://vt.tiktok.com/ZSLNc3W3B/',

    callback: async ({ msg, args, fullArgs }) => {
let { data } = await x.get('https://api.zahwazein.xyz/downloader/ttslide?apikey=zenzkey_8bc01f5847&url={url}'.format({url: args[0]}))
if (data.status !== 'OK') return msg.reply('system error/link invalid')
console.log(data)

msg.replyImage({url: data.result}, `downloaded from ${args[0]}`).catch(() => { return msg.reply('error')})
}
}
    