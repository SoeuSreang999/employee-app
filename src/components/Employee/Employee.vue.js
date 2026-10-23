import { ref } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { initialEmployees } from '@/data/employees';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import EmployeeList from './EmployeeList.vue';
import EmployeeFormDialog from './EmployeeFormDialog.vue';
const confirm = useConfirm();
const employees = ref([...initialEmployees]);
const isDialogVisible = ref(false);
const isEditing = ref(false);
const currentEmployee = ref(null);
const handleAdd = () => {
    isEditing.value = false;
    currentEmployee.value = null;
    isDialogVisible.value = true;
};
const handleEdit = (employee) => {
    isEditing.value = true;
    currentEmployee.value = { ...employee };
    isDialogVisible.value = true;
};
const handleDelete = (employee) => {
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
const handleSave = (formData) => {
    console.log('--- Submit Data Payload ---', formData);
    if (isEditing.value && currentEmployee.value) {
        employees.value = employees.value.map((emp) => {
            if (emp.id === currentEmployee.value.id) {
                return {
                    id: currentEmployee.value.id,
                    ...formData
                };
            }
            return emp;
        });
    }
    else {
        const newEmployee = {
            id: Date.now(),
            ...formData
        };
        employees.value = [newEmployee, ...employees.value];
    }
};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
void __VLS_ctx, __VLS_components, __VLS_intrinsics, __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-between items-center mb-6" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-2xl font-bold text-gray-900" },
});
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-gray-500 text-sm" },
});
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    ...{ 'onClick': {} }, label: "+ Add Employee", ...{ class: "!bg-black hover:!bg-neutral-800 !text-white !border-none !px-4 !py-2 !text-xs !rounded-md" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    label: "+ Add Employee",
    ...{ class: "!bg-black hover:!bg-neutral-800 !text-white !border-none !px-4 !py-2 !text-xs !rounded-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_unwrap(handleAdd, {})),
};
void __VLS_6;
/** @type {__VLS_StyleScopedClasses['!bg-black']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:!bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['!text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['!border-none']} */ ;
/** @type {__VLS_StyleScopedClasses['!px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['!text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['!rounded-md']} */ ;
var __VLS_3;
var __VLS_4;
const __VLS_7 = EmployeeList;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    // @ts-ignore
    ...{ 'onEdit': {} }, ...{ 'onDelete': {} }, employees: (__VLS_unwrap(employees, {})),
}));
const __VLS_9 = __VLS_8({
    ...{ 'onEdit': {} },
    ...{ 'onDelete': {} },
    employees: (__VLS_unwrap(employees, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
const __VLS_13 = {
    /** @type {typeof __VLS_12.edit} */
    onEdit: (__VLS_unwrap(handleEdit, {})),
};
void __VLS_13;
const __VLS_14 = {
    /** @type {typeof __VLS_12.delete} */
    onDelete: (__VLS_unwrap(handleDelete, {})),
};
void __VLS_14;
var __VLS_10;
var __VLS_11;
const __VLS_15 = EmployeeFormDialog;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
    // @ts-ignore
    ...{ 'onSave': {} }, visible: (__VLS_unwrap(isDialogVisible, {})), initialData: (__VLS_unwrap(currentEmployee, {})), isEditing: (__VLS_unwrap(isEditing, {})),
}));
const __VLS_17 = __VLS_16({
    ...{ 'onSave': {} },
    visible: (__VLS_unwrap(isDialogVisible, {})),
    initialData: (__VLS_unwrap(currentEmployee, {})),
    isEditing: (__VLS_unwrap(isEditing, {})),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
let __VLS_20;
const __VLS_21 = {
    /** @type {typeof __VLS_20.save} */
    onSave: (__VLS_unwrap(handleSave, {})),
};
void __VLS_21;
var __VLS_18;
var __VLS_19;
let __VLS_22;
/** @ts-ignore @type { | typeof __VLS_components.ConfirmDialog} */
ConfirmDialog;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
// @ts-ignore
}));
const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
// @ts-ignore
[handleAdd, employees, handleEdit, handleDelete, isDialogVisible, currentEmployee, isEditing, handleSave,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
