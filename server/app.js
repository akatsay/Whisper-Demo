require('dotenv').config()
const axios = require('axios')
const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
const upload = multer()

app.use(cors())

app.post('/api/transcribe', upload.single('file'), async (req, res) => {

  const formData = new FormData()
  formData.append('file', req.file)
  formData.append('model', 'whisper-1')
  formData.append('language', 'en')

  try {
    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', {
      formData,
      headers: {
        'Authorization': `Bearer ${process.env.API}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    res.json(response)

  } catch (e) {
    console.log(e.message)
    res.status(500).json({msg: `error sending request to openai: ${e.message}`})
  }

})

app.listen('5000', () => {
  console.log('app is running on port 5000')
})