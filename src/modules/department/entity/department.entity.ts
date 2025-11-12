
export interface DepartmentEntity {
  id?: string;
  code?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

export type DepartmentFilterType = "name" | "code";
