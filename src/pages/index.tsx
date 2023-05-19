import { useState, useEffect } from 'react'
import { MainLayout } from '@/Layouts/MainLayout'
import { NextPage } from 'next'

import { ChangeEvent } from 'react'

const Home: NextPage = () => {

  const [videofile, setVideofile] = useState<File | null>(null)
  const [convertedText, setConvertedText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setVideofile(file)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {

      const formData: any = new FormData()
      formData.append('video', videofile)

      const response = await fetch('http://localhost:3000/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
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
