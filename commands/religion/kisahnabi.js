const { ICommand } = require ('@libs/builders/command')

const axios = require ('axios')

module.exports = {

    category: 'Islamic',

    description: 'search the story of prophet on islam',

    limit: true,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<title>',

    example: '{prefix}{command} nuh',

    callback: async ({ msg, fullArgs }) => {

    let { data } =await axios.get('https://api.zahwazein.xyz/islami/kisahnabi/{text}?apikey=zenzkey_8bc01f5847'.format({text: fullArgs}))

    if(data.status !== 'OK') return msg.reply('story not found')

    

    let zexxaMsg = `*Name: ${data.result.name}*\n*Born: ${data.result.lahir}*\n*Age: ${data.result.age}*\n*Place: ${data.result.place}*\n\n*Story*: ${data.result.story}\n`

    

 msg.replyImage({url: data.result.image}, zexxaMsg).catch(() => { return msg.reply('error saat mengirim media')})

 }

 }

    