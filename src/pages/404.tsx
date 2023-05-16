import Link from 'next/link'
import Image from 'next/image'
import { MainLayout } from '@/Layouts/MainLayout'
import pic404 from '../assets/404.png'

export default function ErrorPage() {
  return (
    <MainLayout title="404">
      <h1>Error 404</h1>
      <Image src={pic404} height={400} width={500} alt="404" />
      <Link className="link" href={'/'}>
        Go home ⇒
      </Link>
    </MainLayout>
  )
}
