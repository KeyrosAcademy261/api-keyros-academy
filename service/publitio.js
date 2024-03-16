require('dotenv').config()
const publitioAPI = require('publitio_js_sdk').default


const  publitio = new publitioAPI(process.env.API_KEY, process.env.API_SECRET)

module.exports = {publitio}