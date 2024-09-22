## Environment

When running the project locally, please ensure you use the following environment:

- Node.js v20.16.0
- NPM 10.8.2

## Stack

- Next.js v14
- TypeScript
- TanStack Query v5
- Shadcn/ui
- Tailwind CSS

## Getting Started

First, you need to clone the project and install the dependencies by running the following command:

```bash
git clone git@github.com:kpogodev/pngme-frontend-challange.git
npm install
```

For your convenience, this time I have intentionally included the `.env.local.` file, which contains the Alpha Vantage API key. Make sure to remove the dot at the end: `.env.local.` -> `.env.local`

Then, you can run the project by running the following command:

```bash
npm run dev
```

## Additional Notes

- If you don't want to run the project locally, I have deployed it to my personal Vercel account, which you can find at: [link to production build](https://pngme-frontend-challange.vercel.app/)

- Short guide on folder structure:

```
root
├─ src
│ ├── app               # Next.js app router dir
│ │   ├── _components   # page specific components
│ │   ├── page.tsx      # homepage page
│ │   └──layout.tsx     # root layout
│ ├── components        # shared components / providers
│ ├── lib               # contains TanStack client
│ ├── services          # contains logic to interact with API
│ ├── styles            # tailwind and shadcn styles integration
│ ├── types             # contains API related types
│ └── utils             # contains helper function
├─ .env.local           # contains API key and API URL
├─ ...
```
