//it's really handy when you need to send input bytes of a TCP Server to another TCP Server.

var net = require('net'),
  PassThroughStream = require('stream').PassThrough,
  stream = new PassThroughStream();

net
  .createServer({ allowHalfOpen: true }, function (socket) {
    socket.write('Hello client!');
    console.log('Connected:' + socket.remoteAddress + ':' + socket.remotePort);
    socket.pipe(stream, { end: false });
  })
  .listen(8080);

net
  .createServer(function (socket) {
    stream.on('data', function (d) {
      d += '';
      socket.write(Date() + ':' + ' ' + d.toUpperCase());
    });
    socket.pipe(stream);
  })
  .listen(8081);
