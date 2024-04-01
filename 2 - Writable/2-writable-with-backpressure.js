const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('../files/video.mp4');
const writeStream = createWriteStream('../files/copy.mp4');

readStream.on('data', (chunk) => {
  //  .write() returns a boolean if total size of the internal write buffer is below the threshold
  const result = writeStream.write(chunk);
  if (!result) {
    console.count('backpressure');
    readStream.pause();
  }
});
writeStream.on('drain', () => {
  console.log('drained');
  readStream.resume();
});
writeStream.on('close', () => {
  console.log('file copied');
});
// equivlent
// readStream.pipe(writeStream);
