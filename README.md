# Public API Requests TD Project 5
 Javascript projects using Ajax and asyncronous programming to build a display of employees by fetching from an API

## Random User Generator API
This project fetches employee data from an open source API called Random User Generator. Their website: https://randomuser.me/

## getEmployees(url)
A function that takes a url parameter and asyncronously fetches the data, converts it to json and returns the iterable data

## generateHTML(data)
A function that takes a data parameter. The data is mapped and a card for each employee in the data set is generated and appended to the page. The data is then returned for use in later function calls

## generateSearch(data)
A function that takes a data parameter. This generates and appends the search bar. The data is returned for used in later function calls

## handleSearch(data)
A function that takes a data parameter. This function adds functionality to the search bar that is created in generateSearch. A `keyup` event is added to the search bar. On `keyup` the function loops through the employee objects in   `data` and checks to see if the user inputted value matches any of the names of employees in the dataset. All employees that do not match are hidden. If no employees are shown, a message, letting the user know that no results are returned, is shown

## formatDate(date)
A function that takes a date parameter. This function is used in `generateModal` to convert a iso formatted date to a short date format to make it look more appealing for the user when they view the birthday on the modal
