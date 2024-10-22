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
    
    let [m1, m2] = fullArgs.split('|')
    m2 = parseFloat(m2)

    // Cek apakah res.data.data adalah array
    if (Array.isArray(res.data.data)) {
    
    res.data.data.forEach(service => {
            console.log(`Service: ${service.name}, Price: ${service.price}, Type of price: ${typeof service.price}`);
        });
        // Cari service dengan nama yang spesifik
        let specificServices = res.data.data.filter(service => service.name.toLowerCase().includes(m1.toLowerCase()) && service.price < m2);

        if (specificServices.length === 0) {
            console.log("Tidak ada layanan yang ditemukan dengan kata ", m1, 'Dan harga', m2);
        } else {
        let zxxa = ''
        for (let i of specificServices) {
        zxxa += `ID: ${i.id}\nNama: ${i.name}\nHarga: Rp.${i.price}\n\n`
        }
        await msg.reply(zxxa)
        }
    } else {
        console.log('Data yang diterima bukan array.');
    }

} catch (error) {
    console.error('Terjadi kesalahan:', error.message || error);
}

    }
}