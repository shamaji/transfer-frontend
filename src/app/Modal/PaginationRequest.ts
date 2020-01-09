

export class PaginationRequest {

    private _sortOrder: string;
    private _sortColumn: string;
    private _searchText: string;
    private _classForUpDown: string;
    private _pageNumber: string;
    private _noOfRecords: string;
    private _noOfRecordPerPageArray: Array<Object>;
    private _noOfRecordPerPageArrayAdmin: Array<Object>;  // dropdown
    private _minimumPerPage: number;


    constructor() {
        this.pageNumber = '1';
        this.noOfRecords = '5'; // 5
        this.sortOrder = 'd';
        // this.sortColumn = UtilsService.DEFAULT_SORT_COLUMN;
        this.classForUpDown = 'shorting ti-arrow-down';
        this.noOfRecordPerPageArray = [
            {
                'id': '5',
                'name': '5 Per Page'
            },
            {
                'id': '10',
                'name': '10 Per Page'
            },
            {
                'id': '20',
                'name': '20 Per Page'
            },
            {
                'id': '30',
                'name': '30 Per Page'
            },
            {
                'id': '50',
                'name': '50 Per Page'
            }
        ];
        this.noOfRecordPerPageArrayAdmin = [
            {
                'id': '20',
                'name': '20 Per Page'
            },
            {
                'id': '100',
                'name': '100 Per Page'
            }
        ];
        this.minimumPerPage = this.noOfRecordPerPageArray[0]['id'];
    }


    /**
     * Getter sortOrder
     * @return {string}
     */
    public get sortOrder(): string {
        return this._sortOrder;
    }

    /**
     * Getter sortColumn
     * @return {string}
     */
    public get sortColumn(): string {
        return this._sortColumn;
    }

    /**
     * Getter searchText
     * @return {string}
     */
    public get searchText(): string {
        return this._searchText;
    }

    /**
     * Getter classForUpDown
     * @return {string}
     */
    public get classForUpDown(): string {
        return this._classForUpDown;
    }

    /**
     * Getter pageNumber
     * @return {string}
     */
    public get pageNumber(): string {
        return this._pageNumber;
    }

    /**
     * Getter noOfRecords
     * @return {string}
     */
    public get noOfRecords(): string {
        return this._noOfRecords;
    }

    /**
     * Getter noOfRecordPerPageArray
     * @return {Array<Object>}
     */
    public get noOfRecordPerPageArray(): Array<Object> {
        return this._noOfRecordPerPageArray;
    }

    /**
     * Getter minimumPerPage
     * @return {number}
     */
    public get minimumPerPage(): number {
        return this._minimumPerPage;
    }

    /**
     * Setter sortOrder
     * @param {string} value
     */
    public set sortOrder(value: string) {
        this._sortOrder = value;
    }

    /**
     * Setter sortColumn
     * @param {string} value
     */
    public set sortColumn(value: string) {
        this._sortColumn = value;
    }

    /**
     * Setter searchText
     * @param {string} value
     */
    public set searchText(value: string) {
        this._searchText = value;
    }

    /**
     * Setter classForUpDown
     * @param {string}
     */
    public set classForUpDown(value: string) {
        this._classForUpDown = value;
    }

    /**
     * Setter pageNumber
     * @param {string} value
     */
    public set pageNumber(value: string) {
        this._pageNumber = value;
    }

    /**
     * Setter noOfRecords
     * @param {string} value
     */
    public set noOfRecords(value: string) {
        this._noOfRecords = value;
    }

    /**
     * Setter noOfRecordPerPageArray
     * @param {Array<Object>} value
     */
    public set noOfRecordPerPageArray(value: Array<Object>) {
        this._noOfRecordPerPageArray = value;
    }

    /**
     * Setter minimumPerPage
     * @param {number} value
     */
    public set minimumPerPage(value: number) {
        this._minimumPerPage = value;
    }


    /**
     * Getter noOfRecordPerPageArrayAdmin
     * @return {Array<Object>}
     */
    public get noOfRecordPerPageArrayAdmin(): Array<Object> {
        return this._noOfRecordPerPageArrayAdmin;
    }

    /**
     * Setter noOfRecordPerPageArrayAdmin
     * @param {Array<Object>} value
     */
    public set noOfRecordPerPageArrayAdmin(value: Array<Object>) {
        this._noOfRecordPerPageArrayAdmin = value;
    }

}
