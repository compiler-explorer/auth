import { IUserLinks } from "../interfaces";

export class UserLinksMock implements IUserLinks {
    private _list: string[];
    private _aliases: Map<string, string>;

    public constructor(public userId: string) {
        this._list = [];
        this._aliases = new Map<string, string>();
    }

    public async add(linkId: string): Promise<void> {
        if (!this._list.includes(linkId))
            this._list.push(linkId);
    }

    public async delete(linkId: string): Promise<void> {
        if (this._list.includes(linkId))
            this._list = this._list.filter((link) => linkId !== link);

        // todo: probably also remove from aliases
    }

    public async list(): Promise<string[]> {
        return this._list;
    }

    public async name(customName: string, linkId: string): Promise<void> {
        if (this._list.includes(linkId)) {
            this._aliases.set(customName, linkId);
        } else {
            throw new Error('Link is not yours');
        }
    }

    public async getNamed(customName: string): Promise<string> {
        const result: string = await this._aliases.get(customName);
        if (result === undefined) {
            throw new Error('No such named link');
        }

        return result;
    }
}
