var express = require('express');
var fs = require('fs')
var router = express.Router();

/**
 * @file
 * Get log jobs
 *
 * Get complete tree and content of the logs directory
 */
router.get('/', function(req, res, next) {
  // Get jobs list
	const jobs = fs.readdirSync('../logs')
  
  // Create object
  const ojobs = {}
  for (const key of jobs)
    ojobs[key] = {count: 0, directories: ''}
  
  // Get directories for each job
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    const directories = fs.readdirSync('../logs/'+job)
    
    // Append to global object
    const odirs = {}
    for (const key of directories)
      odirs[key] = {count: 0, files: ''}
    ojobs[job].directories = odirs
    
    // Get files for each directory
    for (let j = 0; j < directories.length; j++) {
      const directory = directories[j]
      const files = fs.readdirSync('../logs/'+job+'/'+directory)
      
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
        const content = fs.readFileSync('../logs/'+job+'/'+directory+'/'+file)
        
        // Append to global object
        ojobs[job].directories[directory].files[file] = content
      }
    }
  }
  
	res.send(ojobs);
});

module.exports = router;
