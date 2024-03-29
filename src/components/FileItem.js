// FileItem.js

import React, { useState, useEffect } from 'react'
import '../styles/fileItem.css'
import folder from '../assets/folder.png'
import fileImage from '../assets/file.png'
import FileViewer from './FileViewer'
import { useHistory } from 'react-router-dom'
import FileActionComponent from './FileActionComponent'
import brand from '../assets/brand.png'
import { displayFile } from '../helper/convertBlobToFile'
import { formatDate } from '../helper/formatDate'
import { connect } from 'react-redux'

const FileItem = ({
  file,
  onDelete,
  onRetrieve,
  onfileStarred,
  contactsList,
}) => {
  const [fileToDisplay, setFileToDisplay] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const history = useHistory()
  const handleClick = () => {
    if (file.fileType == 'folder') {
      history.push(`/folderView/${file.recordId}`)
    } else if (file.fileType == 'brand') {
      history.push(`/brandFilesView/${file.recordId}`)
    } else {
      const fileBlob = displayFile(file.fileStore, file.fileType)
      setFileToDisplay(fileBlob)
      setIsModalOpen(true)
    }
  }
  const fileOnDelete = () => {
    onDelete()
  }

  const fileOnRetrieve = () => {
    onRetrieve(file.recordId)
  }
  const fileOnStarred = (isStarred) => {
    onfileStarred(isStarred, file.recordId)
  }
  const resolveContact = () => {
    const contact = contactsList.find(element => element.contactDid === file.sharedBy);
    return contact ? contact.contactName : file.sharedBy;
  };

  return (
    <div>
      <div className="fileItemContainer">
        <div className="fileActionContainer">
          <FileActionComponent
            file={file}
            fileOnDelete={fileOnDelete}
            fileOnRetrieve={fileOnRetrieve}
            fileStarred={fileOnStarred}
          />
        </div>
        <div className="fileItem" onClick={handleClick}>
          <img
            src={
              file.fileType === 'folder'
                ? folder
                : file.fileType === 'brand'
                ? brand
                : fileImage
            }
            alt="folder"
            className="fileImage"
          />
          <div className="fileDetails">
            <h5 className="fileName">{file.fileName}</h5>
            <p className="fileCreatedAt">{formatDate(file.createdAt)}</p>
            {file.sharedBy != '' && file.sharedBy != undefined && (
              <p className="fileSharedBy">Shared By: {resolveContact()}</p>
            )}
          </div>
        </div>
        <div>
          {isModalOpen && fileToDisplay != null && (
            <FileViewer
              fileBlob={fileToDisplay}
              onClose={() => setIsModalOpen(false)}
              isOpen={isModalOpen}
            />
          )}
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    contactsList: state.contacts.contacts.contacts || [],
  }
}
export default connect(mapStateToProps)(FileItem)
