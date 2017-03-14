
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
          /*{ _id: '589b7bd4a6da2812024d37c7',
              updatedBy: 'jnakfour@redhat.com',
              name: 'cardrivetestreport',
              createdBy: 'jnakfour@redhat.com',
              description: 'A form to submit track driving car test',
              dataTargets: [],
              subscribers: [],
              pageRules: [],
              fieldRules: [],
              pages: [ { _id: '589b7bd4a6da2812024d37c6', fields: [Object] } ],
              lastUpdated: '2017-02-08T20:56:20.090Z',
              dateCreated: '2017-02-08T20:25:02.407Z',
              lastDataRefresh: '2017-02-08T20:56:20.090Z',
              pageRef: { '589b7bd4a6da2812024d37c6': 0 },
              fieldRef:
               { '589b7e8fa6da2812024d37c8': { page: 0, field: 0 },
                 '589b7e8fa6da2812024d37c9': { page: 0, field: 1 },
                 '589b7e8fa6da2812024d37ca': { page: 0, field: 2 },
                 '589b7e8fa6da2812024d37cb': { page: 0, field: 3 },
                 '589b7e8fa6da2812024d37cc': { page: 0, field: 4 },
                 '589b7e8fa6da2812024d37cd': { page: 0, field: 5 },
                 '589b7e8fa6da2812024d37ce': { page: 0, field: 6 } },
              lastUpdatedTimestamp: 1486587380090 }*/
            console.log(form);
            /*Fields
              [ { _id: '589b7e8fa6da2812024d37c8',
                  fieldCode: 'carmake',
                  name: 'Car Make',
                  required: true,
                  type: 'dropdown',
                  adminOnly: false,
                  fieldOptions: { validation: [Object], definition: [Object] },
                  repeating: false },
                { _id: '589b7e8fa6da2812024d37c9',
                  fieldCode: 'carmodel',
                  name: 'Car Model',
                  required: true,
                  type: 'dropdown',
                  adminOnly: false,
                  fieldOptions: { validation: [Object], definition: [Object] },
                  repeating: false },
                { required: true,
                  type: 'text',
                  name: 'Model Year',
                  fieldCode: 'caryear',
                  _id: '58a4b1e2495144a256c32cb2',
                  adminOnly: false,
                  fieldOptions: { validation: [Object] },
                  repeating: false },
                { required: true,
                  type: 'text',
                  name: 'Number of Laps',
                  fieldCode: 'numberoflaps',
                  _id: '58a4b1e2495144a256c32cb3',
                  adminOnly: false,
                  fieldOptions: { validation: [Object] },
                  repeating: false },
                { _id: '589b7e8fa6da2812024d37cb',
                  fieldCode: 'trackname',
                  name: 'Track',
                  required: true,
                  type: 'dropdown',
                  adminOnly: false,
                  fieldOptions: { validation: [Object], definition: [Object] },
                  repeating: false },
                { _id: '589b7e8fa6da2812024d37cc',
                  fieldCode: 'drivedistance',
                  name: 'Total Drive Distance (miles)',
                  required: true,
                  type: 'number',
                  adminOnly: false,
                  fieldOptions: { validation: [Object] },
                  repeating: false },
                { _id: '58b49dcf1bf79e3c65ff8feb',
                  fieldCode: 'drivetime',
                  name: 'Total Drive Time (min)',
                  required: true,
                  type: 'number',
                  adminOnly: false,
                  fieldOptions: { validation: [Object] },
                  repeating: false },
                { _id: '589b7e8fa6da2812024d37cd',
                  fieldCode: 'speed',
                  name: 'Average Speed (miles/hr)',
                  required: true,
                  type: 'number',
                  adminOnly: false,
                  fieldOptions: { validation: [Object] },
                  repeating: false },
                { _id: '589b7e8fa6da2812024d37ce',
                  fieldCode: 'comment',
                  name: 'Comments',
                  required: true,
                  type: 'textarea',
                  adminOnly: false,
                  fieldOptions: { validation: [Object] },
                  repeating: false } ]*/
            console.log("Fields");
            console.log(form.pages[0].fields);
            //Definitions
            //fieldOptions: { validation: [Object], definition: [Object] },

            console.log("Definition");
            console.log(form.pages[0].fields[0].fieldOptions.definition);
            /*Definition
            { options:
               [ { label: 'Porsche', checked: false },
                 { label: 'BMW', checked: false } ],
              include_blank_option: false }*/
            // Check api.ai for intents
            var apiaiURL='https://api.api.ai/v1/intents?v=20150910';

            request.get({
                    headers: {
                          'Authorization': 'Bearer 947286380d364646b70720032bb3e36a'
                        },
                    url: apiaiURL,
                    json: true
            }, function(error, response, body) {
                    if (error) {
                    	console.log("ERROR:" + error);
                        //return res.status(500).json(error);
                    }else {
                    	console.log("Body");
                    	console.log(body);
                    	/* [ { id: '47c48814-3321-46ce-af64-6e10f6a3364d',
                               name: 'create.report-car',
                               state: 'LOADED',
                               contextIn: [],
                               events: [],
                               parameters:
                                [ [Object],
                                  [Object],
                                  [Object],
                                  [Object],
                                  [Object],
                                  [Object],
                                  [Object],
                                  [Object] ],
                               contextOut: [],
                               actions: [ 'createnewcarreport' ],
                               priority: 500000,
                               fallbackIntent: false },
                             { id: 'a5d39158-1f76-4f7e-9e5e-85cd68639d32',
                               name: 'Default Fallback Intent',
                               state: 'LOADED',
                               contextIn: [],
                               events: [],
                               parameters: [],
                               contextOut: [],
                               actions: [ 'input.unknown' ],
                               priority: 500000,
                               fallbackIntent: true },
                             { id: 'dfe58f96-944e-4b70-9942-b4845d65fbc5',
                               name: 'Default Welcome Intent',
                               state: 'LOADED',
                               contextIn: [],
                               events: [ [Object] ],
                               parameters: [],
                               contextOut: [],
                               actions: [ 'input.welcome' ],
                               priority: 500000,
                               fallbackIntent: false } ]*/
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

function createIntent(name,fields) {
  /* Create an Intent at api.ai */
  console.log("Creating Ne Intent with name: " + name);
  var apiaiURL='https://api.api.ai/v1/intents?v=20150910';
  var intentContentValue = buildIntentContent(name,fields);
  console.log("Generated Intent Content");
  console.log(intentContentValue);
  var intentContent={
  "name": name,
     "auto": true,
     "contexts": [],
     /*"templates": [
        "turn @state:state the @appliance:appliance ",
        "switch the @appliance:appliance @state:state "
     ],*/
     "userSays": [
        {
           "data": [
              {
                 "text": "I am ready to report"
              }
             /* {
                 "text": "on",
                 "alias": "state",
                 "meta": "@state"
              },
              {
                 "text": " the "
              },
              {
                 "text": "kitchen lights",
                 "alias": "appliance",
                 "meta": "@appliance"
              }*/
           ],
           "isTemplate": false,
           "count": 0
        },
        {
           "data": [
              {
                 "text": "Ready to create report"
              }
              /*{
                 "text": "heating",
                 "alias": "appliance",
                 "meta": "@appliance"
              },
              {
                 "text": " "
              },
              {
                 "text": "off",
                 "alias": "state",
                 "meta": "@state"
              }*/
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

  request({
    headers: {
        'Authorization': 'Bearer 947286380d364646b70720032bb3e36a'
        },
        url: apiaiURL,
        method: "POST",
        json: true,
        body: intentContent
    },
    function(error,response,body) {
        if (error) {
           console.log("ERROR:" + error);
        }else {
           console.log("Body");
           console.log(body);
        }

    });

}

function createIntent(name,fields) {
    var parameters = [];
    var intentContentBuilt={
        "name": name,
             "auto": true,
             "contexts": [],
             /*"templates": [
                "turn @state:state the @appliance:appliance ",
                "switch the @appliance:appliance @state:state "
             ],*/
             "userSays": [
                {
                   "data": [
                      {
                         "text": "I am ready to report"
                      }
                     /* {
                         "text": "on",
                         "alias": "state",
                         "meta": "@state"
                      },
                      {
                         "text": " the "
                      },
                      {
                         "text": "kitchen lights",
                         "alias": "appliance",
                         "meta": "@appliance"
                      }*/
                   ],
                   "isTemplate": false,
                   "count": 0
                },
                {
                   "data": [
                      {
                         "text": "Ready to create report"
                      }
                      /*{
                         "text": "heating",
                         "alias": "appliance",
                         "meta": "@appliance"
                      },
                      {
                         "text": " "
                      },
                      {
                         "text": "off",
                         "alias": "state",
                         "meta": "@state"
                      }*/
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
                      /*{
                         "dataType": "@CarMake",
                         "name": "CarMake",
                         "value": "\$CarMake",
                         "required" :"true",
                         "prompts" : ["What is the Car Make?"]
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

                   ],*/
                   "speech": "Great Work! We will submit report for  \$CarMake \$CarModel \$CarYear for \$NumberOfLaps laps at \$TrackName for \$DriveTime minutes with comments \$Comment"
                }
             ],
             "priority": 500000
    };

    //var parameters = [];
    //intentContentBuilt.responses.parameters = parameters;
    /* Loop through all form fields and build responses*/
    /* { _id: '589b7e8fa6da2812024d37c8',
                         fieldCode: 'carmake',
                         name: 'Car Make',
                         required: true,
                         type: 'dropdown',
                         adminOnly: false,
                         fieldOptions: { validation: [Object], definition: [Object] },
                         repeating: false }*/
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
            //TO DO
            // Then datatype should be the name of the variable
            newParameter.dataType= "@" + fields[i].fieldCode;
            newParameter.name= fields[i].fieldCode;
            newParameter.value= "\$" + fields[i].fieldCode;
            newParameter.required = fields[i].required;
            newParameter.prompts= ["What is the " + fields[i].name];
            intentContentBuilt.responses.parameters.push(newParameter);
        } else if ((fields[i].type=='text') || (fields[i].type=='number')){
            // get values of dropdown and create Entities
            //TO DO
            // Then datatype should be the name of the variable
            newParameter.dataType= "@sys.number";
            newParameter.name= fields[i].fieldCode;
            newParameter.value= "\$" + fields[i].fieldCode;
            newParameter.required = fields[i].required;
            newParameter.prompts= ["What is the " + fields[i].name];
            intentContentBuilt.responses.parameters.push(newParameter);
        }else if(fields[i].type=='textarea') {
                     // get values of dropdown and create Entities
            //TO DO
            // Then datatype should be the name of the variable
            newParameter.dataType= "@sys.any";
            newParameter.name= fields[i].fieldCode;
            newParameter.value= "\$" + fields[i].fieldCode;
            newParameter.required = fields[i].required;
            newParameter.prompts= ["What is the " + fields[i].name];
            intentContentBuilt.responses.parameters.push(newParameter);
        }



    }

console.log("Returning");
console.log(intentContentBuilt);
    return intentContentBuilt;

}

