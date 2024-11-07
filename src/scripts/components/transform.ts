import { IComponent } from "./component";
import { Vector2 } from "../generics/vector2";
import { GameObject } from "../objects/gameObject";
import { Renderer } from "./renderer";

export class Transform implements IComponent {
  public position: Vector2 = new Vector2();

  public width: number;
  public height: number;

  private startPosition: Vector2;
  private endPosition: Vector2;
  private isMoving: boolean = false;
  private distance: number;
  private direction: Vector2;
  private speed: number;

  gameObject: GameObject;

  public constructor(
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    vec2?: Vector2,
  ) {
    if (x !== undefined) {
      this.position.x = x;
    }

    if (y !== undefined) {
      this.position.y = y;
    }

    if (width !== undefined) {
      this.width = width;
    }

    if (height !== undefined) {
      this.height = height;
    }

    if (vec2 !== undefined) {
      this.position = vec2;
    }
  }

  start(): void {
    return;
  }

  update(dt: number): void {
    if (this.isMoving) {
      this.position = Vector2.addVectors(
        this.position,
        this.direction.multiply(this.speed * dt),
      );

      if (
        Vector2.distance(this.startPosition, this.position) >= this.distance
      ) {
        this.position = this.endPosition;
        this.isMoving = false;
      }
    }
  }

  /**
   * Moves object to specific given Vector2 using speed * deltaTime. Don't give it a negative speed or it will go in the other direction.
   * @param pos
   * @param speed
   */
  moveTo(pos: Vector2, speed: number): void {
    this.startPosition = this.position;
    this.endPosition = pos;
    this.distance = Vector2.distance(this.startPosition, pos);
    this.speed = speed / 1000;
    this.direction = Vector2.normalize(
      Vector2.subtractVectors(pos, this.startPosition),
    );
    this.isMoving = true;
  }

  getCenter(): Vector2 {
    const renderer = this.gameObject.getComponent(Renderer);

    if (!renderer) {
      return;
    }

    const imageWidth = renderer.image.width;
    const imageHeight = renderer.image.height;

    return new Vector2(
      this.position.x + imageWidth / 2,
      this.position.y + imageHeight / 2,
    );
  }
}
