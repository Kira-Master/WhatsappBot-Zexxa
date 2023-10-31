const { ICommand } = require ('@libs/builders/command')

const axios = require ('axios')

module.exports = {

    category: 'Stalking',

    description: 'Stalk Instagram Account',

    limit: true,

    waitMessage: true,

    minArgs: 1,

    expectedArgs: '<username>',

    example: '{prefix}{command} paujikerenbanget',

    callback: async ({ msg, fullArgs }) => {

    

    let { data } = await axios.get('https://xzn.wtf/api/igstalk?user={query}&apikey=zexxabot'.format({ query: fullArgs}))
    
    let xxx = await axios.get('https://xzn.wtf/api/igstalk?user={query}&apikey=zexxabot'.format({ query: fullArgs}))

    if (xxx.status !== 200) return msg.reply('username tidak ditemukan')

    

    let zexxaMsg = `*_BERHASIL STALKING ${data.username}_*\n\n`

    zexxaMsg += `*Acc Name: ${data.fullname}*\n`

    zexxaMsg += `*Followers: ${data.followers}*\n`

    zexxaMsg += `*Following: ${data.following}*\n`

    zexxaMsg += `*Total Post: ${data.posts}*\n`

    zexxaMsg += `*Bio*: ${data.bio}\n`

    

    msg.replyImage({url: data.photo_profile}, zexxaMsg).then(() =>

    { return msg.reply('1 limit terpakai')

    }).catch(() => { return msg.reply('error saat mengirim data')

    })

    }

    }