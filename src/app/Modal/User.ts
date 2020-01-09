import { serializeAs, deserializeAs } from 'cerialize';

export class User {

    @serializeAs('id')
    @deserializeAs('id')
    private _id: string;

    @serializeAs('firstName')
    @deserializeAs('firstName')
    private _firstName: string;


    /**
     * Getter id
     * @return {string}
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Getter firstName
     * @return {string}
     */
    public get firstName(): string {
        return this._firstName;
    }

    /**
     * Setter id
     * @param {string} value
     */
    public set id(value: string) {
        this._id = value;
    }

    /**
     * Setter firstName
     * @param {string} value
     */
    public set firstName(value: string) {
        this._firstName = value;
    }

}
