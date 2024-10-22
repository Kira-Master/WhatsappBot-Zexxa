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

    console.log(res.data.data);

    // Cek apakah res.data.data adalah array
    if (Array.isArray(res.data.data)) {
        // Cari service dengan nama yang mengandung "Tiktok Followers"
        let specificServices = res.data.data.filter(service => service.name.includes(fullArgs));

        if (specificServices.length === 0) {
            console.log("Tidak ada layanan yang ditemukan dengan kata ", fullArgs);
        } else {
            console.log(specificServices); // Menampilkan layanan yang ditemukan
        }
    } else {
        console.log('Data yang diterima bukan array.');
    }

} catch (error) {
    console.error('Terjadi kesalahan:', error.message || error);
}

    }
}