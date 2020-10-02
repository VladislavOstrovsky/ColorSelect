import { useEffect } from "react";
import config from "./config";

const { mapSize } = config

const usePaintMap = (canvas, hue) => {
  useEffect(() => {
    const ctx = canvas.current.getContext("2d")
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    ctx.fillRect(0, 0, mapSize, mapSize)
    const gradientWhite = ctx.createLinearGradient(0, 0, mapSize, 0)
    gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`)
    gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`)
    ctx.fillStyle = gradientWhite
    ctx.fillRect(0, 0, mapSize, mapSize)
    const gradientBlack = ctx.createLinearGradient(0, 0, 0, mapSize)
    gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`)
    gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`)
    ctx.fillStyle = gradientBlack
    ctx.fillRect(0, 0, mapSize, mapSize)
  }, [canvas, hue])
}

export default usePaintMap;
