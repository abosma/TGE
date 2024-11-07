import { Size } from "./size";
import { Vector2 } from "./vector2";

export interface LevelObject {
  type: string;
  name?: string;
  position?: Vector2;
  size?: Size;
}
