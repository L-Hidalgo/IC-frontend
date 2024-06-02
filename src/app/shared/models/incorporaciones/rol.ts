export class Rol {
  id: number;
  name: string;
  guard_name?: string | null;
  selected: boolean;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.selected = false; 
  }
}
