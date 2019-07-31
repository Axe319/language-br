module.exports = [
  {
    "text": "fnfm",
    "displayText": "<Succed/Fail> fnfm(<layout>;key$)",
    "snippet": "fnfm(\"${1:layout}\")",
    "description": `\
    Launches and runs the specified Screenio Screen. Returns True if the User Saved the Record, and False if they Cancelled.

    fnfm("scrnname"; key$, row, col, ParentKey$, ParentWindow, DisplayOnly,Dontredolistview,Recordval,Mat Passeddata$,Usemyf,Mat Myf$,Mat Myf,Path$,Selecting)

        Scrnname$ - This is the name of the screen you are trying to call.
        Key$ - This is the key of the current record you are editing.
        Row, Col - Position to put the screen, defaults to centered.
        ParentKey$ - This is an extra value you can pass into your screen function. Its not interpreted by ScreenIO but can be used in your functions to determine which records to show in a listview, for example.
        ParentWindow - This optional parameter is used in conjunction with Row and Col to specify the parent window for the Screen Function.
        DisplayOnly - If True, ScreenIO Paints the window, and returns immediately, returning the Window Handle. Use the window handle to close the screen later when you're done with it.

    See the online documentation for a complete explanation of all parameters.\
    `,
    "descriptionMoreURL": "http://www.brwiki.com/index.php?title=ScreenIO_Library#ScreenIO_Runtime_Engine_Library_Functions",
    "leftLabel": "Boolean",
    "type": "function"
  },
  {
    "text": "fnfm$",
    "displayText": "<Key> fnfm$(<layout>;key$)",
    "snippet": "fnfm$(\"${1:layout}\")",
    "description": `\
    Launches and runs the specified Screenio Screen. Returns the Key$ or Record Number of the Saved Record, or an Empty String if the User Cancelled.

    fnfm$("scrnname"; key$, row, col, ParentKey$, ParentWindow, DisplayOnly,Dontredolistview,Recordval,Mat Passeddata$,Usemyf,Mat Myf$,Mat Myf,Path$,Selecting)

        Scrnname$ - This is the name of the screen you are trying to call.
        Key$ - This is the key of the current record you are editing.
        Row, Col - Position to put the screen, defaults to centered.
        ParentKey$ - This is an extra value you can pass into your screen function. Its not interpreted by ScreenIO but can be used in your functions to determine which records to show in a listview, for example.
        ParentWindow - This optional parameter is used in conjunction with Row and Col to specify the parent window for the Screen Function.
        DisplayOnly - If True, ScreenIO Paints the window, and returns immediately, returning the Window Handle. Use the window handle to close the screen later when you're done with it.

    See the online documentation for a complete explanation of all parameters.\
`,
    "descriptionMoreURL": "http://www.brwiki.com/index.php?title=ScreenIO_Library#ScreenIO_Runtime_Engine_Library_Functions",
    "leftLabel": "String",
    "type": "function"
  },
  {
    "text": "fnDisplayScreen",
    "displayText": "<WindowNumber> fnDisplayScreen(<layout>;key$)",
    "snippet": "fnDisplayScreen(\"${1:layout}\")",
    "description": `\
    Launches and displays the specified ScreenIO Screen, returning the Window Handle of the displayed screen.

    let Window=fnDisplayScreen("scrnname"; key$, row, col, ParentKey$, ParentWindow,Recordval)

        Scrnname$ - This is the name of the screen you are trying to call.
        Key$ - This is the key of the current record you are editing.
        Row, Col - Position to put the screen, defaults to centered.

    See the online documentation for a complete explanation of all parameters.\
    `,
    "descriptionMoreURL": "http://www.brwiki.com/index.php?title=ScreenIO_Library#ScreenIO_Runtime_Engine_Library_Functions",
    "leftLabel": "Integer",
    "type": "function"
  },
  {
    "text": "fnListSpec$",
    "displayText": "fnListSpec$(SpecIn$)",
    "snippet": "fnListSpec$(${1:ListviewSpec$})",
    "description": `\
    Takes a given BR Fields listview spec, and strips off everything after the first 3 commas, used to calculated the spec needed to interact with the given listview.

    fnListSpec$*255(SpecIn$*255)

        SpecIn$ - The Listview Spec that you want to clean.\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#fnListSpec.24",
    "leftLabel": "String",
    "type": "function"
  },
  {
    "text": "fnFunctionBase",
    "displayText": "fnFunctionBase",
    "snippet": "fnFunctionBase",
    "description": `\
    Returns the Function Base of the current screen. Use it for interpreting which control was clicked on, in your Mainloop Event.

    Example:
        if fkey-fnFunctionBase = ctl_Name then
          ! Name field was clicked on
        end if\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#fnFunctionBase",
    "leftLabel": "Integer",
    "type": "function"
  },
  {
    "text": "fnFindSubscript",
    "displayText": "fnFindSubscript",
    "snippet": "fnFindSubscript(mat Subscripts$,${1:Prefix},${2:SubscriptName})",
    "description": `\
    Returns the Subscript expressed in the given String by searching the standard ScreenIO or FileIO subscripts arrays.

    let Index=fnFindSubscript(mat Subscripts$,Prefix$,SubscriptName$*40)

        mat Subscripts$ - should always be mat Subscripts$, the subscripts array provided by ScreenIO.
        Prefix$ - the prefix for the subscript you're looking for
        SubscriptName$ - the Subscript name of the subscript you're looking for\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#fnFindSubscript",
    "leftLabel": "Integer",
    "type": "function"
  },
  {
    "text": "fnPrepareAnimation",
    "displayText": "fnPrepareAnimation",
    "snippet": "fnPrepareAnimation",
    "description": `\
    Run to initialize the loading animation.

    Example:
        let fnPrepareAnimation
        do
           let fnAnimate(;Text$*60)
           ...
        loop until Done
        let fnCloseAnimation\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#Animations",
    "leftLabel": "None",
    "type": "function"
  },
  {
    "text": "fnAnimate",
    "displayText": "fnAnimate",
    "snippet": "fnAnimate(${1:OptionalMessage$})",
    "description": `\
    Run in your loop to display an animation during some slow task.

    Example:
        let fnPrepareAnimation
        do
           let fnAnimate(;Text$*60)
           ...
        loop until Done
        let fnCloseAnimation\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#Animations",
    "leftLabel": "None",
    "type": "function"
  },
  {
    "text": "fnCloseAnimation",
    "displayText": "fnCloseAnimation",
    "snippet": "fnCloseAnimation",
    "description": `\
    Run at the end of your loop to close the Animation Window.

    Example:
        let fnPrepareAnimation
        do
           let fnAnimate(;Text$*60)
           ...
        loop until Done
        let fnCloseAnimation\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#Animations",
    "leftLabel": "None",
    "type": "function"
  },
  {
    "text": "fnDays",
    "displayText": "fnDays",
    "snippet": "fnDays(${1:DateString$},${2:DateMask$})",
    "description": `\
    Call the ScreenIO Days Validation function that converts a User Entered date to Julian Format.

    fnDays(UserEnteredDate$*255;DateSpec$*255)

        UserEnteredDate$ - the date the user entered, that we're trying to interpret.
        DateSpec$ - this is used to aid in understanding the users preferred entry order, but is not enforced on the users selection.\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#fnDays",
    "leftLabel": "Date (Julian)",
    "type": "function"
  },
  {
    "text": "fnBr42",
    "displayText": "fnBr42",
    "snippet": "fnBr42",
    "description": `\
    Returns True (nonzero) if Running in BR 4.2 or Higher.

    Example:
        if ~fnBR42 then
          ! do some code the old way
        end if\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#fnBr42_and_fnBr43",
    "leftLabel": "Boolean",
    "type": "function"
  },
  {
    "text": "fnBr43",
    "displayText": "fnBr43",
    "snippet": "fnBr43",
    "description": `\
    Returns True (nonzero) if Running in BR 4.3 or Higher.

    Example:
        if ~fnBR43 then
          ! do some code the old way
        else
          ! new way
        end if\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#fnBr42_and_fnBr43",
    "leftLabel": "Boolean",
    "type": "function"
  },
  {
    "text": "fnDesignScreen",
    "displayText": "fnDesignScreen(;ScreenName$)",
    "snippet": "fnDesignScreen",
    "description": `\
    Calls the ScreenIO Designer and optionally loads a screen for editing.

    fnDesignScreen(;ScreenName$)

        ScreenName$ - the name of the screen to edit. If blank, a new empty screen is loaded.\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#fnDesignScreen",
    "leftLabel": "None",
    "type": "function"
  },
  {
    "text": "fnSelectEvent$",
    "displayText": "<Function> fnSelectEvent$(CurrentSelection$;&ReturnFkey)",
    "snippet": "fnSelectEvent$(${1:CurrentSelection$})",
    "description": `\
    Calls the ScreenIO Select Custom Function dialog window and returns the function the user selects.

    let NewEventFunction$ = fnSelectEvent$*255(Current$*255;&ReturnFkey)

        Current$ - The currently entered event if any
        ReturnFKey - the fkey the user pressed to quit.\
    `,
    "descriptionMoreURL": "http://brwiki2.brulescorp.com/index.php?title=ScreenIO_Library#fnSelectEvent.24",
    "leftLabel": "String",
    "type": "function"
  }
]
