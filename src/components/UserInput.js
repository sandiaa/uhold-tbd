import React, { useState, useEffect } from 'react'
import '../styles/userInput.css' // CSS file for styling
import SmallButton from './Button'
import { useHistory } from 'react-router-dom'
import bgImage from '../assets/bgImage.png'
import uholdLogo from '../assets/uholdlogo.png'
import Loader from './Loader'
import {
  fetchIsFirstLauch,
  createUserInThisAgent,
  fetchVerifyUser,
} from '../helper/web5ConnectHelper'
import DownloadBase64File from './DownloadableDidFile'
const UserInput = () => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userFile, setUserFile] = useState(null)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isFirstLaunch, setIsFirstLaunch] = useState(false)
  const [loading, setLoading] = useState(true)
  const [did, setDid] = useState(false)
  const [didFetched, setDidFetched] = useState('')
  const history = useHistory()
  useEffect(() => {
    const fetchData = async () => {
      const valueofFirstLaunch = await fetchIsFirstLauch()
      setIsFirstLaunch(valueofFirstLaunch)
      setLoading(false)
    }

    fetchData()
  }, [])
  const handleUserNameChange = (event) => {
    setUserName(event.target.value)
  }

  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value)
  }

  const handleUserFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setUserFile(reader.result);
      }
      reader.onerror = (error) => {
        console.error('Error reading file:', error)
      }
    }
  }

  const userSignUp = async () => {
    if (!userName || !userPassword) {
      setErrorMessage('Please enter all required fields')
      setShowError(true)
      return
    } else {
      const didBase64 = await createUserInThisAgent(
        userName,
        userPassword,
        userFile,
      )
      setDid(didBase64)
      setDidFetched(true)
      setIsFirstLaunch(false)
    }
  }

  const userLoggedin = async () => {
    history.push('/mainPage')
  }

  const verifyUser = async () => {
    const userVerified = await fetchVerifyUser(userPassword)
    if (userVerified) {
      history.push('/mainPage')
    } else {
      setErrorMessage('Password incorrect')
      setShowError(true)
    }
  }

  if (loading) {
    return <Loader />
  }
  return (
    <div className="container">
      <div className="content">
        <div className="left-column">
          <img src={bgImage} alt="Sample" className="sample-image" />
        </div>
        <div className="right-column">
          <img src={uholdLogo} className="logoImage" alt="logo" />
          <h1 className="title">UHOLD</h1>

          {isFirstLaunch && (
            <>
              <div className="input-wrapper">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="file">
                  Did as a text file if you have been associated with UHOLD
                  before(will be improved):
                </label>
                <input
                  type="file"
                  id="file"
                  accept=".txt"
                  onChange={handleUserFileChange}
                />
              </div>
            </>
          )}

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={userPassword}
              onChange={handleUserPasswordChange}
            />
          </div>
          {isFirstLaunch ? (
            <div>
              <SmallButton
                text={didFetched ? 'Next' : 'Start'}
                onClick={isFirstLaunch ? userSignUp : userLoggedin}
              />
            </div>
          ) : (
            <div>
              <SmallButton text={'Start'} onClick={verifyUser} />
            </div>
          )}
          <div>
            {showError ? (
              <p className="userErrorMessage">{errorMessage}</p>
            ) : null}
          </div>
          {didFetched && (
            <DownloadBase64File base64String={did} fileName={userName} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserInput
