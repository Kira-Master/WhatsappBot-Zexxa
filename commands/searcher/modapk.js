const { ICommand } = require ('@libs/builders/command')
const x = require ('caliph-api')
const axios = require ('axios')

module.exports = {
    category: 'Search',
    description: 'Find some mod apk from happymod',
    cooldown: 60 * 1000,
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<query>',
    example: '{prefix}{command} zombie tsunami',
    callback: async ({ msg, fullArgs }) => {
    
    let xxx = await x.search.happymod(fullArgs)
    //if ( xxx.data.status !== 200) return msg.reply('tidak ditemukan')
    //console.log(xxx)
    let zexxaMsg = `*DATA DIDAPATKAN*\n\n`
    
    for ( let i of xxx.result ) {
    zexxaMsg += `*Title: ${i.title}*\n`
    zexxaMsg += `*Link: ${i.link}*\n\n`
    }
    await msg.replyImage({ url: xxx.result[0].thumb }, zexxaMsg).catch(() => 
    { return msg.reply('error saat mengirim data')
    })
    }
    }
    
    