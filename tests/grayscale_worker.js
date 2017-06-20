onmessage = function(event) {
  grayscale(event.data.data, event.data.width, event.data.height);
  postMessage({
    data: event.data.data
  }, [
    event.data.data.buffer
  ]);
};

function grayscale(data, width, height) {
  for (var i = 0, il = width * height; i < il; i++) {
    var r = data[i*4+0];
    var g = data[i*4+1];
    var b = data[i*4+2];
    data[i*4+0] = data[i*4+1] = data[i*4+2] =
      (0.2126*r + 0.7152*g + 0.0722*b) | 0;
  }
}
