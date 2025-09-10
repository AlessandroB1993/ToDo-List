# TODO list project

Simple project where you can add to-do task items, normal anche checklist format.

## Features

- Add normal task item with title, description, due date, with priority (urgent).
- Add checklist type task where you can also add a list of subtask before the item can be complete.
- Switch between the two different forms and automatically display the selected type items.
- Add 'projects' which are like folders that keep the added items in it, and these items will be displayd when that project is selected. A project can be: grocery, chores, study etc.
- Click to an item to see the expanded card with details other than title and due date, click again or click other cards to close it.
- Set item with priority or remove priority after the item is created by expanding it and clicking on the corresponding button.
- Set item as completed by clicking on the corresponding button.
- Display all completed item in a modal window by clicking on the button on the top-right.
- Delete an item by clicking on the corresponding button.

# What I learned

## Problems I encountered + choosed solution

1. I had to find a way to create item and wonder if a class with methods would be ok. I wondered the same for projects.
   Solution: I created 2 classes, one for items (handles both normal and checklists) and oe for projects

2. I couldn't find a way to manage a common list for each instance of the Item class, I needed one inside the class and not on the global scope
   Solution: I used the 'static' keyword, which creates a property accessible on all istances of the class. Accessible not with the this keyword but with name of the class (Project.itemList).

3. During refactoring of the code I wanted to separate dom logic from the logic of the app but my code was messed up and certain, longer, function mixed everything: state, logic and dom creation/manipulation.
   Solution: I created three folders for the MVC pattern, in each folder created file for each view (and it's controller in the controllers folder). This helped me to understand that each view function only handles the dom, if it needs state to work, that is passed by the controller.
   Also, all the controller functions are inside an init function, which is called by the main.js entry point. Controller are essentially eventListener added to the DOM like form submit handlers, clickable buttons that do something, clickable element in a list etc.
