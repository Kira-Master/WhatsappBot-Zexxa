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
    let res = await axios.post('https://www.irvankedesmm.co.id/api/services', { '45509', '3dcay0-32levh-a921xp-kjoqny-qkgneh' }, { headers: { 'Content-Type' : 'application/json' } }
    console.log(res.data)
    } catch(error) {
    console.error(error)
    }
    }
}