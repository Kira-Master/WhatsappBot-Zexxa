const fetch = require('node-fetch')
const cheerio = require('cheerio')
const axios = require('axios').default

function sfileSearch(query, page = 1) {
axios.get(`https://sfile.mobi/search.php?q=${query}&page=${page}`).then((res) => {

	let $ = cheerio.load(res.data.text())

	let result = []

	$('div.list').each(function () {

		let title = $(this).find('a').text()

		let size = $(this).text().trim().split('(')[1]

		let link = $(this).find('a').attr('href')

		if (link) result.push({ title, size: size.replace(')', ''), link })

	})

	return result
    })

}

function formatSize(bytes) {
        if (bytes >= 1000000000) { bytes = (bytes / 1000000000).toFixed(2) + " GB"; }
        else if (bytes >= 1000000) { bytes = (bytes / 1000000).toFixed(2) + " MB"; }
        else if (bytes >= 1000) { bytes = (bytes / 1000).toFixed(2) + " KB"; }
        else if (bytes > 1) { bytes = bytes + " bytes"; }
        else if (bytes == 1) { bytes = bytes + " byte"; }
        else { bytes = "0 bytes"; }
        return bytes;
    }

function runtime(seconds) {
        seconds = Number(seconds)
        var d = Math.floor(seconds / (3600 * 24))
        var h = Math.floor(seconds % (3600 * 24) / 3600)
        var m = Math.floor(seconds % 3600 / 60)
        var s = Math.floor(seconds % 60)
        var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : ""
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : ""
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : ""
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""
        return dDisplay + hDisplay + mDisplay + sDisplay
    }
module.exports = { runtime, formatSize, sfileSearch }