import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Setup = () => {

    const nav = useNavigate()

    const [detail, setDetail] = useState({ userName: "", userAge: "", designation: "", goal: "", streak: 0 });
    const [errMsg,setErrMsg] = useState("");
    
    const [currentStep, setCurrentStep] = useState(1);

    const block1 = useRef()
    const block2 = useRef()

    useEffect(() => {
        if (block2.current) {
            block2.current.style.display = "none"
        }
    }, [])

    const handleChange = (e) => {
        setDetail({ ...detail, [e.target.name]: e.target.value })
    }

    const gotoForm2 = (e) => {
        e.preventDefault()

        if (detail.userName && detail.userAge) {
            block1.current.style.display = "none"
            block2.current.style.display = "block"
            setCurrentStep(2)
        }else{
            setErrMsg("Please fill the valid feild")
        }

    }

    const gotofrom1 = (e) => {
        e.preventDefault()
        block1.current.style.display = "block"
        block2.current.style.display = "none"
        setCurrentStep(1)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        if (detail.designation && detail.goal) {
            localStorage.setItem("localUser", JSON.stringify(detail));
            nav('/')
        } else {
            setErrMsg("Please fill the valid feild")
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6 py-12 gap-12 flex-wrap">

            {/* Left Side — Branding */}
            <motion.div
                className="flex-1 max-w-md text-white p-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-10">
                    <span className="text-5xl leading-none">⚡</span>
                    <h1 className="text-5xl font-bold tracking-tight text-white">Streakify</h1>
                </div>

                {/* Quotes */}
                <div className="flex flex-col gap-5">
                    {[
                        '"Success is the sum of small efforts repeated day in and day out."',
                        '"Don\'t break the chain. Every day counts."',
                        '"Consistency is what transforms average into excellence."',
                    ].map((quote, i) => (
                        <motion.p
                            key={i}
                            className="text-base italic text-gray-300 border-l-4 border-gray-500 pl-4 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.2 }}
                        >
                            {quote}
                        </motion.p>
                    ))}
                </div>
            </motion.div>

            {/* Right Side — Form Card */}
            <motion.div
                className="flex-1 max-w-md bg-white rounded-3xl shadow-2xl p-10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Card Header */}
                <div className="text-center mb-7">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Welcome Buddy!!</h2>
                    <p className="text-gray-400 text-sm">Let's start your consistency journey together</p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                        ${currentStep >= 1 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"}`}>
                        {currentStep > 1 ? '✓' : '1'}
                    </div>
                    <div className={`h-1 w-14 rounded-full transition-all duration-300
                        ${currentStep === 2 ? "bg-gray-900" : "bg-gray-200"}`} />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                        ${currentStep === 2 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"}`}>
                        2
                    </div>
                </div>

                {/* Step 1 */}
                <div ref={block1}>
                    <AnimatePresence mode="wait">
                        <motion.form
                            key="step1"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-5"
                        >
                            <div className="flex flex-col gap-2">
                               <div className='justify-center ali'>
                                 <p  className='text-red-500 text-center'>{errMsg}</p>
                               </div>
                                <label className="text-sm font-semibold text-gray-700">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your  name"
                                    onChange={handleChange}
                                    name="userName"
                                    value={detail.userName}
                                    className="w-full bg-gray-100 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder-gray-400"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">Your Current Age</label>
                                <input
                                    type="number"
                                    placeholder="Your current age"
                                    onChange={handleChange}
                                    name="userAge"
                                    value={detail.userAge}
                                    className="w-full bg-gray-100 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder-gray-400"
                                />
                            </div>

                            <button
                                onClick={gotoForm2}
                                className="w-full bg-gray-900 hover:bg-gray-700 active:scale-95 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-gray-900/20"
                            >
                                Next →
                            </button>
                        </motion.form>
                    </AnimatePresence>
                </div>

                {/* Step 2 */}
                <div ref={block2}>
                    <form onSubmit={handlesubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Your Current Designation</label>
                            <input
                                type="text"
                                placeholder="Your current designation"
                                onChange={handleChange}
                                name="designation"
                                value={detail.designation}
                                className="w-full bg-gray-100 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder-gray-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-gray-700">Your Goal</label>
                            <input
                                type="text"
                                placeholder="Your goal"
                                onChange={handleChange}
                                name="goal"
                                value={detail.goal}
                                className="w-full bg-gray-100 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder-gray-400"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={gotofrom1}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-colors"
                            >
                                ← Back
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-gray-900 hover:bg-gray-700 active:scale-95 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-gray-900/20"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default Setup