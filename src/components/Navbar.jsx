import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-10 h-20 flex items-center justify-between shadow-sm sticky top-0 z-50">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-gradient-to-tr from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
        </div>
        <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          Streakify
        </span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-1 md:gap-3 overflow-x-auto">

        <Link
          to='/'
          className="text-sm md:text-base font-medium text-gray-600 px-3 md:px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm"
        >
          Home
        </Link>

        <Link
          to='/task'
          className="text-sm md:text-base font-medium text-gray-600 px-3 md:px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm"
        >
          Task
        </Link>

        <Link
          to='/Shedule'
          className="text-sm md:text-base font-medium text-gray-600 px-3 md:px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm"
        >
          Scheduler
        </Link>

        <Link
          to='/profile'
          className="text-sm md:text-base font-medium text-gray-600 px-3 md:px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 hover:text-gray-900 hover:bg-gray-100 hover:shadow-sm"
        >
          Profile
        </Link>

      </div>

    </nav>
  )
}

export default Navbar