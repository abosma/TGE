import { Collider } from "../components/collider";
import { Renderer } from "../components/renderer";
import { Size } from "../generics/size";
import { Vector2 } from "../generics/vector2";
import { GameObject } from "../objects/gameObject";

export class Wall extends GameObject {
  public collider: Collider;
  public renderer: Renderer;

  constructor(initialPosition?: Vector2, size?: Size) {
    super();
    this.collider = this.addComponent(new Collider());
    this.renderer = this.addComponent(new Renderer());

    const wallImage = new Image();
    wallImage.src = "src/assets/wall.png";
    wallImage.width = size?.width ? size.width : 64;
    wallImage.height = size?.height ? size.height : 64;

    this.transform.width = size?.width ? size.width : 64;
    this.transform.height = size?.height ? size.height : 64;

    this.renderer.image = wallImage;

    if (initialPosition) {
      this.transform.position = initialPosition;
    }
  }
}
