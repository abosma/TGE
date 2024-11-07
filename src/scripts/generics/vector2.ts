export class Vector2 {
  x: number = 0.0;
  y: number = 0.0;

  constructor(x?, y?) {
    if (x !== undefined) {
      this.x = x;
    }

    if (y !== undefined) {
      this.y = y;
    }
  }

  public add(val): Vector2 {
    if (val instanceof Vector2) {
      return new Vector2(this.x + val.x, this.y + val.y);
    } else {
      return new Vector2(this.x + val, this.y + val);
    }
  }

  public subtract(val): Vector2 {
    if (val instanceof Vector2) {
      return new Vector2(this.x - val.x, this.y - val.y);
    } else {
      return new Vector2(this.x - val, this.y - val);
    }
  }

  public multiply(val): Vector2 {
    if (val instanceof Vector2) {
      return new Vector2(this.x * val.x, this.y * val.y);
    } else {
      return new Vector2(this.x * val, this.y * val);
    }
  }

  public static addVectors(pos1: Vector2, pos2: Vector2): Vector2 {
    return new Vector2(pos1.x + pos2.x, pos1.y + pos2.y);
  }

  public static subtractVectors(pos1: Vector2, pos2: Vector2): Vector2 {
    return new Vector2(pos1.x - pos2.x, pos1.y - pos2.y);
  }

  public static multiplyVectors(pos1: Vector2, pos2: Vector2): Vector2 {
    return new Vector2(pos1.x * pos2.x, pos1.y * pos2.y);
  }

  public static distance(pos1: Vector2, pos2: Vector2): number {
    return Vector2.len(Vector2.subtractVectors(pos1, pos2));
  }

  public static normalize(pos: Vector2): Vector2 {
    const length = Vector2.len(pos);

    return new Vector2(pos.x / length, pos.y / length);
  }

  public static len(pos: Vector2): number {
    return Math.sqrt(pos.x * pos.x + pos.y * pos.y);
  }

  public toString = (): string => {
    return `(x: ${this.x.toPrecision(5)}, y: ${this.y.toPrecision(5)})`;
  };
}
