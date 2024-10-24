const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');

const lk21 = async (text) => {
  try {
    const baseUrl = 'https://tv4.lk21official.my';  // Tambahkan domain
    const proxy = {
  host: 'gw.dataimpulse.com',
  port: 823,
  auth: {
    username: '2cd11bc246af02f634ff__cr.id',
    password: '0509ccc4dc510af0'
  }
};

const httpsAgent = new https.Agent({
  rejectUnauthorized: false // Menonaktifkan verifikasi sertifikat SSL
});

const config = {
      proxy: proxy,
      httpsAgent: httpsAgent,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept-Language': 'en-US,en;q=0.9',  // Tambahkan beberapa header lain untuk membuat permintaan terlihat lebih alami
        'Referer': baseUrl
      }
    };

const { data } = await axios.get(`${baseUrl}/search.php?s=${encodeURIComponent(text)}&gsc.tab=0&gsc.q=${encodeURIComponent(text)}&gsc.page=1`, config);
    
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
      const { data: detailPage } = await axios.get(link);
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
    return [];
  }
}

module.exports = {
  lk21
};
