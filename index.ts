import express from "express";
const app = express();

import Path from "path";
import { Worker } from "worker_threads";

const runParallelTasks = async () => {
  const task1 = new Promise((resolve, reject) => {
    const worker1 = new Worker(Path.join(__dirname + "/worker.js"), {
      workerData: { threadName: "worker1" },
    });

    worker1.on("message", (message: string) => {
      resolve(message);
    });

    worker1.postMessage("Message From Worker1");
  });

  const task2 = new Promise((resolve, reject) => {
    const worker2 = new Worker(Path.join(__dirname + "/worker.js"), {
      workerData: { threadName: "worker2" },
    });

    worker2.on("message", (message: string) => {
      resolve(message);
    });

    worker2.postMessage("Message From Worker2");
  });

  await Promise.all([task1, task2]);
};

runParallelTasks();

app.listen(8000, () => {
  console.log("app started");
});
