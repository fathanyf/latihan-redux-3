import {useRouter} from 'next/router'
import { useContext} from 'react'
import { toast } from 'react-toastify'
import { UserAuth } from '../context/AuthContext'

// protected route for auth page

const ProtectedRoute = ({children}) => {
    const {user} = UserAuth()
    
    const router = useRouter()
      if (!user) {
          router.push('/403')
      }
      return children
}

export default ProtectedRoute