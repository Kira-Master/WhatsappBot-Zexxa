const { ICommand } = require ('@libs/builders/command')
const axios = require ('axios').default
const { writeExif } = require('@libs/converter/exif')
const cheerio = require('cheerio')
module.exports = {
    category: 'Search',
    description: 'search whatsapp sticker',
    cooldown: 10 * 1000,
    limit: true,
    waitMessage: true,
    minArgs: 1,
    expectedArgs: 'gojosatoru, among, anime, animegif, bucin, rabbit, manusialidi, dinokuning, pentol, doge, gura, mukalu, spongebob, kawanspongebob, patrick, patrickgif, random, paimon, chat',
    example: '{prefix}{command} dinokuning',
    callback: async({ msg, fullArgs, client }) => {
    let text = fullArgs
let res = await getSticker(text);
let rand = res[Math.floor(Math.random() * res.length)];

// Ambil data gambar dari link
let gets = await axios.get(rand, { responseType: 'arraybuffer' });

// Tambahkan metadata dengan writeExif
let buffer = await writeExif({ data: gets.data, headers: { 'content-type': 'image/jpeg' } }, { packname: 'Zexxa', author: 'Bot' });

// Cek apakah buffer berhasil dibuat
if (!buffer) {
  return msg.reply('Gagal mengkonversi gambar');
}

// Lanjutkan proses pengiriman atau pemrosesan buffer stiker
        
        msg.replySticker({ url: rand })
	}
}

const sticker = async (text) => {
  try {
    const res = await axios.get(`https://getstickerpack.com/stickers?query=${text}`);
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
    
    return stickers;
    
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

    console.log('Gambar Sticker:', stickerImages);
    return stickerImages;
 
  } catch (error) {
    console.error(error);
  }
}