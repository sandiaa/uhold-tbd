import React, { useState } from 'react'
import '../styles/userInput.css' // CSS file for styling
import SmallButton from './Button'
import { useHistory } from 'react-router-dom'
import verifyUser from '../web5/verifyUser'
import bgImage from '../assets/bgImage.png'
import uholdLogo from '../assets/uholdlogo.png'
import { useConnectToWeb5 } from '../helper/web5hook'

const UserLogin = () => {
  const [userPassword, setUserPassword] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const connectToWeb5 = useConnectToWeb5()
  const history = useHistory()

  const handleuserPasswordChange = (event) => {
    setUserPassword(event.target.value)
  }

  const initializeWeb5Connect = async () => {
    const web5 = await connectToWeb5()

    if (web5 != undefined) {
      return true
    } else {
      return false
    }
    // Additional logic after establishing Web5 connection
  }

  const buttonOnclick = async () => {
    if (await verifyUser(userPassword)) {
      const connectResult = await initializeWeb5Connect()
      if (connectResult) history.push('/mainPage')
      // Navigate to main page after successful login and Web5 initialization
      else {
        setErrorMessage('Not on you, its on us :(')
        setShowError(true)
      }
    } else {
      setErrorMessage('Incorrect password')
      setShowError(true)
    }
  }

  return (
    <div className="container">
      <div className="content">
        <div className="left-column">
          <img
            src={bgImage} // Replace with your image URL
            alt="Sample"
            className="sample-image"
          />
        </div>
        <div className="right-column">
          <img src={uholdLogo} className="logoImage" alt="logo" />
          <h1 className="title">UHOLD</h1>

          <div className="input-wrapper">
            {' '}
            <h3>
              Hey! you are one step away to access your vault. Your secret
              phrase please. I wouldn't disclose. Trust me.
            </h3>{' '}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={userPassword}
              onChange={handleuserPasswordChange}
            />
          </div>
          <div>
            <SmallButton text="Start" onClick={buttonOnclick} />
          </div>
          <div>
            {showError ? (
              <p className="userErrorMessage">{errorMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
