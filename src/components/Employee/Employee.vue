<script setup lang="ts">
import { ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { initialEmployees } from '@/data/employees';
import type { Employee } from '@/types/employee';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import EmployeeList from './EmployeeList.vue';
import EmployeeFormDialog from './EmployeeFormDialog.vue';

const confirm         = useConfirm();
const employees       = ref<Employee[]>([...initialEmployees]);
const isDialogVisible = ref(false);
const isEditing       = ref(false);
const currentEmployee = ref<Employee | null>(null);

const handleAdd = () => {
  isEditing.value = false;
  currentEmployee.value = null;
  isDialogVisible.value = true;
};

const handleEdit = (employee: Employee) => {
  isEditing.value = true;
  currentEmployee.value = { ...employee };
  isDialogVisible.value = true;
};

const handleDelete = (employee: Employee) => {
  confirm.require({
    message: `Are you sure you want to delete employee "${employee.name}"?`,
    header: 'Confirm Delete',
    icon: 'pi pi-question-circle',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptClass: '!bg-red-500 !border-red-500 !text-white !px-4 !py-2 text-xs',
    rejectClass: '!bg-emerald-500 !border-emerald-500 !text-white !px-4 !py-2 text-xs',
    accept: () => {
      employees.value = employees.value.filter(e => e.id !== employee.id);
    }
  });
};

const handleSave = (formData: Omit<Employee, 'id'>) => {
  console.log('--- Submit Data Payload ---', formData);

  if (isEditing.value && currentEmployee.value) {
    employees.value = employees.value.map((emp) => {
      if (emp.id === currentEmployee.value!.id) {
        return {
          id: currentEmployee.value!.id,
          ...formData
        };
      }
      return emp;
    });
  } else {
    const newEmployee: Employee = {
      id: Date.now(),
      ...formData
    };
    employees.value = [newEmployee, ...employees.value];
  }
};
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Employees</h1>
        <p class="text-gray-500 text-sm">Manage employee information</p>
      </div>
      <Button 
        label="+ Add Employee" 
        class="!bg-black hover:!bg-neutral-800 !text-white !border-none !px-4 !py-2 !text-xs !rounded-md"
        @click="handleAdd" 
      />
    </div>

    <EmployeeList 
      :employees="employees" 
      @edit="handleEdit" 
      @delete="handleDelete" 
    />

    <EmployeeFormDialog 
      v-model:visible="isDialogVisible" 
      :initial-data="currentEmployee" 
      :is-editing="isEditing" 
      @save="handleSave" 
    />

    <ConfirmDialog />
  </div>
</template>