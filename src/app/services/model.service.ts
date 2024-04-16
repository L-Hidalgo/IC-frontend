// import { Model, ModelFactory } from '@angular-extensions/model';

import { Observable } from 'rxjs';
import { Model, ModelFactory } from '../models/model';

/*
  Servicio base con metodos para el consumo de servcios backend.
  author: vigmar.carlo
  version: 28/03/2022
 */
export abstract class ModelService<T> {

  private modeloFactory: ModelFactory<T> = new ModelFactory();
  private listaFactory: ModelFactory<T[]> = new ModelFactory();

  private model: Model<T>;
  dataModel$: Observable<T>;

  private list: Model<T[]>;
  dataList$: Observable<T[]>;

  constructor() {
    this.model = this.modeloFactory.create(this.createDefault());
    this.dataModel$ = this.model.data$;

    this.list = this.listaFactory.create([]);
    this.dataList$ = this.list.data$;
  }

  protected createDefault(): T {
    return ({} as any) as T;
  }

  protected getHeaders(): any {
    return {
      "Authorization": 'Token ' + this.getAccesToken(),
      "Content-type": "application/json",
      "Accept": "application/json",
      "Accept-Charset": "utf-8",
    };
  }

  public async getAccesToken(): Promise<any> {
    // return this.sesionService.getAccesToken();
    return '';
  }


  public setDataModel(data: T) {
    this.model.set(data);
  }

  public getDataModel(): T {
    return this.model.get();
  }

  public setDataList(data: T[]) {
    this.list.set(data);
  }

  public getDataList(): T[] {
    return this.list.get();
  }

  protected async getFetch(url: string): Promise<any> | never {
    return await this.execute(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  protected async putFetch(url: string, request: any): Promise<any> | never {
    return await this.execute(url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(request),
    });
  }

  protected async postFetch(url: string, request: any): Promise<any> | never {
    return await this.execute(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(request),
    });
  }

  private async execute(url: string, request: any): Promise<any> | never {
    try {
      const response = await fetch(url, request);
      if (!response.ok) {
        throw new Error('Error! status: ${response.status}');
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      throw new Error('Excepcion al consumir  servicio remoto');
    }
  }

  public filter(value: string) {
    return this.getDataList()
      .filter(item => JSON.stringify(Object.values(item)).toUpperCase().includes(value.toUpperCase()));
  }

}
