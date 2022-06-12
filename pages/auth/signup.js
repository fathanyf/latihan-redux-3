import Head from 'next/head'
import { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'

const signup = () => {

    const {createUser,setIsAuth } = UserAuth()

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    // submitting user to signup

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createUser(email, password, displayName)
            router.push('/home')
            toast.success("you're account now is activated")
        } catch (err) {
            toast.error(err.message)
            console.log(err.message);
        }
    }

    return (
        <>
            <Head>
                <title>Chapter 10 | Sign Up </title>
            </Head>
            <section className="auth">
                <div className="d-flex justify-content-center">
                    <div className="login-box mt-5 dark-mode">
                        <div className="card card-outline card-danger bg-transparent">
                            <div className="card-header text-center">
                                <Link href='/'><a className="h1"><b>Chapter&nbsp;<span className='text-danger'>10</span></b></a></Link>
                            </div>
                            <div className="card-body">
                                <p className="login-box-msg">Sign up for free</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-3">
                                        <input type="text" name="displayName" onChange={(e) => setDisplayName(e.target.value)} className="form-control" placeholder='your name...'/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder='your email...'/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder='make your password...'/>
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                        <button type="submit" className="btn btn-danger btn-block">Sign Up</button>
                                    
                                </form>
                                <div className="social-auth-links text-center mt-2 mb-3">
                                    <a href="#" className="btn btn-block btn-primary">
                                        <i className="fab fa-facebook mr-2" /> Sign up using Facebook
                                    </a>
                                    <a href="#" className="btn btn-block btn-danger">
                                        <i className="fab fa-google-plus mr-2" /> Sign up using Google+
                                    </a>
                                </div>
                                <p className="mb-0">
                                    <Link href='/auth/signin'><a className="text-center">I Already have membership</a></Link>
                                </p>
                                <Link href='/'><a>back <i className="fas fa-arrow-circle-right mt-1"></i></a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default signup