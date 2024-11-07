import { TypedEvent } from "../generics/events";
import { GameObject } from "../objects/gameObject";
import { IComponent } from "./component";
import { Transform } from "./transform";

export class Collider implements IComponent {
  public collisionEnter: TypedEvent<GameObject> = new TypedEvent<GameObject>();
  public collision: TypedEvent<GameObject> = new TypedEvent<GameObject>();
  public collisionExit: TypedEvent<GameObject> = new TypedEvent<GameObject>();

  gameObject: GameObject;
  transform: Transform;

  collidedGameObjects: GameObject[] = [];

  start(): void {
    this.transform = this.gameObject.getComponent(Transform);
  }

  update(dt: number): void {
    // Not needed
  }

  public toString = (): string => {
    return `${this.transform.position} - (${this.transform.height}, ${this.transform.width})`;
  };
}
