const { PassThrough, Duplex } = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const readStream = createReadStream('../files/video.mp4');
const writeStream = createWriteStream('./copy.mp4');

class Throttle extends Duplex {
  constructor(time) {
    super();
    this.delay = time;
  }
  _read() {}

  // Writes the data, push and set the delay/timeout
  _write(chunk, encoding, callback) {
    this.push(chunk);
    //callback -Call this function (optionally with an error argument) when processing is complete for the supplied chunk.
    setTimeout(callback, this.delay);
  }

  // When all the data is done passing, it stops.
  _final() {
    this.push(null);
  }
}

const tunnel = new PassThrough();
const throttle = new Throttle(500);

let amount = 0;
tunnel.on('data', (chunk) => {
  amount += chunk.length;
  console.log('bytes:', amount);
});

readStream.pipe(throttle).pipe(tunnel).pipe(writeStream);
