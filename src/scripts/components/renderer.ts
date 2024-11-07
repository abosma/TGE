import { RenderHandler } from "../handlers/renderHandler";
import { GameObject } from "../objects/gameObject";
import { IComponent } from "./component";

export class Renderer implements IComponent {
  gameObject: GameObject;
  image: HTMLImageElement;

  constructor(image?: HTMLImageElement) {
    if (image !== undefined) {
      this.image = image;
    }

    RenderHandler.getInstance().addRenderer(this);
  }

  start(): void {
    return;
  }

  update(dt: number): void {
    return;
  }
}
