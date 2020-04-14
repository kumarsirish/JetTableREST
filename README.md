# JetTableREST

### (a) Provide Mock Data via the JSON Server

In this part, you set up the [JSON Server](https://scotch.io/tutorials/json-server-as-a-fake-rest-api-in-frontend-development) to publish mock data that will be visualized in the Oracle JET application that you'll create via the instructions that follow.

   1. Set up the JSON Server, as follows:
```js #button { border: none; }   
npm install -g json-server
```   
Details: https://github.com/typicode/json-server

   2. Download and put this file anywhere on disk:
   
https://raw.githubusercontent.com/geertjanw/ojet-training/master/employeeData.json

**Tip:** Do not put the above file in an Oracle JET application, instead, put it somewhere completely separate, e.g., on your Desktop, and run the command below in the Terminal window from the location of the employeeData.json file.

   3. Run in the Terminal window: 
```js #button { border: none; }
json-server --watch employeeData.json
```
   4. Go to http://localhost:3000/employees and see your data 
