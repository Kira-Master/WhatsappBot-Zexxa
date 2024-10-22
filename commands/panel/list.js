const axios = require('axios')

module.exports = {
    category: 'Owner',
    description: 'Add premium user',
    ownerOnly: true,
    minArgs: 2,
    expectedArgs: '<number> <date>',
    example: '{prefix}{command} 62xxxx',
    callback: async ({ msg, client, args }) => {
    try {
    const body = {
    let api_id = '45509'
    let api_key = '3dcay0-32levh-a921xp-kjoqny-qkgneh'
    }
    let res = await axios.post('https://www.irvankedesmm.co.id/api/services', body, { headers: { 'Content-Type' : 'application/json' } } )
    console.log(res.data)
    } catch(error) {
    console.error(error)
    }
    }
}