<script setup lang="ts">
import { ref, watch } from "vue";
import { useForm, useField } from "vee-validate";
import { DepartmentSchema } from "../schema/department.schema";
import { toTypedSchema } from "@vee-validate/yup";
import type { DepartmentEntity } from "../entity/department.entity";
import { DepartmentStore } from "../store";
import { message } from "ant-design-vue";

const store = DepartmentStore();

const open = ref(false);
const isEditMode = ref(false);

const { handleSubmit, resetForm, setValues } = useForm<Partial<DepartmentEntity>>({
  validationSchema: toTypedSchema(DepartmentSchema),
});

const { value: code, errorMessage: codeError } = useField<string>("code");
const { value: name, errorMessage: nameError } = useField<string>("name");

async function show(editMode = false, id?: string) {
  isEditMode.value = editMode;

  if (editMode && id) {
    await store.getOne(id);
    const data = store.singleDepartment;
    setValues(data ?? { code: "", name: "" });
  } else {
    resetForm({ values: { code: "", name: "" } });
  }

  open.value = true;
}

function close() {
  open.value = false;
  resetForm();
}

const onSubmit = handleSubmit(async (values) => {
  try {
    if (isEditMode.value && store.singleDepartment?.id) {
      await store.updated(store.singleDepartment.id, values as DepartmentEntity);
      message.success("ອັບເດດສໍາເລັດ");
    } else {
      await store.created(values as DepartmentEntity);
      message.success("ສ້າງສໍາເລັດ");
    }

    store.getAll();
    close();
  } catch (err) {
    message.error("ບັນທຶກບໍ່ສໍາເລັດ");
  }
});

defineExpose({ show, close });
</script>

<template>
  <a-modal
    v-model:open="open"
    :title="isEditMode ? 'Edit Department' : 'Create Department'"
    @ok="onSubmit"
    :confirm-loading="store.state.btnLoading"
    @cancel="close"
  >
    <a-form layout="vertical">
      <a-form-item
        label="Code"
        name="code"
        :validate-status="codeError ? 'error' : ''"
        :help="codeError"
      >
        <a-input v-model:value="code" placeholder="ປ້ອນລະຫັດ Code" />
      </a-form-item>

      <a-form-item
        label="Name"
        name="name"
        :validate-status="nameError ? 'error' : ''"
        :help="nameError"
      >
        <a-input v-model:value="name" placeholder="ປ້ອນຊື່ພະແນກ" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
