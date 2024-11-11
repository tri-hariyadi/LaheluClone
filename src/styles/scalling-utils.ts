/**
 * This is a utility to handle responsiveness in pixel sizes used in React Native Elements dimensions.
 */
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

// Default guideline sizes are based on figma design screen mobile device
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

export const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;

// Moderate scale is not directly scaling the number
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;
