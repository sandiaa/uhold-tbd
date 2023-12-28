import React, { useEffect, useState } from 'react'
import '../styles/folderViewer.css'
import { useParams } from 'react-router-dom'
import UtilityComponent from './UtilityComponent'
import FileListContainer from './FileListContainer'
import { fetchArecord } from '../helper/fetchArecord'
import MessagesHome from './MessagesHome'
import { fetchFolderRecord } from '../helper/fetchFolderRecords'
const FolderViewer = () => {
  const { id } = useParams()
  const [rootRecord, setRootRecord] = useState({})
  const [rootFiles, setRootFiles] = useState([])
  const [isPageUpdateNeeded, setIsPageUpdateNeeded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRecordIds = async () => {
      setLoading(true)

      const fetchRecord = await fetchArecord(id)
      const folderName = await fetchRecord[0].data.json()
      setRootRecord({
        recordId: fetchRecord[0]._recordId,
        contextId: fetchRecord[0]._contextId,
        folderName: folderName.fileName,
      })
    }

    fetchRecordIds()
  }, [id, isPageUpdateNeeded])

  useEffect(() => {
    const fetchAndSetRootFiles = async () => {
      if (id != null) {
        const fetchRootFilesList = await fetchFolderRecord(id)
        setRootFiles(fetchRootFilesList)
        setLoading(false)
        setIsPageUpdateNeeded(false)
      }
    }
    fetchAndSetRootFiles()
  }, [id, rootRecord, isPageUpdateNeeded])

  return (
    <div className="mainPageContainer">
      <div className="landingComponent">
        <div className="mainContainer">
          {loading === false ? (
            <div>
              <UtilityComponent
                onUpdate={() => setIsPageUpdateNeeded(true)}
                rootId={rootRecord}
                isSubFolder={true}
              />
              <h3 className="yourFileHeading">
                Folder: {rootRecord.folderName}
              </h3>
              <div className="fileContainer">
                <FileListContainer list={rootFiles} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="chat">
        <MessagesHome />
      </div>
    </div>
  )
}

export default FolderViewer
