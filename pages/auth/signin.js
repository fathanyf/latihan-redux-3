import Head from 'next/head'
import { useState, useContext } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'

const signin = () => {

    const { signIn,  user} = UserAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()
    
    // submitting user to signin

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signIn(email, password)
            toast.success('login success')
            router.push('/home')
        } catch (err) {
            console.log(err.message);
            toast.error(err.message)
        }
    }
    return (
        <>
            <Head>
                <title>Chapter 10 | Sign In </title>
            </Head>
            <section className="auth">
                <div className="d-flex justify-content-center">
                    <div className="login-box mt-5 dark-mode">
                        <div className="card card-outline card-danger bg-transparent">
                            <div className="card-header text-center">
                                <Link href='/'><a className="h1"><b>Chapter&nbsp;<span className='text-danger'>10</span></b></a></Link>
                            </div>
                            <div className="card-body">
                                <p className="login-box-msg">Sign in to start your session</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-3">
                                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="icheck-primary">
                                                <input type="checkbox" id="remember" />
                                                <label htmlFor="remember">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <button type="submit" className="btn btn-danger btn-block">Sign In</button>
                                        </div>
                                    </div>
                                </form>
                                <div className="social-auth-links text-center mt-2 mb-3">
                                    <a href="#" className="btn btn-block btn-primary">
                                        <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                                    </a>
                                    <a href="#" className="btn btn-block btn-danger">
                                        <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                                    </a>
                                </div>
                                <p className="mb-1">
                                    <a href="forgot-password.html">I forgot my password</a>
                                </p>
                                <p className="mb-0">
                                    <Link href='/auth/signup'><a className="text-center">Register a new membership</a></Link>
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

export default signin