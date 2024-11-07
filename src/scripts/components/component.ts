import { GameObject } from "../objects/gameObject";

export interface IComponent {
  gameObject: GameObject;
  start(): void;
  update(dt: number): void;
}
