import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb'
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const formData = req.body
    console.log(formData)

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      headers: {
        Authorization: `Bearer ${'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'}`,
      },
      method: 'POST',
      body: formData,
    })

    res.status(200).json(response)

  } catch (e: any) {
    console.log(e.message)
    res.status(500).json(e)
  }
}

// https://api.openai.com/v1/audio/transcriptions
// to bypass the library