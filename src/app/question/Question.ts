export class Response1 {
    id: number;
    userId: number;
    responseFields: ResponseField[];

    constructor(id: number, userId: number, responseFields: ResponseField[]) {
        this.id = id;
        this.userId = userId;
        this.responseFields = responseFields;
    }
}

 // response to fields
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
