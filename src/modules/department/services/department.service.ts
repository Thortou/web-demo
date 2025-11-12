import { injectable, inject } from "tsyringe";
import type { DepartmentFilterType, DepartmentEntity } from "../entity/department.entity";
import type { IResponse } from "../../../common/respone.interface";
import type { DepartmentInterfaces } from "../interface/department.interface";
import { DepartmentRepository } from "../repository/department.repository";
import type { IGPaginate, IGPaginated } from "../../../common/paginated.interface";

@injectable()
export class DepartmentServices {
  constructor(
    @inject(DepartmentRepository) private _api: DepartmentInterfaces
  ){}

  async getAll(
    input: IGPaginate<Pick<DepartmentEntity, DepartmentFilterType>>
  ): Promise<void | IResponse<IGPaginated<DepartmentEntity>>> {
    return await this._api.getAll(input);
  }
  async getOne(
    id: string): Promise<void | IResponse<DepartmentEntity>> {
    return await this._api.getOne(id);
  }
  async created(
    input: DepartmentEntity): Promise<DepartmentEntity> {
    return await this._api.create(input);
  }
  async updated(
   id: string, input: DepartmentEntity): Promise<DepartmentEntity> {
    return await this._api.update(id, input);
  }
  async deleted(
    id: string
  ): Promise<void> {
    return await this._api.deleted(id);
  }
}