import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Setup = () => {

    const nav = useNavigate()

    const [detail, setDaetail] = useState({ userName: "", userAge: "", designation: "", goal: "" });
    const [currentStep, setCurrentStep] = useState(1);

    const block1 = useRef()
    const block2 = useRef()

    useEffect(() => {
        if (block2.current) {
            block2.current.style.display = "none"
        }
    }, [])

    const handleChange = (e) => {
        setDaetail({ ...detail, [e.target.name]: e.target.value })
    }

    const gotoForm2 = (e) => {
        e.preventDefault()
        block1.current.style.display = "none"
        block2.current.style.display = "block"
        setCurrentStep(2)
    }

    const gotofrom1 = (e) => {
        e.preventDefault()
        block1.current.style.display = "block"
        block2.current.style.display = "none"
        setCurrentStep(1)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("localUser", JSON.stringify(detail));
        nav('/')
    }

    return (
        <div style={styles.page}>
            {/* Left Side — Branding */}
            <motion.div
                style={styles.branding}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div style={styles.logo}>
                    <span style={styles.logoIcon}>⚡</span>
                    <h1 style={styles.logoText}>Streakify</h1>
                </div>

                <div style={styles.quotes}>
                    {[
                        '"Success is the sum of small efforts repeated day in and day out."',
                        '"Don\'t break the chain. Every day counts."',
                        '"Consistency is what transforms average into excellence."',
                    ].map((quote, i) => (
                        <motion.p
                            key={i}
                            style={styles.quote}
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
                style={styles.card}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Header */}
                <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>Welcome Buddy!!</h2>
                    <p style={styles.cardSubtitle}>Let's start your consistency journey together</p>
                </div>

                {/* Step Indicator */}
                <div style={styles.stepper}>
                    <div style={{
                        ...styles.stepDot,
                        background: 'linear-gradient(135deg, #059669, #0d9488)',
                        color: '#fff',
                    }}>
                        {currentStep > 1 ? '✓' : '1'}
                    </div>
                    <div style={{
                        ...styles.stepLine,
                        background: currentStep === 2
                            ? 'linear-gradient(90deg, #059669, #0d9488)'
                            : '#d1d5db',
                    }} />
                    <div style={{
                        ...styles.stepDot,
                        background: currentStep === 2
                            ? 'linear-gradient(135deg, #059669, #0d9488)'
                            : '#e5e7eb',
                        color: currentStep === 2 ? '#fff' : '#6b7280',
                    }}>
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
                            style={styles.form}
                        >
                            <div style={styles.field}>
                                <label style={styles.label}>
                                  
                                    Your Good Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your good name"
                                    onChange={handleChange}
                                    name="userName"
                                    value={detail.userName}
                                    style={styles.input}
                                    onFocus={e => e.target.style.borderColor = '#059669'}
                                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>
                                 
                                    Your Current Age
                                </label>
                                <input
                                    type="number"
                                    placeholder="Your current age"
                                    onChange={handleChange}
                                    name="userAge"
                                    value={detail.userAge}
                                    style={styles.input}
                                    onFocus={e => e.target.style.borderColor = '#0d9488'}
                                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>

                            <button
                                onClick={gotoForm2}
                                style={styles.primaryBtn}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                Next →
                            </button>
                        </motion.form>
                    </AnimatePresence>
                </div>

                {/* Step 2 */}
                <div ref={block2}>
                    <form onSubmit={handlesubmit} style={styles.form}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                              
                                Your Current Designation
                            </label>
                            <input
                                type="text"
                                placeholder="Your current designation"
                                onChange={handleChange}
                                name="designation"
                                value={detail.designation}
                                style={styles.input}
                                onFocus={e => e.target.style.borderColor = '#059669'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>
                    
                                Your Goal
                            </label>
                            <input
                                type="text"
                                placeholder="Your goal"
                                onChange={handleChange}
                                name="goal"
                                value={detail.goal}
                                style={styles.input}
                                onFocus={e => e.target.style.borderColor = '#0891b2'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        <div style={styles.btnRow}>
                            <button
                                onClick={gotofrom1}
                                style={styles.secondaryBtn}
                                onMouseEnter={e => e.currentTarget.style.background = '#d1d5db'}
                                onMouseLeave={e => e.currentTarget.style.background = '#e5e7eb'}
                            >
                                ← Back
                            </button>
                            <button
                                type="submit"
                                style={styles.primaryBtn}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
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

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #10b981 0%, #0d9488 50%, #0891b2 100%)',
        padding: '2rem',
        gap: '3rem',
        flexWrap: 'wrap',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
    },
    branding: {
        flex: '1 1 300px',
        maxWidth: '460px',
        color: '#fff',
        padding: '2rem',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2rem',
    },
    logoIcon: {
        fontSize: '2.8rem',
        lineHeight: 1,
    },
    logoText: {
        fontSize: '3.5rem',
        fontWeight: '700',
        color: '#fff',
        margin: 0,
        letterSpacing: '-1px',
    },
    quotes: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
    },
    quote: {
        fontSize: '1.05rem',
        fontStyle: 'italic',
        opacity: 0.92,
        borderLeft: '4px solid rgba(255,255,255,0.7)',
        paddingLeft: '1rem',
        margin: 0,
        lineHeight: 1.6,
    },
    card: {
        flex: '1 1 360px',
        maxWidth: '480px',
        background: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
        padding: '2.5rem',
    },
    cardHeader: {
        textAlign: 'center',
        marginBottom: '1.75rem',
    },
    cardTitle: {
        fontSize: '1.8rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #059669, #0d9488, #0891b2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: '0 0 0.4rem',
    },
    cardSubtitle: {
        color: '#6b7280',
        margin: 0,
        fontSize: '0.95rem',
    },
    stepper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '2rem',
    },
    stepDot: {
        width: '2.4rem',
        height: '2.4rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        fontSize: '0.95rem',
        transition: 'all 0.3s ease',
    },
    stepLine: {
        height: '4px',
        width: '4rem',
        borderRadius: '2px',
        transition: 'background 0.3s ease',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#374151',
        fontWeight: '500',
        fontSize: '0.95rem',
    },
    icon: {
        fontSize: '1.1rem',
    },
    input: {
        width: '100%',
        padding: '0.8rem 1rem',
        border: '2px solid #e5e7eb',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        boxSizing: 'border-box',
        background: '#fff',
        color: '#111827',
    },
    primaryBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '100%',
        padding: '0.85rem',
        background: 'linear-gradient(135deg, #059669, #0d9488)',
        color: '#fff',
        border: 'none',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 4px 14px rgba(5,150,105,0.35)',
    },
    secondaryBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        flex: 1,
        padding: '0.85rem',
        background: '#e5e7eb',
        color: '#374151',
        border: 'none',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
    },
    btnRow: {
        display: 'flex',
        gap: '1rem',
    },
}