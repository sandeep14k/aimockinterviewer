import Agent from "@/components/Agent"
import { getCurrentUser } from "@/lib/actions/auth.action"

const QuickInterviewPage = async () => {
  const user = await getCurrentUser()

  return (
    <>
      <h3>Quick Interview Generation</h3>
      <Agent userName={user?.name!} userId={user?.id} profileImage={user?.profileURL} type="generate" />
    </>
  )
}

export default QuickInterviewPage
