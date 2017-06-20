onmessage = function(event) {
  postMessage({
    result: sum(event.data),
    array: event.data
  }, [
    event.data.buffer
  ]);
};

function sum(array) {
  var s = 0.0;
  for (var i = 0, il = array.length; i < il; i++) {
    s += array[i];
  }
  return s;
}
