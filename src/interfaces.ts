export interface IUserLinks {
    add(linkId: string): Promise<void>;
    delete(linkId: string): Promise<void>;
    list(): Promise<string[]>;
    name(customName: string, linkId: string): Promise<void>;
    getNamed(customName: string): Promise<string>;
}
