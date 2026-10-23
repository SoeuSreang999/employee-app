<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';
import type { Employee } from '../types/employee';
import { ref } from 'vue';


defineProps<{
  employees: Employee[];
}>();
const emit = defineEmits<{
  (e: 'edit', employee: Employee): void;
  (e: 'delete', employee: Employee): void;
}>();

const fillterData = ref({
  global: {
    value: null as string | null,
    matchMode: FilterMatchMode.CONTAINS
  }
});

</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <DataTable
      :value="employees"
      v-model:filters="fillterData"
      :globalFilterFields="[
        'name',
        'gender',
        'phone',
        'email',
        'position',
        'fullAddress'
      ]"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20]"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <div class="flex justify-end p-2 bg-white">
          <div class="relative flex items-center" style="width: 250px;">
            <i class="pi pi-search absolute left-3 text-slate-400 text-sm pointer-events-none z-10"></i>
            <InputText 
              v-model="fillterData.global.value" 
              placeholder="Search" 
              style="width: 100% !important; padding-left: 2.25rem !important; padding-right: 0.75rem !important; height: 36px !important;"
              class="!text-sm !rounded-lg !border !border-slate-300 !bg-white !text-slate-700 placeholder:!text-slate-400 focus:!border-slate-400 focus:!ring-0 !shadow-none"
            />
          </div>
        </div>
      </template>

      <template #empty>
        <div class="text-center py-8 text-gray-500 font-medium">
          Data Not Found
        </div>
      </template>

      <Column field="name" header="Employee Name" headerClass="text-nowrap" sortable></Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="phone" header="Phone"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="position" header="Position">
        <template #body="{ data }">
          <Tag :value="data.position" severity="info" class="!rounded-lg !py-0 !px-2" />
        </template>
      </Column>
      <Column field="salary" header="Salary">
        <template #body="{ data }">
          ${{ data.salary ? data.salary.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00' }}
        </template>
      </Column>
      <Column field="fullAddress" header="Address" class="min-w-[250px]"></Column>
      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex items-center gap-1">
            <Button icon="pi pi-pencil" text rounded severity="secondary" @click="emit('edit', data)" />
            <Button icon="pi pi-trash" text rounded severity="danger" @click="emit('delete', data)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>