import { ObjectPlacer } from "../components/objectPlacer";
import { GameObject } from "../objects/gameObject";

export class MapEditor extends GameObject {
    private objectPlacer: ObjectPlacer;

    constructor() {
        super();

        this.objectPlacer = this.addComponent(new ObjectPlacer());
    }
}