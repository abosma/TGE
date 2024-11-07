import { Vector2 } from "../generics/vector2";
import { MouseHandler } from "../handlers/mouseHandler";
import { GameObject } from "../objects/gameObject";
import { IComponent } from "./component";

export class FollowMouse implements IComponent {
  gameObject: GameObject;

  public shouldFollow: boolean;

  start(): void {
    return;
  }

  update(dt: number): void {
    if (!this.shouldFollow) {
      return;
    }

    const mousePos = MouseHandler.getPosition();
    this.gameObject.transform.position = new Vector2(
      mousePos.x - this.gameObject.transform.width / 2,
      mousePos.y - this.gameObject.transform.height / 2,
    );
  }
}
