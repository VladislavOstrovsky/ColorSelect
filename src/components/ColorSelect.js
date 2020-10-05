import React, { useState, useEffect, useRef } from "react"
import ColorSelectSlider from "./ColorSelectSlider"
import ColorSelectMap from "./ColorSelectMap"
import { convertHEXtoHSL } from '../utils/convertHEXtoHSL'
import { HSLToHex } from '../utils/convertHSLtoHEX'
import config from "../config"

const { mapSize, sliderSize, crossSize } = config

const ColorSelect = ({ value, onChange }) => {
  const [h, s, l] = convertHEXtoHSL(value)

  const [hue, setHue] = useState(h)
  const [hueY, setHueY] = useState(() => (h / 360 * mapSize) - sliderSize)
  const [map, setMap] = useState([s, l])
  const [mapXY, setMapXY] = useState(() => [
    crossSize / -2,
    mapSize - crossSize / 2
  ])
  const [offsetTop, setOffsetTop] = useState(0)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [color, setColor] = useState(`hsla(${h}, ${s}%, ${l}%, 1)`)

  const colorSelect = useRef(null)

  useEffect(() => {
    function setOffsets() {
      setOffsetTop(colorSelect.current.offsetTop)
      setOffsetLeft(colorSelect.current.offsetLeft)
    }
    setOffsets()
    window.addEventListener("resize", setOffsets)

    return () => {
      window.removeEventListener("resize", setOffsets)
    }
  }, [])

  useEffect(() => {
    setColor(`hsla(${hue}, ${map[0]}%, ${map[1]}%, 1)`)
    onChange(HSLToHex(hue, map[0], map[1]))
  }, [hue, map, onChange])

  return (
    <div className="ColorSelect__Wrapper" ref={colorSelect}>
      <div className="ColorSelect">
        <ColorSelectMap
          hue={hue}
          mapXY={mapXY}
          offsetTop={offsetTop}
          offsetLeft={offsetLeft}
          setMap={setMap}
          setMapXY={setMapXY}
        />
        <ColorSelectSlider
          hueY={hueY}
          offsetTop={offsetTop}
          setHueY={setHueY}
          setHue={setHue}
        />
      </div>
    </div>
  )
}

export default ColorSelect
