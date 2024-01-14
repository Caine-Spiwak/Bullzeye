import './ProfileScreen.module.css'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from "../slices/authSlice"
import { useUpdateUserMutation, useLogoutMutation } from '../slices/usersApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'

const ProfileScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// State
  const [name, setName] = useState('')
	const [email, setEmail] = useState('') 
	const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
	const { userInfo } = useSelector((state) => state.auth)

	// Query & Mutations
	const [updateProfile, { isLoading }] = useUpdateUserMutation()
	const [logoutApiCall] = useLogoutMutation()

	// API Call Functions
	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			toast.error('Passwords do not match')
		} else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					name,
					email,
					password
				}).unwrap()
				dispatch(setCredentials({...res}))
				toast.success('Profile Updated')
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}


	// Use Effect
	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name)
			setEmail(userInfo.email)
		}
	}, [userInfo])



  return (
    <div className="container">
			<div className="form-container">
				<h1 className='form-title'>Update Profile</h1>
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
	
					<button type="submit">Update</button>

					<button 
						type='button' 
						className='logout-btn'
						onClick={() => logoutHandler()}
						>
						Logout
					</button>

					<Link to='/'><button type='button' className='back-btn'>Back</button></Link>
	
				</form>
			</div>
		</div>
  )
}

export default ProfileScreen