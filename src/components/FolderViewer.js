import React, { useEffect, useState } from 'react'
import '../styles/folderViewer.css'
import { useParams } from 'react-router-dom'
import { fetchRootFiles } from '../helper/fetchFiles'
import UtilityComponent from './UtilityComponent'
import FileListContainer from './FileListContainer'
import { fetchArecord } from '../helper/fetchArecord'
const FolderViewer = () => {
  const { id } = useParams()
  const [recordId, setRecordId] = useState(id)
  const [rootRecord, setRootRecord] = useState({})
  const [rootFiles, setRootFiles] = useState([])
  const [isPageUpdateNeeded, setIsPageUpdateNeeded] = useState(false)
  const [loading, setLoading] = useState(false)
  const files = []

  useEffect(() => {
    const fetchRecordIds = async () => {
        setLoading(true)

      const fetchRecord = await fetchArecord(id)
      const folderName = await fetchRecord[0].data.json()
      setRootRecord({
        recordId: fetchRecord[0]._recordId,
        contextId: fetchRecord[0]._contextId,
        folderName: folderName.fileName
      })
    }

    fetchRecordIds()
  }, [id,isPageUpdateNeeded])

  useEffect(() => {
    const fetchAndSetRootFiles = async () => {
      if (id != null) {
        const fetchRootFilesList = await fetchRootFiles(id)
        setRootFiles(fetchRootFilesList)
        setLoading(false)
        setIsPageUpdateNeeded(false)
      }
    }
    fetchAndSetRootFiles()
  }, [rootRecord, isPageUpdateNeeded])


  return (
    <div className="mainContainer">
      {loading == false ? (
        <div>
          <UtilityComponent
            onUpdate={() => setIsPageUpdateNeeded(true)}
            rootId={rootRecord}
            isSubFolder={true}
          />
          <h3 className="yourFileHeading">Folder: {rootRecord.folderName}</h3>
          <div className="fileContainer">
            <FileListContainer list={rootFiles} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default FolderViewer
