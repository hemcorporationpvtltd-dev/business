// lib/shopify.ts

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch({ query, variables = {} }: { query: string; variables?: any }) {
  const endpoint = `https://${domain}/api/2026-07/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken || '',
      },
      body: JSON.stringify({ query, variables }),
    });

    const body = await result.json();

    if (body.errors) {
      console.error(body.errors);
      throw new Error('Error fetching data from Shopify');
    }

    return body.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// प्रोडक्ट्स की लिस्ट फेच करने का फंक्शन
export async function getProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  return response.products.edges ? response.products.edges.map((edge: any) => edge.node) : [];
}