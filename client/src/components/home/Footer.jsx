import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center gap-8 
    py-12 px-6 md:px-16 lg:px-24 xl:px-32 text-sm text-gray-600 
    bg-gradient-to-r from-white via-green-100/60 to-white mt-20">

        {/* Logo + text */}
        <div className="text-center md:text-left">
            <img src="/logo.svg" alt="logo" className="h-10 w-auto mx-auto md:mx-0"/>

            <p className="mt-3 max-w-xs">
                Build professional resumes easily with AI-powered assistance.
            </p>

            <p className="mt-4 text-xs text-gray-500">
                © 2026 Resume Builder
            </p>
        </div>


        {/* Social links */}
        <div className="flex items-center gap-6">

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/soumadeep-paul-b8b1a4293/" 
              target="_blank" 
              rel="noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="size-5 hover:text-green-600 transition">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                </svg>
            </a>


            {/* GitHub */}
            <a 
              href="https://github.com/Soumadeep7" 
              target="_blank" 
              rel="noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="size-5 hover:text-green-600 transition">
                    <path d="M9 19c-5 1.5-5-2.5-7-3"/>
                    <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61
                    c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77
                    5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48
                    a13.38 13.38 0 0 0-6 0C6.27.65 5.09 1 5.09 1
                    A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5
                    8.5c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9
                    18.13V22"/>
                </svg>
            </a>


            {/* Personal Website */}
            <a 
              href="/" 
              target="_blank" 
              rel="noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="size-5 hover:text-green-600 transition">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 0 20"/>
                </svg>
            </a>

        </div>

    </footer>
  )
}

export default Footer