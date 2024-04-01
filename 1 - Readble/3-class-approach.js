const { Readable } = require('node:stream');

// // Create an instance of MyCustomStream
class MyCustomStream extends Readable {
  constructor(options) {
    super(options);
    this.data = ['apple', 'banana', 'ob', 'cherry'];
    this.index = 0;
  }

  _read(size) {
    // Simulate reading data from a source
    if (this.index < this.data.length) {
      // Push data onto the stream
      this.push(this.data[this.index]);
      this.index++;
    } else {
      // End the stream if there's no more data
      this.push(null);
    }
  }
}

const customStream = new MyCustomStream();

// Consume data from the custom stream
customStream.on('data', (chunk) => {
  if (chunk.toString() === 'ob') {
    customStream.pause();
    setTimeout(() => {
      customStream.read();
    }, 5000);
  }
  console.log('Received:', chunk);
});

// Handle end of stream
customStream.on('end', () => {
  console.log('Stream ended');
});
