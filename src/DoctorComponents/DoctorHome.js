import { React, useState, useEffect } from 'react'
import Footer from '../Footer';

export default function DoctorHome() {


    const [doct, setDoct] = useState("");

    useEffect(() => {
        const storedDoctor = sessionStorage.getItem('doctor');
        if (storedDoctor) {
            setDoct(JSON.parse(storedDoctor));
        }
    }, []);
    return (
        <>
            <section className="  bg-yellow-600 py-12 md:py-24 lg:py-32" style={{ marginTop: '6rem', marginBottom: '1rem' }} id="home"

            >
                <div className="container px-4 md:px-6 text-center space-y-6">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                        Welcome to {doct.doctorName}
                    </h1>
                    <img
                        className='img-fluid rounded-circle'
                        id='productImage'
                        src={`http://localhost:8091/uploads/${doct.doctorPic}`}
                        style={{ width: "100px", height: "100px" }}
                        alt='notfound
                        '
                    />
                    <div>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
