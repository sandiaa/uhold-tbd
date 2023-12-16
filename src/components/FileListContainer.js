import React, { useEffect, useState } from 'react'
import '../styles/fileList.css' // CSS file for styling
import FileItem from './FileItem'
import { transformList , fetchTrashFiles} from '../helper/transformRecordsToDisplay'
const FileListContainer = ({ list, onFileDelete, showTrashValue,onFileRetrieve }) => {
  const [filesList, setFilesList] = useState([])

  const transformRecords = async () => {
    const dataList = showTrashValue ? await fetchTrashFiles(list) : await transformList(list)
    setFilesList(dataList)
  }

  useEffect(() => {
    transformRecords()
  }, [])

  const fileOnDelete = () => {
    onFileDelete()
  }
 

  const columnCount = 2 // Define the number of columns

  // Split the file list into columns
  const columns = Array.from({ length: columnCount }, (_, i) =>
    filesList.filter((_, index) => index % columnCount === i),
  )

  return (
    <div className="fileListContainer">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="fileColumn">
          {column.map((element) => (
            <div>
              <FileItem key={element.recordId} file={element} onDelete={fileOnDelete} onRetrieve={onFileRetrieve} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default FileListContainer
