import '../styles/utilityComponent.css' // CSS file for styling
import SmallButton from './Button'
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import CreateFolder from './CreateFolder'
import { createFolder } from '../helper/createFolder'
import { createFiles } from '../helper/createFiles'
import trash from '../assets/trash.png'
import { fetchMyDid } from '../helper/fetchMyDid'
const UtilityComponent = ({
  onUpdate,
  rootId,
  isSubFolder,
  showTrashPage,
  showHome,
  showTrashValue,
}) => {
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
      const res = await createFolder(folderName, rootId, isSubFolder)
      if (res) {
        onUpdate()
      } else {
        console.log('Folder not created')
      }
    }
  }
  const showTrash = async () => {
    showTrashPage()
  }

  const myDid = async () => {
    const did = await fetchMyDid()
    return did
  }
  return (
    <div>
      <div className="buttonGroup">
        <div>
          {showTrashValue ? (
            <div className="backButton" onClick={showHome}>
              <p className="backButtonText">Back</p>
            </div>
          ) : null}
          <button
            style={{ marginRight: '10px' }}
            onClick={async () => navigator.clipboard.writeText(await myDid())}
          >
            Copy my did
          </button>
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
        {showTrashValue
          ? null
          : !isSubFolder && (
              <div className="trashButton" onClick={showTrash}>
                <img src={trash} alt="Trash Icon" className="icon" />
              </div>
            )}
      </div>
    </div>
  )
}

export default UtilityComponent
