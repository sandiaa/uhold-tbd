export const displayFile = (file, fileType) => {
    if (file) {
      const binaryString = atob(file)
      const byteArray = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i)
      }
      const blob = new Blob([byteArray], { type: fileType })
      return blob
    } else {
      return null
    }
  }