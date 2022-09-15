import type { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import ForgotPasswordForm from 'src/features/auth/components/ForgotPasswordForm'
import Layout from 'src/features/app/components/layout/LayoutAuth'
import { PublicOnlyRoute } from 'src/features/auth'

const ForgotPassword = () => {
  const handleOnForgotPassword = () => {
    Router.push("/auth/reset-password")
  }
  return (
    <Layout center>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - Forgot Password</title>
      </Head>
      <div className="container1">
        {/* <ForgotPasswordForm onForgotPassword={handleOnForgotPassword} /> */}
      </div>
    </Layout>
  )
}

export default function ForgotPasswordPage()  {
  return (
    <PublicOnlyRoute>
      <ForgotPassword />
    </PublicOnlyRoute>
  )
}

