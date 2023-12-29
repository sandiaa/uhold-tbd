import { binFileDelete, fileExpiryChecker } from './binFileDeleteScheduler'
export const transformList = async (list) => {
  const dataList = []
  if (list.length !== 0) {
    const transformedDataList = await Promise.all(
      list.map(async (item) => {
        const data = await item.data.json()
        // Check if data.deleted is false before adding to transformedDataList
        if (!data.deleted) {
          return {
            recordId: item._recordId,
            fileName: data.fileName,
            createdAt: item.dateCreated,
            fileType: data.fileType,
            fileStore: data.fileStore,
            starred: data.starred,
            deleted: data.deleted,
            shared: data.shared,
            sharedBy: data.sharedBy,
          }
        }
        return null // Return null for items where data.deleted is true
      }),
    )

    // Filter out null values before pushing to dataList
    const filteredDataList = transformedDataList.filter((item) => item !== null)

    dataList.push(...filteredDataList)
  }

  return dataList // Return dataList after the transformation
}

export const fetchTrashFiles = async (list) => {
  const dataList = []
  if (list.length !== 0) {
    const transformedDataList = await Promise.all(
      list.map(async (item) => {
        const data = await item.data.json()
        // Check if data.deleted is false before adding to transformedDataList
        if (data.deleted) {
          if (fileExpiryChecker(item.dateCreated)) {
            binFileDelete(item._recordId)
          } else {
            return {
              recordId: item._recordId,
              fileName: data.fileName,
              createdAt: item.dateCreated,
              fileType: data.fileType,
              fileStore: data.fileStore,
              starred: data.starred,
              deleted: data.deleted,
              shared: data.shared,
            }
          }
        }
        return null // Return null for items where data.deleted is true
      }),
    )

    // Filter out null values before pushing to dataList
    const filteredDataList = transformedDataList.filter((item) => item !== null)

    dataList.push(...filteredDataList)
  }

  return dataList // Return dataList after the transformation
}
