// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
  {
    name: 'Pantofi alergare barbati Puma x Hyrox Deviate Nitro Elite 4 SS 2026',
    description: "Men's road running shoes from the Puma x Hyrox collection.",
    image_url: 'https://media.sportguru.ro/media/catalog/product/p/u/puma-x-hyrox-deviate-nitro_-elit.jpg?width=304&height=219&store=default&image-type=small_image',
    price: '1.000,00 Lei',
    category: 'Running Shoes',
    is_deal: true,
    original_price: '1.249,00 Lei',
    discount_percentage: '20% OFF',
  },
  {
    name: 'Bicicleta sosea Cube Attain Pro 28" 2026',
    description: 'Cube Attain Pro 28-inch road bike for road and track riding.',
    image_url: 'https://media.sportguru.ro/media/catalog/product/b/i/bicicleta-cube-attain-pro-nautica-prism-2026-50-cm_362415_1_1756962404.jpg?width=304&height=219&store=default&image-type=small_image',
    price: '5.150,00 Lei',
    category: 'Bikes',
  },
  {
    name: 'Pantofi alergare Hoka Cielo X1 3.0',
    description: 'Hoka Cielo X1 3.0 performance road running shoes.',
    image_url: 'https://media.sportguru.ro/media/catalog/product/1/1/1171927-nyz_1.jpg?width=304&height=219&store=default&image-type=small_image',
    price: '1.215,50 Lei',
    category: 'Running Shoes',
    is_deal: true,
    original_price: '1.430,00 Lei',
    discount_percentage: '15% OFF',
  },
  {
    name: 'Pantofi trekking dama La Sportiva TX5 Low GTX',
    description: "Women's La Sportiva TX5 Low GTX waterproof trekking shoes.",
    image_url: 'https://media.sportguru.ro/media/catalog/product/z/f/zfhs042_g09p02_02_zfhs042g09p0236-photoroom_7.jpg?width=304&height=219&store=default&image-type=small_image',
    price: '753,00 Lei',
    category: 'Outdoor Footwear',
    is_deal: true,
    original_price: '1.075,00 Lei',
    discount_percentage: '30% OFF',
  },
  {
    name: 'Ceas Garmin Quatix 8 Pro AMOLED - 47 mm',
    description: 'Garmin Quatix 8 Pro AMOLED 47 mm multisport and marine GPS watch.',
    image_url: 'https://media.sportguru.ro/media/catalog/product/c/1/c18cd661-b6b1-4283-9792-5512d4e8b8b7.jpg?width=304&height=219&store=default&image-type=small_image',
    price: '5.899,00 Lei',
    category: 'Sport Watches',
    is_deal: true,
    original_price: '6.539,00 Lei',
    discount_percentage: '10% OFF',
  },
  {
    name: 'Casca ciclism POC Cytal',
    description: 'POC Cytal road cycling helmet.',
    image_url: 'https://media.sportguru.ro/media/catalog/product/p/o/poc_10814_cytal_1231-4-photoroom.jpg?width=304&height=219&store=default&image-type=small_image',
    price: '960,00 Lei',
    category: 'Cycling Accessories',
    is_deal: true,
    original_price: '1.599,75 Lei',
    discount_percentage: '40% OFF',
  },
  {
    name: 'Casti audio Shokz OpenDots One',
    description: 'Shokz OpenDots One open-ear sport audio headphones.',
    image_url: 'https://media.sportguru.ro/media/catalog/product/o/p/opendos-one-black.jpg?width=304&height=219&store=default&image-type=small_image',
    price: '980,87 Lei',
    category: 'Audio',
    is_deal: true,
    original_price: '1.055,00 Lei',
    discount_percentage: '7% OFF',
  },
];

module.exports = async ({ name = '' }) => {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a product name to retrieve details for.' }],
    };
  }

  const query = name.trim().toLowerCase();
  let item = MOCK_DATA.find((p) => p.name.toLowerCase() === query);
  if (!item) {
    item = MOCK_DATA.find((p) => p.name.toLowerCase().includes(query));
  }

  if (!item) {
    return {
      content: [{ type: 'text', text: `No product found matching: ${name.trim()}` }],
    };
  }

  let summary = `${item.name} — ${item.price}`;
  if (item.original_price && item.original_price !== item.price) {
    summary += ` (was ${item.original_price}`;
    if (item.discount_percentage) summary += `, ${item.discount_percentage}`;
    summary += ')';
  }
  if (item.category) summary += ` · ${item.category}`;
  if (item.description) summary += `. ${item.description}`;

  return {
    content: [{ type: 'text', text: summary }],
    // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
    structuredContent: { ...item },
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
