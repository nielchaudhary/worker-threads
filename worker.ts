import { parentPort, workerData } from "worker_threads";

const { threadName } = workerData;

if (parentPort) {
  parentPort.on("message", () => {
    console.log(`Message Received from ${threadName}`);
  });
}
