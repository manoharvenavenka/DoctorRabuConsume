import React from 'react'

export default function Contact() {
  return (
    <>
      <section className="bg-gray-950 text-gray-50 dark:bg-gray-950 dark:text-gray-50 py-12 md:py-24 lg:py-32" style={{ marginTop: '4rem', backgroundColor: 'black'}} id="contact" >
      <div className="container px-4 md:px-6 space-y-12 lg:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Contact Us</h2>
          <p className="max-w-[700px] mx-auto text-gray-400 md:text-xl lg:text-lg text-white">
            Get in touch with us for any inquiries or to schedule an appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <label className="" htmlFor="name">Name</label>
              <input className="form-control" id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
              <input className="form-control" id="email" placeholder="Enter your email" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="message">Message</label>
              <textarea className="form-control" id="message" placeholder="Enter your message"></textarea>
            </div>
            <button className="form-control text-white" style={{ backgroundColor: 'cornflowerblue' }} type="submit">
              Send Message
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#EC4899]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+919849*****4</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#EC4899]">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>manoharvenavenka@.com</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#EC4899]">
                  <line x1="2" x2="5" y1="12" y2="12"></line>
                  <line x1="19" x2="22" y1="12" y2="12"></line>
                  <line x1="12" x2="12" y1="2" y2="5"></line>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                  <circle cx="12" cy="12" r="7"></circle>
                </svg>
                <span>Warangal,Telangana</span>
              </div>
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
