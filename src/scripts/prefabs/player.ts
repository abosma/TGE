import { Collider } from "../components/collider";
import { PlayerMovement } from "../components/playerMovement";
import { Renderer } from "../components/renderer";
import { Size } from "../generics/size";
import { Vector2 } from "../generics/vector2";
import { GameObject } from "../objects/gameObject";

export class Player extends GameObject {
  private renderer: Renderer;
  private collider: Collider;
  private playerMovement: PlayerMovement;

  constructor(initialPosition?: Vector2, size?: Size) {
    super();
    this.renderer = this.addComponent(new Renderer());
    const playerImage = new Image();

    playerImage.src = "src/assets/player.png";
    playerImage.width = size?.width ? size.width : 64;
    playerImage.height = size?.height ? size.height : 64;

    this.transform.width = size?.width ? size.width : 64;
    this.transform.height = size?.height ? size.height : 64;

    this.renderer.image = playerImage;

    this.collider = this.addComponent(new Collider());
    this.playerMovement = this.addComponent(new PlayerMovement());

    this.playerMovement.speed = 1;

    if (initialPosition) {
      this.transform.position = initialPosition;
    }
  }
}
