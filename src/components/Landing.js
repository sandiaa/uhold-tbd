import '../styles/landing.css' // CSS file for styling
import SmallButton from './Button'
import FileListContainer from './FileListContainer'
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import CreateFolder from './CreateFolder'
import { createFolder } from '../helper/createFolder'
import { fetchRootFiles } from '../helper/fetchFiles'
import { createRootFolder } from '../helper/createRootFolder'
import { createFiles } from '../helper/createFiles'
import UtilityComponent from './UtilityComponent'

const Landing = () => {
  const [rootFiles, setRootFiles] = useState([])
  const [rootId, setRootId] = useState({})
  const [isPageUpdateNeeded, setIsPageUpdateNeeded] = useState(false)
  const [loading, setLoading] = useState(false)
  const files = []

  useEffect(() => {
    const setRootData = async () => {
      const fetchRootId = await createRootFolder()
      setRootId(fetchRootId)
    }

    setRootData()
  }, [])

  useEffect(() => {
    const fetchAndSetRootFiles = async () => {
      if (rootId?.recordId) {
        setLoading(true)
        const fetchRootFilesList = await fetchRootFiles(rootId.recordId)
        setRootFiles(fetchRootFilesList)
        setLoading(false)
        setIsPageUpdateNeeded(false)
      }
    }

    fetchAndSetRootFiles()
  }, [rootId,isPageUpdateNeeded])


  return (
    <div className="mainContainer">
      <UtilityComponent onUpdate={() => setIsPageUpdateNeeded(true)} rootId={rootId} isSubFolder={false}/>
      <h3 className="yourFileHeading">Your files</h3>
      <div className="fileContainer">
        {loading == false ? <FileListContainer list={rootFiles} /> : null}
      </div>
      <h3 className="yourFileHeading">Shared files</h3>
      <div className="fileContainer">
        <FileListContainer list={files} />
      </div>
      <h3 className="yourFileHeading">Associated Brand files</h3>
      <div className="fileContainer">
        <FileListContainer list={files} />
      </div>
    </div>
  )
}

export default Landing
