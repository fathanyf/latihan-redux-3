import { useRouter } from 'next/router';
import React,{useEffect} from 'react'

const ForbiddenPage = () => {
    const router = useRouter()

    // set time before back to sign in page

    useEffect(() => {
        setTimeout(() => {
            router.push('/auth/signin')
        }, 3000);
      }, [])

    return (
        <>
            <section className="forbidden">
                <div className="d-flex justify-content-center">
                    <div className="forbidden-content">
                    <h1 className='mt-5 text-uppercase'>Error<span className='text-danger'> 403</span></h1>
                    <p><span className='text-danger'>Not This Time</span> , Access Forbidden !!</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForbiddenPage