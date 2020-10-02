import { commonConvertToHSL } from "./commonConvertToHSL"

export const convertRGBtoHSL = rgb => {
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255

  return commonConvertToHSL(r, g, b);
}
