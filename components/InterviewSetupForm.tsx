"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface InterviewSetupFormProps {
  userName: string
  userId: string
}

const InterviewSetupForm = ({ userName, userId }: InterviewSetupFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    jobDescription: "",
    resumeText: "",
    interviewType: "mixed",
    experienceLevel: "mid",
    questionCount: "8",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.companyName || !formData.role) {
      toast.error("Please fill in company name and role")
      return
    }
    if (!formData.resumeText.trim()) {
      toast.error("Please paste your resume content")
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch("/api/vapi/generate-personalized", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          companyName: formData.companyName,
          role: formData.role,
          jobDescription: formData.jobDescription,
          interviewType: formData.interviewType,
          experienceLevel: formData.experienceLevel,
          questionCount: Number.parseInt(formData.questionCount),
          resumeText: formData.resumeText,
        }),
      })
      const result = await response.json()
      if (result.success) {
        toast.success("Interview generated successfully!")
        router.push(`/interview/${result.interviewId}`)
      } else {
        toast.error("Failed to generate interview. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Company & Role Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-gray-900 dark:border-gray-700">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Company & Role Details</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tell us about the position you're preparing for</p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                Company Name *
              </label>
              <input
                id="companyName"
                type="text"
                placeholder="e.g., Google, Microsoft, Startup Inc."
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                Role/Position *
              </label>
              <input
                id="role"
                type="text"
                placeholder="e.g., Senior Frontend Developer, Product Manager"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label
                htmlFor="jobDescription"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                Job Description (Optional)
              </label>
              <textarea
                id="jobDescription"
                placeholder="Paste the job description here for more targeted questions..."
                value={formData.jobDescription}
                onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>
        {/* Interview Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-gray-900 dark:border-gray-700">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Interview Configuration</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Customize your interview experience</p>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="interviewType"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                Interview Focus
              </label>
              <select
                id="interviewType"
                value={formData.interviewType}
                onChange={(e) => handleInputChange("interviewType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50"
              >
                <option value="technical">Technical Focus</option>
                <option value="behavioral">Behavioral Focus</option>
                <option value="mixed">Mixed (Recommended)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                Experience Level
              </label>
              <select
                id="experienceLevel"
                value={formData.experienceLevel}
                onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50"
              >
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (2-5 years)</option>
                <option value="senior">Senior Level (5+ years)</option>
                <option value="lead">Lead/Principal (8+ years)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="questionCount"
                className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
              >
                Number of Questions
              </label>
              <select
                id="questionCount"
                value={formData.questionCount}
                onChange={(e) => handleInputChange("questionCount", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50"
              >
                <option value="5">5 Questions (Quick)</option>
                <option value="8">8 Questions (Standard)</option>
                <option value="12">12 Questions (Comprehensive)</option>
                <option value="15">15 Questions (Thorough)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Resume Text Area */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-gray-900 dark:border-gray-700">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Paste Your Resume Content</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Copy and paste the text from your resume here for personalized questions based on your experience and
            projects.
          </p>
        </div>
        <textarea
          id="resumeText"
          placeholder="Paste your resume content here..."
          value={formData.resumeText}
          onChange={(e) => handleInputChange("resumeText", e.target.value)}
          rows={10}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50 dark:placeholder-gray-400"
        />
        <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
          The AI will analyze this text to generate highly relevant interview questions.
        </p>
      </div>
      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isLoading} className="min-w-[200px]">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Interview...
            </>
          ) : (
            "Generate Personalized Interview"
          )}
        </Button>
      </div>
    </form>
  )
}

export default InterviewSetupForm
