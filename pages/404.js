import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const NotFoundPage = () => {
    const router = useRouter()

    // set time before back to index(landing) page

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 2000);
    }, [])

    return (
        <>
            <Head>
                <title>Chapter 10 | 404 Not Found </title>
            </Head>
            <section className="notfound">
                <div className="d-flex justify-content-center">
                    <div className="notfound-content">
                        <h1 className='mt-5 text-uppercase'>Error<span className='text-danger'> 404</span></h1>
                        <p><span className='text-danger'>The Page your request</span> ,Was Not Found !!</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NotFoundPage