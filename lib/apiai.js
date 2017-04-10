/******************************************************************************************/
/*** A module that reads cloudapp form and sets up api.ai with intents and entities ******/
/******************************************************************************************/


var $fh = require('fh-mbaas-api');
var request = require('request');



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
            // Check api.ai for intents
            var apiaiURL='https://api.api.ai/v1/intents?v=20150910';

            request.get({
                    headers: {
                          'Authorization': 'Bearer INSERT YOUR CODE HERE'
                        },
                    url: apiaiURL,
                    json: true
            }, function(error, response, body) {
                    if (error) {
                    	console.log("ERROR:" + error);
                    }else {
                    	//
                    	// Testing creating an intent
                    	//Assuming we have only one page in the form
                    	createIntent(form.name,form.pages[0].fields);
                    }
            });


          }
        });


      });


    }
};
function buildIntentContent(name,fields, callback) {
    var parameters = [];
    var intentContentBuilt={
        "name": name,
             "auto": true,
             "contexts": [],
             "userSays": [
                {
                   "data": [
                      {
                         "text": "I am ready to report"
                      }
                   ],
                   "isTemplate": false,
                   "count": 0
                },
                {
                   "data": [
                      {
                         "text": "Ready to create report"
                      }
                   ],
                   "isTemplate": false,
                   "count": 0
                }
             ],
             "responses": [
                {
                   "resetContexts": false,
                   "action": "create-form",
                   "parameters": parameters,
                   "speech": "Great Work! We will submit report for  \$CarMake \$CarModel \$CarYear for \$NumberOfLaps laps at \$TrackName for \$DriveTime minutes with comments \$Comment"
                }
             ],
             "priority": 500000
    };

    for (var i=0; i<fields.length; i++) {
        var newParameter={};
        console.log("Adding field: " + fields[i].fieldCode);
        if((fields[i].fieldCode=='drivedistance') || (fields[i].fieldCode=='speed'))
        {
            // Doing nothing for these calculated fields
            //return;
        }
        else if(fields[i].type=='dropdown') {
            // get values of dropdown and create Entities
            var entries=[];
            var entityContentValue = {
                "name": fields[i].fieldCode,
                "entries": entries
            };

            // We just made an exception for Trackname, we want a yes no answer
            // Delete this if condition if you want trackname to have any value
            if(fields[i].fieldCode=="trackname")
            {
                // enter only one Entity
                var newEntity={};
                newEntity.value="Nurburgring";
                // For now assuming one syn.
                var synonyms=["Nurburgring","Yes","Yes Nurbrugring"];
                newEntity.synonyms=synonyms;
                entityContentValue.entries.push(newEntity);
            }
            else {
                for(var k=0; k<fields[i].fieldOptions.definition.options.length;k++) {
                    var newEntity={};
                    newEntity.value=fields[i].fieldOptions.definition.options[k].label;
                    // For now assuming one syn.
                    var synonyms=[fields[i].fieldOptions.definition.options[k].label];
                    newEntity.synonyms=synonyms;
                    entityContentValue.entries.push(newEntity);
                }
            }
            var apiaiEntityURL='https://api.api.ai/v1/entities?v=20150910';
            console.log(entityContentValue);
            request({
                    headers: {
                        'Authorization': 'Bearer 947286380d364646b70720032bb3e36a'
                        },
                        url: apiaiEntityURL,
                        method: "POST",
                        json: true,
                        body: entityContentValue
                    },
                    function(error,response,body) {
                        if (error) {
                           console.log("ERROR:" + error);
                        }else {
                           console.log("Body");
                           console.log(body);
                        }

            });
            // Then datatype should be the name of the variable
            newParameter.dataType= "@" + fields[i].fieldCode;
            newParameter.name= fields[i].fieldCode;
            newParameter.value= "\$" + fields[i].fieldCode;
            newParameter.required = fields[i].required;
            newParameter.prompts= [fields[i].helpText];
            intentContentBuilt.responses[0].parameters.push(newParameter);
        } else if ((fields[i].type=='text') || (fields[i].type=='number')){
            // get values of dropdown and create Entities
            // Then datatype should be the name of the variable
            newParameter.dataType= "@sys.number";
            newParameter.name= fields[i].fieldCode;
            newParameter.value= "\$" + fields[i].fieldCode;
            newParameter.required = fields[i].required;
            newParameter.prompts= [fields[i].helpText];
            intentContentBuilt.responses[0].parameters.push(newParameter);
        }else if(fields[i].type=='textarea') {
            // get values of dropdown and create Entities
            // Then datatype should be the name of the variable
            newParameter.dataType= "@sys.any";
            newParameter.name= fields[i].fieldCode;
            newParameter.value= "\$" + fields[i].fieldCode;
            newParameter.required = fields[i].required;
            newParameter.prompts= [fields[i].helpText];
            intentContentBuilt.responses[0].parameters.push(newParameter);
        }



    }

callback(intentContentBuilt);


};


function createIntent(name,fields) {
  /* Create an Intent at api.ai */
  console.log("Creating Ne Intent with name: " + name);
  var apiaiURL='https://api.api.ai/v1/intents?v=20150910';
  buildIntentContent(name,fields, function(intentContentValue) {
    console.log("Generated Intent Content");
    console.log(intentContentValue);
    request({
        headers: {
            'Authorization': 'Bearer 947286380d364646b70720032bb3e36a'
            },
            url: apiaiURL,
            method: "POST",
            json: true,
            body: intentContentValue
        },
        function(error,response,body) {
            if (error) {
               console.log("ERROR:" + error);
            }else {
               console.log("Body");
               console.log(body);
            }

        });
  });

  var intentContent={
  "name": name,
     "auto": true,
     "contexts": [],
     "userSays": [
        {
           "data": [
              {
                 "text": "I am ready to report"
              }
           ],
           "isTemplate": false,
           "count": 0
        },
        {
           "data": [
              {
                 "text": "Ready to create report"
              }
           ],
           "isTemplate": false,
           "count": 0
        }
     ],
     "responses": [
        {
           "resetContexts": false,
           "action": "create-form",
           "parameters": [
              {
                 "dataType": "@CarMake",/*@fieldcode*/
                 "name": "CarMake",
                 "value": "\$CarMake",
                 "required" :"true",
                 "prompts" : ["What is the Car Make?"] /*name*/
              },
              {
                  "dataType": "@CarModel",
                  "name": "CarModel",
                  "value": "\$CarModel",
                  "required" :"true",
                  "prompts" : ["What is the Car Model?"]
              },
              {
                  "dataType": "@sys.number",
                  "name": "CarYear",
                  "value": "\$CarYear",
                  "required" :"true",
                  "prompts" : ["What is the production year?"]
              },
              {
                  "dataType": "@sys.number",
                  "name": "NumberOfLaps",
                  "value": "\$NumberOfLaps",
                  "required" :"true",
                  "prompts" : ["How many laps did you drive today?"]
              },
              {
                  "dataType": "@TrackName",
                  "name": "TrackName",
                  "value": "\$TrackName",
                  "required" :"true",
                  "prompts" : ["We know from your location you are at Nurburgring, is this correct?"]
              },
              {
                  "dataType": "@sys.number",
                  "name": "DriveTime",
                  "value": "\$DriveTime",
                  "required" :"true",
                  "prompts" : ["What was your total driving time in minutes?"]
              },
              {
                  "dataType": "@sys.any",
                  "name": "Comment",
                  "value": "\$Comment",
                  "required" :"true",
                  "prompts" : ["What are your comments?"]
              },

           ],
           "speech": "Great Work! We will submit report for  \$CarMake \$CarModel \$CarYear for \$NumberOfLaps laps at \$TrackName for \$DriveTime minutes with comments \$Comment"
        }
     ],
     "priority": 500000

  };

};


