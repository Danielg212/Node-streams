//1. basic example
const stdout = process.stdout;
stdout.on('data', (msg) => {
  return stdout.write(msg.toString().toUpperCase());
}); // Set up an event listener