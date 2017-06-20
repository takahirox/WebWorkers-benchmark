onmessage = function(event) {
  convolute(event.data.src, event.data.res, event.data.width,
            event.data.height, event.data.weights,
            event.data.wWidth, event.data.wHeight,
            event.data.height2, event.data.oHeight);
  postMessage({
    src: event.data.src,
    res: event.data.res,
    weights: event.data.weights
  }, [
    event.data.src.buffer,
    event.data.res.buffer,
    event.data.weights.buffer
  ]);
};

function convolute(data, data2, width, height,
                   weights, wwidth, wheight,
                   height2, oheight) {
  var halfWWidth = (wwidth / 2) | 0;
  var halfWHeight = (wheight / 2) | 0;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var r = 0;
      var g = 0;
      var b = 0;
      var a = 0;
      for (var wy = 0; wy < wheight; wy++) {
        var sy = y + oheight + wy - halfWHeight;
        if (sy < 0 || sy >= height2)
          continue;
        for (var wx = 0; wx < wwidth; wx++) {
          var sx = x + wx - halfWWidth;
          if (sx < 0 || sx >= width)
            continue;
            var index = sy * width + sx;
            var weight = weights[wy*wwidth+wx];
            r += data[index*4+0] * weight;
            g += data[index*4+1] * weight;
            b += data[index*4+2] * weight;
            a += data[index*4+3] * weight;
        }
      }
      var index = y * width + x;
      data2[index*4+0] = r | 0;
      data2[index*4+1] = g | 0;
      data2[index*4+2] = b | 0;
      data2[index*4+3] = a | 0;
    }
  }
}
