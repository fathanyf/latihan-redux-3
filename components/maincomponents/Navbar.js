import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { UserAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { logout, user } = UserAuth()

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      // router.push('/auth/signin')
      toast.warning("your're now logout")
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message)
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark dark-mode">
        <div className="container">
          <Link href="/home">
            <a className="navbar-brand">
              <img src="/logochapter10.png" style={{ width: '125px' }} />
            </a>
          </Link>
          <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse order-3" id="navbarCollapse">
            {/* Left navbar links */}
            <ul className="navbar-nav">
              <Link className="nav-item" href="/home">
                <a className="nav-link ml-5">Home</a>
              </Link>
              <Link className="nav-item" href="/games">
                <a className="nav-link">Playground</a>
              </Link>
            </ul>
          </div>
          <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
            <Link className="nav-item" href={{pathname:'/account',query:{id:user?.uid}}}>
              <a className="nav-link">
                <i className="far fa-user-circle" /> {user && user.email}
              </a>
            </Link>
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="fas fa-cog" /> Manage User
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <Link href='/account/profile'>
                <a className="dropdown-item">
                  <i className="fas fa-user mr-2" /> Profile
                </a>
                </Link>
                <hr />
                <a href="#" className="dropdown-item">
                  <i className="fas fa-key mr-2" /> Reset Password
                </a>
                <hr />
                <button className="dropdown-item dropdown-footer" onClick={handleLogout}>Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar