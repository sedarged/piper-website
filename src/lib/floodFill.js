/** Fill one connected colour area in an RGBA pixel buffer. */
export function floodFill(pixels, width, height, startX, startY, fill, tolerance = 32) {
  const x = Math.max(0, Math.min(width - 1, Math.floor(startX)));
  const y = Math.max(0, Math.min(height - 1, Math.floor(startY)));
  const start = (y * width + x) * 4;
  const target = [pixels[start], pixels[start + 1], pixels[start + 2], pixels[start + 3]];

  if (
    Math.abs(target[0] - fill[0]) <= tolerance &&
    Math.abs(target[1] - fill[1]) <= tolerance &&
    Math.abs(target[2] - fill[2]) <= tolerance
  ) return 0;

  const matches = (pixelIndex) => {
    const offset = pixelIndex * 4;
    return Math.abs(pixels[offset] - target[0]) <= tolerance &&
      Math.abs(pixels[offset + 1] - target[1]) <= tolerance &&
      Math.abs(pixels[offset + 2] - target[2]) <= tolerance &&
      Math.abs(pixels[offset + 3] - target[3]) <= tolerance;
  };

  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;
  let painted = 0;
  const first = y * width + x;
  queue[tail++] = first;

  const colour = (pixelIndex) => {
    const offset = pixelIndex * 4;
    pixels[offset] = fill[0];
    pixels[offset + 1] = fill[1];
    pixels[offset + 2] = fill[2];
    pixels[offset + 3] = 255;
    painted += 1;
  };
  colour(first);

  while (head < tail) {
    const pixelIndex = queue[head++];
    const px = pixelIndex % width;
    const py = Math.floor(pixelIndex / width);
    const neighbours = [
      px > 0 ? pixelIndex - 1 : -1,
      px < width - 1 ? pixelIndex + 1 : -1,
      py > 0 ? pixelIndex - width : -1,
      py < height - 1 ? pixelIndex + width : -1,
    ];

    for (const neighbour of neighbours) {
      if (neighbour >= 0 && matches(neighbour)) {
        colour(neighbour);
        queue[tail++] = neighbour;
      }
    }
  }

  return painted;
}
