import { InputHandler } from "./handlers/inputHandler";
import { ObjectHandler } from "./handlers/objectHandler";
import { RenderHandler } from "./handlers/renderHandler";
import { LogHandler } from "./handlers/logHandler";
import { MouseHandler } from "./handlers/mouseHandler";
import { LevelHander } from "./handlers/levelHandler";

const objectHandler = ObjectHandler.getInstance();
const renderHandler = RenderHandler.getInstance();
const inputHandler = InputHandler.getInstance();
const mouseHandler = MouseHandler.getInstance();
const levelHandler = LevelHander.getInstance();

const dt: number = 0.01;

let currentTime: number = performance.now();
let accumulator: number = 0.0;

function init() {
  objectHandler.start();
  renderHandler.start();
  inputHandler.start();
  mouseHandler.start();
  levelHandler.start();

  LevelHander.loadLevel("level_1");

  window.requestAnimationFrame(update);
}

function update() {
  const newTime: number = performance.now();
  const frameTime: number = newTime - currentTime;

  currentTime = newTime;
  accumulator += frameTime;

  while (accumulator >= dt) {
    objectHandler.update(dt);
    accumulator -= dt;
  }

  renderHandler.update(dt);
  LogHandler.printLogs();

  window.requestAnimationFrame(update);
}

window.onload = () => init();
