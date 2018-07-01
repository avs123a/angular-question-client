export class Field {
    id: number;
    label: string;
    type: FieldType;
    options: FieldOption[];
    required: boolean;
    active: boolean;

    constructor(id: number, label: string, type: FieldType, options: FieldOption[], required: boolean, active: boolean) {
        this.id = id;
        this.label = label;
        this.type = type;
        this.options = options;
        this.required = required;
        this.active = active;
    }
}

  // field options
export class FieldOption {
    id: number;
    fieldId: number;
    value: string;

    constructor(id: number, fieldId: number, value: string) {
        this.id = id;
        this.fieldId = fieldId;
        this.value = value;
    }
}

  // type enum
export enum FieldType {
    Singleline = 'SINGLELINE',
    Multiline = 'MULTILINE',
    Radiobutton = 'RADIOBUTTON',
    Checkbox = 'CHECKBOX',
    Combobox = 'COMBOBOX',
    Date1 = 'DATE'
}
