import { deserializeAs } from 'cerialize';
export class PaginationResponse {

    private _startPos: number; // used to display start and end range
    private _endPos: number; // used to display start and end range

    private _pageArray: Array<Object> = new Array<Object>(); // dropdown


    @deserializeAs('totalElements')
    private _totalElements: number;
    @deserializeAs('totalPages')
    private _totalPages: number;
    @deserializeAs('pageable')
    private _pageable: object;
    @deserializeAs('first')
    private _first: boolean;
    @deserializeAs('last')
    private _last: boolean;
    @deserializeAs('size')
    private _size: string;
    @deserializeAs('content')
    private _content: Array<object>;
    @deserializeAs('numberOfElements')
    private _numberOfElements: number;

    constructor() {
        this.pageArray = new Array<Object>();
    }


    /**
     * Getter totalElements
     * @return {number}
     */
    public get totalElements(): number {
        return this._totalElements;
    }

    /**
     * Getter totalPages
     * @return {number}
     */
    public get totalPages(): number {
        return this._totalPages;
    }

    /**
     * Getter pageable
     * @return {object}
     */
    public get pageable(): object {
        return this._pageable;
    }

    /**
     * Getter first
     * @return {boolean}
     */
    public get first(): boolean {
        return this._first;
    }

    /**
     * Getter last
     * @return {boolean}
     */
    public get last(): boolean {
        return this._last;
    }

    /**
     * Getter content
     * @return {Array<object>}
     */
    public get content(): Array<object> {
        return this._content;
    }

    /**
     * Setter totalElements
     * @param {number} value
     */
    public set totalElements(value: number) {
        this._totalElements = value;
    }

    /**
     * Setter totalPages
     * @param {number} value
     */
    public set totalPages(value: number) {
        this._totalPages = value;
    }

    /**
     * Setter pageable
     * @param {object} value
     */
    public set pageable(value: object) {
        this._pageable = value;
    }

    /**
     * Setter first
     * @param {boolean} value
     */
    public set first(value: boolean) {
        this._first = value;
    }

    /**
     * Setter last
     * @param {boolean} value
     */
    public set last(value: boolean) {
        this._last = value;
    }

    /**
     * Setter content
     * @param {Array<object>} value
     */
    public set content(value: Array<object>) {
        this._content = value;
    }

    /**
     * Getter pageArray
     * @return {Array<Object>}
     */
    public get pageArray(): Array<Object> {
        return this._pageArray;
    }

    /**
     * Setter pageArray
     * @param {Array<Object>} value
     */
    public set pageArray(value: Array<Object>) {
        this._pageArray = value;
    }

    /**
     * Getter startPos
     * @return {number}
     */
    public get startPos(): number {
        return this._startPos;
    }

    /**
     * Getter endPos
     * @return {number}
     */
    public get endPos(): number {
        return this._endPos;
    }

    /**
     * Setter startPos
     * @param {number} value
     */
    public set startPos(value: number) {
        this._startPos = value;
    }

    /**
     * Setter endPos
     * @param {number} value
     */
    public set endPos(value: number) {
        this._endPos = value;
    }

    /**
     * Getter size
     * @return {string}
     */
    public get size(): string {
        return this._size;
    }

    /**
     * Setter size
     * @param {string} value
     */
    public set size(value: string) {
        this._size = value;
    }

    /**
     * Getter numberOfElements
     * @return {number}
     */
    public get numberOfElements(): number {
        return this._numberOfElements;
    }

    /**
     * Setter numberOfElements
     * @param {number} value
     */
    public set numberOfElements(value: number) {
        this._numberOfElements = value;
    }

}
