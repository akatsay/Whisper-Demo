import { useState, useEffect } from 'react'
import { MainLayout } from '@/Layouts/MainLayout'
import { NextPage } from 'next'

import { ChangeEvent } from 'react'

const Home: NextPage = () => {

  const [videofile, setVideofile] = useState<File | null>(null)
  const [videoBase64, setVideoBase64] = useState<string | null>(null)
  const [convertedText, setConvertedText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setVideofile(file)
    }
  }

  const convertVideoToBase64 = async (video: File | null) => {
    const reader: any = new FileReader()
    await reader.readAsDataURL(video)
    reader.onloadend = () => {
      const base64Data = reader.result as string
      setVideoBase64(base64Data)
    }
    reader.onerror = (error: any) => {
      console.log(error)
    }
  }

  useEffect(() => {
    if (videofile) {
      convertVideoToBase64(videofile)
    }
  }, [videofile])

  const handleSubmit = async () => {
    setLoading(true)

    try {

      const response = await fetch('http://localhost:3000/api/transcribe', {
        method: 'POST',
        body: videoBase64,
      })

      if (!response.ok) {
        throw new Error('Failed to transcribe video.')
      }

      const data = await response.json()
      setConvertedText(data.transcription)
    } catch (error: any) {
      console.log(error.message)
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
