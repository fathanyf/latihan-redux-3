import Link from 'next/link'
import { ToastContainer, Slide } from 'react-toastify'
import GameList from '../components/gamecomponents/gamelist'


export default function Home() {
  return (
    <>
      <div>
        <header className="showcase">
          <div className="showcase-top">
            <img src="/logochapter10.png" style={{ width: '325px' }} />
            <Link href='/auth/signin'><a className='btn btn-rounded'>Sign In</a></Link>
          </div>
          <div className="showcase-content">
            <h1>Next level Gaming</h1>
            <p>Free Trial all games for 30 days</p>
            <Link href='/auth/signup'><a className="btn btn-xl">Sign up for free <i className="fas fa-chevron-right btn-icon" /></a></Link>
          </div>
        </header>
        <GameList />
      </div>
    </>
  )
}
