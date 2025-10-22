# TODO list project

Simple project where you can add to-do task items, normal and checklist format.

## Features

- Add normal task item with title, description, due date and priority.
- Add checklist type task where you can also add a list of subtasks before the item can be set as complete.
- Switch between the two different item types.
- Add 'projects', folders that contains the added items and these items are displayed when the corresponding project is selected. Examples of projects: grocery, chores, study etc.
- Click to an item to see the expanded card with more details, click again or click another card to close it.
- Set item with priority or remove priority after the item is created by expanding it and clicking on the corresponding button.
- Set item as completed by clicking on the corresponding button.
- Display all completed item in a modal window by clicking on the button on the top-right.
- Delete an item by clicking on the corresponding button.

# What I learned

## Problems I encountered + choosed solution

1. I had to find a way to create item and wondered if class instances with property and methods would be ok. I asked the same question for projects.
   Solution: I created 2 classes, one for items (handles both normal and checklists) and one for projects

2. I couldn't find a way to manage a common list for all instances of the Item class. I needed one inside the class and not as an array on the global scope.
   Solution: I used the 'static' keyword, which creates a property accessible on all instances of the class, accessible not with the "this" keyword but with name of the class (e.g. Project.itemList).

3. During refactoring of the code I wanted to separate DOM logic from the logic of the app but my code was messed up and some longer functions mixed everything: state, logic and DOM creation/manipulation.
   Solution: I created three folders for the MVC pattern, in each folder created file for each view (and it's controller in the controllers folder). This helped me to understand that each view function only handles the DOM, if it needs state to work, that is passed by the controller.
   Also, all the controller functions are inside an init function, which is called by the main.js entry point. Controller are essentially eventListener added to the DOM like form submit handlers, clickable buttons that do something, clickable element in a list etc.
