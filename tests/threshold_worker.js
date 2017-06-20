onmessage = function(event) {
  threshold(event.data.array, event.data.work,
            event.data.width, event.data.height, event.data.oheight);
  postMessage({
    array: event.data.array,
    work: event.data.work
  }, [
    event.data.array.buffer,
    event.data.work.buffer
  ]);
};

// from https://pdfs.semanticscholar.org/8d74/418ec3c4e2ff45b72e723ac0fbe5fcd58620.pdf
function threshold(data, work, width, height, oheight) {
  var array = work;
  var s = 8;
  var s2 = s / 2;
  var t = 15;
  var t2 = (100 - t) / 100;
  for (var i = 0; i < width; i++) {
    var sum = 0;
    for (var j = 0; j < height + s2 + 1; j++) {
      var index = j * width + i;
      var r = data[index * 4 + 0];
      var g = data[index * 4 + 1];
      var b = data[index * 4 + 2];
      data[index * 4] = ((0.2126*r + 0.7152*g + 0.0722*b) | 0);
      sum += data[index * 4];
      if (i === 0) {
        array[index] = sum;
      } else {
        array[index] = array[index-1] + sum;
      }
    }
  }
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var x1 = i - s2;
      var x2 = i + s2;
      var y1 = j - s2 + oheight;
      var y2 = j + s2 + oheight;
      var x1_1 = x1 - 1;
      var y1_1 = y1 - 1;
      if (x1 < 0) x1 = 0;
      if (x2 >= width) x2 = width - 1;
      if (x1_1 < 0) x1_1 = 0;
      if (y1 < 0) y1 = 0;
      if (y2 >= height + s2) y2 = height + s2;
      if (y1_1 < 0) y1_1 = 0;
      var count = (x2 - x1) * (y2 - y1);
      var index = (j + oheight) * width + i;
      var index1 = y2 * width + x2;
      var index2 = y1_1 * width + x2;
      var index3 = y2 * width + x1_1;
      var index4 = y1_1 * width + x1_1;
      var sum = array[index1] - array[index2] - array[index3] + array[index4];
      if (data[index * 4] * count <= sum * t2) {
        data[index * 4 + 0] = data[index * 4 + 1] = data[index * 4 + 2] = 0;
      } else {
        data[index * 4 + 0] = data[index * 4 + 1] = data[index * 4 + 2] = 255;
      }
    }
  }
}
