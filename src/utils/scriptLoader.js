/**
 * Inserts scripts into the document body
 * @param {HTMLScriptElement[]} scriptArr - Array of script elements to insert
 */
export function insertScript(scriptArr) {
  scriptArr.forEach((script) => {
    document.body.appendChild(script)
  })
}

/**
 * Creates a script element with the given source
 * @param {string} src - Source URL for the script
 * @returns {HTMLScriptElement} - Created script element
 */
export function createScript(src) {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  return script
}

/**
 * Loads multiple scripts and returns a promise that resolves when all scripts are loaded
 * @param {string[]} scripts - Array of script URLs to load
 * @returns {Promise} - Resolves when all scripts are loaded
 */
export function loadScripts(scripts) {
  const scriptElements = scripts.map((src) => {
    const script = createScript(src)
    return new Promise((resolve, reject) => {
      script.onload = resolve
      script.onerror = reject
      document.body.appendChild(script)
    })
  })

  return Promise.all(scriptElements)
}
