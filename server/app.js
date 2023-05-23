require('dotenv').config()
const axios = require('axios')
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')

const app = express()
const upload = multer({ dest: 'uploads/' })

app.use(cors())

app.post('/api/transcribe', upload.single('file'), async (req, res) => {

  const fileStream = fs.createReadStream(req.file.path)
  const formData = new FormData()
  formData.append('file',fileStream, req.file.originalname)
  formData.append('model', 'whisper-1')

  console.log(req.file)
  console.log(formData)

  try {
    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        'Authorization': `Bearer ${process.env.API}`,
        'Content-type': 'multipart/form-data'
      }
    })

    res.json(response.data)
    
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ msg: `error sending request to openai: ${e.message}` })
  }

})

app.listen('5000', () => {
  console.log('app is running on port 5000')
})





// to bypass library //

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