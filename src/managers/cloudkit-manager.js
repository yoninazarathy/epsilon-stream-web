import CloudKit from 'CloudKit';

function configureCloudKit(){
  CloudKit.configure({
    locale: 'en-us',
    containers: [{
      containerIdentifier: 'iCloud.oneonepsilon.com.EpsilonStream',
      apiTokenAuth: {
        apiToken: '120b5b6ef5bc731a6ba03358ad0bfad0f03133f9ba12ca013ada824c2c4ce42b',
        persist: true, // Sets a cookie.
        signInButton: {
          id: 'apple-sign-in-button',
          theme: 'black' // Other options: 'white', 'white-with-outline'.
        },
        signOutButton: {
          id: 'apple-sign-out-button',
          theme: 'black'
        }
      },
      environment: 'production'
    }]
  });
}

//QQQQ
window.addEventListener('cloudkitloaded', function() {
  configureCloudKit()
});

var currentQuery = null
var currentOptions = null
var afterGetFunction = null
var collectedRecords = []


export default function pullCloudKitData(query,afterGet){
  configureCloudKit()
  
  var container = CloudKit.getDefaultContainer();
  var publicDB = container.publicCloudDatabase;
  
  currentQuery = query
  afterGetFunction = afterGet
  collectedRecords = []
  
  currentOptions = {
    resultsLimit: 100,
    continuationMarker: null
   };

   // Execute the query.
  publicDB.performQuery(currentQuery,currentOptions).then(handleResponse);
}

function handleResponse(response){
  var container = CloudKit.getDefaultContainer();
  var publicDB = container.publicCloudDatabase;
   if(response.hasErrors) {
     console.error(response.errors[0]);
     return;
   }
   var records = response.records
   var numberOfRecords = records.length;
   if (numberOfRecords === 0) {
     console.error('No matching items');
     return;
   }
   collectedRecords = collectedRecords.concat(records)

   if(response.moreComing){
     currentOptions.continuationMarker = response.continuationMarker
     //console.log("more coming")
     publicDB.performQuery(currentQuery,currentOptions).then(handleResponse);
   }else{
    //  console.log("done")
     afterGetFunction(collectedRecords)
   }
 }
