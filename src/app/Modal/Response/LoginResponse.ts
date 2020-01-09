import { serializeAs, deserializeAs } from 'cerialize';
import { User } from '../User';

export class LoginResponse {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: string;

    @serializeAs('partyname')
    @deserializeAs('partyname')
    private _partyname: string;

    @serializeAs('firstName')
    @deserializeAs('firstName')
    private _firstName: string;

    @serializeAs('lastName')
    @deserializeAs('lastName')
    private _lastName: string;

    @serializeAs('userName')
    @deserializeAs('userName')
    private _userName: string;

    @serializeAs('email')
    @deserializeAs('email')
    private _email: string;

    @serializeAs('isAdmin')
    @deserializeAs('isAdmin')
    private _isAdmin: boolean;

    @serializeAs('isSuperAdmin')
    @deserializeAs('isSuperAdmin')
    private _isSuperAdmin: boolean;

    @serializeAs('isAuthenticated')
    @deserializeAs('isAuthenticated')
    private _isAuthenticated: boolean;

    @serializeAs('isMigration')
    @deserializeAs('isMigration')
    private _isMigration: boolean;

    @serializeAs('isTutorialComplet')
    @deserializeAs('isTutorialComplet')
    private _isTutorialComplet: boolean;

    @serializeAs('migration')
    @deserializeAs('migration')
    private _migration: User;

    @serializeAs('token')
    @deserializeAs('token')
    private _token: string;

    @serializeAs('isCoordinator')
    @deserializeAs('isCoordinator')
    private _isCoordinator: boolean;

    @serializeAs('isShow')
    @deserializeAs('isShow')
    private _isShow: boolean;

    @serializeAs('isShowDataFilled')
    @deserializeAs('isShowDataFilled')
    private _isShowDataFilled: boolean;


    /**
     * Getter id
     * @return {string}
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Setter id
     * @param {string} value
     */
    public set id(value: string) {
        this._id = value;
    }

    /**
     * Getter partyname
     * @return {string}
     */
    public get partyname(): string {
        return this._partyname;
    }

    /**
     * Setter partyname
     * @param {string} value
     */
    public set partyname(value: string) {
        this._partyname = value;
    }

    /**
     * Getter firstName
     * @return {string}
     */
    public get firstName(): string {
        return this._firstName;
    }

    /**
     * Setter firstName
     * @param {string} value
     */
    public set firstName(value: string) {
        this._firstName = value;
    }

    /**
     * Getter lastName
     * @return {string}
     */
    public get lastName(): string {
        return this._lastName;
    }

    /**
     * Setter lastName
     * @param {string} value
     */
    public set lastName(value: string) {
        this._lastName = value;
    }

    /**
     * Getter userName
     * @return {string}
     */
    public get userName(): string {
        return this._userName;
    }

    /**
     * Setter userName
     * @param {string} value
     */
    public set userName(value: string) {
        this._userName = value;
    }

    /**
     * Getter email
     * @return {string}
     */
    public get email(): string {
        return this._email;
    }

    /**
     * Setter email
     * @param {string} value
     */
    public set email(value: string) {
        this._email = value;
    }

    /**
     * Getter isAdmin
     * @return {boolean}
     */
    public get isAdmin(): boolean {
        return this._isAdmin;
    }

    /**
     * Setter isAdmin
     * @param {boolean} value
     */
    public set isAdmin(value: boolean) {
        this._isAdmin = value;
    }

    /**
     * Getter isAuthenticated
     * @return {boolean}
     */
    public get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    /**
     * Setter isAuthenticated
     * @param {boolean} value
     */
    public set isAuthenticated(value: boolean) {
        this._isAuthenticated = value;
    }

    /**
     * Getter isMigration
     * @return {boolean}
     */
    public get isMigration(): boolean {
        return this._isMigration;
    }

    /**
     * Setter isMigration
     * @param {boolean} value
     */
    public set isMigration(value: boolean) {
        this._isMigration = value;
    }

    /**
     * Getter migration
     * @return {User}
     */
    public get migration(): User {
        return this._migration;
    }

    /**
     * Setter migration
     * @param {User} value
     */
    public set migration(value: User) {
        this._migration = value;
    }

    /**
     * Getter token
     * @return {string}
     */
    public get token(): string {
        return this._token;
    }

    /**
     * Setter token
     * @param {string} value
     */
    public set token(value: string) {
        this._token = value;
    }

    /**
     * Getter isCoordinator
     * @return {boolean}
     */
    public get isCoordinator(): boolean {
        return this._isCoordinator;
    }

    /**
     * Setter isCoordinator
     * @param {boolean} value
     */
    public set isCoordinator(value: boolean) {
        this._isCoordinator = value;
    }


    /**
     * Getter isSuperAdmin
     * @return {boolean}
     */
    public get isSuperAdmin(): boolean {
        return this._isSuperAdmin;
    }

    /**
     * Setter isSuperAdmin
     * @param {boolean} value
     */
    public set isSuperAdmin(value: boolean) {
        this._isSuperAdmin = value;
    }


    /**
     * Getter isTutorialComplet
     * @return {boolean}
     */
    public get isTutorialComplet(): boolean {
        return this._isTutorialComplet;
    }

    /**
     * Setter isTutorialComplet
     * @param {boolean} value
     */
    public set isTutorialComplet(value: boolean) {
        this._isTutorialComplet = value;
    }


    /**
     * Getter isShow
     * @return {boolean}
     */
    public get isShow(): boolean {
        return this._isShow;
    }

    /**
     * Getter isShowDataFilled
     * @return {boolean}
     */
    public get isShowDataFilled(): boolean {
        return this._isShowDataFilled;
    }

    /**
     * Setter isShow
     * @param {boolean} value
     */
    public set isShow(value: boolean) {
        this._isShow = value;
    }

    /**
     * Setter isShowDataFilled
     * @param {boolean} value
     */
    public set isShowDataFilled(value: boolean) {
        this._isShowDataFilled = value;
    }


}
