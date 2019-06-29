const fs = require('fs')

const LOGS_DIRECTORY = '../logs'
let logsData = {}

function loadLogs () {
  console.log('loading logs...')
  const jobs = fs.readdirSync(LOGS_DIRECTORY)

  // Create object
  const ojobs = {}
  for (const key of jobs)
    ojobs[key] = {count: 0, directories: ''}

  // Get directories for each job
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    const directories = fs.readdirSync(LOGS_DIRECTORY+'/'+job)

    // Append to global object
    const odirs = {}
    for (const key of directories)
      odirs[key] = {count: 0, files: ''}
    ojobs[job].directories = odirs

    // Get files for each directory
    for (let j = 0; j < directories.length; j++) {
      const directory = directories[j]
      const files = fs.readdirSync(LOGS_DIRECTORY+'/'+job+'/'+directory)

      ojobs[job].count += files.length
      ojobs[job].directories[directory].count = files.length

      // Append to global object
      ofiles = {}
      for (const key of files)
        ofiles[key] = {error: '', content: ''}
      ojobs[job].directories[directory].files = ofiles

      // Get content of each file
      for (let k = 0; k < files.length; k++) {
        const file = files[k]
        const content = fs.readFileSync(LOGS_DIRECTORY+'/'+job+'/'+directory+'/'+file)
        // Append to global object
        ojobs[job].directories[directory].files[file] = content.toString()
      }
    }
  }

  logsData = ojobs
  console.log('logs loaded!')
}

// Load coverage at startup & reload on file modifications
loadLogs()
fs.watch(LOGS_DIRECTORY, curr => {
  loadLogs()
})  //TODO verify watch effectively catch subdir changes

function getLogsData () {
  return logsData
}

module.exports = getLogsData
