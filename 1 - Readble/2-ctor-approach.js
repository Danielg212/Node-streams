//2. constructor approach
const { Readable } = require('stream');
const inStream = new Readable({});

inStream.push('ABCDEGEEGGG');
inStream.push('NOPQRSTUFGF');

inStream.push(null);

// inStream.on('data', (chunk) => console.log(chunk));
// inStream.on('end', () => console.log('done!'));

inStream.pipe(process.stdout);
