/**
 * fetch a json file. (not used)
 *
 * @param {string} filePath
 * @returns {array} json array data from the file.
 */
const fetchJsonFile = async (filePath) => {
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