
# Introduction

This document describes using the Input API and Web Component features of the 2D-UI GE.

# System Requirements
The 2D-UI components run in common web browsers and are independent of hardware and operating system.<br/>
A list of detailed browser compatibility for the Polymer Web Components can be found  here http://www.polymer-project.org/resources/compatibility.html.<br/>
The Input API requires the JQuery core library Version 1.9 or higher. All other 3rd-party libraries are delivered with the GEi.

## Software Requirements
Common web browser.

# Software Installation and Configuration

All 2D-UI components are collections of JavaScript libraries which have to be included in your web-project. Most of the components and example run locally in the web browser. Some components have to be installed and delivered from a web-server.

## Input API
To install the Input API you can clone the current version from the Git repository on [https://github.com/Adminotech/fi-ware-2D-UI](https://github.com/Adminotech/fi-ware-2D-UI) or download release from [catalogue page](http://catalogue.fiware.org/enablers/2d-ui/downloads). 
The  `lib` directory contains the 3rd-party JavaScript libraries which are required for the InputAPI  (jQuery plugins, Signals and Classy). The InputAPI JavaScript source files can be found in the `src` directory. The `test` folder finally contains an example implementation `input.html` which shows how the InputAPI has to be initialized and used. If you use the structure of the cloned git repository keep the file in the `test` folder and leave script paths as they are. If you use a different structure in your web project or create your own programs you have to change the references accordingly. Remember that all plugin file references must be after the main InputAPI.js reference which contains the definition of InputPlugin.<br/>
Details how to use the InputAPI can be found in the [user guide](user_programmers).

## Input Abstraction
Input Abstraction is part of the Input API implementation. To install follow the installation guide of InputAPI. The `test` folder contains an example implementation `inputState.html` of Input Abstraction which shows how the abstraction is initialized and used. Details how to use the Input Abstraction can be found in the [[2D-UI - User and Programmers Guide]].

## Polymer Web Component
To install the Polymer Web Component you can download ZIP archive from [the Forge](https://forge.fi-ware.eu/frs/download.php/926/MIWI-2D-UI_WebComponent.zip), extract the downloaded archive and add the files to your web project on your local file system or on a web server. 
The polymer browser components are packaged in the `browser_component` directory. The `chat` directory contains components to implement an example chat client implemented using the Polymer library version 0.1.1.
In the root directory of the ZIP archive you'll also find three examples how to implement a chat web application.

* index.html:

Shows how to use the standard way how to instantiate the chat-client referencing the library in the `browser_components` folder and the chat-components in the `chat` directory. In case of cross origin error from the browser when running from file system install and run the file on a web server.

* vulcanized.html:

The vulcanized version works similar to the standard version, but instead of referencing individual libraries and components int includes a **vulcanized** import file, which concatenates a set of Polymer components in a single file. In case of cross origin error from the browser when running from file system install and run the file on a web server.

* dynamic.html:

One of the biggest issues with Polymer is the lack of ability to load web components dynamically. However all needed functions are already there but the Polymer Project itself has not yet created a convinient way of using them. This is discussed topic inside the project and will be part of the project in the future. In this example we show a way to do it currently.
:The difference to the above examples is that this has to be installed on a web server. The example sets default paths to http://localhost. If you install it on your web server you have to remember to set the path's in `dynamic.html` and `chat/polymer-chat.html` accordingly.

# Sanity check procedures

## End to End testing
### InputAPI
* Open the Input.html file from the cloned repository `test` folder with your desired web browser. If InputAPI is working correctly you will see a log on the web page which shows every key press/release and all mouse events. Key events in the displayed log start with `Key` and mouse events start with `Mouse`.
* To test touch events place the file on a web server and use your mobile device web browser to open the file and test touch events. All touch event logs start with `Touch`.
* To test gamepad, connect your XBox or Playstation USB controller to your computer. NOTE: At this stage only the latest Chrome browser is supported. If gamepad is supported by your browser it is told in the display log. Once the gamepad is connected and the browser supports it, the display log will start to show gamepad button and axis states on every browser animation frame.

### InputAbstraction
* Open the InputState.html file from the cloned repository `test` folder with your desired web browser. 
* If InputState is working correctly you will see a web page where you can create and update an InputState. 
* The page is divided to 2 sections with a grey line. On the left is the InputState creation and on the right is the log display.
* Once the InputState is saved and its conditions are true the log display shows that the InputState with your given name is fired.

### Polymer Web Component
To test the example polymer-chat web component open one or all of these included example files in the root of the ZIP archive. The files must be run from a web server:

* index.html
* vulcanized.html
* dynamic.html

Once the file is open in the browser and the web component is displayed correctly, the user will see a chat widget on the bottom left corner of the opened page.