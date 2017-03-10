
var $fh = require('fh-mbaas-api');

function apiaiSetup() {

    //Get a list of forms associated with the project.
    var options = {};

    $fh.forms.getForms(options,

    /*
    * Function executed with forms.
    */
    function (err, response) {
    if (err) return console.log("Error:" + err);

    //An Array Of Forms Associated With The Project
    var formsArray = response.forms;

   /*
     exampleForm: {
      _id: <<Form Id>>,
      name: <<Form Name>>,
      description: <<Form Description>>
      lastUpdatedTimestamp: <<Timestamp of when the form was last updated>>
    }
  */
    var exampleForm = formsArray[0];
    console.log(exampleForm._id);


  });


}

module.exports = apiaiSetup;
