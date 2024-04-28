# Requirements

We need to store or keep track of:
* Input and output languages
* Text to translate and translated text
* If its loading the translation or not

Instead of dealing with these through separate `useState` statements, we create an `useReducer`. Before, we create an object to store the mentioned things we need to keep track of.

Then, we need to define the actions will be performed to change the object:

* User change input and output languages
* User change input language textbox content

