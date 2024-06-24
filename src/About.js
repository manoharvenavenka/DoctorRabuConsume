import React from 'react'

export default function About() {
  return (
    <>
       <section className="py-12 md:py-24 lg:py-32 bg-gray-950 text-gray-50 dark:bg-gray-950 dark:text-gray-50" id="about" style={{ backgroundColor: 'black', marginTop: '4rem' }}>
      <div className="container px-4 md:px-6 space-y-12 lg:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">About</h2>
          <p className="max-w-[700px] mx-auto text-gray-400 md:text-xl lg:text-lg text-white">
            Discover how our services can improve your health and well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-[#EC4899]"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path>
            </svg>
            <h3 className="text-xl font-semibold">24/7 Emergency Care</h3>
            <p className="text-gray-400">
              Our emergency services are available around the clock to provide immediate medical attention when you need it most.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-[#EC4899]"
            >
              <path d="M6 18h8"></path>
              <path d="M3 22h18"></path>
              <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
              <path d="M9 14h2"></path>
              <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path>
              <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
            </svg>
            <h3 className="text-xl font-semibold">Advanced Diagnostics</h3>
            <p className="text-gray-400">
              Our state-of-the-art diagnostic equipment ensures accurate and comprehensive testing for optimal patient care.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-[#EC4899]"
            >
              <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
              <path d="m8.5 8.5 7 7"></path>
            </svg>
            <h3 className="text-xl font-semibold">Personalized Treatments</h3>
            <p className="text-gray-400">
              Our team of experienced doctors develops customized treatment plans to address your unique health needs.
            </p>
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
