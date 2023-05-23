require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const {Readable} = require('stream')


const app = express()
const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 } })

app.use(cors())

app.post('/api/transcribe', upload.single('file'), async (req, res) => {

  console.log(req.file)

  try {
    const fileBuffer = req.file.buffer
    const stream = Readable.from(fileBuffer)
    stream.path = req.file.originalname

    const configuration = new Configuration({
      apiKey: process.env.API,
    })
    const openai = new OpenAIApi(configuration)

    const data = await openai.createTranscription(stream, 'whisper-1')
    res.json(data.data.text)
    
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ msg: `error sending request to openai: ${e.message}` })
  }

})

app.listen('5000', () => {
  console.log('app is running on port 5000')
})





// to bypass library //

// const formData = new FormData()
// formData.append('file',fileStream, req.file.originalname)
// formData.append('model', 'whisper-1')

// const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
//   headers: {
//     'Authorization': `Bearer ${process.env.API}`,
//     'Content-type': 'multipart/form-data'
//   }
// })

// res.json(response.data)