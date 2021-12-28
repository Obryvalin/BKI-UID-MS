const fs = require("fs");
const chalk = require("chalk");
const dateformat = require("date-format");

const { logpath } = JSON.parse(fs.readFileSync("conf/log.json"));
prev = new Date();
debugMode = true;

if (!fs.existsSync(logpath)) {
  fs.writeFileSync(logpath, "");
}

const cls = (processName, workerName) => {
  console.clear();
  console.log("=====================");
  console.log("Process: " + chalk.bold.cyanBright(processName));
  console.log("Worker: " + chalk.bold.cyanBright(workerName));
  var date = dateformat("yy.MM.dd hh:mm:ss.SSS", new Date());
  console.log("Текущее время: " + date);
  console.log("=====================");
};

const timestamp = (msg) => {
  var date = new Date();
  const diff = (date - prev) / 1000;
  if (diff > 10) {
    console.log("============ +" + diff + " ===========");
  }
  var datef = dateformat("yy.MM.dd hh:mm:ss.SSS", date);
  prev = date;
  console.log("[" + datef + " (+" + diff + ")] " + msg);
  fs.appendFile(logpath, "\n[" + date + "] " + msg.toString(), () => {});
};

const debug = (msg) => {
  if (debugMode) {
    var date = new Date();
    const diff = (date - prev) / 1000;
    if (diff > 10) {
      console.log("============ +" + diff + " ===========");
    }
    var datef = dateformat("yy.MM.dd hh:mm:ss.SSS", date);
    prev = date;
    console.log("[" + datef + " (+" + diff + ")] " + msg);
    fs.appendFile(logpath, "\n[" + date + "] " + msg.toString(), () => {});
  }
};

const clearlog = () => {
  fs.unlink(logpath, () => {
    console.log(logpath + " deleted!");
  });
};

const placebo = () => {
  process.stdout.write("");
  setTimeout(() => {
    process.stdout.write("#");
    setTimeout(() => {
      process.stdout.write("#");
      setTimeout(() => {
        process.stdout.write("#");
      }, 1000);
    }, 1000);
  }, 1000);
};

//console.log('log.js loaded');
module.exports = {
  timestamp: timestamp,
  debug: debug,
  clearlog: clearlog,
  cls: cls,
  placebo: placebo,
};