const promiseReject = require('set-promise-reject-callback');

promiseReject.SetCallback(function RethrowPromiseUnhandledRejection(event, promise, reason) {
  throw reason;
});
