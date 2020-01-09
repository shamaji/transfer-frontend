import { serializeAs, deserializeAs } from 'cerialize';

export class Transfer {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: string;

    @serializeAs('accountHolderName')
    @deserializeAs('accountHolderName')
    private _accountHolderName: string;

    @serializeAs('bankName')
    @deserializeAs('bankName')
    private _bankName: string;

    @serializeAs('accountNumber')
    @deserializeAs('accountNumber')
    private _accountNumber: string;

    @serializeAs('amount')
    @deserializeAs('amount')
    private _amount: number;

    @serializeAs('mobileNo')
    @deserializeAs('mobileNo')
    private _mobileNo: string;

    @serializeAs('pinNo')
    @deserializeAs('pinNo')
    private _pinNo: string;

    @serializeAs('commission')
    @deserializeAs('commission')
    private _commission: number;

    @serializeAs('transferDateTime')
    @deserializeAs('transferDateTime')
    private _transferDateTime: Date;

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get accountHolderName(): string {
        return this._accountHolderName;
    }
    public set accountHolderName(value: string) {
        this._accountHolderName = value;
    }

    public get bankName(): string {
        return this._bankName;
    }
    public set bankName(value: string) {
        this._bankName = value;
    }

    public get accountNumber(): string {
        return this._accountNumber;
    }
    public set accountNumber(value: string) {
        this._accountNumber = value;
    }

    public get amount(): number {
        return this._amount;
    }
    public set amount(value: number) {
        this._amount = value;
    }

    public get mobileNo(): string {
        return this._mobileNo;
    }
    public set mobileNo(value: string) {
        this._mobileNo = value;
    }

    public get pinNo(): string {
        return this._pinNo;
    }
    public set pinNo(value: string) {
        this._pinNo = value;
    }

    public get commission(): number {
        return this._commission;
    }
    public set commission(value: number) {
        this._commission = value;
    }

    public get transferDateTime(): Date {
        return this._transferDateTime;
    }
    public set transferDateTime(value: Date) {
        this._transferDateTime = value;
    }

}
