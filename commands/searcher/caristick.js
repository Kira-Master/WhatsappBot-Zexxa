const { ICommand } = require ('@libs/builders/command')
const axios = require ('axios').default
const { writeExif, writeExifImg } = require('@libs/converter/exif')
const sharp = require('sharp')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

module.exports = {
    category: 'Search',
    description: 'search whatsapp sticker',
    cooldown: 3 * 1000,
    limit: true,
    waitMessage: true,
    minArgs: 1,
    expectedArgs: 'gojosatoru, among, anime, animegif, bucin, rabbit, manusialidi, dinokuning, pentol, doge, gura, mukalu, spongebob, kawanspongebob, patrick, patrickgif, random, paimon, chat',
    example: '{prefix}{command} dinokuning',
    callback: async({ reaction, m, msg, fullArgs, client }) => {
        let text = fullArgs;
        let res = await getSticker(text);
        console.log('Query: ', text)
        for (let i of res) {
            // Ambil data gambar dari link stiker
            let gets = await axios.get(i, { responseType: 'arraybuffer' });
            
            let typeImage = gets.headers['content-type'];
            let buffer = await writeExifImg(gets.data, { packname: 'ZEXXA', author: 'DEV' });

            if (!buffer) {
                console.log('Gagal mengkonversi gambar atau menambahkan metadata');
            } else {
                console.log('Berhasil menambahkan metadata ke gambar.');

                // Lanjutkan proses pengiriman atau pemrosesan buffer stiker
                await new Promise(resolve => setTimeout(resolve, 1000)); // Jeda 1 detik
                await msg.replySticker({ url: buffer });
            }
        }
    }
}

const sticker = async (text) => {
  try {
    // Melakukan permintaan GET untuk mendapatkan data awal dan informasi halaman
    const initialRes = await axios.get(`https://getstickerpack.com/stickers?query=${text}&page=1`);
    const initialPage = cheerio.load(initialRes.data);
    
    // Menghitung total halaman dari elemen pagination
    const totalPages = initialPage('#paginationBlock .page-item a.page-link')
      .map((index, element) => {
        const pageNum = parseInt(initialPage(element).text());
        return isNaN(pageNum) ? null : pageNum;
      })
      .get()
      .filter(num => num !== null)
      .sort((a, b) => a - b)
      .pop() || 1; // Ambil nomor halaman terakhir atau 1 jika tidak ada

    console.log(`Total halaman yang tersedia: ${totalPages}`);

    // Menghasilkan halaman acak antara 1 dan totalPages
    const randomPage = Math.floor(Math.random() * totalPages) + 1;
    console.log(`Halaman yang dipilih secara acak: ${randomPage}`);

    // Melakukan permintaan GET dengan halaman acak
    const res = await axios.get(`https://getstickerpack.com/stickers?query=${text}&page=${randomPage}`);
    const $ = cheerio.load(res.data);
    
    const stickers = [];
    $('#stickerPacks > .container > div.row > div.col-md-6').each((index, element) => {
      const title = $(element).find('a').text();
      const link = $(element).find('a').attr('href');
      
      stickers.push({
        title: title.trim(),
        link  // Pastikan link lengkap
      });
    });

    // Mengambil hingga 5 item secara acak dari stickers
    const limitedStickers = stickers.length > 5 
      ? stickers.sort(() => Math.random() - 0.5).slice(0, 5) 
      : stickers;

    console.log(`Jumlah stiker yang ditemukan: ${limitedStickers.length}`);
    return limitedStickers; // Kembalikan sticker yang sudah dibatasi

  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

const getSticker = async (text) => {
  try {
    const res = await sticker(text);
    
    if (res.length === 0) {
      console.error('Tidak ada sticker yang ditemukan');
      return;
    }

    // Memilih satu hasil secara acak
    const randomSticker = res[Math.floor(Math.random() * res.length)];

    console.log('Sticker acak terpilih:', randomSticker.link);
    const take = await axios.get(randomSticker.link);
    const $ = cheerio.load(take.data);
    
    const stickerImages = [];
    $('#stickerPack > .container > .row > div.col-xl-3').each((index, element) => {
      const imgSrc = $(element).find('img').attr('data-src-large');  // Ambil src dari tag img
      stickerImages.push(imgSrc);
    });

    // Jika jumlah stickerImages kurang dari 5, ambil semua
    const count = Math.min(stickerImages.length, 5);
    
    // Mengacak stickerImages
    const shuffled = stickerImages.sort(() => 0.5 - Math.random());
    // Mengambil 5 item secara acak
    const limitedStickerImages = shuffled.slice(0, count);

    console.log('Gambar Sticker:', limitedStickerImages);
    return limitedStickerImages;

  } catch (error) {
    console.error(error);
  }
}