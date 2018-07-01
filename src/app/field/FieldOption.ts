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
