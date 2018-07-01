export class ResponseField {
    id: number;
    responseId: number;
    fieldId: number;
    value: string;

    constructor(id: number, responseId: number, fieldId: number, value: string) {
        this.id = id;
        this.responseId = responseId;
        this.fieldId = fieldId;
        this.value = value;
    }
}
