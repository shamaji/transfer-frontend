import { serializeAs, deserializeAs } from 'cerialize';

export class Transfer {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: string;

    @serializeAs('slipNumber')
    @deserializeAs('slipNumber')
    private _slipNumber: number;

    @serializeAs('accountHolderName')
    @deserializeAs('accountHolderName')
    private _accountHolderName: string;

    @serializeAs('idOfBank')
    @deserializeAs('idOfBank')
    private _idOfBank: string;

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

    @serializeAs('idOfStatus')
    @deserializeAs('idOfStatus')
    private _idOfStatus: string;

    @serializeAs('commission')
    @deserializeAs('commission')
    private _commission: number;

    @serializeAs('transferDate')
    @deserializeAs('transferDate')
    private _transferDate: Date;

    @serializeAs('bank')
    @deserializeAs('bank')
    private _bank: any;

    @serializeAs('status')
    @deserializeAs('status')
    private _status: any;

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get slipNumber(): number {
        return this._slipNumber;
    }
    public set slipNumber(value: number) {
        this._slipNumber = value;
    }

    public get accountHolderName(): string {
        return this._accountHolderName;
    }
    public set accountHolderName(value: string) {
        this._accountHolderName = value;
    }

    public get idOfBank(): string {
        return this._idOfBank;
    }
    public set idOfBank(value: string) {
        this._idOfBank = value;
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

    public get idOfStatus(): string {
        return this._idOfStatus;
    }
    public set idOfStatus(value: string) {
        this._idOfStatus = value;
    }

    public get transferDate(): Date {
        return this._transferDate;
    }
    public set transferDate(value: Date) {
        this._transferDate = value;
    }

    public get bank(): any {
        return this._bank;
    }
    public set bank(value: any) {
        this._bank = value;
    }

    public get status(): any {
        return this._status;
    }
    public set status(value: any) {
        this._status = value;
    }

}
