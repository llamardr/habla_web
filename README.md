This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Estudio Abierto Leads

The Estudio Abierto report form posts to `app/api/estudio-abierto-leads/route.js`.
It appends validated leads to a Google Sheet before allowing the PDF download.

Create a Google Sheet with a tab named `Leads` and these headers in row 1:

```text
timestamp | nombre | compania | rubro | rol | telefono | correo | fuente | user_agent
```

Configure these environment variables locally and in Vercel:

```bash
ESTUDIO_ABIERTO_SHEET_ID=
ESTUDIO_ABIERTO_SHEET_NAME=Leads
GOOGLE_SERVICE_ACCOUNT_JSON=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
```

Service account requirements:

- Enable the Google Sheets API in the Google Cloud project that owns the service
  account.
- Create a service account key. Configure either `GOOGLE_SERVICE_ACCOUNT_JSON`
  with the full JSON key value, or copy only `client_email` and `private_key`
  into `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`.
  Do not commit the JSON key file or a populated `.env` file.
- Share the target Google Sheet with the service account email as editor.
- `ESTUDIO_ABIERTO_SHEET_NAME` defaults to `Leads` in the route if unset.
- Store private keys with escaped newlines (`\n`) if the hosting provider
  requires a single-line value.
