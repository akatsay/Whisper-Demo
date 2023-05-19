import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai'

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

  try {
    const videoData = req.body
    console.log(videoData)

    const data = await openai.createTranscription(videoData, 'whisper-1', 'en')
    res.status(200).json(data)
  } catch (e: any) {
    console.log(e.message)
    res.status(500).json(e)
  }
}

// https://api.openai.com/v1/audio/transcriptions
// to bypass the library