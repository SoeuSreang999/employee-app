import type { Employee } from '../../types/employee';
type __VLS_Props = {
    initialData: Employee | null;
    isEditing: boolean;
};
type __VLS_ModelProps = {
    'visible'?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:visible": (value: boolean | undefined) => any;
} & {
    save: (data: Omit<Employee, "id">) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:visible"?: ((value: boolean | undefined) => any) | undefined;
    onSave?: ((data: Omit<Employee, "id">) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
