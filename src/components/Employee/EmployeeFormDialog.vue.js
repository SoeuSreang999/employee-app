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
import { locationData } from '../../data/locations';
const { defineProps, defineEmits, defineModel, } = {};
const visible = defineModel('visible');
const props = defineProps();
const emit = defineEmits();
const isLoadingData = ref(false);
const genderOptions = ['Male', 'Female'];
const positionOptions = ['Developer', 'Accountant', 'Designer', 'HR', 'Manager'];
const form = reactive({
    name: '',
    gender: '',
    dob: null,
    pob: '',
    position: '',
    salary: null,
    phone: '',
    email: '',
    province: '',
    district: '',
    commune: '',
    village: '',
    fullAddress: ''
});
const provinceOptions = Object.keys(locationData);
const districtOptions = computed(() => form.province ? Object.keys(locationData[form.province] || {}) : []);
const communeOptions = computed(() => (form.province && form.district) ? Object.keys(locationData[form.province]?.[form.district] || {}) : []);
const villageOptions = computed(() => (form.province && form.district && form.commune) ? locationData[form.province]?.[form.district]?.[form.commune] || [] : []);
const ageBetween25And35 = (value) => {
    if (!value)
        return false;
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        age--;
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
    if (isLoadingData.value)
        return;
    if (oldVal !== undefined && newVal !== oldVal) {
        form.district = '';
        form.commune = '';
        form.village = '';
    }
});
watch(() => form.district, (newVal, oldVal) => {
    if (isLoadingData.value)
        return;
    if (oldVal !== undefined && newVal !== oldVal) {
        form.commune = '';
        form.village = '';
    }
});
watch(() => form.commune, (newVal, oldVal) => {
    if (isLoadingData.value)
        return;
    if (oldVal !== undefined && newVal !== oldVal) {
        form.village = '';
    }
});
watch([() => form.province, () => form.district, () => form.commune, () => form.village], () => {
    if (isLoadingData.value)
        return;
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
        }
        else {
            Object.assign(form, {
                name: '', gender: '', dob: null, pob: '', position: '', salary: null,
                phone: '', email: '', province: '', district: '', commune: '', village: '', fullAddress: ''
            });
        }
    }
});
const submitForm = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid)
        return;
    emit('save', { ...form });
    visible.value = false;
};
let __VLS_modelEmit;
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
// @ts-ignore
__VLS_withDotValue(form, {});
// @ts-ignore
__VLS_withDotValue(v$, {});
// @ts-ignore
__VLS_withDotValue(visible, {});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Dialog | typeof __VLS_components.Dialog} */
Dialog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    visible: (visible.value), modal: true, header: (__VLS_ctx.isEditing ? 'Edit Employee' : 'Add Employee'), ...{ style: ({ width: '650px' }) }, pt: ({
        headerActions: { class: '!border-0' },
        pcCloseButton: {
            root: { class: '!border-0 !border-transparent !shadow-none !outline-none' }
        }
    }),
}));
const __VLS_2 = __VLS_1({
    visible: (visible.value),
    modal: true,
    header: (__VLS_ctx.isEditing ? 'Edit Employee' : 'Add Employee'),
    ...{ style: ({ width: '650px' }) },
    pt: ({
        headerActions: { class: '!border-0' },
        pcCloseButton: {
            root: { class: '!border-0 !border-transparent !shadow-none !outline-none' }
        }
    }),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-6 pt-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "text-sm font-semibold text-gray-800 mb-3" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.InputText} */
InputText;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    // @ts-ignore
    modelValue: (form.value.name), ...{ class: "w-full" }, invalid: (v$.value.name.$error), placeholder: "Enter name",
}));
const __VLS_8 = __VLS_7({
    modelValue: (form.value.name),
    ...{ class: "w-full" },
    invalid: (v$.value.name.$error),
    placeholder: "Enter name",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.name.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.name.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    // @ts-ignore
    modelValue: (form.value.gender), options: (__VLS_unwrap(genderOptions, {})), placeholder: "Select Gender", ...{ class: "w-full" }, invalid: (v$.value.gender.$error),
}));
const __VLS_13 = __VLS_12({
    modelValue: (form.value.gender),
    options: (__VLS_unwrap(genderOptions, {})),
    placeholder: "Select Gender",
    ...{ class: "w-full" },
    invalid: (v$.value.gender.$error),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.gender.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.gender.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.DatePicker} */
DatePicker;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    // @ts-ignore
    modelValue: (form.value.dob), dateFormat: "dd/mm/yy", showIcon: true, ...{ class: "w-full" }, invalid: (v$.value.dob.$error), placeholder: "Select Date",
}));
const __VLS_18 = __VLS_17({
    modelValue: (form.value.dob),
    dateFormat: "dd/mm/yy",
    showIcon: true,
    ...{ class: "w-full" },
    invalid: (v$.value.dob.$error),
    placeholder: "Select Date",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.dob.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.dob.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.Textarea} */
Textarea;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
    // @ts-ignore
    modelValue: (form.value.pob), rows: "2", ...{ class: "w-full" }, placeholder: "Enter place of birth",
}));
const __VLS_23 = __VLS_22({
    modelValue: (form.value.pob),
    rows: "2",
    ...{ class: "w-full" },
    placeholder: "Enter place of birth",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    // @ts-ignore
    modelValue: (form.value.position), options: (__VLS_unwrap(positionOptions, {})), placeholder: "Select Position", ...{ class: "w-full" }, invalid: (v$.value.position.$error),
}));
const __VLS_28 = __VLS_27({
    modelValue: (form.value.position),
    options: (__VLS_unwrap(positionOptions, {})),
    placeholder: "Select Position",
    ...{ class: "w-full" },
    invalid: (v$.value.position.$error),
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.position.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.position.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.InputNumber} */
InputNumber;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    // @ts-ignore
    modelValue: (form.value.salary), ...{ class: "w-full" }, mode: "currency", currency: "USD", locale: "en-US", invalid: (v$.value.salary.$error), placeholder: "0",
}));
const __VLS_33 = __VLS_32({
    modelValue: (form.value.salary),
    ...{ class: "w-full" },
    mode: "currency",
    currency: "USD",
    locale: "en-US",
    invalid: (v$.value.salary.$error),
    placeholder: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.salary.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.salary.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "text-sm font-semibold text-gray-800 mb-3" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.InputMask} */
InputMask;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    // @ts-ignore
    modelValue: (form.value.phone), mask: "999-999-999?9", placeholder: "012-345-678", ...{ class: "w-full" }, invalid: (v$.value.phone.$error),
}));
const __VLS_38 = __VLS_37({
    modelValue: (form.value.phone),
    mask: "999-999-999?9",
    placeholder: "012-345-678",
    ...{ class: "w-full" },
    invalid: (v$.value.phone.$error),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.phone.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.phone.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.InputText} */
InputText;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    // @ts-ignore
    modelValue: (form.value.email), ...{ class: "w-full" }, invalid: (v$.value.email.$error), placeholder: "example@mail.com",
}));
const __VLS_43 = __VLS_42({
    modelValue: (form.value.email),
    ...{ class: "w-full" },
    invalid: (v$.value.email.$error),
    placeholder: "example@mail.com",
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.email.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.email.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "text-sm font-semibold text-gray-800 mb-3" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-4" },
});
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    // @ts-ignore
    modelValue: (form.value.province), options: (__VLS_unwrap(provinceOptions, {})), filter: true, placeholder: "Select Province", ...{ class: "w-full" }, invalid: (v$.value.province.$error),
}));
const __VLS_48 = __VLS_47({
    modelValue: (form.value.province),
    options: (__VLS_unwrap(provinceOptions, {})),
    filter: true,
    placeholder: "Select Province",
    ...{ class: "w-full" },
    invalid: (v$.value.province.$error),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.province.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.province.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    // @ts-ignore
    modelValue: (form.value.district), options: (__VLS_unwrap(districtOptions, {})), filter: true, disabled: (!form.value.province), placeholder: "Select District", ...{ class: "w-full" }, invalid: (v$.value.district.$error),
}));
const __VLS_53 = __VLS_52({
    modelValue: (form.value.district),
    options: (__VLS_unwrap(districtOptions, {})),
    filter: true,
    disabled: (!form.value.province),
    placeholder: "Select District",
    ...{ class: "w-full" },
    invalid: (v$.value.district.$error),
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.district.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.district.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-2 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    // @ts-ignore
    modelValue: (form.value.commune), options: (__VLS_unwrap(communeOptions, {})), filter: true, disabled: (!form.value.district), placeholder: "Select Commune", ...{ class: "w-full" }, invalid: (v$.value.commune.$error),
}));
const __VLS_58 = __VLS_57({
    modelValue: (form.value.commune),
    options: (__VLS_unwrap(communeOptions, {})),
    filter: true,
    disabled: (!form.value.district),
    placeholder: "Select Commune",
    ...{ class: "w-full" },
    invalid: (v$.value.commune.$error),
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.commune.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.commune.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-red-500" },
});
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
let __VLS_61;
/** @ts-ignore @type { | typeof __VLS_components.Select} */
Select;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
    // @ts-ignore
    modelValue: (form.value.village), options: (__VLS_unwrap(villageOptions, {})), filter: true, disabled: (!form.value.commune), placeholder: "Select Village", ...{ class: "w-full" }, invalid: (v$.value.village.$error),
}));
const __VLS_63 = __VLS_62({
    modelValue: (form.value.village),
    options: (__VLS_unwrap(villageOptions, {})),
    filter: true,
    disabled: (!form.value.commune),
    placeholder: "Select Village",
    ...{ class: "w-full" },
    invalid: (v$.value.village.$error),
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
if (v$.value.village.$error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({
        ...{ class: "text-red-500 block mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['block']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (v$.value.village.$errors[0].$message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "block text-xs font-medium text-gray-700 mb-1" },
});
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.Textarea} */
Textarea;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    // @ts-ignore
    modelValue: (form.value.fullAddress), rows: "2", ...{ class: "w-full bg-gray-50" }, readonly: true, placeholder: "Auto generated address...",
}));
const __VLS_68 = __VLS_67({
    modelValue: (form.value.fullAddress),
    rows: "2",
    ...{ class: "w-full bg-gray-50" },
    readonly: true,
    placeholder: "Auto generated address...",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
{
    const { footer: __VLS_71 } = __VLS_nonNull(__VLS_3.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-end gap-2 pt-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
    let __VLS_72;
    /** @ts-ignore @type { | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
        // @ts-ignore
        ...{ 'onClick': {} }, label: "Cancel", text: true, severity: "secondary",
    }));
    const __VLS_74 = __VLS_73({
        ...{ 'onClick': {} },
        label: "Cancel",
        text: true,
        severity: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    let __VLS_77;
    const __VLS_78 = {
        /** @type {typeof __VLS_77.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (visible.value = false);
            // @ts-ignore
            [visible, visible, isEditing, form, form, form, form, form, form, form, form, form, form, form, form, form, form, form, form, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, v$, genderOptions, positionOptions, provinceOptions, districtOptions, communeOptions, villageOptions,];
        },
    };
    void __VLS_78;
    var __VLS_75;
    var __VLS_76;
    let __VLS_79;
    /** @ts-ignore @type { | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent1(__VLS_79, new __VLS_79({
        // @ts-ignore
        ...{ 'onClick': {} }, label: "Save", icon: "pi pi-save", ...{ class: "!bg-black hover:!bg-neutral-800 !text-white !border-none !px-4 !py-2 !text-xs !rounded-md" },
    }));
    const __VLS_81 = __VLS_80({
        ...{ 'onClick': {} },
        label: "Save",
        icon: "pi pi-save",
        ...{ class: "!bg-black hover:!bg-neutral-800 !text-white !border-none !px-4 !py-2 !text-xs !rounded-md" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    let __VLS_84;
    const __VLS_85 = {
        /** @type {typeof __VLS_84.click} */
        onClick: (__VLS_unwrap(submitForm, {})),
    };
    void __VLS_85;
    /** @type {__VLS_StyleScopedClasses['!bg-black']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:!bg-neutral-800']} */ ;
    /** @type {__VLS_StyleScopedClasses['!text-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['!border-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['!px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['!py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['!text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['!rounded-md']} */ ;
    var __VLS_82;
    var __VLS_83;
    // @ts-ignore
    [submitForm,];
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
