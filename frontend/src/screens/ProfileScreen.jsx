import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from "../slices/authSlice"
import { useUpdateUserMutation } from '../slices/usersApiSlice'

const ProfileScreen = () => {
  const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

	const { userInfo } = useSelector((state) => state.auth)

	const [updateProfile, { isLoading }] = useUpdateUserMutation()

	const dispatch = useDispatch()

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name)
			setEmail(userInfo.email)
		}
	}, [userInfo])

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


  return (
    <div className="form-container">
			<h1>Update Profile</h1>
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

			</form>
		</div>
  )
}

export default ProfileScreen