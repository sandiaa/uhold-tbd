import React, { useState, useEffect } from 'react'
import '../styles/fileActionComponent.css'
import share from '../assets/share.png'
import deleteIcon from '../assets/delete.png'
import { createShared } from '../helper/createShared'

const FileActionComponent = ({ file }) => {
  const shareMe = () => {
    console.log('shareme', file.recordId)
    createShared(file.recordId)
    
  }
  const deleteMe = () => {
    console.log('deleteme')
  }
  return (
    <div>
      <div className="fileItemActions">
        <button className="fileActionButton" onClick={shareMe}>
          <img src={share} alt="Share" className="fileImage" />
        </button>
        <button className="fileActionButton" onClick={deleteMe}>
          <img src={deleteIcon} alt="Delete" className="fileImage" />
        </button>
      </div>
    </div>
  )
}

export default FileActionComponent
