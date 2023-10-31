const { ICommand } = require ('@libs/builders/command')

const axios = require ('axios')

module.exports = {

    category: 'Islamic',

    description: 'random islam story',

    limit: true,

    waitMessage: true,

    minArgs: 0,

    expectedArgs: '',

    example: '{prefix}{command} ',

    callback: async ({ msg, fullArgs }) => {
    let { data } = await axios.get('https://api.zahwazein.xyz/islami/kisahmuslim?apikey=zenzkey_8bc01f5847')
    
    zexxaMsg = `*Title: ${data.result.Judul}*\n*Story*: ${data.result.Cerita}\n`
    msg.replyImage({url: data.result.Thumb}, zexxaMsg)
    }
    }

    