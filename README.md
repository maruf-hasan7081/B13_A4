1.getElementById("id"):
Finds elements with a specific id
Always returns a single element
Works very fast

getElementsByClassName("class"):

Finds elements with a specific class name
Returns multiple elements
Returns HTMLCollection
querySelector("selector"):
Finds elements using a CSS selector
Returns the first matching element

querySelectorAll("selector"):

Returns all matching elements using a CSS selector
Returns NodeList

2.
Create Element
Add Content
Add to appendChild

3.
Event Bubbling is -
When an event occurs on a child element, that event continues to rise up to parent → grandparent → body.

4.
Event Delegation is -
Handling the event of a child element by placing an event listener on the parent element.

5.
preventDefault()-Disables the browser's default behavior

stopPropagation() - Stops event bubbling, prevents events from going to the parent
