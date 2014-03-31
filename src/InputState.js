
/**
    Provides input state for abstraction
    @class InputState
    @constructor
*/
var InputState = Class.$extend(
{

    __init__ : function(params)
    {

        this.name = params.name || ""; //Indexing property. Has to be unique within InputAPI context.
        this.keyBindings = params.keyBindings || null;
        this.mouseDown = params.mouseDown || null;
        this.timeslot = params.timeslot || 0;
        this.priority = params.priority || 100;
        this.multiplier = params.multiplier || 0;
        this.actionSignal = null;

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

    setName : function(paramName)
    {
        if (paramName)
            this.name = paramName;
    },

    setKeyBindings : function(paramKeyBindings)
    {
        if (paramKeyBindings)
            this.keyBindings = paramKeyBindings;
    },

    setMouseDown : function(paramMouseDown)
    {
        if (paramMouseDown)
            this.mouseDown = paramMouseDown;
    },

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

    setMultiplier : function(paramMultiplier)
    {

        var mpval = parseInt(paramMultiplier);
        if (isNaN(mpval))
        {
            console.log("[InputState] Multiplier update failed. Value must be between 0 and 5.");
            return false;
        }

        if (mpval > 0 && mpval <= 5)
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