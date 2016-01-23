!function(){
  var appendTarget = window // Appends all the elements here
  var elems_to_classify = [ // Elements to classify
    'div',
    'p',
    'span',
    'img',
    'h1',
    'h2',
    'h3',
    'h4',
    "h5",
    "h6",
    "hr",
    "i",
    "b",
    "input",
    "form",
    "label",
    "button",
    "body",
    "pre",
    "br",
    "code"
  ]

  // Do not edit beyond here
  // unless you know what you are doing

  function getOrCreateDom(dom){
    if(typeof dom == "string")
    {
      switch(dom)
      {
        case "document":
          return document
        case "body":
          return document.body
        default:
          return document.createElement(dom)
      }
    }
    else
    {
      return dom
    }
  }

  /**
  * ElemClass is the all catch class that creates the dom.
  *
  * @param dom Acceps either string tag or actual dom object
  */
  function ElemClass(dom){
    this.dom    = getOrCreateDom(dom)
    function setClass()
    {
      var that = this
      var classes = Array.prototype.slice.call(arguments)
      classes.forEach(
        function(className){
          switch(typeof className)
          {
            case "string":
              that.dom.className += className
              break;
            case "function" :
              that.class( className(that) )
              break
            default:
              throw new Error("Trying to set class but receiving a non string!")
          }
        }//function forEach
      )//foreach

      return this
    }

    /**
    * Sets the id of the element
    *
    * @param id accepts a string or a function that is called everytime the
    * id is assigned. The function must return a string.
    */
    function setId (id){
      var that = this
      switch(typeof id)
      {
        case "string":
          that.dom.id += id
          break;
        case "function" :
          that.id( id(that) )
          break
        default:
          throw new Error("Trying to set id but receiving a non string!")
      }
      return this
    }

    function attrKeyPair(attr,val)
    {
      var that = this
      switch(typeof val)
      {
        case "string":
          that.dom.setAttribute(attr,val)
          break;
        case "function" :
          that.attr( val(that) )
          break
        default:
          throw new Error("Trying to set attribute but receiving a non string!")
      }
      return this
    }

    function attrObject(obj)
    {
      for( attr in obj){
        attrKeyPair.call(this,attr,obj[attr])
      }
    }

    /**
    * Sets the attributes of an element
    *
    * @param arg1 String key / Object
    * @param arg2 String value (ignored if arg1 is object)
    */
    function setAttr(arg1,arg2){
      if(arg2) attrKeyPair.call(this,arg1,arg2)
      else attrObject.call(this,arg1)
      return this
    }

    this.id    = setId
    this.attr  = setAttr
    this.class = setClass
  }

  function ConstructElemClass(elemClass,arg){
    switch( typeof arg ){
      case "number" :
      case "string" :
        elemClass.dom.appendChild( document.createTextNode(arg) )
        break
      case "object" :
        if( arg instanceof ElemClass)
        {
          elemClass.dom.appendChild( arg.dom )
        }
        else if( arg instanceof HTMLElement )
        {
          elemClass.dom.appendChild( arg )
        }
        else
        {
          throw new Error("Not sure what to do with this object of type " + arg.constructor.name )
        }
        break
      case "function":
        if( arg._isElemClassFunction )
          ConstructElemClass( elemClass, arg() )
        else
          ConstructElemClass( elemClass, arg( elemClass ) )
        break
      default:
        throw new Error('Unsupported type ' + typeof arg )
    }//switch
  }


  function ElemClassFactory(tag){
    var factory =
      function(){
        var args  = Array.prototype.slice.call(arguments)
        var elemClass = new ElemClass(tag)

        args.forEach(
          function(arg){
            ConstructElemClass( elemClass,arg )
          }//function
        )//forEach

        return elemClass

      }//anon func
    factory._isElemClassFunction = true
    return factory
  }

  appendTarget[ 'ElemClass' ] = ElemClassFactory

  elems_to_classify.forEach(
    function(tag){
      appendTarget[tag] = ElemClassFactory(tag)
    }
  )
}()
