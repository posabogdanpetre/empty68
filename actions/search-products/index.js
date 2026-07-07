// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Pantofi alergare barbati Puma x Hyrox Deviate Nitro Elite 4 SS 2026',
        price: '1.000,00 Lei',
        category: 'Running Shoes',
        image_url: 'https://media.sportguru.ro/media/catalog/product/p/u/puma-x-hyrox-deviate-nitro_-elit.jpg?width=304&height=219&store=default&image-type=small_image'
    },
    {
        name: 'Bicicleta sosea Cube Attain Pro 28" 2026',
        price: '5.150,00 Lei',
        category: 'Bikes',
        image_url: 'https://media.sportguru.ro/media/catalog/product/b/i/bicicleta-cube-attain-pro-nautica-prism-2026-50-cm_362415_1_1756962404.jpg?width=304&height=219&store=default&image-type=small_image'
    },
    {
        name: 'Pantofi alergare Hoka Cielo X1 3.0',
        price: '1.215,50 Lei',
        category: 'Running Shoes',
        image_url: 'https://media.sportguru.ro/media/catalog/product/1/1/1171927-nyz_1.jpg?width=304&height=219&store=default&image-type=small_image'
    },
    {
        name: 'Pantofi trekking dama La Sportiva TX5 Low GTX',
        price: '753,00 Lei',
        category: 'Outdoor Footwear',
        image_url: 'https://media.sportguru.ro/media/catalog/product/z/f/zfhs042_g09p02_02_zfhs042g09p0236-photoroom_7.jpg?width=304&height=219&store=default&image-type=small_image'
    },
    {
        name: 'Ceas Garmin Quatix 8 Pro AMOLED - 47 mm',
        price: '5.899,00 Lei',
        category: 'Sport Watches',
        image_url: 'https://media.sportguru.ro/media/catalog/product/c/1/c18cd661-b6b1-4283-9792-5512d4e8b8b7.jpg?width=304&height=219&store=default&image-type=small_image'
    },
    {
        name: 'Casca ciclism POC Cytal',
        price: '960,00 Lei',
        category: 'Cycling Accessories',
        image_url: 'https://media.sportguru.ro/media/catalog/product/p/o/poc_10814_cytal_1231-4-photoroom.jpg?width=304&height=219&store=default&image-type=small_image'
    },
    {
        name: 'Casti audio Shokz OpenDots One',
        price: '980,87 Lei',
        category: 'Audio',
        image_url: 'https://media.sportguru.ro/media/catalog/product/o/p/opendos-one-black.jpg?width=304&height=219&store=default&image-type=small_image'
    }
]

module.exports = async ({ query = '', category = '' }) => {
    const q = typeof query === 'string' ? query.trim().toLowerCase() : ''
    const cat = typeof category === 'string' ? category.trim() : ''

    const results = MOCK_DATA.filter((item) => {
        if (cat && item.category !== cat) return false
        if (q && !item.name.toLowerCase().includes(q)) return false
        return true
    })

    let summary
    if (results.length === 0) {
        summary = `No products found${q ? ` matching "${query.trim()}"` : ''}${cat ? ` in category "${cat}"` : ''}.`
    } else {
        const where = cat ? ` in ${cat}` : ''
        const matching = q ? ` matching "${query.trim()}"` : ''
        summary = `Found ${results.length} product${results.length === 1 ? '' : 's'}${matching}${where}.`
    }

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.products — derived from action name "search_products" (bare array outputSchema rule)
        structuredContent: { products: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?query=${query}&category=${category}
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
 *     `${process.env.API_BASE_URL}/products?query=${encodeURIComponent(query)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
