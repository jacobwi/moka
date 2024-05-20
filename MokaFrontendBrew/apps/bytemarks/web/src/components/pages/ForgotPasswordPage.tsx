import { useState, useEffect, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showBackButton, setShowBackButton] = useState(false)
  const [countdown, setCountdown] = useState<number>(-1) // Update initial state value to 0
  const navigate = useNavigate()

  useEffect(() => {
    let timerId: NodeJS.Timeout // Explicitly type timerId as NodeJS.Timeout
    if (countdown !== null) {
      if (countdown > 0) {
        timerId = setTimeout(() => setCountdown(countdown - 1), 1000)
      } else if (countdown === 0) {
        setShowBackButton(true) // Show the back button when countdown reaches 0
      }
    }
    return () => clearTimeout(timerId) // Cleanup the timer
  }, [countdown])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    setShowBackButton(false) // Ensure back button is hidden on form submit
    setCountdown(10) // Start countdown from 10 seconds
    setSubmitted(true) // Mark the form as submitted
    console.log('Password reset link sent to:', email)
  }

  const handleBackClick = () => {
    navigate('/login')
  }

  return (
    <div className="flex flex-1 overflow-auto p-4 items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-center text-gray-900">
          Forgot Password?
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        {submitted && countdown !== null && (
          <div className="mt-4 text-center">
            <p className="text-green-500">
              If an account exists for {email}, you will receive an email with
              instructions to reset your password.
            </p>
            <p className="text-gray-500">
              Redirecting in {countdown} seconds...
            </p>
          </div>
        )}
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="mt-4 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700"
          >
            <span>Back</span> {/* Replace with an icon as needed */}
          </button>
        )}
        {!submitted && (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordPage
