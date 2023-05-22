import { timeStamp } from 'console'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
// const multer = require('multer')
const formidable = require('formidable')
const fs = require('fs')

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
    // console.log(formData)

    const response: any = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      headers: {
        Authorization: `Bearer ${process.env.API}`,
      },
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('couldnt fetch')
    }
    
    res.status(200).json(response)

  } catch (e: any) {
    console.log(e.message)
    res.status(500).json(e)
  }
}