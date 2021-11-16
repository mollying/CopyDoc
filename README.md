# CopyDoc

CopyDoc is a Google Apps Script that automates the process of duplicating large numbers of Google Sheets which, in turn, query a master sheet on some condition. It's a good fit for organizations that need a low-code way to produce many similar versions of a document (for example, a labor union that needs a membership roster for each of its 50 chapters).

## Getting Started
This program runs in [Google Apps Script](https://developers.google.com/apps-script), a JavaScript-based platform that allows any Google Suite user to write and run simple programs that interact with Google products such as Gmail, Docs, Sheets, Drive, and Forms. The functionality and use cases are similar to Excel VBA, although the syntax is pretty different.

CopyDoc uses the DriveApp and SpreadsheetApp Classes, which interact with Google Drive and Google Sheets, respectively.

### Step One: Create Your Destination Folder
Saving all your copies into the same folder allows you to easily share your newly created docs with a large group of people and manage settings like edit access and permissions all at once. It also lets you use the FileIterator class in DriveApp to make changes to all your files at once, if you find you need to edit them after they're created and shared.

Simply create an empty folder in Drive by selecting **New** -> **Folder**. Enter your desired folder name, and select **Create**.

![alt text](https://drive.google.com/file/d/14VwFg1bo6NfUqVcCJ5jA6LwL-H0jEmG-/view?usp=sharing "Give your folder a name and select 'Create'")

Once your folder is created, make sure the permissions provide edit access to anyone who will need them for your child docs - that way, you don't have to individually change the permissions for each file.

### Step Two: Set Up Your Template
Create a template for the document you'll be copying. The trick is to set up the document in such a way that as soon as it's copied, it will function exactly the way you need it to for your end users, with minimal future changes. A couple things to keep in mind:

* Avoid using IMPORTRANGE to connect these docs to a master data source. IMPORTRANGE requires you to manually connect the master doc, and this permission does *not* copy over when you duplicate the doc, so you would need to go into each copy and enable the connection. IMPORTRANGE is also a pretty buggy function so if there are any future issues with the master doc, all the child docs will throw errors. There are two possible alternatives:
  * If the data in the master doc will not change, the best solution is to simply hard copy-and-paste the master data into the template. Hide and protect this sheet so that it can't accidentally be edited by future users. You can then use QUERY or FILTER to show only the relevant data in another sheet that's viewable and/or editable by the doc's users. 
  * If you anticipate changes to the master doc, you can create a link to a csv with that doc's data and use the [IMPORTDATA](https://www.makeuseof.com/tag/how-to-import-data-from-other-google-spreadsheets/) function in your template to bring it over. Be aware that this will make the data in the master doc visible to anyone with the link to the csv, which can be a security issue for some organizations. You'll also need to ensure that changes to the master doc are automatically re-published, which is easy to do when setting up the link. Obviously, this isn't an ideal solution, but until Google fixes some of the issues with IMPORTRANGE, it might be the best you can do.
* However you end up importing your master data, give the sheet where it lives a descriptive name, then hide and protect it. This will ensure that future users can't accidentally edit the master data or see any information they're not supposed to have access to.
* Set up a second, separate sheet as the main interface users will see and interact with. Assuming the users of each different copy will need to see and interact with different data, you can use a QUERY function to select the relevant values. 

For example, let's say you're creating membership lists for each of three chapters of the Newport Beach Neighborhood Coalition. Your data might look like this:

![alt text](https://drive.google.com/file/d/1fWn4btGrP4kBpYNQjglktd6jo76sq7BF/view?usp=sharing "Sample master data")

You can create a new sheet that queries the master sheet based on the value of a fixed cell reference. After you make your copies, you'll fill that cell in each child sheet with the sheet's name (or some variation on it), resulting in a sheet for each chapter which shows only the roster for that chapter. For example, in the screenhot below, the output columns are empty because the cell reference in the QUERY function's WHERE clause is empty:

![alt text](https://drive.google.com/file/d/1lsgC5Y8TaR1U3He2nFAhtxH4IZ76L9Rl/view?usp=sharing "Roster sheet showing FirstName and LastName column headers with no data")

However, once A1 is filled in, only the records matching that criterion are filled:

![alt text](https://drive.google.com/file/d/15foxr3KLhSmGXPujfTLj4HjS7jEr78it/view?usp=sharing "With the value of A1 changed to 'Sudden Valley', the first and last names for members in the Sudden Valley chapter have populated")

* Set up any additional features you want the final copies to have, such as data validation or conditional formatting. Make sure to protect the ranges containing the QUERY function, the value to QUERY on, and the output of the QUERY function. If the master data will change, ensure that the master sheet is set up such that any new data won't overwrite rows that future users may edit (for example, if you add new records that will be imported into the child docs, do so at the bottom of the master doc).

### Step Three: Run the CopyDoc Script
Once your destination folder and template have been created, you're ready to run the script. You'll basically be copying and pasting (fittingly enough) the scripts here and modifying them as necessary to fit your needs.

To create a new Google Apps Script file, you can click **New** -> **More** -> **Google Apps Script** within the Google Drive homepage. You can also create the script within the template doc, but running it as a stand-alone script makes it easier to reuse the code for future projects.

Rename the default file (Code.gs) to copyDoc.gs (or whatever else you want), and add additional files if you'll be running additional scripts to insert values or make any other changes. Then, simply copy and paste the scripts into these files (overwriting all the dummy text that Google Apps Script puts there by default). Insert the ids of your destination folder and template file, add the names of the new copies you're making, and click **Run**. You will probably be asked to authorize the script the first time you run it, so go ahead and do that too. And that's it!

### Step Four: Watch the Magic
As your script runs, you can open the destination folder in a browser window and watch as it spits out one doc after another. Remember, these new docs are independent, separate docs. Once they're created, you can share them with anyone and do whatever you want with them, without affecting the original doc in any way. Typically, the first thing I do is run a second script that iterates through the files and inserts the name of the newly-created doc into the cell that the WHERE clause in my QUERY statements filters on. Once you do that, you may even be able to see the data magically populate in the file thumbnails (or just open a couple to check that it's working, but that's a lot less fun).

## Credits and contributing and all that fun stuff
This script was created by Molly Ingalls under an MIT license which I *think* means you can do whatever you want, so go crazy.

I want to thank [Alice Keeler](https://alicekeeler.com/2015/07/11/making-a-lot-of-copies-of-the-same-google-docs/), whose script for duplicating an award certificate for her students was the inspiration/starting point for this project. Also, thanks to Ethan Lopez for teaching me what a for loop is and Nora Dell for finally badgering me into setting up a github and making this available to others.
