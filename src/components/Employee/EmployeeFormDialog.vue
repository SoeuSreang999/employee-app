<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, between, helpers } from '@vuelidate/validators';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';
import type { Employee } from '../../types/employee';
import { locationData } from '../../data/locations';

const visible = defineModel<boolean>('visible');
const props   = defineProps<{
  initialData: Employee | null;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  (e: 'save', data: Omit<Employee, 'id'>): void;
}>();

const isLoadingData     = ref(false);
const genderOptions     = ['Male', 'Female'];
const positionOptions   = ['Developer', 'Accountant', 'Designer', 'HR', 'Manager'];

const form = reactive({
  name: '',
  gender: '',
  dob: null as Date | null,
  pob: '',
  position: '',
  salary: null as number | null,
  phone: '',
  email: '',
  province: '',
  district: '',
  commune: '',
  village: '',
  fullAddress: ''
});

const provinceOptions   = Object.keys(locationData);
const districtOptions   = computed(() => form.province ? Object.keys(locationData[form.province] || {}) : []);
const communeOptions    = computed(() => (form.province && form.district) ? Object.keys(locationData[form.province]?.[form.district] || {}) : []);
const villageOptions    = computed(() => (form.province && form.district && form.commune) ? locationData[form.province]?.[form.district]?.[form.commune] || [] : []);

const ageBetween25And35 = (value: Date | null) => {
  if (!value) return false;
  const today       = new Date();
  const birthDate   = new Date(value);
  let age           = today.getFullYear() - birthDate.getFullYear();
  const m           = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age >= 25 && age <= 35;
};

const rules = {
  name: { required: helpers.withMessage('Employee Name តម្រូវអោយបំពេញ', required) },
  gender: { required: helpers.withMessage('Gender តម្រូវអោយបំពេញ', required) },
  dob: {
    required: helpers.withMessage('Date of Birth តម្រូវអោយបំពេញ', required),
    ageCheck: helpers.withMessage('អាយុត្រូវតែស្ថិតនៅចន្លោះពី 25 ដល់ 35 ឆ្នាំ', ageBetween25And35)
  },
  position: { required: helpers.withMessage('Position តម្រូវអោយបំពេញ', required) },
  salary: {
    required: helpers.withMessage('Salary តម្រូវអោយបំពេញ', required),
    between: helpers.withMessage('ប្រាក់ខែត្រូវនៅចន្លោះពី 1 ដល់ 5000', between(1, 5000))
  },
  phone: { required: helpers.withMessage('Phone តម្រូវអោយបំពេញ', required) },
  email: {
    required: helpers.withMessage('Email តម្រូវអោយបំពេញ', required),
    email: helpers.withMessage('ទម្រង់ Email មិនត្រឹមត្រូវ', email)
  },
  province: { required: helpers.withMessage('Province តម្រូវអោយជ្រើសរើស', required) },
  district: { required: helpers.withMessage('District តម្រូវអោយជ្រើសរើស', required) },
  commune: { required: helpers.withMessage('Commune តម្រូវអោយជ្រើសរើស', required) },
  village: { required: helpers.withMessage('Village តម្រូវអោយជ្រើសរើស', required) }
};

const v$ = useVuelidate(rules, form);
watch(() => form.province, (newVal, oldVal) => {
  if (isLoadingData.value) return;
  if (oldVal !== undefined && newVal !== oldVal) {
    form.district = '';
    form.commune = '';
    form.village = '';
  }
});

watch(() => form.district, (newVal, oldVal) => {
  if (isLoadingData.value) return;
  if (oldVal !== undefined && newVal !== oldVal) {
    form.commune = '';
    form.village = '';
  }
});

watch(() => form.commune, (newVal, oldVal) => {
  if (isLoadingData.value) return;
  if (oldVal !== undefined && newVal !== oldVal) {
    form.village = '';
  }
});


watch([() => form.province, () => form.district, () => form.commune, () => form.village], () => {
  if (isLoadingData.value) return;
  form.fullAddress = [form.village, form.commune, form.district, form.province].filter(Boolean).join(', ');
});

watch(visible, async (isOpen) => {
  if (isOpen) {
    v$.value.$reset();
    if (props.initialData) {
      isLoadingData.value = true;

      form.name = props.initialData.name;
      form.gender = props.initialData.gender;
      form.dob = props.initialData.dob ? new Date(props.initialData.dob) : null;
      form.pob = props.initialData.pob;
      form.position = props.initialData.position;
      form.salary = props.initialData.salary;
      form.phone = props.initialData.phone;
      form.email = props.initialData.email;
      form.province = props.initialData.province;

      await nextTick();
      form.district = props.initialData.district;

      await nextTick();
      form.commune = props.initialData.commune;

      await nextTick();
      form.village = props.initialData.village;
      form.fullAddress = props.initialData.fullAddress;

      await nextTick();
      isLoadingData.value = false;
    } else {
      Object.assign(form, {
        name: '', gender: '', dob: null, pob: '', position: '', salary: null,
        phone: '', email: '', province: '', district: '', commune: '', village: '', fullAddress: ''
      });
    }
  }
});

const submitForm = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;
  emit('save', { ...form });
  visible.value = false;
};
</script>

<template>
  <Dialog 
    v-model:visible="visible" 
    modal 
    :header="isEditing ? 'Edit Employee' : 'Add Employee'" 
    :style="{ width: '650px' }"
    :pt="{
      headerActions: { class: '!border-0' },
      pcCloseButton: {
        root: { class: '!border-0 !border-transparent !shadow-none !outline-none' }
      }
    }"
  >

    <div class="space-y-6 pt-2">
      <div>
        <h3 class="text-sm font-semibold text-gray-800 mb-3">Personal Information</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Employee Name <span class="text-red-500">*</span>
            </label>
            <InputText v-model="form.name" class="w-full" :invalid="v$.name.$error" placeholder="Enter name" />
            <small v-if="v$.name.$error" class="text-red-500 block mt-1">{{ v$.name.$errors[0].$message }}</small>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Gender <span class="text-red-500">*</span>
              </label>
              <Select v-model="form.gender" :options="genderOptions" placeholder="Select Gender" class="w-full" :invalid="v$.gender.$error" />
              <small v-if="v$.gender.$error" class="text-red-500 block mt-1">{{ v$.gender.$errors[0].$message }}</small>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Date of Birth <span class="text-red-500">*</span>
              </label>
              <DatePicker v-model="form.dob" dateFormat="dd/mm/yy" showIcon class="w-full" :invalid="v$.dob.$error" placeholder="Select Date" />
              <small v-if="v$.dob.$error" class="text-red-500 block mt-1">{{ v$.dob.$errors[0].$message }}</small>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Place of Birth</label>
              <Textarea v-model="form.pob" rows="2" class="w-full" placeholder="Enter place of birth" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Position <span class="text-red-500">*</span>
              </label>
              <Select v-model="form.position" :options="positionOptions" placeholder="Select Position" class="w-full" :invalid="v$.position.$error" />
              <small v-if="v$.position.$error" class="text-red-500 block mt-1">{{ v$.position.$errors[0].$message }}</small>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Salary <span class="text-red-500">*</span>
            </label>
            <InputNumber v-model="form.salary" class="w-full" mode="currency" currency="USD" locale="en-US" :invalid="v$.salary.$error" placeholder="0" />
            <small v-if="v$.salary.$error" class="text-red-500 block mt-1">{{ v$.salary.$errors[0].$message }}</small>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-gray-800 mb-3">Contact Information</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Phone <span class="text-red-500">*</span>
            </label>
            <InputMask v-model="form.phone" mask="999-999-999?9" placeholder="012-345-678" class="w-full" :invalid="v$.phone.$error" />
            <small v-if="v$.phone.$error" class="text-red-500 block mt-1">{{ v$.phone.$errors[0].$message }}</small>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">
              Email <span class="text-red-500">*</span>
            </label>
            <InputText v-model="form.email" class="w-full" :invalid="v$.email.$error" placeholder="example@mail.com" />
            <small v-if="v$.email.$error" class="text-red-500 block mt-1">{{ v$.email.$errors[0].$message }}</small>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-gray-800 mb-3">Address</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Province <span class="text-red-500">*</span>
              </label>
              <Select v-model="form.province" :options="provinceOptions" filter placeholder="Select Province" class="w-full" :invalid="v$.province.$error" />
              <small v-if="v$.province.$error" class="text-red-500 block mt-1">{{ v$.province.$errors[0].$message }}</small>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                District <span class="text-red-500">*</span>
              </label>
              <Select v-model="form.district" :options="districtOptions" filter :disabled="!form.province" placeholder="Select District" class="w-full" :invalid="v$.district.$error" />
              <small v-if="v$.district.$error" class="text-red-500 block mt-1">{{ v$.district.$errors[0].$message }}</small>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Commune <span class="text-red-500">*</span>
              </label>
              <Select v-model="form.commune" :options="communeOptions" filter :disabled="!form.district" placeholder="Select Commune" class="w-full" :invalid="v$.commune.$error" />
              <small v-if="v$.commune.$error" class="text-red-500 block mt-1">{{ v$.commune.$errors[0].$message }}</small>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Village <span class="text-red-500">*</span>
              </label>
              <Select v-model="form.village" :options="villageOptions" filter :disabled="!form.commune" placeholder="Select Village" class="w-full" :invalid="v$.village.$error" />
              <small v-if="v$.village.$error" class="text-red-500 block mt-1">{{ v$.village.$errors[0].$message }}</small>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Full Address</label>
            <Textarea v-model="form.fullAddress" rows="2" class="w-full bg-gray-50" readonly placeholder="Auto generated address..." />
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2 pt-3">
        <Button label="Cancel" text severity="secondary" @click="visible = false" />
        <Button label="Save" icon="pi pi-save" class="!bg-black hover:!bg-neutral-800 !text-white !border-none !px-4 !py-2 !text-xs !rounded-md" @click="submitForm" />
      </div>
    </template>
  </Dialog>
</template>