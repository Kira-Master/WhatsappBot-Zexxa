const { ICommand } = require ('@libs/builders/command')
const axios = require ('axios')

module.exports = {
    category: 'Random',
    description: 'Random gore videos',
    limit: true,
    waitMessage: true,
    minArgs: 0,
    expectedArgs: '',
    example: '{prefix}{command} ',
    callback: async ({ msg, fullArgs }) => {
    let { data } = await axios.get('https://api.trizy.co/downloader/gore?apikey=3edcbaad78')
    if (data.status !=='OK') return msg.reply('not found')
    let text = `*Title: ${data.result.title}*\n*Tag: ${data.result.tag}*\n*Upload: ${data.result.upload}*\n*Author: ${data.result.creator}*\n*Views: ${data.result.view}*\n\n`
    
    msg.replyVideo({ url: data.result.video}, text).then(() => { return msg.reply('limit -1')}).catch(() => { return msg.reply('gagal mengirim video')})
    }
    }