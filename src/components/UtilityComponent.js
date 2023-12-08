import '../styles/landing.css' // CSS file for styling
import SmallButton from './Button'
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import CreateFolder from './CreateFolder'
import { createFolder } from '../helper/createFolder'
import { createFiles } from '../helper/createFiles'

const UtilityComponent = ({onUpdate, rootId, isSubFolder}) => {
    const handleButtonClick = () => {
        fileInputRef.current.click()
      }

const fileInputRef = useRef(null)
const handleFileInputChange = async (e) => {
    const selectedFile = e.target.files[0]
    if (rootId?.recordId) {
      const res = await createFiles(selectedFile, rootId, isSubFolder)
      if (res) {
        onUpdate()
      } else {
        console.log('File not stored')
      }
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false)

  const createFolderOnClick = (event) => {
    setIsModalOpen(true)
  }

  const handleCreateFolder = async (folderName) => {

    if (rootId?.recordId) {

      const res = await createFolder(folderName, rootId,isSubFolder)
      if (res) {
        onUpdate()
      } else {
        console.log('Folder not created')
      }
    }
  }

  return (
<div className="buttonGroup">
<div>
  <SmallButton text="Upload Files" onClick={handleButtonClick} />
  <input
    type="file"
    ref={fileInputRef}
    style={{ display: 'none' }}
    onChange={handleFileInputChange}
  />
</div>
<div>
  <SmallButton text="Create Folder" onClick={createFolderOnClick} />
  <CreateFolder
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onCreate={handleCreateFolder}
  />
</div>
</div>
  )}

  export default UtilityComponent