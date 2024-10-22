const axios = require('axios')

module.exports = {
    category: 'Owner',
    description: 'Add premium user',
    ownerOnly: true,
    example: '{prefix}{command}',
    callback: async ({ msg, client, args }) => {
try {
    // Mendeklarasikan body sebagai objek dengan key api_id dan api_key
    const body = {
        api_id: '45509',
        api_key: '3dcay0-32levh-a921xp-kjoqny-qkgneh'
    };

    // Mengirimkan permintaan POST menggunakan axios
    let { data } = await axios.post('https://www.irvankedesmm.co.id/api/services', body, { 
        headers: { 
            'Content-Type': 'application/json' 
        } 
    });
    
    if (Array.isArray(data.data)) {
        data.data.forEach((service, index) => {
            console.log(`Service ${index + 1}:`);
            console.log(service); // Menampilkan seluruh isi objek
        });
    } else {
        console.log('Data yang diterima bukan array.');
    }

} catch (error) {
    // Menangani error jika ada
    console.error(error);
}

    }
}