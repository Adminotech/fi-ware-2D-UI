# fi-ware-2D-UI #

This file shows how to use the Input API and the IInputPlugin for creating new input plugins. InputAPI uses jQuery, jQuery plugins, Signals and Classy -javascript libraries.

At first create a html -page and include needed js -files to the <head> section of your newly created file. Remember that all plugin -files must be after the main InputAPI.js -file which contains the definition of IInputPlugin.

If you use the structure of the cloned git -repo place the file under test -folder and leave script paths as they are. If you create the file to e.g. your own web server change the paths accordingly.

   
	<!-- jQuery -->
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	
	<!-- Dependencies: jQuery plugins -->
	<script src="../lib/jquery.mousewheel.js"></script>
	<script src="../lib/jquery.hotkeys.js"></script>
	<script src="../lib/jgestures.min.js"></script> 		<!-- touch events -->
	<script src="../lib/signals.js"></script>			<!-- signaling -->
	
	<!-- Dependencies: Libraries -->
	<script src="../lib/classy.js"></script>               	<!-- classes with proper inheritance -->
	
	<!-- Input API-->
	<script src="../src/InputAPI.js"></script>

Instantiate InputAPI and give it a container element. Container can be empty in the initialization. All signals can registered manually afterwards. For keyboard signals given element must contain tabIndex -property otherwise signals will be bind to the document. Otherwise keyboard signals won´t work properly. For the container library uses jQuery to find corresponding HTML element from the document. For this example found we have created a div -element which ID is input-console. Place all described sections below inside a script tag: <script type="text/javascript"></script>.

	var inputAPI = new InputAPI({
	    //Give container for event registering. Not mandatory. Register can be done manually.
	    container: "#input-console"
	});

At this stage the InputAPI has bound all generic mouse and keyboard signals which are included in the InputAPI itself. Next start listening those signals by adding a listener.

	inputAPI.mouseEvent.add(onMouseEvent);
	inputAPI.keyEvent.add(onKeyEvent);

Create corresponding listener functions. Read the data and use it for your purposes. In this example the data is just pushed to the given container.

	function onKeyEvent(event)
	{
	    $('#input-console').prepend("<b style=\"color: blue;\">Key: "+event.key +" - "+event.type+"</b><br>");
	}
	
	function onMouseEvent(event)
	{
	    $('#input-console').prepend("<b style=\"color: red;\">Mouse: "+event.type+":</b> X="+event.x+", Y="+event.y+"<br>");
	}

All mouse signals contain mouse/event -object which keeps its state and provides following data to use:

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

All keyboard signals contain keybard/event -object which keeps its state and provides following data to use:

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

As a complete example please look at the input.html -file inside the test -folder of the cloned repository. 

## IInputPlugin ##

IInputPlugin provides plugin system for InputAPI. IInputPlugin is included in InputAPI. To create a plugin write new js -file which extends the IInputPlugin. Written plugins are automatically registered as a part of InputAPI. As an example you can find 2 example plugins in the src -folder of the cloned repository. For this guide we will take a deeper look at the TouchInputPlugin.js -file. As default all plugin signals are bound to the given container in the InputAPI. If the container is not present registering can be done manually by giving desired container.

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

To create own IInputPlugin please look at the given examples in the src -folder of the cloned repository.

To use created plugins first include the created plugin js -file to the head of your html -file under InputAPI -sript reference. As an example we will use the InputTouchPlugin.js found in the src -folder.

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

To find out the data touch/event -object please look at the TouchInputPlugin.js -file.  