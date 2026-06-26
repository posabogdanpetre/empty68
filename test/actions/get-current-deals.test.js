const handler = require('../../actions/get-current-deals/index.js');

describe('get_current_deals handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({});
        expect(out).toHaveProperty('content');
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"What promotions are available right now?" returns current deals', async () => {
        const out = await handler({});
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent.deals.length).toBeGreaterThan(0);
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({});
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
        expect(Array.isArray(out.structuredContent.deals)).toBe(true);
    });

    test('every returned item is an active deal', async () => {
        const out = await handler({});
        expect(out.structuredContent.deals.every((d) => d.is_deal === true)).toBe(true);
    });

    test('filters by category', async () => {
        const out = await handler({ category: 'Running Shoes' });
        const { deals } = out.structuredContent;
        expect(deals.length).toBeGreaterThan(0);
        expect(deals.every((d) => d.category === 'Running Shoes')).toBe(true);
    });

    test('unknown category returns no deals', async () => {
        const out = await handler({ category: 'Nonexistent Category' });
        expect(out.structuredContent.deals).toHaveLength(0);
        expect(out.content[0].text).toMatch(/0 current deal/i);
    });

    test('handles being called with no arguments', async () => {
        const out = await handler();
        expect(Array.isArray(out.content)).toBe(true);
        expect(Array.isArray(out.structuredContent.deals)).toBe(true);
    });
});
