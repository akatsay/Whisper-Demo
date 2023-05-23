require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const upload = multer()

app.use(cors())

app.post('/api/transcribe', upload.single('file'), async (req, res) => {

  // const fileStream = fs.createReadStream(req.file)
  // const fileStream = fs.createReadStream(__dirname + '/uploads/Nelson.mp4')


  console.log(req.file)

  try {

    const fileBuffer = req.file.buffer
    const fileName = req.file.originalname
    const filePath = path.join(__dirname, 'uploads', fileName)

    fs.writeFileSync(filePath, fileBuffer)
    const fileStream = fs.createReadStream(filePath)

    const configuration = new Configuration({
      apiKey: process.env.API,
    })
    const openai = new OpenAIApi(configuration)

    const data = await openai.createTranscription(fileStream, 'whisper-1', 'en')
    console.log(data.data.text)
    res.json(data.data.text)

    fs.unlinkSync(filePath)
    
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




// fetch option //

// try {

//   const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
//     headers: {
//       Authorization: `Bearer ${process.env.API}`,
//     },
//     method: 'POST',
//     body: formData,
//   })

//   const data = await res.json()

//   res.json(data)

// } catch (e) {
//   console.log(e.message)
//   res.status(500).json({msg: `error sending request to openai: ${e.message}`})
// }