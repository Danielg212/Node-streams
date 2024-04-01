const { Transform } = require('stream');

class ReplaceText extends Transform {
  constructor(char) {
    super();
    this.replaceChar = char;
  }
  _transform(chunk, encoding, callback) {
    let transformChunk = chunk.toString().replace(/[a-zA-Z0-9]/gi, 'x');
    this.push(transformChunk);
    callback();
  }
}
let xStream = new ReplaceText('x');
process.stdin.pipe(xStream).pipe(process.stdout);
