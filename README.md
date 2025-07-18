# PrepWise: AI-Powered Mock Interview Platform

PrepWise is an AI-powered platform designed to help users prepare for job interviews through personalized mock interview experiences and instant feedback. It leverages Google Gemini for AI question generation and Vapi.ai for real-time voice interviews.

## Features

*   **Personalized Interview Generation:**
    *   Generate interview questions tailored to a specific company, role, job description, and the candidate's resume content (analyzed by AI).
*   **Quick Interview Generation:**
    *   Generate general interview questions based on role, type (technical/behavioral/mixed), and experience level for quick practice.
*   **Real-time Voice Interviews:**
    *   Conduct mock interviews with an AI interviewer using Vapi.ai's voice capabilities.
*   **AI-Powered Feedback:**
    *   Receive detailed AI-generated feedback on interview performance, including overall score, category-specific scores, strengths, and areas for improvement.
*   **Dashboard:**
    *   View a history of past interviews and access feedback.
*   **User Authentication:**
    *   Basic user authentication (Firebase).

## Technologies Used

*   **Next.js 14 (App Router):** React framework for building full-stack web applications.
*   **React:** Frontend library for building user interfaces.
*   **Tailwind CSS:** Utility-first CSS framework for rapid styling.
*   **Shadcn/ui:** Reusable UI components built with Radix UI and Tailwind CSS.
*   **Firebase (Firestore & Auth):** Backend-as-a-Service for database and authentication.
*   **Google Gemini (via AI SDK):** AI model for generating interview questions and analyzing resumes.
*   **Vapi.ai:** API for building real-time voice AI assistants.
*   **Zod:** TypeScript-first schema declaration and validation library.
*   **Sonner:** A modern toast component for React.
*   **Day.js:** A minimalist JavaScript library for parsing, validating, manipulating, and formatting dates.
*   **Lucide React:** A collection of beautiful & consistent icons.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** (v18.x or higher recommended)
*   **npm** (comes with Node.js), **yarn**, or **pnpm**

You will also need accounts and API keys for the following services:

*   **Firebase Project:**
    *   Create a new project at [Firebase Console](https://console.firebase.google.com/).
    *   Enable **Firestore Database** and **Authentication**.
    *   Generate a **Service Account Key** (JSON file) for server-side access.
    *   Get your **Web App Configuration** for client-side access.
*   **Google Gemini API Key:**
    *   Obtain an API key from [Google AI Studio](https://aistudio.google.com/) or Google Cloud Console.
*   **Vapi.ai Account:**
    *   Sign up at [vapi.ai](https://vapi.ai/).
    *   Obtain your **Web Token**.
    *   Create a **Workflow** (e.g., a simple assistant) and get its **ID**. This will be used for the `interviewer` agent.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository (or create a new Next.js app)

If you haven't already, you can start by creating a new Next.js project and then adding the files provided.

\`\`\`bash
npx create-next-app@latest my-interview-app
cd my-interview-app
\`\`\`

When prompted, choose:
*   `Would you like to use TypeScript? Yes`
*   `Would you like to use ESLint? Yes`
*   `Would you like to use Tailwind CSS? Yes`
*   `Would you like to use \`src/\` directory? No` (Important for file paths)
*   `Would you like to use App Router? Yes (recommended)`
*   `Would you like to customize the default import alias (@/*)? Yes`
*   `What import alias would you like configured? @/*`

### 2. Install Dependencies

Install the project dependencies:

\`\`\`bash
npm install firebase-admin firebase @ai-sdk/google ai sonner dayjs @vapi-ai/web lucide-react zod
# or
pnpm install firebase-admin firebase @ai-sdk/google ai sonner dayjs @vapi-ai/web lucide-react zod
# or
yarn add firebase-admin firebase @ai-sdk/google ai sonner dayjs @vapi-ai/web lucide-react zod
\`\`\`

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project and add the following variables. Replace the placeholder values with your actual API keys and credentials.

\`\`\`env
# Firebase Admin SDK (Server-side)
FIREBASE_PROJECT_ID="your_firebase_project_id"
FIREBASE_CLIENT_EMAIL="your_firebase_client_email"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_WITH_NEWLINES_ESCAPED\n-----END PRIVATE KEY-----\n"

# Firebase Client SDK (Client-side)
NEXT_PUBLIC_FIREBASE_API_KEY="your_client_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your_measurement_id"

# Google Gemini (AI SDK)
GOOGLE_API_KEY="your_google_gemini_api_key"

# Vapi.ai
NEXT_PUBLIC_VAPI_WEB_TOKEN="your_vapi_web_token"
NEXT_PUBLIC_VAPI_WORKFLOW_ID="your_vapi_workflow_id" # For the 'generate' type agent
\`\`\`

**Important for `FIREBASE_PRIVATE_KEY`:**
The `private_key` from your Firebase Service Account JSON file contains newline characters (`\n`). You must replace these actual newlines with the escaped sequence `\n` in your `.env.local` file. For example, if your key looks like:

\`\`\`
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQ...
...
-----END PRIVATE KEY-----
\`\`\`

It should become:

\`\`\`
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAQIB... \n-----END PRIVATE KEY-----\n"
\`\`\`

### 4. Add Shadcn/ui Components

Install the necessary Shadcn/ui components:

\`\`\`bash
npx shadcn@latest add button
npx shadcn@latest add sonner
\`\`\`

### 5. Add Project Files

Ensure all the provided `.tsx`, `.ts`, `.js`, `.css`, and `.json` files are placed in their respective directories within your project. This includes:

*   `app/` (layout.tsx, (root)/layout.tsx, (root)/page.tsx, interview/page.tsx, interview/setup/page.tsx, interview/quick/page.tsx, interview/[id]/page.tsx, interview/feedback/page.tsx)
*   `app/api/vapi/` (generate/route.ts, generate-personalized/route.ts)
*   `components/` (Agent.tsx, DisplayTechIcons.tsx, InterviewCard.tsx, InterviewSetupForm.tsx)
*   `components/ui/` (button.tsx, toaster.tsx)
*   `constants/` (index.ts)
*   `firebase/` (admin.ts, client.ts)
*   `lib/actions/` (auth.action.ts, general.action.ts)
*   `lib/` (utils.ts, vapi.sdk.ts)
*   `public/` (all image assets like `robot.png`, `logo.svg`, `ai-avatar.png`, `user-avatar.png`, `star.svg`, `calendar.svg`, `tech.svg`, `pattern.png`, and all `covers/*.png` images)
*   `types/` (index.d.ts)
*   `vapi.d.ts`
*   `globals.css`
*   `next.config.mjs`
*   `package.json`
*   `tailwind.config.ts`
*   `tsconfig.json`

### 6. Run the Development Server

Once all files are in place and environment variables are configured, start the development server:

\`\`\`bash
npm run dev
# or
pnpm dev
# or
yarn dev
\`\`\`

The application will be accessible at `http://localhost:3000`.

### 7. Database Setup (Firebase Firestore)

The application automatically interacts with Firestore. When you run the app and generate interviews, data will be stored in the `interviews` and `feedback` collections in your Firebase Firestore database. No manual schema creation is strictly necessary, as Firestore is NoSQL and creates collections/documents on first write.

### 8. Authentication (Important Note)

The provided authentication (`lib/actions/auth.action.ts` and `firebase/client.ts`) is set up for Firebase. For a full authentication flow, you would typically:

1.  **Client-side Sign-up/Sign-in:** Use Firebase client SDK functions (e.g., `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`) in your frontend (e.g., a `sign-in/page.tsx` or `sign-up/page.tsx`).
2.  **Session Management:** After successful client-side authentication, get the `idToken` and send it to the `/api/auth/sign-in` (or similar) endpoint to create a secure session cookie on the server.

For initial testing, you might temporarily modify `lib/actions/auth.action.ts` to always return `true` for `isAuthenticated()` and a dummy user for `getCurrentUser()` to bypass authentication. **Remember to revert these changes for production.**

## Usage

1.  **Dashboard (`/`):** View existing interviews and start new ones.
2.  **Choose Interview Type (`/interview`):** Select between "AI-Personalized Interview" and "Quick Interview".
3.  **Setup Personalized Interview (`/interview/setup`):**
    *   Enter company name, role, and optionally a job description.
    *   **Paste your resume content** into the provided text area.
    *   Configure interview focus, experience level, and number of questions.
    *   Click "Generate Personalized Interview".
4.  **Quick Interview (`/interview/quick`):**
    *   This page directly starts a Vapi.ai call for a general "generate" type interaction.
5.  **Interview Details (`/interview/[id]`):**
    *   After generating an interview, you'll be redirected here.
    *   Click "Call" to start the voice interview with the AI interviewer.
    *   The AI will ask questions based on the generated list.
6.  **Interview Feedback (`/interview/[id]/feedback`):**
    *   After completing a voice interview, feedback will be generated and displayed here.

Enjoy preparing for your interviews with PrepWise!
