import { MouseHandler } from "../handlers/mouseHandler";
import { GameObject } from "../objects/gameObject";
import { IComponent } from "./component";
import { FollowMouse } from "./followMouse";

export class Dragger implements IComponent {
  gameObject: GameObject;

  private followMouse: FollowMouse;

  start(): void {
    this.followMouse = this.gameObject.getComponent(FollowMouse);

    if (!this.followMouse) {
      this.followMouse = this.gameObject.addComponent(new FollowMouse());
    }

    this.followMouse.shouldFollow = false;
  }

  update(dt: number): void {
    if (!MouseHandler.mouseDown) {
      this.followMouse.shouldFollow = false;
      return;
    }

    if (MouseHandler.isOverObject(this.gameObject.transform.getCenter(), 50)) {
      this.followMouse.shouldFollow = true;
    }
  }
}
