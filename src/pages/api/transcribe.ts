import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai'
const fs = require('fs')

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb'
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const configuration = new Configuration({
    apiKey: process.env.API,
  })
  const openai = new OpenAIApi(configuration)

  const formData: any = new FormData()
  formData.append('file', req.body)

  console.log(formData)

  try {
    const data = await openai.createTranscription(
      formData,
      'whisper-1',
      'en',
    )
    res.status(200).json(data)
  } catch (e: any) {
    console.log(e.message)
    res.status(500).json(e)
  }
}

// https://api.openai.com/v1/audio/transcriptions
// to bypass the library