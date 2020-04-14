/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'accUtils', 'text!./employeeData.json', 'text!./endpoints.json', 'jquery', 'ojs/ojarraydataprovider',
    'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojdatagrid', 'ojs/ojcollectiondatagriddatasource','ojs/ojinputtext', 'ojs/ojformlayout'],
        function (ko, accUtils, localdata, endpoints, $, ArrayDataProvider) {

            function DashboardViewModel() {
                var self = this;


                self.url = JSON.parse(endpoints).employees

                self.collection = new oj.Collection(null, {
                    model: new oj.Model.extend({
                        idAttribute: 'id',
                        urlRoot: self.url}),
                    url: self.url
                });

                self.dataSource = new oj.CollectionDataGridDataSource(
                        self.collection, {
                            rowHeader: 'id',
                            columns: ['FIRST_NAME', 'LAST_NAME', 'HIRE_DATE', 'SALARY']
                        });


                self.dataprovider = new ArrayDataProvider(JSON.parse(localdata), {keyAttributes: 'DepartmentId', implicitSort: [{attribute: 'DepartmentId', direction: 'ascending'}]});



                var nextKey = 121;
                self.inputEmployeeID = ko.observable(nextKey);
                self.inputFirstName = ko.observable();
                self.inputLastName = ko.observable();
                self.inputHireDate = ko.observable();
                self.inputSalary = ko.observable();

                //build a new model from the observables in the form
                self.buildModel = function () {
                   return {
                     'id': self.inputEmployeeID(),
                     'FIRST_NAME': self.inputFirstName(),
                     'LAST_NAME': self.inputLastName(),
                     'HIRE_DATE': self.inputHireDate(),
                     'SALARY': self.inputSalary()
                   };
                };
                
                
                //used to update the fields based on the selected row:
                self.updateFields = function (model) {
                   self.inputEmployeeID(model.get('id'));
                   self.inputFirstName(model.get('FIRST_NAME'));
                   self.inputLastName(model.get('LAST_NAME'));
                   self.inputHireDate(model.get('HIRE_DATE'));
                   self.inputSalary(model.get('SALARY'));
                };
                self.handleSelectionChanged = function (event) {
                 var selection = event.detail['value'][0];
                 if (selection != null) { 
                     var rowKey = selection['startKey']['row'];
                     self.modelToUpdate = self.collection.get(rowKey);
                     self.updateFields(self.modelToUpdate);
                 }
                };



                // Below are a set of the ViewModel methods invoked by the oj-module component.
                // Please reference the oj-module jsDoc for additional information.

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * This method might be called multiple times - after the View is created
                 * and inserted into the DOM and after the View is reconnected
                 * after being disconnected.
                 */
                self.connected = function () {
                    accUtils.announce('Dashboard page loaded.', 'assertive');
                    document.title = "Dashboard";
                    // Implement further logic if needed
                };

                /**
                 * Optional ViewModel method invoked after the View is disconnected from the DOM.
                 */
                self.disconnected = function () {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after transition to the new View is complete.
                 * That includes any possible animation between the old and the new View.
                 */
                self.transitionCompleted = function () {
                    // Implement if needed
                };
            }

            /*
             * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
             * return a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.
             */
            return DashboardViewModel;
        }
);
