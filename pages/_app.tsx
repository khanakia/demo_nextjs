import { QueryClient, QueryClientProvider, } from 'react-query'
import { QueryParamProvider } from "use-query-params";
import 'bootstrap/dist/css/bootstrap.css'
// import '@fortawesome/fontawesome-svg-core/styles.css' 
import 'react-toastify/dist/ReactToastify.css';
import "antd/dist/antd.css"
import '../styles/auth.scss'
// import '../styles/vue-formwizard.scss'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import {NextQueryParamProvider} from 'next-query-params';

const queryClient = new QueryClient()

import { AuthProvider } from 'src/features/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextQueryParamProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?
            <Script id='google-recpatcha' src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} strategy="lazyOnload"  />
            : null
          }
          {
            process.env.NEXT_PUBLIC_GTM_ID ?
            <>
            <Script id="gtm-script" strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}} />
            </>
            : null
          }
          <Component {...pageProps} />
        </QueryClientProvider>
      </AuthProvider>
    </NextQueryParamProvider>

  )
}
export default MyApp
