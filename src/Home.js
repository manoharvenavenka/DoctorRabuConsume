import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <section className="  bg-purple-600 py-12 md:py-24 lg:py-32" style={{ marginTop: '6rem', marginBottom: '1rem' }} id="home"

            >
                <div className="container px-4 md:px-6 text-center space-y-6">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                        Welcome to Doctor Babu
                    </h1>
                    <p className="max-w-[700px] mx-auto text-gray-200 md:text-xl lg:text-lg">
                        Providing top-notch medical care and personalized attention to every patient.
                    </p>
                    <div>
                        <Link
                            to="#"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 py-2 text-sm font-medium text-purple-600 shadow transition-colors hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800 dark:focus:ring-gray-300"
                        >
                            Book an Appointment
                        </Link>
                    </div>
                </div>
            </section>
            <section className="bg-gray-900 py-12 md:py-24 lg:py-32 bg-gray-950 text-gray-50 dark:bg-gray-950 dark:text-gray-50">
                <div className="container px-4 md:px-6 space-y-12 lg:space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">What Our Patients Say</h2>
                        <p className="max-w-[700px] mx-auto text-gray-400 md:text-xl lg:text-lg">
                            Hear from our satisfied patients about their experiences with Doctor Babu.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                            <blockquote className="text-lg font-semibold leading-snug">
                                “The care and attention I received from the Doctor Babu team was truly exceptional. I highly recommend their services.”
                            </blockquote>
                            <div>
                                <div className="font-semibold">Zoro</div>
                                <div className="text-sm text-gray-400">Patient</div>
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                            <blockquote className="text-lg font-semibold leading-snug">
                                “I was amazed by the level of professionalism and expertise at Doctor Babu. They truly put the patient first.”
                            </blockquote>
                            <div>
                                <div className="font-semibold">Manu</div>
                                <div className="text-sm text-gray-400">Patient</div>
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                            <blockquote className="text-lg font-semibold leading-snug">
                                “I am grateful for the exceptional care I received at Doctor Babu. The doctors and staff are truly compassionate.”
                            </blockquote>
                            <div>
                                <div className="font-semibold">Ramana</div>
                                <div className="text-sm text-gray-400">Patient</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="bg-gray-900 py-6 text-center">
      <p className="text-sm text-gray-400">© 2024 Doctor Babu. All rights reserved.</p>
    </footer>
        </>
    )
}
