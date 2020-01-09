import { serializeAs, deserializeAs } from 'cerialize';
export class ResponseWrapperDTO {

    @serializeAs('status')
    @deserializeAs('status')
    private _status: number;

    @serializeAs('message')
    @deserializeAs('message')
    private _message: string;

    @serializeAs('data')
    @deserializeAs('data')
    private _data: object;

    @serializeAs('error')
    @deserializeAs('error')
    private _error: string;

    @serializeAs('path')
    @deserializeAs('path')
    private _path: string;

    @serializeAs('isResponseOnPage')
    @deserializeAs('isResponseOnPage')
    private _isResponseOnPage: boolean;





    public get status(): number {
        return this._status;
    }

    public set status(value: number) {
        this._status = value;
    }


    public get message(): string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;
    }

    public get data(): object {
        return this._data;
    }


    public set data(value: object) {
        this._data = value;
    }

    public get error(): string {
        return this._error;
    }
    public set error(value: string) {
        this._error = value;
    }

    public get path(): string {
        return this._path;
    }
    public set path(value: string) {
        this._path = value;
    }

    public get isResponseOnPage(): boolean {
        return this._isResponseOnPage;
    }
    public set isResponseOnPage(value: boolean) {
        this._isResponseOnPage = value;
    }


}
