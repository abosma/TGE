import { Collider } from "../components/collider";
import { GameObject } from "../objects/gameObject";
import { LogHandler } from "./logHandler";

export class ObjectHandler {
  private static instance: ObjectHandler;
  private constructor() {}

  private static gameObjects: GameObject[] = new Array<GameObject>();

  public start(): void {
    LogHandler.log("Started ObjectHandler");
  }

  public static getInstance(): ObjectHandler {
    if (!ObjectHandler.instance) {
      ObjectHandler.instance = new ObjectHandler();
    }

    return ObjectHandler.instance;
  }

  public static addGameObject(gameObject: GameObject) {
    if (ObjectHandler.gameObjects.indexOf(gameObject) == -1) {
      ObjectHandler.gameObjects.push(gameObject);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getGameObjectsWithComponent<Type>(componentType: {
    new (): Type;
  }): GameObject[] {
    const toReturnGameObjects: GameObject[] = [];

    for (let i = ObjectHandler.gameObjects.length; i--; ) {
      if (ObjectHandler.gameObjects[i].hasComponent(Collider)) {
        toReturnGameObjects.push(ObjectHandler.gameObjects[i]);
      }
    }

    return toReturnGameObjects;
  }

  public update(dt) {
    for (let i = ObjectHandler.gameObjects.length; i--; ) {
      ObjectHandler.gameObjects[i].update(dt);
      // this.checkCollisions();
    }
  }

  public checkCollisions() {
    const colliderObjects: GameObject[] =
      this.getGameObjectsWithComponent(Collider);

    for (let x = 0; x < colliderObjects.length; x++) {
      for (let y = x + 1; y < colliderObjects.length; y++) {
        if (colliderObjects[x] === colliderObjects[y]) {
          continue;
        }

        const go1 = colliderObjects[x];
        const go2 = colliderObjects[y];

        const go1Collider = go1.getComponent(Collider);
        const go2Collider = go2.getComponent(Collider);

        const go1Index = go2Collider.collidedGameObjects.findIndex(
          (go) => go === go1
        );
        const go2Index = go1Collider.collidedGameObjects.findIndex(
          (go) => go === go2
        );

        const hasCollided = this.aabbTest(go1, go2);

        if (hasCollided) {
          go1Collider.collision.emit(go2);
          go2Collider.collision.emit(go1);

          if (go2Index === -1) {
            go1Collider.collidedGameObjects.push(go2);
            go1Collider.collisionEnter.emit(go2);
          }

          if (go1Index === -1) {
            go2Collider.collidedGameObjects.push(go1);
            go2Collider.collisionEnter.emit(go1);
          }
        } else if (!hasCollided) {
          if (go2Index !== -1) {
            go1Collider.collidedGameObjects.splice(go2Index, 1);
            go1Collider.collisionExit.emit(go2);
          }

          if (go1Index !== -1) {
            go2Collider.collidedGameObjects.splice(go1Index, 1);
            go2Collider.collisionExit.emit(go1);
          }
        }
      }
    }
  }

  public aabbTest(go1: GameObject, go2: GameObject) {
    if (
      go1.transform.position.x <
        go2.transform.position.x + go2.transform.width &&
      go1.transform.position.x + go1.transform.width >
        go2.transform.position.x &&
      go1.transform.position.y <
        go2.transform.position.y + go2.transform.height &&
      go1.transform.position.y + go1.transform.height > go2.transform.position.y
    ) {
      return true;
    }

    return false;
  }
}
