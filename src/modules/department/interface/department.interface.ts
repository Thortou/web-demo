import type { IGPaginate, IGPaginated } from "../../../common/paginated.interface";
import type { IResponse } from "../../../common/respone.interface";
import type { DepartmentEntity, DepartmentFilterType } from "../entity/department.entity";



export interface DepartmentInterfaces {
  create(input: DepartmentEntity): Promise<any>;
  update(id: string, input: DepartmentEntity): Promise<any>;

  getAll(
    args: IGPaginate<Pick<DepartmentEntity, DepartmentFilterType>>
  ): Promise<IResponse<IGPaginated<DepartmentEntity>>>;
  getOne(id:string): Promise<IResponse<DepartmentEntity>>;
  deleted(id:string): Promise<any>;
}
