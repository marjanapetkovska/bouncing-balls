export const getMousePosition = (canvas, { clientX, clientY }) => {
  const { left, top } = canvas.getBoundingClientRect();
  const x = clientX - left;
  const y = clientY - top;
  return { x, y };
};

// returns a random number between min and max
export const getRandomNum = (min, max) => {
  return Math.random() * (max - min) + min;
};
