import React, { useRef, useEffect } from "react"
import throttle from "lodash.throttle"
import styled from "styled-components"
import { convertRGBtoHSL } from "../utils/convertRGBtoHSL"
import usePaintMap from "../usePaintMap"
import Svg from "./Svg"
import config from "../config"

const { mapSize, barSize, crossSize, delay } = config

export const Canvas = styled.canvas.attrs(p => ({
  width: mapSize,
  height: mapSize
}))``

export const Cross = styled.div.attrs(p => ({
  style: {
    top: p.top + "px",
    left: p.left + "px",
    width: crossSize + "px",
    height: crossSize + "px"
  }
}))`
  position: absolute;
  display: grid;
  justify-items: center;
  align-items: center;
  svg {
    width: 100%;
    height: 100%;
  }
`

const ColorSelectMap = ({ hue, mapXY, setMap, offsetTop, offsetLeft, setMapXY }) => {
  const map = useRef(null)
  const canvas = useRef(null)

  usePaintMap(canvas, hue)

  useEffect(() => {
    const canvasRef = canvas.current
    const ctx = canvasRef.getContext("2d")

    function computePosition(e) {
      const x = Math.max(
        crossSize / -2,
        Math.min(
          e.clientX - offsetLeft + mapSize / 2 - crossSize / 2 + 35,
          mapSize - crossSize / 2
        )
      )
      const y = Math.max(
        crossSize / -2,
        Math.min(
          e.clientY -
          offsetTop +
          mapSize / 2 +
          barSize / 2 - 20 -
          crossSize / 2,
          mapSize - crossSize / 2
        )
      )

      return [x, y]
    }

    function changeColor(e) {
      const [x, y] = computePosition(e)
      const x1 = Math.min(x + crossSize / 2, mapSize - 1)
      const y1 = Math.min(y + crossSize / 2, mapSize - 1)
      const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data
      const [h, s, l] = convertRGBtoHSL([r, g, b])
      setMap([s, l])
      setMapXY([x, y])
    }

    const onMouseMove = throttle(e => {
      changeColor(e)
    }, delay)

    function onMouseUp(e) {
      changeColor(e)
      document.body.removeEventListener("mousemove", onMouseMove)
      document.body.removeEventListener("mouseup", onMouseUp)
    }

    function onMouseDown(e) {
      document.body.addEventListener("mousemove", onMouseMove)
      document.body.addEventListener("mouseup", onMouseUp)
    }

    canvasRef.addEventListener("mousedown", onMouseDown)

    return () => {
      canvasRef.removeEventListener("mousedown", onMouseDown)
    }
  }, [offsetTop, offsetLeft, setMap, setMapXY])

  return (
    <div className="ColorSelect__Map" ref={map}>
      <Cross top={mapXY[1]} left={mapXY[0]}>
        <Svg name="cross" size="50 50" />
      </Cross>
      <Canvas ref={canvas} />
    </div>
  )
}

export default ColorSelectMap

