const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details handler', () => {
  test('content is an array of text blocks', async () => {
    const out = await handler({ name: 'Pantofi alergare Hoka Cielo X1 3.0' });
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('"Tell me more about the Hoka Cielo X1 3.0" returns product details', async () => {
    const out = await handler({ name: 'Pantofi alergare Hoka Cielo X1 3.0' });
    expect(out.content[0].text.length).toBeGreaterThan(0);
    expect(out.content[0].text).toMatch(/Hoka Cielo X1 3\.0/);
    expect(out.structuredContent).toBeDefined();
    expect(out.structuredContent.name).toBe('Pantofi alergare Hoka Cielo X1 3.0');
    expect(out.structuredContent.price).toBe('1.215,50 Lei');
  });

  test('structuredContent is a flat plain object, not a bare array', async () => {
    const out = await handler({ name: 'Pantofi alergare Hoka Cielo X1 3.0' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
    expect(out.structuredContent).toHaveProperty('image_url');
    expect(out.structuredContent).toHaveProperty('category');
  });

  test('matches a product by partial name', async () => {
    const out = await handler({ name: 'Garmin Quatix 8' });
    expect(out.structuredContent.name).toBe('Ceas Garmin Quatix 8 Pro AMOLED - 47 mm');
  });

  test('returns error message when required name is missing', async () => {
    const out = await handler({});
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0].text).toMatch(/name|provide/i);
    expect(out.structuredContent).toBeUndefined();
  });

  test('unknown product returns not-found message and no structuredContent', async () => {
    const out = await handler({ name: 'Nonexistent Product 9999' });
    expect(out.content[0].text).toMatch(/no product found/i);
    expect(out.structuredContent).toBeUndefined();
  });
});
