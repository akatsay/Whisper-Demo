import axios from 'axios'
import { useState, useEffect } from 'react'
import { MainLayout } from '@/Layouts/MainLayout'
import { NextPage } from 'next'

import { ChangeEvent } from 'react'

const Home: NextPage = () => {

  const [videofile, setVideofile] = useState<File | null>(null)
  const [formData, setFormData] = useState<FormData | null>(null)
  const [convertedText, setConvertedText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setVideofile(file)
    }
  }

  useEffect(() => {
    const data: any = new FormData()
    data.append('file', videofile)
    setFormData(data)
  }, [videofile])

  const handleSubmit = async () => {
    setLoading(true)
    console.log(videofile)
    console.log(...formData)
    try {
      const response = await axios.post('http://localhost:5000/api/transcribe', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })

      setConvertedText(response.data.text)

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
          accept='video/mp4,video/x-m4v,video/*' 
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