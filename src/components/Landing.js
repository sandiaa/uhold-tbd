import '../styles/landing.css' // CSS file for styling
import FileListContainer from './FileListContainer'
import React, { useState, useEffect } from 'react'
import { fetchRootFiles } from '../helper/fetchFiles'
import { createRootFolder } from '../helper/createRootFolder'
import UtilityComponent from './UtilityComponent'
import { fetchBrandFiles } from '../helper/fetchBrandFiles'
import { createRootFiles } from '../helper/createRootFiles'
import { fetchShared } from '../helper/fetchShared'
const Landing = () => {

  const [rootFiles, setRootFiles] = useState([])
  const [brandFiles, setBrandFiles] = useState([])
  const [sharedFiles, setSharedFiles] = useState([])

  const [rootId, setRootId] = useState({})
  const [isPageUpdateNeeded, setIsPageUpdateNeeded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showTrash, setShowTrash] = useState(false)


  useEffect(() => {
    const setRootData = async () => {
      const fetchRootId = await createRootFolder()
      setRootId(fetchRootId)
      const setRootFiles = await createRootFiles()
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
        const sharedRecords = await fetchShared()
        setSharedFiles(sharedRecords)
        setLoading(false)
        setIsPageUpdateNeeded(false)
      }
    }

    fetchAndSetRootFiles()
  }, [rootId, isPageUpdateNeeded])
  const onFileDelete = () => {
    setIsPageUpdateNeeded(true)
  }

  return (
    <div className="mainContainer">
      <UtilityComponent
        onUpdate={() => setIsPageUpdateNeeded(true)}
        rootId={rootId}
        isSubFolder={false}
        showTrashPage={() => setShowTrash(true)}
        showHome={() =>{ setShowTrash(false); setIsPageUpdateNeeded(true)}}
        showTrashValue = {showTrash}
      />
      {!loading && !showTrash ? (
        <div>
          <h3 className="fileHeading">Your files</h3>
          <div className="fileContainer">
            <FileListContainer list={rootFiles} onFileDelete={onFileDelete}  />
          </div>
          <h3 className="fileHeading">Shared files</h3>
          <div className="fileContainer">
          <FileListContainer list={sharedFiles} onFileDelete={onFileDelete}  />
          </div>
          <h3 className="fileHeading">Associated Brand files</h3>
          <div className="fileContainer">
            <FileListContainer list={brandFiles} />
          </div>
        </div>
      ) : null}
      <div>
        {showTrash ? (
          <div>
            <h3 className="fileHeading">Trash Files</h3>
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
