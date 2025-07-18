import { getCurrentUser } from "@/lib/actions/auth.action"
import InterviewSetupForm from "@/components/InterviewSetupForm"

const InterviewSetup = async () => {
  const user = await getCurrentUser()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Setup Your Interview</h1>
        <p className="text-muted-foreground">
          Provide your details for a personalized interview experience tailored to your background and target role.
        </p>
      </div>

      <InterviewSetupForm userName={user?.name!} userId={user?.id!} />
    </div>
  )
}

export default InterviewSetup
