import { commonConvertToHSL } from './commonConvertToHSL'

export const convertHEXtoHSL = H => {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length === 3) {
    r = "0x" + H[0] + H[0];
    g = "0x" + H[1] + H[1];
    b = "0x" + H[2] + H[2];
  } else if (H.length === 6) {
    r = "0x" + H[0] + H[1];
    g = "0x" + H[2] + H[3];
    b = "0x" + H[4] + H[5];
  }

  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  return commonConvertToHSL(r, g, b);
}
