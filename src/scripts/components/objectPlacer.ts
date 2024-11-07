import { Vector2 } from "../generics/vector2";
import { LogHandler } from "../handlers/logHandler";
import { MouseHandler } from "../handlers/mouseHandler";
import { ObjectHandler } from "../handlers/objectHandler";
import { GameObject } from "../objects/gameObject";
import { Wall } from "../prefabs/wall";
import { IComponent } from "./component";

export class ObjectPlacer implements IComponent {
  gameObject: GameObject;

  maxObjects: number = 2;
  currentObjects: number = 0;

  start(): void {
    LogHandler.log("Started ObjectPlacer.");

    MouseHandler.mouseEvents.addEventListener(
      "mouseClicked",
      (e: CustomEvent) => this.addWall(e)
    );
  }

  update(dt: number): void {}

  addWall(event: CustomEvent): void {
    if(event.detail.button !== 0) {
        return;
    }
    
    ObjectHandler.addGameObject(
      new Wall(new Vector2(event.detail.x, event.detail.y), {
        width: 32,
        height: 32,
      })
    );
  }
}
