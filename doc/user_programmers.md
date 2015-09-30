# Introduction

This document describes how to use the Input API and develop a web application or web page which make use of the Input API. 
In addition document describes how to start using and creating Polymer Web Components.

The Input API is a Javascript library which based on common Javascript libraries such as JQuery.js and signals.js. 
Polymer library uses latest web technologies and enables creating custom HTML elements.
For both the basic Javascript, HTML and CSS knowledge is needed. Understanding Polymer concept get familiar with the basic information about Web Components http://www.w3.org/TR/components-intro/. 

# Background and Detail

This User and Programmers Guide relates to the 2D-UI GE which is part of the [[Advanced_Middleware_and_Web_UI_Architecture | Advanced Middleware and Web User Interfaces chapter]]. Please find more information about this Generic Enabler in the related [[FIWARE.OpenSpecification.MiWi.2D-UI | Open Specification]] and [[FIWARE.ArchitectureDescription.MiWi.2D-UI | Architecture Description]]

# User guide

This section does not apply. All components related to 2D-UI are for programmers and are used programmatically. 

# Programmers guide

## InputAPI 

How to download and install the Input API is described in the [2D-UI - Installation and Administration Guide](installation_administration)

To start using the libraries have a look at the `input.html` file in the `test` folder. This file shows how to use the Input API and the IInputPlugin for creating new input plugins. 
InputAPI uses jQuery, jQuery plugins, Signals and Classy JavaScript libraries.

At first create a html page and include needed JavaScript files to the <head> section of your newly created file. Remember that all references to plugin files must be placed after the main InputAPI.js reference which contains the definition of IInputPlugin.

If you use the structure of the cloned git repository, place the file under `test` folder and leave script paths as they are. If you move the file to e.g. your own web server change the paths accordingly.

    <!-- jQuery -->
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>

    <!-- Dependencies: jQuery plugins -->
    <script src="../lib/jquery.mousewheel.js"></script>
    <script src="../lib/jquery.hotkeys.js"></script>
    <script src="../lib/jgestures.min.js"></script> 	<!-- touch events -->
    <script src="../lib/signals.js"></script>		<!-- signaling -->

    <!-- Dependencies: Libraries -->
    <script src="../lib/classy.js"></script>               	<!-- classes with proper inheritance -->

    <!-- Input API-->
    <script src="../src/InputAPI.js"></script>
    </pre>

Instantiate the InputAPI and give it a container element. The container can be empty in the initialization. All signals can be registered manually afterwards.
For keyboard signals given elements must contain tabIndex property, otherwise signals will be bound to the document and keyboard signals won´t work properly. The container
library uses jQuery to find corresponding HTML elements in the document. In this example we have created a div element which ID is input-console. Place all the described sections
below inside a script tag: <script type="text/javascript"></script>.

    var inputAPI = new InputAPI({
        //Give container for event registering. Not mandatory. Register can be done manually.
        container: "#input-console"
    });

At this stage the InputAPI has bound all generic mouse and keyboard signals which are included in the InputAPI itself.<br/>
Next start listening those signals by adding a listener.

    inputAPI.mouseEvent.add(onMouseEvent);
    inputAPI.keyEvent.add(onKeyEvent);

Here is a complete list of supported keyboard and mouse events.

Keyboard:

* keyEvent ("press" | "release")
* keyPress
* keyRelease

Mouse:

* mouseEvent ("move" | "press" | "release" | "wheel")
* mouseMove
* mousePress
* mouseRelease
* mouseClick
* mouseWheel

Create corresponding listener functions. Read the data and use it for your purposes. In this example the data is just pushed to the given container.

    function onKeyEvent(event)
    {
        $('#input-console').prepend("<b style=\"color: blue;\">Key: "+event.key +" - "+event.type+"</b><br>");
    }

    function onMouseEvent(event)
    {
        $('#input-console').prepend("<b style=\"color: red;\">Mouse: "+event.type+":</b> X="+event.x+", Y="+event.y+"<br>");
    }

All mouse signals contain a mouse/event object which keeps its state and provides the following data to use:

    //Event type: move, press, release, wheel
    type : "",
    // Absolute position
    type : "",
    // Absolute position
    x : null,
    y : null,
    // Relative position
    relativeX : 0,
    relativeY : 0,
    // Wheel delta
    relativeZ : 0,
    // Button states
    rightDown  : false,
    leftDown   : false,
    middleDown : false,
    // HTML element id that the mouse event occurred on
    targetId : "",
    // HTML node name eg. 'canvas' and 'div'. Useful for detected
    // when on 'canvas' element aka the mouse event occurred on the
    // 3D scene canvas and not on top of a UI widget.
    targetNodeName : "",
    // Original jQuery mouse event
    originalEvent : null


All keyboard signals contain a keyboard/event object which keeps its state and provides following data to use:

    // Event type: press, release
    type : "",
    // Event key code
    keyCode : 0,
    // Event key as string
    key : "",
    // If this is a repeat. Meaning the key was already in the pressed state.
    repeat : false,
    // Currently held down keys: maps key as string to 'true' boolean
    // Check with inputApi.keyboard.pressed["w"] or keyEvent.pressed["f"]
    pressed : {},
    // HTML element id that the mouse event occurred on
    targetId : "",
    // HTML node name eg. 'canvas' and 'div'. Useful for detected
    // when on 'body' element aka the mouse event occurred on the "3D scene" and not on top of another input UI widget.
    targetNodeName : "",
    // Original jQuery mouse event
    originalEvent : null


For a complete example please look at the input.html file inside the test folder of the cloned repository.
The plugin system is opened and described below.

# IInputPlugin
IInputPlugin provides plugin system for InputAPI. IInputPlugin is included in InputAPI. To create a plugin write new js -file which
extends the IInputPlugin. Written plugins are automatically registered as a part of InputAPI. As an example you can find 2 example plugins InputGamepadPlugin.js and InputTouchPlugin.js in the src -folder of the cloned repository. For this guide we will take a deeper look at the TouchInputPlugin.js -file. As default all plugin signals are bound to the given container in the InputAPI. If the container is not present registering can be done manually by giving desired container.

IInputPlugin -class is displayed below:

    var IInputPlugin = Class.$extend(
    {
        __init__ : function(name)
        {
            if (name === undefined)
            {
                console.error("[IInputPlugin]: Constructor called without a plugin name!");
                name = "Unknown";
            }
            this.name = name;
            this.running = false;
        },

        __classvars__ :
        {
            register : function()
            {
                var plugin = new this();
                InputAPI.registerPlugin(plugin);
            }
        },

        _start : function(container)
        {
            this.start(container);
            this.running = true;
        },

        start : function()
        {
            console.log("[IInputPlugin]: Plugin '" + name + "' has not implemented start()");
        },

        _stop : function()
        {
            this.stop();
            this.running = false;
        },

        stop : function()
        {
            console.log("[IInputPlugin]: Plugin '" + name + "' has not implemented stop()");
        },

        reset : function()
        {
        }
    });


To create own IInputPlugin please look at the given examples in the src folder of the cloned repository.

To use created plugins first include the created plugin js -file to the head of your html -file under InputAPI -sript reference.
As an example we will use the InputTouchPlugin.js found in the src -folder.

    <!-- Touch input -->
    <script src="../src/InputTouchPlugin.js"></script>

Get hold of automatically created plugin by its name and start listening the signals provided by the plugin.

    var touch = inputAPI.getPlugin("Touch");
    if (touch)
    {
        //If you want to register the events for a different container that the inputAPI may already have do it here.
        //touch.registerTouchEvents("#my-div-element");
        //Add a listener to touchEvent signal
        touch.touchEvent.add(onTouchEvent);
    }

    function onTouchEvent (obj, event)
    {
        $('#input-console').prepend("<b style=\"color: green;\">Touch: "+obj.type+"</b>: X="+obj.startx+", Y="+obj.starty+", RelativeX="+obj.relativeX+", RelativeY="+obj.relativeY+", Moved="+obj.moved+"<br>");
    }

Here is the complete list of InputTouchPlugin.js supported events:

* touchEvent ("tapone" | "taptwo" | "tapthree" | "tapfour" | "pinch" | "pinchopen" | "pinchclose" | "rotate" | "rotatecw" | "rotateccw" | "swipeone" | "swipetwo" | "swipethree" | "swipefour" | "shake")
* tapOne
* tapTwo
* tapThree
* tapFour
* swipeMove
* swipeOne
* swipeTwo
* swipeThree
* swipeFour
* pinch
* pinchOpen
* pinchClose
* rotate
* rotateCW
* rotateCCW
* shake

To find out the data touch/event -object please look at the TouchInputPlugin.js -file.

# InputAbstraction
InputAPI contains implementation where user can register/unregister and update input contexts with parametrized conditions. The implementation is built up as InputState -class. User can register 0-n InputState objects to InputAPI. Once registering succees a signal is given as return value so user can hook the signal to match own purposes. For example if user states pressing 'w' and 'f' together means 'forward' and the conditions are true InputAPI fires a signal connected to the InputState. Now user can decide what to do when the signal has fired.

InputState -class is described below:

    /**
        Provides input state for abstraction
        @class InputState
        @constructor
    */
    var InputState = Class.$extend(
    {

        __init__ : function(params)
        {

            this.name = params.name || ""; //Name of the input state. Indexing property. Has to be unique within InputAPI context.
            this.keyBindings = params.keyBindings || null; //Keybindings as string array.
            this.mouseDown = params.mouseDown || null; //Mouse conditions LEFT_DOWN, MIDDLE_DOWN, RIGHT_DOWN.
            this.timeslot = params.timeslot || 0; //Time slot within the given conditions must be true. 0 - 5000 milliseconds, where 0 means no time slot.
            this.priority = params.priority || 100; //Priority 0 - 100 representing percentage of importance.
            this.multiplier = params.multiplier || 0; //Multiplier 0 - 5. How many times either mouse or keyboard conditions must be true within given time slot.
            this.actionSignal = null; //The action signal fired when all conditions are true.
        },

        __classvars__ :
        {
            Mouse :
            {
                LEFT_DOWN : 1,
                RIGHT_DOWN : 2,
                MIDDLE_DOWN : 3
            }

        },

        reset : function()
        {
            this.actionSignal.removeAll();
        },

        //Set name of the input state. Name can represent what the action should do e.g. Move forward.
        setName : function(paramName)
        {        
            if (paramName)
                this.name = paramName;
        },

        //Set keybindings in string array e.g. [w] representing which keys must be pressed. 
        setKeyBindings : function(paramKeyBindings)
        {
            if (paramKeyBindings)
                this.keyBindings = paramKeyBindings;
        },

        //Set the pressed mouse button value.
        setMouseDown : function(paramMouseDown)
        {
            if (paramMouseDown)
                this.mouseDown = paramMouseDown;
        },

        //Set time slot within the given mouse, keyboard and multiplier conditions must be true. 0 - 5000 milliseconds, where 0 means no time slot.
        setTimeslot : function(paramTimeslot)
        {
            var tsval = parseInt(paramTimeslot);
            if (isNaN(tsval))
            {
                console.log("[InputState] Time slot update failed. Value must be between 0 and 5000 milliseconds.");
                return false;
            }

            if (tsval >= 0 && tsval <= 5000)
            {
                this.timeslot = tsval;
            }
            else
            {
                console.log("[InputState] Time slot update failed. Value must be between 0 and 5000 milliseconds.");
                return false;
            }
        },

        //Set priority for this inputState. If priority is 100 the state is handled first. If the priority is 0 the state is handled last.
        setPriority : function(paramPriority)
        {
            var prval = parseInt(paramPriority);
            if (isNaN(prval))
            {
                console.log("[InputState] Priority update failed. Value must be between 0 and 100.");
                return false;
            }
            if (prval >= 0 && prval <= 100)
            {
                this.priority = prval;
            }
            else
            {
                console.log("[InputState] Priority update failed. Value must be between 0 and 100.");
                return false;
            }
        },

        //Set multiplier from 0 to 5. How many times either mouse or keyboard conditions must be true within given time slot. E.g. if you give multiplier 2, timeslot 500 and mouse  
        //condition says press LEFT_DOWN, the event is fired when user presses mouse left twice within 500 milliseconds. 
        setMultiplier : function(paramMultiplier)
        {

            var mpval = parseInt(paramMultiplier);
            if (isNaN(mpval))
            {
                console.log("[InputState] Multiplier update failed. Value must be between 0 and 5.");
                return false;
            }

            if (mpval >= 0 && mpval <= 5)
            {
                if (this.timeslot == 0)
                {
                    console.log("[InputState] Time slot cannot be 0 if multiplier is set");
                    return false;
                }

                this.multiplier = mpval;
            }
            else
            {
                console.log("[InputState] Multiplier update failed. Value must be between 0 and 5.");
                return false;
            }
        }
    });

#### Creating an InputState
To start using the InputState have a look at the `InputState.html` file in the `test` folder. This file shows how to use the input abstraction with the InputState -class. Please follow the guide of InputAPI how to create an html page. Then in addition include the needed InputState.js -file.

    <!-- InputState -->
    <script src="../src/InputState.js"></script>

At first instantiate InputAPI as guided in the InputAPI -section and create an InputState:

    var inputAPI = new InputAPI({
         //Give container for event registering. Not mandatory. Register can be done manually.
         container: "#my-container"
    });

    var inputState = new InputState ({
    	name : "Name of my input state",
    	keyBindings : ['s','w'], //Keybindings as string array
    	mouseDown : InputState.Mouse.LEFT_DOWN, //Mouse conditions LEFT_DOWN, MIDDLE_DOWN, RIGHT_DOWN
    	timeslot : 0, //Time slot within the given conditions must be true. 0 - 5000 milliseconds, where 0 means no time slot
    	priority : 100, //Priority 0 - 100 representing percentage of importance
    	multiplier : 0 //Multiplier 0 - 5. How many times the conditions must be true within given time slot 
    });

Create an event handler and hook the output e.g. to some div -element on your html -page:

    function onInputSignal(event)
    {
         $('#my-container').prepend("InputState "+inputState.name+" fired!");
    }

Register the created InputState. If InputState is well formed InputAPI returns a signal, otherwise false:

    //Register InputState
    var inputStateSignal = inputAPI.registerInputState(inputState);

Hook the signal:

    if (inputStateSignal)
    {
         inputStateSignal.add(onInputSignal);
    }
    else
    {
         console.log("InputState has invalid values.");
    }

#### Update existing InputState
Change the values of your already registered InputState and update the state:

    inputAPI.updateInputState(inputState);

## Polymer Web Component

How to download and install the Polymer Web Components is described in the [2D-UI - Installation and Administration Guide](installation_administration)


The downloaded ZIP archive contains 3 examples of a chat web component created with Polymer library version 0.1.1.
* index.html
* dynamic.html
* vulcanized.html

Inside browser_components folder the Polymer project files are located. You can follow the current version of the [Polymer Project here](https://github.com/polymer/polymer).
The chat folder contains the implemented example of chat web components which has the name polymer-chat.

### polymer-chat in index.html

When the index.html file is opened in a browser you can see a chat application written as a Polymer web component.

To use this polymer-chat web component first reference platform.js and import polymer.js which is included in polymer.html to your page <head> section:

    <script src="bower_components/platform/platform.js"></script>
    <link rel="import" href="bower_components/polymer/polymer.html">

Then import the Polymer web component created:

    <link rel="import" href="chat/polymer-chat.html">

If you look inside the imported polymer-chat.html you can find it importing a polymer-collapse.html and referencing a css file.
At last put the template tag to your page inside <body> tag:

    <polymer-chat></polymer-chat>

The source code of example page is as follows:

    <html>
      <head>
        <script src="bower_components/platform/platform.js"></script>
        <link rel="import" href="bower_components/polymer/polymer.html">
        <link rel="import" href="chat/polymer-chat.html">
      </head>
      <body>
        <polymer-chat></polymer-chat>
      </body>
    </html>

Inside the index.html source code you can also find how to use the polymer-chat:

    <script>
      //Simple example to use polymer with javascript
      window.addEventListener('WebComponentsReady', function(e) {
          var pchat = document.querySelector('polymer-chat');
          pchat.clientusername = "User 1";
          pchat.addUser("test", "1");
          pchat.addUser("test2", "2");

          //Connect to polymer fired event
          pchat.addEventListener('chatmessage', function(e)
          {
              console.log("Event fired in polymer component : "+e.detail.uname+"-"+e.detail.message);
          });

          pchat.onServerMessage("ChatInfoMessage|Server:Message from server.");
      });
    </script>

### polymer-chat in vulcanized.html

This example file is similar to the index.html except it uses vulcanized import file. Vulcanize concatenates a set of Polymer Web Components into one file [https://github.com/Polymer/vulcanize GitHub].
Instead of importing polymer-chat.html we now import polymer-chat-full.html which as vulcanized set of polymer-chat and polymer-collapse.

    <link rel="import" href="chat/polymer-chat-full.html">

If you look inside the polymer-chat-full.html file you can see all templates, css and scripting as a one file.

### polymer-chat in dynamic.html

One of the biggest issues with Polymer is the lack of ability to load web components dynamically. However all needed functions are already there but the Polymer Project itself
has not yet created a convenient way of using them. This is discussed topic inside the project and will be part of the project in the future.
In this example we show a way to do it currently.

The difference to other examples is that this has to be installed on a web server. The example sets default paths to http://localhost. When trying remember to change these paths accordingly.
Change the paths in dynamic.html and polymer-chat-dynamic.html -files.

In this example we use jQuery to download the component therefore a link to jQuery library is needed:

     <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>

Next we download the polymer-chat-dynamic.html and create the polymer-chat -element on the fly. The content of downloaded file is
put to innerHTML of the newly created component and then added to document body -section.

       //Download polymer dynamically and at tag to page.
       $.get( "http://localhost/polymer/chat/polymer-chat-dynamic.html", function( data ) {
         var element = document.createElement("polymer-chat");
         element.innerHTML = data;
         $("body").append(element);
       });

Next we will wait for WebComponentsReady event and start to hook things up. We also have to wait for the polymer-chat component itself to inform that it
is ready. For this we wait for polymerchatready -event which is fired when the polymer-chat -component has been fully initialized and ready to use. You can find
this piece of code inside the polymer-chat-dynamic.html -file:

    ready : function()
      {
        console.log("Polymer Chat is ready!");
        this.fire("polymerchatready");
      }

Below is the complete script:

   	   //Wait for WebComponentsReady event
   	   window.addEventListener('WebComponentsReady', function(e) {
       var pchat = document.querySelector('polymer-chat');
       //Wait for PolymerChat being ready
       pchat.addEventListener('polymerchatready', function(e)
       {
           pchat.clientusername = "User 1";
           pchat.addUser("test", "1");
           pchat.addUser("test2", "2");

           //Connect to polymer fired event
           pchat.addEventListener('chatmessage', function(e)
           {
               console.log("Event fired in polymer component : "+e.detail.uname+"-"+e.detail.message);

           });

           pchat.onServerMessage("ChatInfoMessage|Server:Message from server.");

       });
   	});

Since Polymer is at pre-alpha stage all these examples may break if the Polymer version is being updated.

To start programming Polymer all the needed information is provided here: [Polymer project](http://www.polymer-project.org/).<br>
Polymer is very heavily under development. The best way to get started is to follow instructions of getting started guide: [Getting Started](http://www.polymer-project.org/docs/start/usingelements.html).