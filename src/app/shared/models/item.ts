export abstract class Item<T> {

    public selected: boolean = false;

    public model?: T;

    public abstract getKey(): string;

    public abstract getValue(): string;

}
