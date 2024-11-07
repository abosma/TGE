import { RenderHandler } from "./renderHandler";

export abstract class LogHandler {
  private static renderHandler: RenderHandler = RenderHandler.getInstance();
  private static logs: string[] = [];

  private constructor() {
    LogHandler.logs = [];
    window.setInterval(LogHandler.printLogs, 1000);
  }

  public static log(...logs: string[]): void {
    if (!logs || logs.length === 0) {
      return;
    }

    LogHandler.logs.push(...logs);
  }

  public static printLogs(): void {
    if (!LogHandler.logs || LogHandler.logs.length == 0) {
      return;
    }

    LogHandler.renderHandler.addDebugText(LogHandler.logs);
  }
}
