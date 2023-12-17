import React, { useState, useEffect } from 'react'
import '../styles/fileActionComponent.css'
import share from '../assets/share.png'
import deleteIcon from '../assets/delete.png'
import { createShared } from '../helper/createShared'
import starSelected from '../assets/starSelected.png'
import starUnselected from '../assets/starUnselected.png'
import { fetchArecord } from '../helper/fetchArecord'
import undoDelete from '../assets/undoDelete.png'
const FileActionComponent = ({ file, fileOnDelete,fileOnRetrieve, fileStarred }) => {
  const [isStarred, setIsStarred] = useState('')
  const [loading, setIsLoading] = useState(false)

  const shareMe = () => {
    console.log('shareme', file.recordId)
    createShared(file.recordId)
  }
  const deleteMe = async () => {
    setIsLoading(true)
    const record = await fetchArecord(file.recordId)
    const recData = await record[0].data.json()
    recData.deleted = true
    const response = await record[0].update({ data: recData })
    if (response.status.code) {
      fileOnDelete()
      setIsLoading(false)
    }
  }
  const StarMe = async () => {
    const record = await fetchArecord(file.recordId)
    const recData = await record[0].data.json()
    recData.starred = !isStarred
    const response = await record[0].update({ data: recData })
    if (response.status.code == 202) {
      setIsStarred(recData.starred)
      fileStarred(recData.starred)
    }
  }
  const retrieveMe = async () => {
    setIsLoading(true)
    const record = await fetchArecord(file.recordId)
    const recData = await record[0].data.json()
    recData.deleted = false
    const response = await record[0].update({ data: recData })
    if (response.status.code=202) {
      fileOnRetrieve()
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setIsStarred(file.starred)
  }, [loading])


  return (
    <div className="fileItemActions">
      {!loading && !file.deleted ? (
        <div>
          <button className="fileActionButton" onClick={StarMe}>
            <img
              src={isStarred ? starSelected : starUnselected}
              alt="Star"
              className="fileImage"
            />
          </button>
          <button className="fileActionButton" onClick={shareMe}>
            <img src={share} alt="Share" className="fileImage" />
          </button>
          <button className="fileActionButton" onClick={deleteMe}>
            <img src={deleteIcon} alt="Delete" className="fileImage" />
          </button>
        </div>
      ) : null  }

      {file.deleted ? (
        <div>
          <button className="fileActionButton" onClick={retrieveMe}>
            <img src={undoDelete} alt="UndoDelete" className="fileImage" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default FileActionComponent
