const fs = require('fs');
const { tmpdir } = require("os");
const Crypto = require("crypto");
const ff = require('fluent-ffmpeg');
const webp = require("node-webpmux");
const path = require("path");

async function imageToWebp(media) {
    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`);

    fs.writeFileSync(tmpFileIn, media);

    await new Promise((resolve, reject) => {
        ff(tmpFileIn)
            .on("error", (err) => {
                console.error('Error saat konversi gambar ke WebP:', err);
                reject(err);
            })
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
            ])
            .toFormat("webp")
            .save(tmpFileOut);
    });

    const buff = fs.readFileSync(tmpFileOut);
    fs.unlinkSync(tmpFileOut);
    fs.unlinkSync(tmpFileIn);
    return buff;
}

async function videoToWebp(media) {
    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`);

    fs.writeFileSync(tmpFileIn, media);

    await new Promise((resolve, reject) => {
        ff(tmpFileIn)
            .on("error", (err) => {
                console.error('Error saat konversi video ke WebP:', err);
                reject(err);
            })
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00",
                "-t",
                "00:00:05",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat("webp")
            .save(tmpFileOut);
    });

    const buff = fs.readFileSync(tmpFileOut);
    fs.unlinkSync(tmpFileOut);
    fs.unlinkSync(tmpFileIn);
    return buff;
}

async function writeExif(media, metadata) {
    try {
        console.log('Media yang diterima:', media);
        console.log('Metadata yang diterima:', metadata);
        
        if (!media.mimetype) {
            console.error('Tipe media tidak tersedia, pastikan objek media memiliki properti mimetype');
            return null;
        }

        console.log('Tipe media:', media.mimetype);
        
        let wMedia = /webp/.test(media.mimetype) ? media.data 
            : /image/.test(media.mimetype) ? await imageToWebp(media.data) 
            : /video/.test(media.mimetype) ? await videoToWebp(media.data) 
            : null;

        if (!wMedia) {
            console.error('Media tidak dikenali atau gagal dikonversi ke WebP');
            return null;
        }

        console.log('Media setelah konversi:', wMedia.length);

        const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.webp`);
        const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.webp`);

        fs.writeFileSync(tmpFileIn, wMedia);
        console.log('File sementara berhasil dibuat:', tmpFileIn);

        if (metadata.packname || metadata.author) {
            const img = new webp.Image();
            const json = {
                "sticker-pack-id": `https://github.com/ikhsan77/SHANNBot-MD`,
                "sticker-pack-name": metadata.packname || "",
                "sticker-pack-publisher": metadata.author || "",
                "emojis": metadata.categories ? metadata.categories : [""]
            };

            const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00]);
            const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
            const exif = Buffer.concat([exifAttr, jsonBuff]);
            exif.writeUIntLE(jsonBuff.length, 14, 4);

            await img.load(tmpFileIn).catch(err => {
                console.error('Error saat memuat WebP:', err);
                throw err;
            });

            if (fs.existsSync(tmpFileIn)) {
                fs.unlinkSync(tmpFileIn);
            } else {
                console.error('File sementara tidak ditemukan:', tmpFileIn);
            }

            img.exif = exif;
            await img.save(tmpFileOut).catch(err => {
                console.error('Error saat menyimpan WebP dengan exif:', err);
                throw err;
            });

            console.log('File WebP dengan exif berhasil disimpan:', tmpFileOut);
            return tmpFileOut;

        } else {
            console.error('Metadata packname atau author tidak ada.');
            return null;
        }

    } catch (error) {
        console.error('Terjadi kesalahan di writeExif:', error);
        return null;
    }
}

module.exports = { imageToWebp, videoToWebp, writeExif };
