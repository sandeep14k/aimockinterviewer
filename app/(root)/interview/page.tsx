import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, FileText, Zap } from "lucide-react"

const InterviewPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 p-4 md:p-8 lg:p-12 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-50">Choose Your Interview Type</h1>
          <p className="text-xl text-gray-400">Select the type of interview experience you'd like to have</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personalized Interview */}
          <div className="relative overflow-hidden bg-gray-900 rounded-lg border-2 border-blue-700 hover:border-blue-500 transition-colors p-6 shadow-lg">
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Recommended</span>
            </div>
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-8 w-8 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-50">AI-Personalized Interview</h3>
              </div>
              <p className="text-gray-300">
                Upload your resume and get questions tailored to your experience, target company, and role
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-50">Features:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Questions based on your actual resume</li>
                  <li>• Company-specific interview style</li>
                  <li>• Role-appropriate difficulty level</li>
                  <li>• References your projects & experience</li>
                </ul>
              </div>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                <Link href="/interview/setup">
                  <FileText className="mr-2 h-4 w-4" />
                  Start Personalized Interview
                </Link>
              </Button>
            </div>
          </div>
          {/* Quick Interview */}
          <div className="bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors p-6 shadow-lg">
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-8 w-8 text-orange-400" />
                <h3 className="text-xl font-semibold text-gray-50">Quick Interview</h3>
              </div>
              <p className="text-gray-300">Generate questions based on basic parameters for a quick practice session</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-50">Features:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Fast setup process</li>
                  <li>• General role-based questions</li>
                  <li>• Technology stack focused</li>
                  <li>• Good for quick practice</li>
                </ul>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent border-gray-600 text-gray-50 hover:bg-gray-800 hover:text-gray-50"
                size="lg"
              >
                <Link href="/interview/quick">
                  <Zap className="mr-2 h-4 w-4" />
                  Start Quick Interview
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Not sure which to choose? Try the personalized interview for the most realistic experience.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InterviewPage
