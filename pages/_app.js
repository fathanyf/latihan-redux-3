import '../styles/global2.css'
import 'react-toastify/dist/ReactToastify.min.css';

import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import { wrapper } from '../store/store'
import Navbar from '../components/maincomponents/Navbar'
import { ToastContainer, Slide } from "react-toastify";

const noAuth = ['/', '/auth/signin', '/auth/signup', '/403', '/404']

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <AuthContextProvider>
      <ToastContainer
          className="impct-toast"
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover
          transition={Slide}
        />
        {
          noAuth.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Navbar />
              <Component {...pageProps} />
            </ProtectedRoute>
          )
        }
      </AuthContextProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp) 
