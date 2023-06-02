export const adjustCoordinatesToResolution = ({
  x,
  y,
  fromWidth,
  fromHeight,
  toWidth,
  toHeight,
}) => {
  return { x: (x * toWidth) / fromWidth, y: (y * toHeight) / fromHeight };
};
