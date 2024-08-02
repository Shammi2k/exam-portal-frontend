export class ProblemDetails {
    public title: string;
    public status: number;
    public detail: string;
    public instance: string;

    constructor(title: string, status: number, detail: string, instance: string) {
        this.title = title;
        this.status = status;
        this.detail = detail;
        this.instance = instance;
    }
}