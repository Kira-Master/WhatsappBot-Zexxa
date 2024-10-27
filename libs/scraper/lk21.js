const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const lk21 = async (text) => {
  try {
    const baseUrl = 'https://tv4.lk21official.my'; // Tambahkan domain
    
    const config = {
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "max-age=0",
        "cf-ipcountry": "ID",
        "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
      },
    };

    const searchUrl = `${baseUrl}/search.php?s=${encodeURIComponent(text)}`; // URL pencarian
    console.log('Request URL:', searchUrl); // Log URL untuk debugging

    const { data } = await axios.get(searchUrl, config); // Melakukan permintaan ke server

    const $ = cheerio.load(data);
    const scrape = [];

    // Mengumpulkan semua promises untuk di-fetch secara bersamaan
    const promises = $('.site-content .container .search > div:nth-child(2).row > div > div.search-wrapper > div.search-item').map(async (index, element) => {
      const posterElement = $(element).find('.search-content h3 a');
      const thumbElement = $(element).find('.search-poster figure a img');
      const thumbPath = thumbElement.attr('src');
      const linkPath = posterElement.attr('href');
      const thumb = `${baseUrl}${thumbPath}`;
      const link = `${baseUrl}${linkPath}`;
      const title = posterElement.attr('title'); 
      const director = $(element).find('.search-content p').first().text();
      const cast = $(element).find('.search-content p').eq(1).text();

      // Ambil halaman detail film untuk mendapatkan link download
      const { data: detailPage } = await axios.get(link, config);
      const x = cheerio.load(detailPage);

      // Ambil link download dari onclick
      const downloadElement = x('#download-movie a');
      const downloadLink = downloadElement.attr('onclick');

      // Ekstrak URL dari onclick menggunakan regex
      const downloadUrlMatch = downloadLink ? downloadLink.match(/open_new\('(.+?)'\)/) : null;
      const downloadUrl = downloadUrlMatch ? downloadUrlMatch[1] : 'Tidak ada link download';

      // Kembalikan hasil untuk dikumpulkan dalam array
      return {
        title,
        link,
        thumb,
        director,  // Masukkan sutradara
        cast,      // Masukkan casting
        downloadUrl  // Masukkan link download
      };
    }).get(); // Menggunakan .get() untuk mengubah ke array

    // Tunggu hingga semua promises selesai
    const results = await Promise.all(promises);

    // Filter untuk menghapus item yang tidak valid jika diperlukan
    const filteredResults = results.filter(result => result.link !== undefined);

    console.log(filteredResults); // Menampilkan hasil akhir
    return filteredResults;

  } catch (error) {
    console.error('Terjadi kesalahan saat melakukan scraping:', error.message || error);
    if (error.response) {
      console.error('Response Body:', error.response.data); // Log body response untuk debug
    }
    return [];
  }
};

module.exports = {
  lk21
};
