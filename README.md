# Outlook Luxuries — Complete Shopify Theme

A single Shopify Online Store 2.0 codebase for a premium multi-brand fragrance store focused on **Perfumes + Attars**.

The project is designed for **VS Code + GitHub + Shopify CLI**. It replaces the earlier V1/V2/V3 ZIP workflow with one master codebase.

## Included storefront

### Global experience
- Sticky premium header
- Desktop mega menus for Perfumes, Attars and Brands
- Mobile slide-out navigation with accordions
- Search, account and cart actions
- AJAX quick add
- AJAX product add-to-cart
- Cart drawer
- Cart page quantity controls
- Announcement bar
- Responsive footer
- Accessible skip link and keyboard Escape handling
- Mobile filter drawer
- Site toast notifications

### Home
- Hero
- Perfume + Attar category cards
- Featured brand grid
- Bestseller product grid
- Fragrance notes grid
- Editorial feature split
- New arrivals
- Testimonials
- Newsletter

### Discovery
- Perfumes landing page
- Attars landing page
- Master Brands directory
- A–Z brand navigation
- Collection directory
- Generic page templates
- Offers page template

### Commerce
- Collection product listing
- Shopify filters + price filter
- Sorting
- Pagination
- Product media gallery
- Product variants
- Quantity selector
- Dynamic checkout option
- Product detail accordions
- Related products
- Search results + pagination
- Cart page
- Cart drawer
- Gift card page

### Content
- Contact page
- FAQ page
- About
- Shipping
- Returns
- Privacy
- Terms
- Blog index
- Article page
- 404 page
- Password page

### Customer accounts
- Login
- Register
- Recover password
- Reset password
- Activate account
- Account dashboard
- Order history
- Order detail
- Addresses

## Shopify setup

1. Upload/connect this theme from GitHub or upload the ZIP.
2. Create the Pages listed in `docs/BUILD-MANIFEST.md` and assign their templates.
3. Create one Shopify collection per fragrance brand.
4. Connect Brand Directory blocks to those collections.
5. Add real products, imagery, pricing, variants and descriptions.
6. Configure Shopify Navigation menus for the Header.
7. Configure Shopify Search & Discovery filters if required.
8. Add your legal/contact copy and store details.
9. Test checkout, customer accounts, search, filters and mobile navigation before publishing.

## VS Code

Open the extracted project root directly:

```text
outlook-luxuries-complete/
├── assets/
├── config/
├── docs/
├── layout/
├── locales/
├── sections/
├── snippets/
├── templates/
├── .gitignore
├── .shopifyignore
├── .theme-check.yml
└── README.md
```

## Git

Recommended:

```text
main         = stable production
          ↑
development  = active development
          ↑
feature/*    = individual features
```

Typical flow:

```bash
git checkout development
git pull
git checkout -b feature/my-change
# edit in VS Code
git add .
git commit -m "Describe the change"
git checkout development
git merge feature/my-change
git push origin development
```

## Shopify CLI

```bash
shopify theme check
shopify theme dev --store YOUR-STORE.myshopify.com
```

Keep credentials out of Git. Do not commit `.env` or store secrets.

## Important

This is a code-complete storefront foundation, not a product/content import. Real brand names, product images, pricing, collections, policies, menus, contact details and shipping settings must be configured in your Shopify admin.

See `docs/BUILD-MANIFEST.md` and `docs/STORE-ARCHITECTURE.md` for the full setup map.
