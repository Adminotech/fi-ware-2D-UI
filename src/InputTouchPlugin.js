
var InputTouchPlugin = IInputPlugin.$extend(
{
    /**
        Event object description for touchEvent callbacks.
        @event TouchEvent
        @param {String} type "tapone" | "taptwo" | "tapthree" | "tapfour" | "pinch" | "pinchopen" | "pinchclose" | "rotate" | "rotatecw" | "rotateccw" | "swipeone" | "swipetwo" | "swipethree" | "swipefour" | "shake"
        @param {Number} x Current x position
        @param {Number} y Current y position
        @param {Number} relativeX Relative x movement since last touch event
        @param {Number} relativeY Relative y movement since last touch event
        @param {String} targetId DOM element id that the touch event occurred on
        @param {String} targetNodeName HTML node name eg. 'canvas' and 'div'. Useful for detected
        when on 'canvas' element aka the touch event occurred on the 3D scene canvas and not on top of a UI widget.
        @param {Object} originalEvent Original jQuery touch event
    */

    __init__ : function(params)
    {
        this.$super("Touch");
    },

    start : function(container)
    {
        /**
            Current touch state
            <pre>{
                startx : String,
                startx : Number,
                starty : Number
            }</pre>

                if (touch.type === "tapone")
                    console.log("User tapped screen.");

            @property touch
            @type Object
        */

        this.touch =
        {
            // Event type: move, press, release, wheel
            type : "",
            originaltype: "",
            // Start x, start y, moved
            startx : null,
            starty : null,
            moved : null,
            // Relative position
            relativeX : 0,
            relativeY : 0,
            // HTML element id that the touch event occurred on
            targetId : "",
            // HTML node name eg. 'canvas' and 'div'. Useful for detected
            // when on 'canvas' element aka the touch event occurred on the
            // 3D scene canvas and not on top of a UI widget.
            targetNodeName : "",
            // Original jQuery event
            originalEvent : null
        };

        this.container = container;

        //Init signals
        this.Signal = signals.Signal;
        this.touchEvent = new this.Signal();
        this.tapOne = new this.Signal();
        this.tapTwo = new this.Signal();
        this.tapThree = new this.Signal();
        this.tapFour = new this.Signal();
        this.swipeMove = new this.Signal();
        this.swipeOne = new this.Signal();
        this.swipeTwo = new this.Signal();
        this.swipeThree = new this.Signal();
        this.swipeFour = new this.Signal();
        this.pinch = new this.Signal();
        this.pinchOpen = new this.Signal();
        this.pinchClose = new this.Signal();
        this.rotate = new this.Signal();
        this.rotateCW = new this.Signal();
        this.rotateCCW = new this.Signal();
        this.shake = new this.Signal();

        //this.registerSignal(this.touchEvent);


        // Register main container touch events
        this.registerTouchEvents(this.container);
    },

    stop : function()
    {
        this.reset();
    },

    reset : function()
    {

        this.touchEvent.removeAll();
        this.tapOne.removeAll();
        this.tapTwo.removeAll();
        this.tapThree.removeAll();
        this.tapFour.removeAll();
        this.swipeMove.removeAll();
        this.swipeOne.removeAll();
        this.swipeTwo.removeAll();
        this.swipeThree.removeAll();
        this.swipeFour.removeAll();
        this.pinch.removeAll();
        this.pinchOpen.removeAll();
        this.pinchClose.removeAll();
        this.rotate.removeAll();
        this.rotateCW.removeAll();
        this.rotateCCW.removeAll();
        this.shake.removeAll();
    },

    registerTouchEvents : function(element)
    {
        var myElement = $(element);
        if (myElement)
        {
            var receiver = this;
            myElement.bind('tapone', function(e, obj) {
                receiver.onTapOneInternal(e, obj);
            });
            myElement.bind('taptwo', function(e, obj) {
                receiver.onTapTwoInternal(e, obj);
            });
            myElement.bind('tapthree', function(e, obj) {
                receiver.onTapThreeInternal(e, obj);
            });
            myElement.bind('swipemove', function(e, obj) {
                receiver.onSwipeMoveInternal(e, obj);
            });
            myElement.bind('swipeone', function(e, obj) {
                receiver.onSwipeOneInternal(e, obj);
            });
            myElement.bind('swipetwo', function(e, obj) {
                receiver.onSwipeTwoInternal(e, obj);
            });
            myElement.bind('swipethree', function(e, obj) {
                receiver.onSwipeThreeInternal(e, obj);
            });
            myElement.bind('swipefour', function(e, obj) {
                receiver.onSwipeFourInternal(e, obj);
            });
            myElement.bind('pinch', function(e, obj) {
                receiver.onPinchInternal(e, obj);
            });
            myElement.bind('pinchclose', function(e, obj) {
                receiver.onPinchCloseInternal(e, obj);
            });
            myElement.bind('pinchopen', function(e, obj) {
                receiver.onPinchOpenInternal(e, obj);
            });
            myElement.bind('rotate', function(e, obj) {
                receiver.onRotateInternal(e, obj);
            });
            myElement.bind('rotatecw', function(e, obj) {
                receiver.onRotateCWInternal(e, obj);
            });
            myElement.bind('rotateccw', function(e, obj) {
                receiver.onRotateCCWInternal(e, obj);
            });
            myElement.bind('shake', function(e, obj) {
                receiver.onShakeInternal(e, obj);
            });
        }
    },

    onTapOneInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
	   	this.touch.type = "tapone";

        this.touchEvent.dispatch(this.touch);
        this.tapOne.dispatch(this.touch);
    },

    onTapTwoInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "taptwo";

        this.touchEvent.dispatch(this.touch);
        this.tapTwo.dispatch(this.touch);
    },

	onTapThreeInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "tapthree";

        this.touchEvent.dispatch(this.touch);
        this.tapThree.dispatch(this.touch);
    },

    onSwipeMoveInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "swipemove";

        this.touchEvent.dispatch(this.touch);
        this.tapFour.dispatch(this.touch);
    },

    onSwipeOneInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "swipeone";

        this.touchEvent.dispatch(this.touch);
        this.swipeOne.dispatch(this.touch);
    },

    onSwipeTwoInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "swipetwo";

        this.touchEvent.dispatch(this.touch);
        this.swipeTwo.dispatch(this.touch);
    },

    onSwipeThreeInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "swipethree";

        this.touchEvent.dispatch(this.touch);
        this.swipeThree.dispatch(this.touch);
    },

    onSwipeFourInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "swipefour";

        this.touchEvent.dispatch(this.touch);
        this.swipeFour.dispatch(this.touch);
    },

    onPinchInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "pinch";

        this.touchEvent.dispatch(this.touch);
        this.pinch.dispatch(this.touch);
    },

    onPinchOpenInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "pinchopen";

        this.touchEvent.dispatch(this.touch);
        this.pinch.dispatch(this.touch);
        this.pinchOpen.dispatch(this.touch);
    },

    onPinchCloseInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "pinchclose";

        this.touchEvent.dispatch(this.touch);
        this.pinch.dispatch(this.touch);
        this.pinchClose.dispatch(this.touch);
    },

    onRotateInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "rotate";

        this.touchEvent.dispatch(this.touch);
        this.rotate.dispatch(this.touch);
    },

    onRotateCWInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "rotatecw";

        this.touchEvent.dispatch(this.touch);
        this.rotate.dispatch(this.touch);
        this.rotateCW.dispatch(this.touch);
    },

    onRotateCCWInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "rotateccw";

        this.touchEvent.dispatch(this.touch);
        this.rotate.dispatch(this.touch);
        this.rotateCCW.dispatch(this.touch);
    },

    onShakeInternal : function(event, obj)
    {
		this.readTouchEvent(event, obj);
		this.touch.type = "shake";

        this.touchEvent.dispatch(this.touch);
        this.shake.dispatch(this.touch);
    },

	readTouchEvent : function(event, obj)
	{

		event.preventDefault();
		obj.originalEvent.preventDefault();

		this.touch.type = obj.description;
		this.touch.originaltype = obj.description;

        // Target element
        if (event.target !== undefined && event.target !== null)
        {
            this.touch.targetNodeName = event.target.localName;
            this.touch.targetId = event.target.id;
        }
        else
        {
            this.touch.targetNodeName = "";
            this.touch.targetId = "";
        }

		// Original jQuery event
        this.touch.originalEvent = obj.originalEvent;

        // Relative movement
        if (this.touch.startx != null)
            this.touch.relativeX = this.touch.originalEvent.pageX - this.touch.startx;
        if (this.touch.starty != null)
            this.touch.relativeY = this.touch.originalEvent.pageY - this.touch.starty;

		//Touch position
		this.touch.startx = obj.delta[0].startX;
		this.touch.starty = obj.delta[0].startY;

		//Touch moved amount
		this.touch.moved = obj.delta[0].moved;
	}
});

InputTouchPlugin.register();