import axios from 'axios'
const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
const upload = multer()

app.use(cors())

app.get('/api/transcribe', (req, res) => {
  res.json({ msg: 'poshel ti' })
  console.log('server hit')
})

app.post('/api/transcribe', upload.single('file'), async (req, res) => {
  console.log(req.file)

  const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', {
    headers: {
      Authorization: `Bearer ${process.env.API}`,
      'Content-Type': 'multipart/form-data'
    },
    method: 'POST',
    body: formData,
  })

  res.json({ message: 'Successfully uploaded file' })
})

app.listen('5000', () => {
  console.log('app is running on port 5000')
})