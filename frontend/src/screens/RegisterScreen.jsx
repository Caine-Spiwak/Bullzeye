import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from "../slices/authSlice"
import { useRegisterMutation } from "../slices/usersApiSlice"
import Header from "../components/Header"

const RegisterScreen = () => {
  const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

	const { userInfo } = useSelector((state) => state.auth)

	const [register, { isLoading }] = useRegisterMutation()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		if (userInfo) {
			navigate('/')
		}
	}, [navigate, userInfo])

	const submitHandler = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
		} else {
			try {
				const res = await register({ name, email, password}).unwrap()
				dispatch(setCredentials({...res}))
				navigate('/')
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}


  return (
		<>
			<Header />
			<div className="form-container">
				<h1>Sign Up</h1>
				<form onSubmit={ submitHandler }>
                
          <div className="form-row">
						<label>Name</label>
						<input 
							type="text" 
							placeholder="Enter First Name..." 
							value={name} 
							onChange={(e) => setName(e.target.value)}
						>
						</input>
					</div>
				
					<div className="form-row">
						<label>Email Address</label>
						<input 
							type="email" 
							placeholder="Enter Email..." 
							value={email} 
							onChange={(e) => setEmail(e.target.value)}
						>
						</input>
					</div>

					<div className="form-row">
						<label>Password</label>
						<input 
							type="password" 
							placeholder="Enter Password..." 
							value={password} 
							onChange={(e) => setPassword(e.target.value)}
						>
						</input>
					</div>

					<div className="form-row">
						<label>Confirm Password</label>
						<input 
							type="password" 
							placeholder="Confirm Password..." 
							value={confirmPassword} 
							onChange={(e) => setConfirmPassword(e.target.value)}
						>
						</input>
					</div>

					{ isLoading && <p>Loading...</p>}

					<button type="submit">Sign Up</button>

					<div className="form-row">
						<p>Already have an account? <Link to='/login'>login</Link></p>
					</div>
				</form>
			</div>
		</>
  )
}

export default RegisterScreen