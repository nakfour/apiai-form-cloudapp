
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
                  fieldCode: null,
                  name: 'Car Make',
                  required: true,
                  type: 'dropdown',
                  adminOnly: false,
                  fieldOptions: { validation: [Object], definition: [Object] },
                  repeating: false },
                { _id: '589b7e8fa6da2812024d37c9',
                  fieldCode: null,
                  name: 'Car Model',
                  required: true,
                  type: 'dropdown',
                  adminOnly: false,
                  fieldOptions: { validation: [Object], definition: [Object] },
                  repeating: false },
                { required: true,
                  type: 'number',
                  name: 'Model Year',
                  fieldCode: null,
                  _id: '589b7e8fa6da2812024d37ca',
                  adminOnly: false,
                  fieldOptions: { validation: [Object] },
                  repeating: false },
                { required: true,
                  type: 'dropdown',
                  name: 'Track',
                  fieldCode: null,
                  _id: '589b7e8fa6da2812024d37cb',
                  adminOnly: false,
                  fieldOptions: { validation: [Object], definition: [Object] },
                  repeating: false },
                { required: true,
                  type: 'number',
                  name: 'Total Drive Time',
                  fieldCode: null,
                  _id: '589b7e8fa6da2812024d37cc',
                  adminOnly: false,
                  fieldOptions: { validation: [Object] },
                  repeating: false },
                { required: true,
                  type: 'number',
                  name: 'Average Speed',
                  fieldCode: null,
                  _id: '589b7e8fa6da2812024d37cd',
                  adminOnly: false,
                  fieldOptions: { validation: [Object] },
                  repeating: false },
                { required: true,
                  type: 'textarea',
                  name: 'Comments',
                  fieldCode: null,
                  _id: '589b7e8fa6da2812024d37ce',
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
                    	//return res.json(body);
                    }
            });


          }
        });


      });


    }
};

