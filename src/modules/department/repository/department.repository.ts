
import type { IGPaginate, IGPaginated } from "../../../common/paginated.interface";
import type { IResponse } from "../../../common/respone.interface";
import type{ DepartmentEntity, DepartmentFilterType } from "../entity/department.entity";
import { inject, injectable } from "tsyringe";
import { DepartmentData } from "./department-data";
import type { DepartmentInterfaces } from "../interface/department.interface";
import { v4 as uuidv4 } from "uuid";
@injectable()
export class DepartmentRepository implements DepartmentInterfaces {
  async getAll(
    args: IGPaginate<Pick<DepartmentEntity, DepartmentFilterType>>
  ): Promise<IResponse<IGPaginated<DepartmentEntity>>> {
    const page = args.page || 1;
    const limit = args.limit || 10;
  
    const start = (page - 1) * limit;
    const end = start + limit;
  
    const paginatedData = DepartmentData.slice(start, end);
  
    return {
      data: {
        props: paginatedData,
        total: DepartmentData.length,
      },
      status: "success",
    };
  }
  async getOne(id: string): Promise<IResponse<DepartmentEntity>> {
    const department = DepartmentData.find((item) => item.id === id);
    if (!department) {
      return {
        data: null as any,
        status: "error",
        message: "Department not found",
      };
    }
  
    return {
      data: department,
      status: "success",
    };
  }
  async deleted(id: string): Promise<IResponse<null>> {
    const index = DepartmentData.findIndex((item) => item.id === id);
    if (index !== -1) {
      DepartmentData.splice(index, 1);
      return { data: null, status: "success" };
    }

    return {
      data: null,
      status: "error",
      message: "Item not found",
    };
  }
   // ✅ CREATE function
   async create(payload: Omit<DepartmentEntity, "id">): Promise<IResponse<DepartmentEntity>> {
    const newDepartment: DepartmentEntity = {
      ...payload,
      id: uuidv4(), // generate unique id
    };

    DepartmentData.push(newDepartment);

    return {
      data: newDepartment,
      status: "success",
    };
  }

  // ✅ UPDATE function
  async update(id: string, payload: Partial<DepartmentEntity>): Promise<IResponse<DepartmentEntity>> {
    const index = DepartmentData.findIndex((item) => item.id === id);
    if (index === -1) {
      return {
        data: null as any,
        status: "error",
        message: "Department not found",
      };
    }

    DepartmentData[index] = {
      ...DepartmentData[index],
      ...payload,
      id, // ensure id is not overwritten
    };

    return {
      data: DepartmentData[index],
      status: "success",
    };
  }
}
