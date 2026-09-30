# Outlook Luxuries — Store Architecture

This package is the cumulative V1 + V2 + V3 codebase prepared as a single VS Code/Git project.

## Customer journey

Home → Perfumes → Brand directory → Brand collection → Product
Home → Attars → Brand directory → Brand collection → Product
Home → Brands → Brand directory → Brand collection

## Current sections

The `sections/` directory contains the merged section set from the previous theme versions, including the V3 header/mega-menu work and the V2 perfume landing-page sections.

## Development rule

Use one repository as the source of truth. Build changes on feature branches, merge into `development`, test there, then merge stable work into `main`.
