import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';
import { ref } from 'vue';
const { defineProps, defineEmits, } = {};
const __VLS_props = defineProps();
const emit = defineEmits();
const fillterData = ref({
    global: {
        value: null,
        matchMode: FilterMatchMode.CONTAINS
    }
});
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
__VLS_withDotValue(fillterData, {});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.DataTable | typeof __VLS_components.DataTable} */
DataTable;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    // @ts-ignore
    value: (__VLS_ctx.employees), filters: (fillterData.value), globalFilterFields: ([
        'name',
        'gender',
        'phone',
        'email',
        'position',
        'fullAddress'
    ]), paginator: true, rows: (10), rowsPerPageOptions: ([5, 10, 20]), tableStyle: "min-width: 50rem",
}));
const __VLS_2 = __VLS_1({
    value: (__VLS_ctx.employees),
    filters: (fillterData.value),
    globalFilterFields: ([
        'name',
        'gender',
        'phone',
        'email',
        'position',
        'fullAddress'
    ]),
    paginator: true,
    rows: (10),
    rowsPerPageOptions: ([5, 10, 20]),
    tableStyle: "min-width: 50rem",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_nonNull(__VLS_3.slots);
{
    const { header: __VLS_6 } = __VLS_nonNull(__VLS_3.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-end p-2 bg-white" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "relative flex items-center" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.i, __VLS_intrinsics.i)({
        ...{ class: "pi pi-search absolute left-3 text-slate-400 text-sm pointer-events-none z-10" },
    });
    /** @type {__VLS_StyleScopedClasses['pi']} */ ;
    /** @type {__VLS_StyleScopedClasses['pi-search']} */ ;
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-10']} */ ;
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.InputText} */
    InputText;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        // @ts-ignore
        modelValue: (fillterData.value.global.value), placeholder: "Search", ...{ style: {} }, ...{ class: "!text-sm !rounded-lg !border !border-slate-300 !bg-white !text-slate-700 placeholder:!text-slate-400 focus:!border-slate-400 focus:!ring-0 !shadow-none" },
    }));
    const __VLS_9 = __VLS_8({
        modelValue: (fillterData.value.global.value),
        placeholder: "Search",
        ...{ style: {} },
        ...{ class: "!text-sm !rounded-lg !border !border-slate-300 !bg-white !text-slate-700 placeholder:!text-slate-400 focus:!border-slate-400 focus:!ring-0 !shadow-none" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['!text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['!rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['!border']} */ ;
    /** @type {__VLS_StyleScopedClasses['!border-slate-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['!bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['!text-slate-700']} */ ;
    /** @type {__VLS_StyleScopedClasses['placeholder:!text-slate-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:!border-slate-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus:!ring-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['!shadow-none']} */ ;
    // @ts-ignore
    [employees, fillterData, fillterData,];
}
{
    const { empty: __VLS_12 } = __VLS_nonNull(__VLS_3.slots);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-8 text-gray-500 font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    // @ts-ignore
    [];
}
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.Column | typeof __VLS_components.Column} */
Column;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    // @ts-ignore
    field: "name", header: "Employee Name", headerClass: "text-nowrap", sortable: true,
}));
const __VLS_15 = __VLS_14({
    field: "name",
    header: "Employee Name",
    headerClass: "text-nowrap",
    sortable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.Column | typeof __VLS_components.Column} */
Column;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    // @ts-ignore
    field: "gender", header: "Gender",
}));
const __VLS_20 = __VLS_19({
    field: "gender",
    header: "Gender",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_23;
/** @ts-ignore @type { | typeof __VLS_components.Column | typeof __VLS_components.Column} */
Column;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    // @ts-ignore
    field: "phone", header: "Phone",
}));
const __VLS_25 = __VLS_24({
    field: "phone",
    header: "Phone",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_28;
/** @ts-ignore @type { | typeof __VLS_components.Column | typeof __VLS_components.Column} */
Column;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
    // @ts-ignore
    field: "email", header: "Email",
}));
const __VLS_30 = __VLS_29({
    field: "email",
    header: "Email",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_33;
/** @ts-ignore @type { | typeof __VLS_components.Column | typeof __VLS_components.Column} */
Column;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
    // @ts-ignore
    field: "position", header: "Position",
}));
const __VLS_35 = __VLS_34({
    field: "position",
    header: "Position",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
const { default: __VLS_38 } = __VLS_nonNull(__VLS_36.slots);
{
    const { body: __VLS_39 } = __VLS_nonNull(__VLS_36.slots);
    const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_39));
    let __VLS_40;
    /** @ts-ignore @type { | typeof __VLS_components.Tag} */
    Tag;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
        // @ts-ignore
        value: (data.position), severity: "info", ...{ class: "!rounded-lg !py-0 !px-2" },
    }));
    const __VLS_42 = __VLS_41({
        value: (data.position),
        severity: "info",
        ...{ class: "!rounded-lg !py-0 !px-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    /** @type {__VLS_StyleScopedClasses['!rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['!py-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['!px-2']} */ ;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_36;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.Column | typeof __VLS_components.Column} */
Column;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    // @ts-ignore
    field: "salary", header: "Salary",
}));
const __VLS_47 = __VLS_46({
    field: "salary",
    header: "Salary",
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_50 } = __VLS_nonNull(__VLS_48.slots);
{
    const { body: __VLS_51 } = __VLS_nonNull(__VLS_48.slots);
    const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_51));
    (data.salary ? data.salary.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00');
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_48;
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.Column | typeof __VLS_components.Column} */
Column;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    // @ts-ignore
    field: "fullAddress", header: "Address", ...{ class: "min-w-[250px]" },
}));
const __VLS_54 = __VLS_53({
    field: "fullAddress",
    header: "Address",
    ...{ class: "min-w-[250px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
/** @type {__VLS_StyleScopedClasses['min-w-[250px]']} */ ;
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.Column | typeof __VLS_components.Column} */
Column;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
    // @ts-ignore
    header: "Actions",
}));
const __VLS_59 = __VLS_58({
    header: "Actions",
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
const { default: __VLS_62 } = __VLS_nonNull(__VLS_60.slots);
{
    const { body: __VLS_63 } = __VLS_nonNull(__VLS_60.slots);
    const [{ data }] = __VLS_vSlot(__VLS_nonNull(__VLS_63));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    let __VLS_64;
    /** @ts-ignore @type { | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
        // @ts-ignore
        ...{ 'onClick': {} }, icon: "pi pi-pencil", text: true, rounded: true, severity: "secondary",
    }));
    const __VLS_66 = __VLS_65({
        ...{ 'onClick': {} },
        icon: "pi pi-pencil",
        text: true,
        rounded: true,
        severity: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    let __VLS_69;
    const __VLS_70 = {
        /** @type {typeof __VLS_69.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (__VLS_unwrap(emit, {})('edit', data));
            // @ts-ignore
            [emit,];
        },
    };
    void __VLS_70;
    var __VLS_67;
    var __VLS_68;
    let __VLS_71;
    /** @ts-ignore @type { | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
        // @ts-ignore
        ...{ 'onClick': {} }, icon: "pi pi-trash", text: true, rounded: true, severity: "danger",
    }));
    const __VLS_73 = __VLS_72({
        ...{ 'onClick': {} },
        icon: "pi pi-trash",
        text: true,
        rounded: true,
        severity: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    let __VLS_76;
    const __VLS_77 = {
        /** @type {typeof __VLS_76.click} */
        onClick: // @ts-ignore
        (...[$event]) => {
            void $event;
            return (__VLS_unwrap(emit, {})('delete', data));
            // @ts-ignore
            [emit,];
        },
    };
    void __VLS_77;
    var __VLS_74;
    var __VLS_75;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_60;
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
