# World Cup 2026 Dashboard

Live scores, group standings, and match schedule for the 2026 FIFA World Cup.

## Architecture

```
worldcup26.ir API → Next.js Server Components → Vercel Edge Network → User
```

Data flows from the free World Cup 2026 API through Next.js server components that fetch and cache responses every 60 seconds. The app deploys to Vercel via a GitHub Actions CI/CD pipeline that also validates the Docker build on every push.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Containerization**: Docker (multi-stage build)
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel
- **Data Source**: [worldcup26.ir](https://worldcup26.ir) (no auth required)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker

Build and run the production container:

```bash
docker build -t worldcup-dashboard .
docker run -p 3000:3000 worldcup-dashboard
```

The multi-stage build produces a standalone image under 200MB.

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

| Variable | Required | Description |
|----------|----------|-------------|
| `AWS_ACCESS_KEY_ID` | Secret Mission only | AWS access key for Bedrock |
| `AWS_SECRET_ACCESS_KEY` | Secret Mission only | AWS secret key for Bedrock |
| `AWS_REGION` | Secret Mission only | AWS region (default: us-east-1) |

## Deployment

This project deploys automatically via GitHub Actions on every push to `main`:

1. Installs dependencies and runs ESLint
2. Verifies the Docker build
3. Builds and deploys to Vercel using the prebuilt deployment method

Required GitHub repository secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Screenshots

<!-- Add screenshots of your live dashboard here -->