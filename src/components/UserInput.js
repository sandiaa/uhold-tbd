import React, { useState } from 'react'
import '../styles/userInput.css' // CSS file for styling
import SmallButton from './Button'
import { useHistory } from 'react-router-dom'
import { web5Connect } from '../web5/connect'

const UserInput = () => {
  const [userPassword, setUserPassword] = useState('')

  const handleuserPasswordChange = (event) => {
    setUserPassword(event.target.value)
  }
  const history = useHistory()
  const buttonOnclick = async () => {
   history.push('/landing')
  }

  return (
    <div className="container">
      <div className="content">
        <div className="left-column">
          <img
            src="https://via.placeholder.com/150" // Replace with your image URL
            alt="Sample"
            className="sample-image"
          />
        </div>
        <div className="right-column">
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
        </div>
      </div>
    </div>
  )
}

export default UserInput
