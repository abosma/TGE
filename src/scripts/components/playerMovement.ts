import { InputHandler } from "../handlers/inputHandler";
import { GameObject } from "../objects/gameObject";
import { IComponent } from "./component";

export class PlayerMovement implements IComponent {
  public speed: number = 1;

  gameObject: GameObject;
  canMove: boolean = true;

  start(): void {}

  update(dt: number): void {
    if (!this.canMove) {
      return;
    }

    if (InputHandler.keyDown("KeyA") || InputHandler.keyDown("ArrowLeft")) {
      this.gameObject.transform.position.x -= this.speed * dt;
    }

    if (InputHandler.keyDown("KeyD") || InputHandler.keyDown("ArrowRight")) {
      this.gameObject.transform.position.x += this.speed * dt;
    }

    if (InputHandler.keyDown("KeyW") || InputHandler.keyDown("ArrowUp")) {
      this.gameObject.transform.position.y -= this.speed * dt;
    }

    if (InputHandler.keyDown("KeyS") || InputHandler.keyDown("ArrowDown")) {
      this.gameObject.transform.position.y += this.speed * dt;
    }
  }
}
