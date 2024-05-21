import { Clasificador } from "./clasificador";
import { Item } from "./item";

export class ClasificadorItem extends Item<Clasificador>{

    public constructor(clasificador: Clasificador){
        super();
        this.model = clasificador;
    }

    public getKey(): string {
        return String(this.model?.id);
    }
    public getValue(): string {
        return String (this.model?.descripcion);
    }

}
