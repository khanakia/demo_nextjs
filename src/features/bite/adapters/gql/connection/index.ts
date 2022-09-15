import { GetServerSidePropsContext } from 'next'
import { GraphQLClient, gql } from 'graphql-request'
import Cookies from 'cookies'
import { getToken, getTokenName } from 'src/features/auth'
const endpoint = process.env.NEXT_PUBLIC_API_HOST + '/query'

let gqlOptions: any = {
  credentials: 'include',
  mode: 'cors',
  headers: {
    // authorization: 'Bearer MY_TOKEN',
  },
}

export const grecaptchaExecute = () => {
  if(!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) return
	return new Promise(function (resolve, reject) {
    const win: any = window
		win.grecaptcha.ready(function () {
			win.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "action_name" }).then(function (token: any) {
				// console.log(token)
				// Verify the token on the server.
				resolve(token);
			});
		});
	});
};


export const getGqlClient = () => {
  if(getToken()) {
    gqlOptions['headers']['token'] = getToken() as any
  }
  return  new GraphQLClient(endpoint, gqlOptions)
}

export const getGqlClientAsync = async (props?: {captcha?: boolean}) => {
  const { captcha=false } = props||{}
  if(getToken()) {
    gqlOptions['headers']['token'] = getToken() as any
  }

  if(captcha && !process.env.NEXT_PUBLIC_RECAPTCHA_BYPASS_KEY) {
    const captchaToken = await grecaptchaExecute()
    gqlOptions['headers']['x-captcha-res'] = captchaToken
    // console.log(captchaToken)
  }

  if(process.env.NEXT_PUBLIC_RECAPTCHA_BYPASS_KEY) {
    gqlOptions['headers']['x-captcha-bypass'] = process.env.NEXT_PUBLIC_RECAPTCHA_BYPASS_KEY
  }

  return  new GraphQLClient(endpoint, gqlOptions)
}

// GqlClient js-cookies does not gets token so this is gqlclient we created for server
// use `cookies` pkg to get the token from server request
export const getGqlClientServer = (args: GetServerSidePropsContext) => {
  const {req, res } = args
  const cookies = new Cookies(req, res)
  const tokenName = getTokenName()
  let token = cookies.get(tokenName)
  if(token) {
    gqlOptions['headers']['token'] = token
  }

  return new GraphQLClient(endpoint, gqlOptions)
}
