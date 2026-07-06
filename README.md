# World Cup 2026 Dashboard

Live scores, group standings, and match schedule for the 2026 FIFA World Cup.

## Architecture

```text
worldcup26.ir API → Next.js Server Components → Vercel Edge Network → User
```

Data flows from the free World Cup 2026 API through Next.js Server Components that fetch and cache responses every 60 seconds. The app deploys to Vercel via a GitHub Actions CI/CD pipeline that also validates the Docker build on every push.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Containerization:** Docker (multi-stage build)
- **CI/CD:** GitHub Actions
- **Hosting:** Vercel
- **AI:** AWS Bedrock (Anthropic Claude)
- **Data Source:** [worldcup26.ir](https://worldcup26.ir) (no authentication required)

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Docker

Build and run the production container:

```bash
docker build -t worldcup-dashboard .
docker run -p 3000:3000 worldcup-dashboard
```

The multi-stage build produces a standalone production image under 200MB.

## AWS Bedrock Setup (Secret Mission)

The optional AI-powered Match Insights feature uses AWS Bedrock to generate tactical summaries for completed matches.

### IAM Permissions

Use an IAM user with permission to invoke Bedrock models. For this project, attaching the following managed policy is sufficient:

- `AmazonBedrockFullAccess`

### Model Access

AWS now enables serverless Bedrock foundation models automatically in supported regions. If you're using Anthropic Claude models for the first time, you may be prompted to complete Anthropic's one-time use-case form from the Bedrock Model Catalog before invoking the model.

Use the **us-east-1 (N. Virginia)** region.

### Environment Variables

Create a `.env.local` file in the project root with:

```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AWS_ACCESS_KEY_ID` | Secret Mission only | IAM access key used to authenticate Bedrock requests |
| `AWS_SECRET_ACCESS_KEY` | Secret Mission only | IAM secret access key |
| `AWS_REGION` | Secret Mission only | AWS region (recommended: `us-east-1`) |

## Deployment

This project deploys automatically via GitHub Actions on every push to `main`.

The pipeline performs the following steps:

1. Install dependencies
2. Run ESLint
3. Verify the Docker build
4. Build the application
5. Deploy to Vercel

Required GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Screenshots

<!-- Add screenshots of your live dashboard here -->