# Pollution Landing
This is the source code of the pollution landing page.

## Requirements
```
Bun: >=1.0.13  
Wrangler: >=3.16.0  
X: `>=0.1.0`
```

## Setup
```bash
x bloat
bun install
```

## Building

### Development
Run the following command to start the development server:
```bash
x dev
```

### Production
Run the following command to build and deploy the project:

```bash
x prod
bunx wrangler pages deploy ./dist/pollution-web --no-bundle --commit-dirty --project-name pollution
```