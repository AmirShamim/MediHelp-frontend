# MediHelp Frontend

MediHelp is a medical document assistant that summarizes prescriptions and health reports into patient-friendly guidance, with multi-language support.

## Development

Prerequisites: Node 18+

Install dependencies and run the dev server:

```pwsh
cd "frontend/MediHelp"
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Pages & Routes

- `/` Home: Landing page with app overview and calls-to-action.
- `/summarize`: Upload a prescription or health report, choose document type and language, and generate a summary.
- `/history`: Local history of recent summaries (stored in browser `localStorage`).
- `/about`: About the app.
- `/help`: How it works and tips.

## API
The frontend calls the backend at `VITE_API_URL` (default `http://localhost:5000/api`).

Endpoint used: `POST /api/summarize`

Form fields:
- `document` (file) – image or PDF
- `documentType` (string) – `prescription` or `healthReport`
- `language` (string) – e.g., `en`, `hi`, `ta`

## Styling
Tailwind CSS via the Vite plugin. Additional small utility classes are defined in `src/index.css`.


Main background colors light shade of blue
