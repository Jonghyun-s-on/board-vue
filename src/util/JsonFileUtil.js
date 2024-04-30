const fetchJsonFile = async (filePath) => {
  // const response = await fetch('/data/boards.json')
  let jsonArray = new Array()
  try {
    const response = await fetch(filePath)
    if (!response.ok) {
      throw new Error('failed to fetch data.')
    }
    jsonArray = response.json()
  } catch (e) {
    console.error('failed to fetch JSON data: ', e)
  }
  return jsonArray
}

export { fetchJsonFile }