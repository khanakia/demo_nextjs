import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import Layout from 'src/features/app/components/layout/LayoutAuth'
import RegisterForm from 'src/features/auth/components/RegisterForm'
import { PublicOnlyRoute } from 'src/features/auth'

const Register = () => {
  const handleOnRegister = () => {
    Router.push("/")
  }
  return (
    <Layout center>
      <Head>
      <title>{process.env.NEXT_PUBLIC_APP_NAME} - Register</title>
      </Head>
      <div className="container1">
        {/* <RegisterForm onRegister={handleOnRegister} /> */}
      </div>
    </Layout>
  )
}

export default function RegisterPage()  {
  return (
    <PublicOnlyRoute>
      <Register />
    </PublicOnlyRoute>
  )
}

