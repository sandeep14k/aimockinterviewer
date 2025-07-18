import { getCurrentUser } from "@/lib/actions/auth.action"
import InterviewSetupForm from "@/components/InterviewSetupForm" // Corrected import path to match previous output

const InterviewSetup = async () => {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 p-4 md:p-8 lg:p-12 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-50">Setup Your Interview</h1>
          <p className="text-gray-400">
            Provide your details for a personalized interview experience tailored to your background and target role.
          </p>
        </div>
        <InterviewSetupForm userName={user?.name!} userId={user?.id!} />
      </div>
    </div>
  )
}

export default InterviewSetup
