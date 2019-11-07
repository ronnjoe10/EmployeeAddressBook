## Employee Address Book

Author  : Joe Jerald 

Mobile  : 0466816567

Email   : joejerald@gmail.com 

### `Application Overview`

The goal of this application is to implement an Address Book for a Retail Branch Manager that holds employee names, phone number and their department.
Acceptance Criteria as a Branch Manager:
- Add a New employee
- Delete an existing employee
- Sort by Name and Department 
- Search the records 

### `Coding Decisions`

- Chose colors similar to Our Very Own company's website 
- Added form validations
- Using redux store to add and delete the records.

## Running the React App
 
Download or clone the project source code from https://github.com/ronnjoe10/EmployeeAddressBook
 
In the project directory, you can run:
 
### `npm install`
 
If you do not have NodeJS installed in your system, follow the steps below before executing "npm install" command
 
Install NodeJS and NPM from  https://nodejs.org/en/download/.
Node.js is required to run JavaScript without a browser support. Node.js is an open source, cross-platform runtime environment for server-side JavaScript.
 
### `npm start`
 
Runs the app in the development mode.<br>
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.
 
The page will reload if you make edits.<br>
You will also see any lint errors in the console.
 
### `npm test`
 
Launches the test runner<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) and [snapshot testing] (https://jestjs.io/docs/en/snapshot-testing) for more information.

Alternatively, you can run `npm test -- --coverage` to more detailed report. 
 
### `npm run build`
 
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimises the build for the best performance.
 
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
 
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
 
 
## Design/Implementation Document
 
### `Project Structure`
All Javascript source code for this application is located in the /src folder. Inside of it we have main JS files and a component folder describing the components of (Global, Header, Survey) along with a CSS file.
 
### `Path: /src/index.js`
Index.js is the entry point of this application and bootstraps it by rendering the App component into the app div element defined in the base index html.
 
### `Path: /src/App.js`
The app component is the root component for this application, it contains other components to support rendering the entire website.

### `Path: /src/Router.js`
This component keeps our UI in sync with the URL by handling dynamic route matching, location transition and much more.
 
### `Path: /src/Global`
The Global folder holds all the common components which are regularly used across our application. Such as:

1. API Request
2. Exception Handling
3. Declaring Constants 
4. Loading Info
 
### `Path: /src/Header`
This folder holds the header component.

### `Path: /src/AddressBook`
This Folder holds all Address Book components 
- AddressBookHome.js
  - This component initiates the initial API request and process the response and stores the data in store.
- AddressBookDashboard.js
  - This component receives the API response as Props from store and displays the records. 
  - Add, Delete, Sort and Search actions can be performed here.
- AddAddressForm.js
  - Opens up the pupup and displays user input form
- AddAddressAction.js
  - This component takes the user input and submits the date after passing the validation 
  - Data is passed back to store and dashboard gets updated. 
 
### `Path: /src/style.css`
Style.css is used to define the application with simple styles on the webpage.

