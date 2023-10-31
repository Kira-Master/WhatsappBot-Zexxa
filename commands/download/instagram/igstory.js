const { instagramdl, instagramdlv2, instagramStory, instagramStoryv2 } = require('@bochilteam/scraper') 

module.exports = {
    category: 'Download',
    description: 'download story instagram',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<username>',
    example: '{prefix}{command} paujikerenbanget',
    callback: async({msg, fullArgs}) => {
        try{
            let data = await instagramStory(fullArgs).catch(_ => instagramStoryv2(fullArgs))
            console.log(data)
            let msgX = `*BERHASIL MENDAPAT STORY DARI ${data.user.username}*`
            for ( var i of data.results ) {
    msg.replyImage({url: i.url}, msgX)
                msg.replyVideo({url: i.url}, msgX)
                    
                
            }
        } catch(error) {
            throw error
        }
    }
}