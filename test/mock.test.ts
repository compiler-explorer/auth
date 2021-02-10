import { IUserLinks } from "../src/interfaces";
import { UserLinksMock } from "../src/mocks/userlinks";

describe('Mock UserLinks', () => {
    it('Basic add/remove links', async () => {
        const links: IUserLinks = new UserLinksMock('123');
        await links.add('abcd1234');

        let newlist: string[] = await links.list();
        expect(newlist.length).toBe(1);
        expect(newlist[0]).toBe('abcd1234');

        await links.add('hello');
        newlist = await links.list();
        expect(newlist.length).toBe(2);
        expect(newlist).toContain('abcd1234');
        expect(newlist).toContain('hello');

        await links.delete('abcd1234');
        newlist = await links.list();
        expect(newlist.length).toBe(1);
        expect(newlist).toContain('hello');
    });

    it('Naming links', async () => {
        const links: IUserLinks = new UserLinksMock('123');
        await links.add('abcd1234');

        await expect(links.name('spaceship', 'abcd')).rejects.toThrow();

        await links.name('spaceship', 'abcd1234');

        await expect(links.getNamed('shippyship')).rejects.toThrow();

        expect(await links.getNamed('spaceship')).toBe('abcd1234');
    });
});
