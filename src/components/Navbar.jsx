import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-8 h-16 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
        </div>
        <span className="text-lg font-bold text-gray-900 tracking-tight">Streakify</span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-1">
        <Link
          to='/'
          className="text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors"
        >
          Home
        </Link>
        <Link
          to='/task'
          className="text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors"
        >
          Task
        </Link>
        <Link
          to='/dashboard'
          className="text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to='/profile'
          className="text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors"
        >
          Profile
        </Link>
      </div>

    </nav>
  )
}

export default Navbar