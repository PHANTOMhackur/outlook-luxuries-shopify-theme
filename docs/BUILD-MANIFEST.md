# Outlook Luxuries — Complete Theme Manifest

This folder is the single working Shopify Online Store 2.0 theme for VS Code + GitHub.

## Core storefront routes

- `/` — Home
- `/pages/perfumes` — Perfume brand directory and fragrance landing
- `/pages/attars` — Attar brand directory and fragrance landing
- `/pages/brands` — Master brand directory
- `/collections` — Collection directory
- `/collections/<handle>` — Brand/category product collection
- `/products/<handle>` — Product detail
- `/search` — Search
- `/cart` — Cart
- `/pages/contact` — Contact
- `/pages/faq` — FAQ
- `/blogs/<blog>` — Blog index
- `/blogs/<blog>/<article>` — Article
- `/account` — Customer account
- `/account/login` — Login
- `/account/register` — Register
- `/account/recover` — Password recovery
- `/account/reset/<token>` — Password reset
- `/account/activate/<token>` — Account activation
- `/account/orders/<id>` — Order detail
- `/account/addresses` — Addresses
- `/404` — Not found
- `/password` — Password page
- `/gift_cards/<code>` — Gift card page

## Page templates to assign in Shopify

Create Pages with these handles and choose the matching template:

| Page | Handle | Template |
|---|---|---|
| Perfumes | `perfumes` | `page.perfumes` |
| Attars | `attars` | `page.attars` |
| Brands | `brands` | `page.brands` |
| Contact | `contact` | `page.contact` |
| FAQ | `faq` | `page.faq` |
| About | `about` | `page.about` |
| Shipping | `shipping` | `page.shipping` |
| Returns | `returns` | `page.returns` |
| Privacy | `privacy` | `page.privacy` |
| Terms | `terms` | `page.terms` |
| Offers | `offers` | `page.offers` |

## Data model

Create one Shopify collection per fragrance brand. Brand directory blocks accept a collection picker, so clicking a brand can lead directly to `/collections/<brand-handle>`.

Products should carry vendor, title, price, images and variants. Optional custom metafields used by the theme include:

- `custom.fragrance_family`
- `custom.fragrance_notes`
- `custom.concentration`

## Navigation

Set Shopify Navigation menus for desktop and mobile. The Header section supports separate menu pickers and includes premium mega menus for Perfumes, Attars and Brands.

## GitHub workflow

Use `development` as the working branch and `main` as the stable branch. Feature branches can be merged into development before release.

```text
feature/* → development → test → main → production
```

## Shopify CLI

```bash
shopify theme check
shopify theme dev --store YOUR-STORE.myshopify.com
```

Before publishing, configure products, collections, navigation, legal pages, customer accounts and store settings inside Shopify.
