class BoundingBox extends Pane

  extension: 5
  padding: 2

  constructor: ->
    super(1)

  setColor: (color) ->
    if typeof color is 'object'
      @color = color
    else
      @color = new Color(color)

  update: ->

    if @reference.constructor.name is 'Line'
      @left = @reference.position.absolute.x * PX
      @top = @reference.position.absolute.y * PX
    else
      @left = @reference.getX() * PX
      @top = @reference.getY() * PX

    @right = @left + (@reference.getWidth() * PX)
    @bottom = @top + (@reference.getHeight() * PX)

  draw: ->
    CONTEXT.strokeStyle = @color

    CONTEXT.beginPath()
    CONTEXT.moveTo(@left - @extension, @top - @padding)
    CONTEXT.lineTo(@right + @extension, @top - @padding)

    CONTEXT.moveTo(@right + @padding, @top - @extension)
    CONTEXT.lineTo(@right + @padding, @bottom + @extension)

    CONTEXT.moveTo(@right + @extension, @bottom + @padding)
    CONTEXT.lineTo(@left - @extension, @bottom + @padding)

    CONTEXT.moveTo(@left - @padding, @bottom + @extension)
    CONTEXT.lineTo(@left - @padding, @top - @extension)

    CONTEXT.closePath()
    CONTEXT.stroke()

    return
