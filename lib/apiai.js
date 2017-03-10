
var $fh = require('fh-mbaas-api');

module.exports =  {
    apiaiSetup: function() {
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
        // We only have one form
        // getting first form
        var exampleForm = formsArray[0];
        console.log(exampleForm._id);
        $fh.forms.getForm({
          "_id": exampleForm._id
        }, function (err, form) {
          if (err){
          console.log("Error reading form by id: " + err);
          } else {
            console.log(form);
          }
        });


      });


    }
};

