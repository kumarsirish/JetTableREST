/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'accUtils','text!./endpoints.json', 'jquery', 'ojs/ojarraydataprovider','ojs/ojknockout-keyset',
    'ojs/ojknockout', 'ojs/ojtable'],
        function (ko, accUtils, endpoints, $, ArrayDataProvider, keySet) {

            var self = this;

            function DashboardViewModel() {

                self.url = JSON.parse(endpoints).employees

                self.empTable = ko.observableArray();
                self.dataprovider = new ArrayDataProvider(self.empTable, {keyAttributes: '@index'});  //@index indeicates the index number or row number of the table. You can replace it by 'id' or any other table key
                let newTableData = [];
                self.empTable([]);//reset the details table

                $.getJSON(self.url, function (data) {
                    $.each(data, function (key, val) {
                        console.log("INFO: key: "+key+"val.DEPARTMENT_ID: " + val.DEPARTMENT_ID);

                        newTableData.push({
                            id: val.id,
                            DEPARTMENT_ID: val.DEPARTMENT_ID,
                            FIRST_NAME: val.FIRST_NAME,
                            LAST_NAME: val.LAST_NAME,
                            SALARY: val.SALARY,
                            IMAGE: val.Image
                        });

                    });
                    self.empTable(newTableData);
                });
                
                self.selectedRows = new keySet.ObservableKeySet();
                self.selectedChangedListener = function (event) {
                    document.getElementById('selectedInfo').value = '';
                    var selectionText = '';
                    var selectedRowIndex;
                
                    if (event.detail.value.row.values().size > 0) {
                            event.detail.value.row.values().forEach(function (key) { //same "key" which is defined as keyAttributes in adata povider above
                            console.log("Row number: "+Number(key)+" Details : "); console.log(self.empTable()[key]);
                            selectedRowIndex = Number(key); //key=row number here
                            selectionText += selectionText + "First name: "+ self.empTable()[selectedRowIndex].FIRST_NAME + "\n" ;
                        });
                    }
                        document.getElementById('selectedInfo').value = selectionText;
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
