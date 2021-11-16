// makes multiple copies of a template doc and saves them to a destination folder

function copyDoc() {
  // set up your destination folder before running as an empty folder (do NOT save the template into the folder)
  // replace id in string quotes with folder id (end of the folder's url)
  var destFolder = DriveApp.getFolderById("folder_id") 

  // defines the names of each of the child docs, eg code below will make 1 copy named FirstCopy, 1 named SecondCopy, and 1 named ThirdCopy
  var range = [
    "FirstCopy",
    "SecondCopy",
    "ThirdCopy"
  ]
  
  // main loop to make a copy of the template doc for each name in the range above
  var len = range.length;
  for (i=0; i<len; i++) {
    //make sure you've made a template doc and it looks exactly like what you want the child docs to look like except for the value of a couple cells which can be changed later
    //replace file id in string quotes with the id of your template doc from its url
    DriveApp.getFileById("file_id").makeCopy(range[i], destFolder);
  }
}
