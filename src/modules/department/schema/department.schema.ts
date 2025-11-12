import * as yup from "yup"
export const DepartmentSchema = yup.object({
  code: yup.string().required("ກະລຸນາປ້ອນ code ກ່ອນ!"),
  name: yup.string().required("ກະລຸນາປ້ອນ ຊື່ ກ່ອນ!"),
})