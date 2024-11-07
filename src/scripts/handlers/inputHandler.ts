import { LogHandler } from "./logHandler";

export class InputHandler {
  private static instance: InputHandler;

  private static pressedKeys: Array<string> = new Array<string>();

  private constructor() {}

  public static getInstance(): InputHandler {
    if (!InputHandler.instance) {
      InputHandler.instance = new InputHandler();
    }

    return InputHandler.instance;
  }

  public start(): void {
    document.addEventListener("keydown", (e) => {
      if (e.defaultPrevented) {
        return;
      }

      if (InputHandler.pressedKeys.indexOf(e.code) == -1) {
        InputHandler.pressedKeys.push(e.code);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.defaultPrevented) {
        return;
      }

      const keyIndex: number = InputHandler.pressedKeys.indexOf(e.code);

      if (keyIndex != -1) {
        InputHandler.pressedKeys.splice(keyIndex, 1);
      }
    });

    LogHandler.log("Started InputHandler");
  }

  public static keyDown(keyCode: string): boolean {
    if (this.pressedKeys.indexOf(keyCode) != -1) {
      return true;
    }

    return false;
  }
}
