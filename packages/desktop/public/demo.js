function main() {
  this.addEventListener('message', (e) => {
    const data = e.data;
    switch (data.cmd) {
      case 'start':
        globalThis.postMessage('WORKER STARTED: ' + data.msg);
        break;
      case 'stop':
        globalThis.postMessage('WORKER STOPPED: ' + data.msg);
        globalThis.close();
        break;
      default:
        globalThis.postMessage('Unknown command: ' + data.msg);
    }
  });
}
if (WorkerGlobalScope && this instanceof WorkerGlobalScope) {
  main();
}
