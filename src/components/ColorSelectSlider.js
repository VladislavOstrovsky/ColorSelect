import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import throttle from "lodash.throttle"
import usePaintSlider from "../usePaintSlider"
import Svg from './Svg'
import config from "../config"

const { mapSize, barSize, sliderSize, delay } = config

export const Canvas = styled.canvas.attrs(p => ({
  width: barSize,
  height: mapSize
}))``

export const Handle = styled.div.attrs(p => ({
  style: {
    top: p.top + "px"
  }
}))`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  width: 40px;
  height: 10px;
  pointer-events: none;
  
  svg {
    width: 100%;
    height: 100%;
  }
`

const ColorSelectSlider = ({ hueY, offsetTop, setHueY, setHue }) => {
  const slider = useRef(null)
  const canvas = useRef(null)

  usePaintSlider(canvas)

  useEffect(() => {
    function computePosition(e) {
      return Math.max(
        sliderSize / -2,
        Math.min(
          e.clientY - offsetTop + mapSize / 2 - sliderSize / 2,
          mapSize - sliderSize / 2
        )
      )
    }

    function computeHue(y) {
      return Math.round((y + sliderSize / 2) * (360 / mapSize))
    }

    const onMouseMove = throttle(e => {
      const y = computePosition(e)
      const hue = computeHue(y)

      setHueY(y)
      setHue(hue)
    }, delay)

    function onMouseUp(e) {
      const y = computePosition(e)
      const hue = computeHue(y)
      setHueY(y)
      setHue(hue)
      document.body.removeEventListener("mousemove", onMouseMove)
      document.body.removeEventListener("mouseup", onMouseUp)
    }

    function onMouseDown(e) {
      document.body.addEventListener("mousemove", onMouseMove)
      document.body.addEventListener("mouseup", onMouseUp)
    }

    const sliderRef = slider.current
    sliderRef.addEventListener("mousedown", onMouseDown)

    return () => {
      sliderRef.removeEventListener("mousedown", onMouseDown)
      document.body.removeEventListener("mousemove", onMouseMove)
      document.body.removeEventListener("mouseup", onMouseUp)
    }
  }, [offsetTop, setHue, setHueY])

  return (
    <div className="ColorSelect__Slider" ref={slider}>
      <Handle top={hueY}>
        <Svg name="range" size="50 10" />
      </Handle>
      <Canvas ref={canvas} />
    </div>
  )
}

export default ColorSelectSlider
