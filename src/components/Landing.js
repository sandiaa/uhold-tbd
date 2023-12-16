import '../styles/landing.css' // CSS file for styling
import SmallButton from './Button'
import FileListContainer from './FileListContainer'
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import CreateFolder from './CreateFolder'
import { fetchRootFiles } from '../helper/fetchFiles'
import { createRootFolder } from '../helper/createRootFolder'
import UtilityComponent from './UtilityComponent'
import { fetchBrandFiles } from '../helper/fetchBrandFiles'

const Landing = () => {
  const [rootFiles, setRootFiles] = useState([])
  const [brandFiles, setBrandFiles] = useState([])
  const [rootId, setRootId] = useState({})
  const [isPageUpdateNeeded, setIsPageUpdateNeeded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showTrash, setShowTrash] = useState(false)
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
        const brandRecords = await fetchBrandFiles()
        setBrandFiles(brandRecords)
        setLoading(false)
        setIsPageUpdateNeeded(false)
      }
    }

    fetchAndSetRootFiles()
  }, [rootId, isPageUpdateNeeded])
  const onFileDelete = () => {
    setIsPageUpdateNeeded(true)
  }
  const onFileRetrieve = () => {
   console.log("ghh")
  }

  return (
    <div className="mainContainer">
      <UtilityComponent
        onUpdate={() => setIsPageUpdateNeeded(true)}
        rootId={rootId}
        isSubFolder={false}
        showTrashPage={() => setShowTrash(true)}
        showHome={() => setShowTrash(false)}
        showTrashValue = {showTrash}
      />
      {!loading && !showTrash ? (
        <div>
          <h3 className="yourFileHeading">Your files</h3>
          <div className="fileContainer">
            <FileListContainer list={rootFiles} onFileDelete={onFileDelete} onFileRetrieve={onFileRetrieve} />
          </div>
          <h3 className="yourFileHeading">Shared files</h3>
          <div className="fileContainer">
            <FileListContainer list={files} />
          </div>
          <h3 className="yourFileHeading">Associated Brand files</h3>
          <div className="fileContainer">
            <FileListContainer list={brandFiles} />
          </div>
        </div>
      ) : null}
      <div>
        {showTrash ? (
          <div>
            <h3 className="yourFileHeading">Trash Files</h3>
            <div className="fileContainer">
              <FileListContainer list={rootFiles} showTrashValue={showTrash}  />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Landing
