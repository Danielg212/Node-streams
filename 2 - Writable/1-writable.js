const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('../files/video.mp4');
const writeStream = createWriteStream('../files/copy.mp4');

readStream.on('data', (chunk) => {
  console.log(`chunks: ${chunk.length}`);
  writeStream.write(chunk);
});

readStream.on('end', () => {
  writeStream.end();
});

writeStream.on('close', () => {
  process.stdout.write('file copiled\n');
});