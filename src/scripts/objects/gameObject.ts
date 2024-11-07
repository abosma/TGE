import { IComponent } from "../components/component";
import { Transform } from "../components/transform";
import { ObjectHandler } from "../handlers/objectHandler";

export abstract class GameObject {
  public components: IComponent[] = new Array<IComponent>();
  public transform: Transform;
  public name: string;

  constructor(name?: string) {
    ObjectHandler.addGameObject(this);

    this.transform = this.addComponent(new Transform());
    this.name = name || "New GameObject";

    this.start();
  }

  public start(): void {}

  public update(dt: number): void {
    for (let i = this.components.length; i--; ) {
      this.components[i].update(dt);
    }
  }

  public addComponent<Type>(component: Type): Type {
    const newComponent: IComponent = component as unknown as IComponent;

    newComponent.gameObject = this;

    if (this.components.indexOf(newComponent) == -1) {
      this.components.push(newComponent);
      newComponent.start();
      return component;
    }

    return null;
  }

  public getComponent<Type>(componentType: { new (): Type }): Type {
    for (let i = this.components.length; i--; ) {
      const component = this.components[i];

      if (component instanceof componentType) {
        return component;
      }
    }

    return null;
  }

  public removeComponent(component: IComponent) {
    let index: number = -1;

    for (let i = this.components.length; i--; ) {
      const otherComponent = this.components[i];

      if (otherComponent == component) {
        index = i;
      }
    }

    if (index != -1) {
      this.components.splice(index, 1);
    }

    return;
  }

  public hasComponent<Type>(componentType: { new (): Type }): boolean {
    for (let i = this.components.length; i--; ) {
      const component = this.components[i];

      if (component instanceof componentType) {
        return true;
      }
    }

    return false;
  }

  public toString = (): string => {
    return `${this.name}`;
  };
}
