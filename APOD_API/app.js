import Express from 'express'
import { config } from 'dotenv'
import fetch from 'node-fetch'
import fs from 'fs'

config()
  
const app = Express()

app.use(Express.json())

app.set('trust proxy', true);

let data = {}

setInterval(async () => { 

    await refreshData()

}, 900000 /* 15 minutes */)

refreshData()

async function refreshData() { 

    let apiData = null

    try {
        let APIresp = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
        apiData = await APIresp.json()
    }

    catch (err) { 

        console.log(err)
        return

    }

    if (!apiData) { 

        return 

    }

    data = new Data(apiData)

}

class Data { 

    constructor(apiData) { 
        
        this.date = apiData.date,
        this.description = apiData.explanation,
        this.type = apiData.media_type,
        this.title = apiData.title,
        this.url = apiData?.hdurl || apiData.url
        
        if (apiData?.hdurl && apiData?.url) {

            this.compressed = apiData.url

        }
        
        if (this.url.startsWith("//")) { 

            this.url = "https:" + this.url
            
        }

        this.credit = apiData?.copyright || "Unknown Contributor"

    }

}

app.get('/', async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*")

    res.json(data)

})

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${process.env.PORT}`)
})