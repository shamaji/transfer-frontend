import { serializeAs, deserializeAs } from 'cerialize';

export class LoginRequest {
    @serializeAs('userNameOrEmail')
    @deserializeAs('userNameOrEmail')
    private _userNameOrEmail: string;

    @serializeAs('password')
    @deserializeAs('password')
    private _password: string;

    @serializeAs('fcmToken')
    @deserializeAs('fcmToken')
    private _fcmToken: string;

    @serializeAs('isTracking')
    @deserializeAs('isTracking')
    private _isTracking: boolean;


    /**
     * Getter userNameOrEmail
     * @return {string}
     */
    public get userNameOrEmail(): string {
        return this._userNameOrEmail;
    }

    /**
     * Getter password
     * @return {string}
     */
    public get password(): string {
        return this._password;
    }

    /**
     * Getter fcmToken
     * @return {string}
     */
    public get fcmToken(): string {
        return this._fcmToken;
    }

    /**
     * Getter isTracking
     * @return {boolean}
     */
    public get isTracking(): boolean {
        return this._isTracking;
    }

    /**
     * Setter userNameOrEmail
     * @param {string} value
     */
    public set userNameOrEmail(value: string) {
        this._userNameOrEmail = value;
    }

    /**
     * Setter password
     * @param {string} value
     */
    public set password(value: string) {
        this._password = value;
    }

    /**
     * Setter fcmToken
     * @param {string} value
     */
    public set fcmToken(value: string) {
        this._fcmToken = value;
    }

    /**
     * Setter isTracking
     * @param {boolean} value
     */
    public set isTracking(value: boolean) {
        this._isTracking = value;
    }
}

