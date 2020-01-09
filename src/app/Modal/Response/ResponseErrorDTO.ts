import { ResponseWrapperDTO } from './ResponseWrapperDTO';
import { serializeAs, deserializeAs } from 'cerialize';

export class ResponseErrorDTO extends ResponseWrapperDTO {

    @serializeAs('errors')
    @deserializeAs('errors')
    private _errors: object;



    public get errors(): object {
        return this._errors;
    }


    public set errors(value: object) {
        this._errors = value;
    }



}
