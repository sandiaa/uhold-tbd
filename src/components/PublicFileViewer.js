import React, { useState, useEffect, useRef } from 'react'
import '../styles/publicFileViewer.css' // Ensure this CSS file exists and is correctly styled
import { useLocation } from 'react-router-dom'
import { fetchPublicShared } from '../helper/fetchPublicShared'
import { displayFile } from '../helper/convertBlobToFile'
import { useConnectToWeb5 } from '../helper/web5hook';
import { useDispatch } from 'react-redux';

const PublicFileViewer = () => {
  const dispatch = useDispatch();
  const [initializeWeb5, setInitializeWeb5] = useState(false);

  const [loading, setLoading] = useState(true)
  const [fileName, setFileName] = useState('')
  const [blobUrl, setBlobUrl] = useState(null)

  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const recordId = query.get('id')
  const fromDid = query.get('sharedBy')
  const connectToWeb5 = useConnectToWeb5();
  useEffect(() => {
    const initializeWeb5Connect = async () => {
      const web5 = await connectToWeb5();
      setInitializeWeb5(true); // Set to true after connection is established
    };
    initializeWeb5Connect();
  }, [connectToWeb5]);

  useEffect(() => {
    if (!initializeWeb5) return;
    const fetchAndDisplayFile = async () => {
      try {
        const fetchedRecord = await fetchPublicShared(recordId, fromDid)
        if (fetchedRecord) {
          setFileName(fetchedRecord.fileName)
          const fileBlob = displayFile(
            fetchedRecord.fileStore,
            fetchedRecord.fileType,
          )
          if (fileBlob) {
            const url = URL.createObjectURL(fileBlob)

            setBlobUrl(url)
            // Clean up function
            return () => URL.revokeObjectURL(url)
          }
        }
      } catch (error) {
        console.error('Error fetching file:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAndDisplayFile()
  }, [recordId, fromDid,initializeWeb5])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="file-viewer-container">
          <h1 className="shared-file-name">{fileName}</h1>
          <iframe
            src={blobUrl}
            title={fileName || 'File Viewer'}
            className="file-content"
          ></iframe>
        </div>
      )}
    </div>
  )
}

export default PublicFileViewer
