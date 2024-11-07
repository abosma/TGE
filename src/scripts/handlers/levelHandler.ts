import { LevelObject } from "../generics/levelObject";
import { MapEditor } from "../prefabs/mapEditor";
import { Player } from "../prefabs/player";
import { Wall } from "../prefabs/wall";
import { LogHandler } from "./logHandler";

export class LevelHander {
  private static instance: LevelHander;

  private constructor() {}

  public static getInstance(): LevelHander {
    if (!LevelHander.instance) {
      LevelHander.instance = new LevelHander();
    }

    return LevelHander.instance;
  }

  public start(): void {
    LogHandler.log("Started LevelHander");
  }

  public static loadLevel(level: string) {
    LogHandler.log(`Loading level: ${level}`);

    const request = new Request(`./src/levels/${level}.json`);

    fetch(request)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        LevelHander.createObjects(json.objects).then(() =>
          LogHandler.log(`Loaded level: ${level}`)
        );
      });
  }

  private static async createObjects(objects: LevelObject[]) {
    objects.forEach((object) => {
      if (object.type === "wall") {
        new Wall(object.position, object.size);
        return;
      }

      if (object.type === "player") {
        new Player(object.position, object.size);
        return;
      }

      if (object.type === "mapEditor") {
        new MapEditor();
        return;
      }
    });
  }
}
