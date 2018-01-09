var net = require('net');

net._globalBytesRead = 0;
net._globalBytesWritten = 0;

function onClose (sock) {
  console.log("socket-bytes written: ", sock.bytesWritten);
  console.log("socket-bytes read: ", sock.bytesRead);
  net._globalBytesRead += sock.bytesRead;
  net._globalBytesWritten += sock.bytesWritten;
}

net.Socket.prototype._original__destroy = net.Socket.prototype._destroy;
net.Socket.prototype._destroy = function(exception) {
 this._original__destroy(exception);
 onClose(this);
};
