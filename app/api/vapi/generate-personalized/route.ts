import { generateText, generateObject } from "ai"
import { google } from "@ai-sdk/google"
import { db } from "@/firebase/admin"
import { getRandomInterviewCover } from "@/lib/utils"
import { z } from "zod"

// Define a schema for the questions array
const questionsSchema = z.array(z.string())

export async function POST(request: Request) {
  const {
    userId,
    companyName,
    role,
    jobDescription,
    interviewType,
    experienceLevel,
    questionCount,
    resumeText, // Now receiving plain text resume
  } = await request.json()

  try {
    console.log("Received request for personalized interview generation:")
    console.log({ userId, companyName, role, interviewType, experienceLevel, questionCount })
    console.log(`Resume text length: ${resumeText ? resumeText.length : 0} characters`)

    let resumeAnalysis = "No resume text provided or analysis failed."
    if (resumeText && resumeText.trim().length > 0) {
      try {
        console.log("Attempting to analyze resume text with AI...")
        const { text: analysisResult } = await generateText({
          model: google("gemini-2.0-flash-001"),
          prompt: `
            Analyze the following resume text and extract key information.
            
            Resume Text:
            ${resumeText}
            
            Please extract and summarize:
            1. Technical skills and technologies
            2. Years of experience and seniority level
            3. Key projects and achievements
            4. Previous roles and companies
            5. Education and certifications
            6. Notable accomplishments
            
            Format your response as a structured summary that can be used to generate interview questions.
          `,
        })
        resumeAnalysis = analysisResult
        console.log("Resume Analysis (first 500 chars):", resumeAnalysis.substring(0, 500))
      } catch (resumeError) {
        console.error("Error during resume analysis by AI:", resumeError)
        resumeAnalysis = `Failed to analyze resume text. Error: ${resumeError instanceof Error ? resumeError.message : String(resumeError)}`
      }
    } else {
      console.log("No resume text provided for analysis.")
    }

    let questionsObject: string[] = []
    try {
      console.log("Attempting to generate questions with AI...")
      const { object: generatedQuestions } = await generateObject({
        model: google("gemini-2.0-flash-001"),
        schema: questionsSchema,
        prompt: `
          You are an expert interviewer creating personalized interview questions for a candidate.
          
          COMPANY: ${companyName}
          ROLE: ${role}
          EXPERIENCE LEVEL: ${experienceLevel}
          INTERVIEW TYPE: ${interviewType}
          NUMBER OF QUESTIONS: ${questionCount}
          
          ${jobDescription ? `JOB DESCRIPTION: ${jobDescription}` : ""}
          
          CANDIDATE'S RESUME ANALYSIS:
          ${resumeAnalysis}
          
          Create ${questionCount} interview questions that are:
          1. Tailored to the specific company and role
          2. Appropriate for the candidate's experience level
          3. Based on their actual resume experience and projects (from the analysis)
          4. Mix of ${interviewType} questions as requested
          5. Realistic questions this company might actually ask
          
          Guidelines:
          - Reference specific technologies/projects from their resume analysis
          - Ask about their experience with relevant tools/frameworks
          - Include behavioral questions about their past work
          - Consider the company culture and values
          - Make questions challenging but fair for their level
          
          Return ONLY the questions as a JSON array of strings.
          Example format: ["Question 1", "Question 2", "Question 3"]
          
          Do not use special characters like "/" or "*" that might break voice synthesis.
        `,
      })
      questionsObject = generatedQuestions
      console.log("Generated Questions:", questionsObject)
    } catch (questionsError) {
      console.error("Error during question generation by AI:", questionsError)
      throw new Error(
        `Failed to generate questions: ${questionsError instanceof Error ? questionsError.message : String(questionsError)}`,
      )
    }

    // Create the interview record
    console.log("Attempting to save interview to Firestore...")
    const interview = {
      role: role,
      type: interviewType,
      level: experienceLevel,
      companyName: companyName,
      jobDescription: jobDescription || null,
      // We'll store the AI's analysis of the resume, not the raw text, to keep the DB cleaner
      resumeAnalysis: resumeAnalysis,
      questions: questionsObject,
      userId: userId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
      isPersonalized: true,
    }

    const docRef = await db.collection("interviews").add(interview)
    console.log("Interview saved to Firestore with ID:", docRef.id)

    return Response.json(
      {
        success: true,
        interviewId: docRef.id,
        message: "Personalized interview generated successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Overall error in generate-personalized API:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}
