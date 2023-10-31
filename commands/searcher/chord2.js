const { ICommand } = require ('@libs/builders/command')
const x = require ('caliph-api')
const axios = require ('axios')

module.exports = {
    category: 'Search',
    description: 'Search a Chord by song you request',
    limit: true,
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<query>',
    example: '{prefix}{command} doremi',
    callback: async ({ msg, fullArgs }) => {
    let xxx = await x.search.chordlagu(fullArgs)
    if ( xxx.status !== 200) return msg.reply('chord tidak ada')
    let zexxaMsg = `*BERHASIL MENDAPAT CHORD*\n\n*ID Req: ${xxx.result.id}*\n*Title: ${xxx.result.title}*\n*Chord*: ${xxx.result.content}`
    msg.reply(zexxaMsg).then(() => 
    { return msg.reply('limit -1')
    }).catch(() => 
    { return msg.reply('failed send data')
    })
    }
    }
    