import React, { useEffect, useState } from 'react'
import '../styles/fileList.css' // CSS file for styling
import FileItem from './FileItem'
import {
  transformList,
  fetchTrashFiles,
} from '../helper/transformRecordsToDisplay'
import { binFileDelete } from '../helper/binFileDeleteScheduler'
const FileListContainer = ({ list, onFileDelete, showTrashValue }) => {
  const [filesList, setFilesList] = useState([])
  const [displayList, setDisplayList] = useState([])
  const [isSortByDate, setIsSortByDate] = useState(false)
  const [isSortByStarred, setIsSortByStarred] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function transformRecords() {
      setLoading(true)
      const dataList = showTrashValue
        ? await fetchTrashFiles(list)
        : await transformList(list)
      setFilesList(dataList)
      setDisplayList(dataList)
      setLoading(false)

    }

    transformRecords()
  }, [list, showTrashValue])
  useEffect(() => {
    // Check if filesList is empty
    if (filesList.length === 0) return;
  
    if (showTrashValue) {
      binFileDelete(filesList);
    }
  }, [showTrashValue, filesList]); // Include filesList in the dependency array
  


  const fileOnDelete = () => {
    onFileDelete()
  }

  const fileOnRetrieve = (recordId) => {
    const updatedList = filesList.filter((item) => item.recordId !== recordId)
    setFilesList(updatedList)
    setDisplayList(updatedList)
  }
  const fileStarred = (isStarred, recordId) => {
    const index = filesList.findIndex((item) => item.recordId === recordId)

    if (index !== -1) {
      // Update the starred property directly for the object with the matching recordId
      filesList[index].starred = isStarred // Assuming isStarred is a boolean value
      setFilesList([...filesList])

      if (isSortByStarred) {
        // Update state with the modified filesList and trigger sort if needed
        setDisplayList([...filesList])
      }
    }
  }

  const sortByDate = () => {
    const sortedList = filesList.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateB - dateA
    })
    setDisplayList(sortedList)
  }

  const sortByStarred = () => {
    if (!isSortByStarred) {
      const starredList = filesList.filter((item) => item.starred === true);
      setDisplayList(starredList);
      setIsSortByStarred(true);
      setIsSortByDate(false); // Ensure other sorting flags are reset if needed
    } else {
      // If already sorted by starred, revert to original list
      setDisplayList(filesList);
      setIsSortByStarred(false);
    }
  };
  
  const columnCount = 2 // Define the number of columns

  // Split the file list into columns
  const columns = Array.from({ length: columnCount }, (_, i) =>
    displayList.filter((_, index) => index % columnCount === i),
  )

  return (
    <div>
    {!loading &&
    <div className="fileListContainer">
      {filesList.length != 0 &&
      <div className="sortOptions">
        <button onClick={sortByDate}>Sort by Date (recent to oldest)</button>
        <button onClick={sortByStarred}>Starred</button>
      </div>}
      <div>
        {displayList.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p>No files found</p>
      </div>
      
        ) : (
          <div className="fileColumns">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="fileColumn">
                {column.map((element) => (
                  <div key={element.recordId}>
                    <FileItem
                      file={element}
                      onDelete={fileOnDelete}
                      onRetrieve={fileOnRetrieve}
                      onfileStarred={fileStarred}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>}</div>
  )
}

export default FileListContainer
