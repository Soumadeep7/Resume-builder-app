import React from 'react'
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
   <div className='border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-8 sm:px-10 mt-14'>
        <div 
          id='cta' 
          className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-4 px-3 md:px-8 
          border-x border-dashed border-slate-200 py-10 sm:py-12 -mt-4 -mb-4 w-full"
        >
            
            <p className="text-lg font-medium max-w-md text-slate-800">
                Build a Professional resume that helps you stand out and get hired.
            </p>

            <Link 
                to="/login" 
                className="flex items-center gap-2 rounded py-2.5 px-6 bg-green-600 hover:bg-green-700 transition text-white"
            >
                <span>Get Started</span>

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className="size-4">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                </svg>

            </Link>

        </div>
   </div>
  )
}

export default CallToAction