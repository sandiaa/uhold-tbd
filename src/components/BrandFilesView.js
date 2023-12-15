import React, { useEffect, useState } from 'react'
import '../styles/folderViewer.css'
import { useParams } from 'react-router-dom'
import { fetchRootFiles } from '../helper/fetchFiles'
import UtilityComponent from './UtilityComponent'
import FileListContainer from './FileListContainer'
import { fetchArecord } from '../helper/fetchArecord'
import {fetchIndividualBrand} from '../helper/fetchBrandFiles'
import '../styles/fileItem.css'

const BrandFilesView = () => {
  const { id } = useParams()
  const [rootRecord, setRootRecord] = useState(id)
  const [brandFiles, setBrandFiles] = useState([])
  const [isPageUpdateNeeded, setIsPageUpdateNeeded] = useState(false)
  const [loading, setLoading] = useState(false)
  const files = []

  useEffect(() => {
    const fetchRecordIds = async () => {
        setLoading(true)

      const fetchRecord = await fetchArecord(id)
      const brandName = await fetchRecord[0].data.json()
      setRootRecord({
        recordId: fetchRecord[0]._recordId,
        contextId: fetchRecord[0]._contextId,
        brandName: brandName.fileName,
        schema: brandName.fileStore.schema,
        protocol : brandName.fileStore.protocol
      })
    }

    fetchRecordIds()
  }, [id,isPageUpdateNeeded])

  useEffect(() => {
    const fetchAndSetBrandFiles = async () => {
      if (rootRecord.schema != null) {
        const fetchBrandFilesList = await fetchIndividualBrand({schema : rootRecord.schema, protocol: rootRecord.protocol})
        setBrandFiles(fetchBrandFilesList)
        setLoading(false)
        setIsPageUpdateNeeded(false)
      }
    }
    fetchAndSetBrandFiles()
  }, [rootRecord, isPageUpdateNeeded])


  return (
    <div className="mainContainer">
    {loading == false ? (
      <div>
        <h3 className="yourFileHeading">Brand: {rootRecord.brandName}</h3>
        <div className="fileContainer">
          <FileListContainer list={brandFiles} />
        </div>
      </div>
    ) : null}
  </div>
  )
}

export default BrandFilesView
