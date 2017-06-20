onmessage = function(event) {
  multiplyVec(event.data.src1, event.data.src2, event.data.res);
  postMessage({
    src1: event.data.src1,
    src2: event.data.src2,
    res: event.data.res,
  }, [
    event.data.src1.buffer,
    event.data.src2.buffer,
    event.data.res.buffer
  ]);
};

function multiplyVec(src1, src2, res) {
  for (var i = 0, il = src1.length; i < il; i++) {
    res[i] = src1[i] * src2[i];
  }
}
