import { useState } from 'react'
import { MainLayout } from '@/Layouts/MainLayout'
import { NextPage } from 'next'
import { OpenAIApi, Configuration } from 'openai'

import { ChangeEvent } from 'react'

const API = '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'

const Home: NextPage = () => {

  const [videofile, setVideofile] = useState<File | null>(null)
  const [convertedText, setConvertedText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const configuration = new Configuration({
    apiKey: API,
  })
  const openai = new OpenAIApi(configuration)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setVideofile(file)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const data = await openai.createTranscription(videofile, 'whisper-1', 'en')
    } catch (e: any) {
      console.log(e.message)
    }
    setLoading(false)
  }

  return (
    <>
      <MainLayout title='Home'>
        <input 
          className='file-input' 
          onChange={handleFile} 
          type='file' 
          accept="video/mp4,video/x-m4v,video/*" 
        />
        <button  
          disabled={!videofile && true}
          className='button' 
          onClick={handleSubmit}
        >
          Submit video
        </button>
        {loading && <div className='loader'></div>}
        {convertedText && <p>{convertedText}</p>}
      </MainLayout>
    </>
  )
}

export default Home
