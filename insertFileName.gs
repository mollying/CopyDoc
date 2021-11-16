// sets the value of the same cell in each doc in a folder, to the doc's name. helpful if you want to filter on the value the doc is named after eg county, region, etc.
// this code can also be modified to do any other action on every sheet in a folder eg set range protections, hide/unhide sheets, formatting etc.
function insertLocationName() {
  //replace id in string quotes with id of your folder from its url
  var folder = DriveApp.getFolderById("folder_id");
  var files = folder.getFiles();
  //main loop which iterates through the folder and sets the value of one cell, variation on FileIterator class in GAS documentation
  while (files.hasNext()) {
    //opens each spreadsheet in the folder
    var ss = SpreadsheetApp.open(files.next());
    //defines name of the doc which will be inserted into the cell
    var name = ss.getName();
    //stores target sheet - first sheet in the doc in this case. can also use getSheetByName etc.
    var sheet = ss.getSheets()[0];
    //stores cell range in A1. change value within string quotes to target cell you want to change
    var cell = sheet.getRange("A1");
    //changes value of target cell to the name of the google doc, can also use setFormula, setValue w/ a static value, etc.
    cell.setValue(name);
    //logs the name of each sheet as its done so you can track progress. once the code runs it will take a couple minutes to actually see the changes in the sheet thumbnail if applicable so this is helpful to check that it's working correctly
    Logger.log(name + " update complete");
  }
}
