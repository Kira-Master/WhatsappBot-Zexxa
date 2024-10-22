const axios = require('axios')

module.exports = {
    category: 'Owner',
    description: 'Add premium user',
    ownerOnly: true,
    example: '{prefix}{command}',
    callback: async ({ msg, client, fullArgs }) => {
try {
    const body = {
        api_id: '45509',
        api_key: '3dcay0-32levh-a921xp-kjoqny-qkgneh'
    };

    let res = await axios.post('https://www.irvankedesmm.co.id/api/services', body, { 
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });

    // Cek apakah res.data adalah array
    if (Array.isArray(res.data.data)) {
        // Cari service dengan id 777
        let specificService = res.data.data.find(service => service.id === fullArgs);

        if (specificService) {
            console.log(`Service dengan ID ${fullArgs} ditemukan:`);
            console.log(specificService); // Menampilkan seluruh detail dari service dengan id 777
        } else {
            console.log(`Service dengan ID ${fullArgs} tidak ditemukan.`);
        }
    } else {
        console.log('Data yang diterima bukan array.');
    }

} catch (error) {
    console.error(error);
}
    }
}