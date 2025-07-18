"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { getTechLogos } from "@/lib/utils"

interface TechIconProps {
  techStack?: string[]
}

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  const [techLogos, setTechLogos] = useState<{ tech: string; url: string }[]>([])

  useEffect(() => {
    const fetchLogos = async () => {
      if (techStack && techStack.length > 0) {
        try {
          const logos = await getTechLogos(techStack)
          setTechLogos(logos)
        } catch (error) {
          console.error("Error fetching tech logos:", error)
          setTechLogos([])
        }
      } else {
        setTechLogos([])
      }
    }
    fetchLogos()
  }, [techStack])

  // Show nothing if no logos
  if (techLogos.length === 0) return null

  // Take only the first logo
  const firstLogo = techLogos[0]

  return (
    <Image
      src={firstLogo.url || "/placeholder.svg"}
      alt={firstLogo.tech}
      width={24}
      height={24}
      className="object-contain"
    />
  )
}

export default DisplayTechIcons
