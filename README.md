# Outlook Luxuries — Unified Shopify Theme (VS Code / GitHub)

This is the **single merged codebase** for the Outlook Luxuries Shopify theme. It combines the cumulative work from V1, V2 and V3 into one project so development can continue in VS Code and GitHub instead of maintaining separate ZIP versions.

## What is included

### Global
- Announcement bar
- Responsive header
- Desktop mega menus for Perfumes, Attars and Brands
- Mobile slide-out navigation with accordions
- Search, account and cart links
- Cart count
- Responsive footer
- Product card snippet

### Homepage
- Hero banner
- Perfume / Attar category cards
- Brand grid
- Product grids
- Fragrance notes grid
- Editorial feature split
- Testimonials
- Newsletter

### Perfumes / Attars / Brands
- Category landing hero
- Brand directory
- A–Z brand navigation
- Buying guide
- Dedicated `page.perfumes.json`, `page.attars.json`, and `page.brands.json` templates

### Developer setup
- VS Code workspace settings
- Recommended Shopify/Liquid extensions
- Git-ready `.gitignore`
- Store architecture notes in `docs/`

## Theme structure

```text
assets/
config/
layout/
locales/
sections/
snippets/
templates/
.vscode/
docs/
```

## Shopify setup

1. Create a Shopify Page with handle `perfumes` and assign the `perfumes` template.
2. Create a Shopify Page with handle `attars` and assign the `attars` template.
3. Create a Shopify Page with handle `brands` and assign the `brands` template.
4. Create one Shopify collection for each fragrance brand.
5. Connect brand directory blocks to the appropriate collections.
6. Configure the Header section menus from Shopify Navigation.
7. Add your real product imagery, pricing, descriptions and fragrance details.

## Git workflow

```text
main          = stable / production
   ↑
development   = active store development
   ↑
feature/*     = individual features
```

Example:

```bash
git init
git add .
git commit -m "Initial Outlook Luxuries theme"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

git checkout -b development
```

## Shopify CLI

Use Shopify CLI for local theme development and validation. Typical commands include:

```bash
shopify theme check
shopify theme dev --store YOUR-STORE.myshopify.com
```

Do not commit store credentials or `.env` files.
