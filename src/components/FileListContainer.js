import React, { useEffect, useState } from 'react'
import '../styles/fileList.css' // CSS file for styling
import FileItem from './FileItem'

const FileListContainer = ({ list} ) => {
  const [filesList, setFilesList] = useState([])
  
  const transformList = async () => {
    const dataList = [];
    if (list.length !== 0) {
      const transformedDataList = await Promise.all(
        list.map(async (item) => {
          const data = await item.data.json();
          return {
            recordId: item._recordId,
            fileName: data.fileName,
            createdAt: item.dateCreated,
            fileType: data.fileType,
            fileStore : data.fileStore
          };
        })
      );
      dataList.push(...transformedDataList);
      setFilesList(dataList);
    }
  };
  
  
  useEffect(() => {
    transformList()
  }, [])
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
            <FileItem
              key={element.recordId}
              file={element}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default FileListContainer
