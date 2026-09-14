"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail, Instagram, Phone, Github } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { AnimatedHeading } from "@/components/ui/AnimatedHeading"

type TeamMember = {
  id: number
  name: string
  position: string
  team: string
  domain: string
  image: string
  linkedin?: string
  email?: string
  instagram?: string
  phone?: string
  github?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr.S.Ilaiyavel",
    position: "Manager",
    team: "Ecell Managers",
    domain: "Faculty",
    image: "/teams/ilayavel.webp",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 2,
    name: "V.senthill velan",
    position: "Manager",
    team: "Ecell Managers",
    domain: "Faculty",
    image: "/teams/sentilvelan.webp",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 3,
    name: "Baarath Arumugaraja",
    position: "President",
    team: "Core Leadership",
    domain: "CSE - 4th Year",
    image: "/teams/president.png",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 4,
    name: "Janani T",
    position: "Vice President",
    team: "Core Leadership",
    domain: "CSE - 4th Year",
    image: "/teams/vp.png",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 5,
    name: "Harshith Bubalan",
    position: "Secretary",
    team: "Core Leadership",
    domain: "MNA - 4th Year",
    image: "/teams/SEC.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 6,
    name: "Balakrishnan.R",
    position: "Director of Innovation",
    team: "Leadership Committee",
    domain: "AD - 4th Year",
    image: "/teams/DOI.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 7,
    name: "Shree Varshini M",
    position: "EPIC Representative",
    team: "Leadership Committee",
    domain: "ECE - 4th Year",
    image: "",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 8,
    name: "Sankara Narayanan S",
    position: "CEO",
    team: "Executive Committee",
    domain: "BIOTECH - 4th Year",
    image: "/teams/ceo.jpeg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 9,
    name: "Abijith P",
    position: "COO",
    team: "Executive Committee",
    domain: "CSE - 4th Year",
    image: "/teams/coo.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 10,
    name: "Tharun S",
    position: "Creative Director",
    team: "Executive Committee",
    domain: "MNA - 3rd Year",
    image: "/teams/creative head.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 11,
    name: "Sudish M",
    position: "CTO",
    team: "Executive Committee",
    domain: "CS - 4th Year",
    image: "",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 12,
    name: "Thoufikur Rahaman Y",
    position: "CDO",
    team: "Executive Committee",
    domain: "EEE - 3rd Year",
    image: "",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 13,
    name: "Kayal Nethra K",
    position: "CMO",
    team: "Executive Committee",
    domain: "CSE - 3rd Year",
    image: "/teams/Kayal_CMO.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 14,
    name: "Madhav Krishna",
    position: "Community Captain",
    team: "Department Heads",
    domain: "CSE - 3rd Year",
    image: "/teams/captain.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 15,
    name: "Sri bharathi R",
    position: "Executive Lead",
    team: "Department Heads",
    domain: "MNA - 3rd Year",
    image: "/teams/executive lead.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 16,
    name: "K Buvaneswaran",
    position: "Tech Lead",
    team: "Department Heads",
    domain: "ECE - 3rd Year",
    image: "/teams/tech lead.jpeg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 17,
    name: "Seyed Mohamed MF",
    position: "Design Lead",
    team: "Department Heads",
    domain: "MNA - 4th Year",
    image: "",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 18,
    name: "Yogavarthanee R",
    position: "Executive Member",
    team: "Executive Members",
    domain: "CHEM - 3rd Year",
    image: "/teams/yogavarthene.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 19,
    name: "Jai Ganesh S",
    position: "Executive Member",
    team: "Executive Members",
    domain: "AD A - 3rd Year",
    image: "/teams/jai.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 20,
    name: "Hayagreeva L",
    position: "Executive Member",
    team: "Executive Members",
    domain: "BIOTECH - 2nd Year",
    image: "/teams/Hayagreeva Photo.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 21,
    name: "Prithish A S",
    position: "Executive Member",
    team: "Executive Members",
    domain: "CSE C - 2nd Year",
    image: "/teams/Prithish A S.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 22,
    name: "Aravindar APS",
    position: "Marketing Team",
    team: "Marketing Team",
    domain: "MECH - 2nd Year",
    image: "/teams/aravindar.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 23,
    name: "TJ Saattviki",
    position: "Marketing Team",
    team: "Marketing Team",
    domain: "ECE - 2nd Year",
    image: "/teams/TJ Saattviki.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 24,
    name: "Shivani shri R D",
    position: "Marketing Team",
    team: "Marketing Team",
    domain: "EEE - 2nd Year",
    image: "/teams/Shivani shri R D.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 25,
    name: "Perumal P",
    position: "Tech Team",
    team: "Tech Team",
    domain: "ECE - 2nd Year",
    image: "/teams/Perumal P.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 26,
    name: "Pranav Karthick V",
    position: "Tech Team",
    team: "Tech Team",
    domain: "ECE - 2nd Year",
    image: "/teams/Pranav Karthick V.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 27,
    name: "Antony Abishek A",
    position: "Tech Mentor",
    team: "Tech Team",
    domain: "CSE - 4th Year",
    image: "/teams/Antony Abishek A.jpeg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 28,
    name: "Jefina Giftlin J",
    position: "Content Team",
    team: "Content Team",
    domain: "BIOTECH - 3rd Year",
    image: "/teams/Jefina Giftlin J.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 29,
    name: "Harshitha H",
    position: "Content Team",
    team: "Content Team",
    domain: "BIOTECH - 2nd Year",
    image: "/teams/Harshitha H.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 30,
    name: "Vaishali",
    position: "Design Team",
    team: "Design Team",
    domain: "CSE - 3rd Year",
    image: "",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 31,
    name: "Yogendra SK",
    position: "Design Team",
    team: "Design Team",
    domain: "MECH - 3rd Year",
    image: "/teams/Yogendra SK.png",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 32,
    name: "Rithik Nishal.L",
    position: "Design Team",
    team: "Design Team",
    domain: "CSE - 2nd Year",
    image: "/teams/Rithik Nishal.L.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 33,
    name: "Akshaya Venkatesh",
    position: "Design Team",
    team: "Design Team",
    domain: "EEE - 2nd Year",
    image: "/teams/Akshaya Venkatesh.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 34,
    name: "Vippin Antony",
    position: "Creative Team",
    team: "Design Team",
    domain: "CSE - 2nd Year",
    image: "",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 35,
    name: "Harshini Devi U",
    position: "Creative Team",
    team: "Design Team",
    domain: "ECE - 2nd Year",
    image: "/teams/Harshini Devi U.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 36,
    name: "Chalakesh S K",
    position: "Community Manager",
    team: "Community Managers",
    domain: "CHEM - 3rd Year",
    image: "/teams/Chalakesh S K.JPG",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 37,
    name: "Kamalina K",
    position: "Community Manager",
    team: "Community Managers",
    domain: "ECE - 2nd Year",
    image: "",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 38,
    name: "Kaviyarasan S",
    position: "Community Manager",
    team: "Community Managers",
    domain: "EEE - 2nd Year",
    image: "/teams/Kaviyarasan S.png",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 39,
    name: "Madhushalani S",
    position: "Community Manager",
    team: "Community Managers",
    domain: "BIOTECH - 2nd Year",
    image: "/teams/Madhushalani.jpg",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
  {
    id: 40,
    name: "ES Nishitha",
    position: "Community Manager",
    team: "Community Managers",
    domain: "ECE - 2nd Year",
    image: "",
    linkedin: "",
    email: "",
    instagram: "",
    phone: "",
    github: "",
  },
]
const groupedTeamMembers = teamMembers.reduce(
  (acc, member) => {
    if (!acc[member.team]) {
      acc[member.team] = []
    }
    acc[member.team].push(member)
    return acc
  },
  {} as Record<string, TeamMember[]>,
)

function TeamMemberCard({ member, isFlipped, onFlip }: { member: TeamMember; isFlipped: boolean; onFlip: () => void }) {
  const cardVariants = {
    flipped: { rotateY: 180 },
    unflipped: { rotateY: 0 },
  }

  return (
    <div className="aspect-square w-full [perspective:1000px] relative cursor-pointer" onClick={onFlip}>
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        variants={cardVariants}
        initial="unflipped"
        animate={isFlipped ? "flipped" : "unflipped"}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <div className="glass-card bg-black/60 border border-white/10 rounded-2xl shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col text-white">
            <div className="aspect-square relative">
              <Image 
                src={member.image || "/placeholder.svg"} 
                alt={member.name} 
                fill 
                className={`${member.name === "Dr.S.Ilaiyavel" || member.name === "Divya Shree M" || member.name === "Baarath Arumugaraja" || member.name === "Yogavarthanee R" ? "object-cover object-top" : member.name === "THARUN S" || member.name === "Jefina Giftlin J" ? "object-cover object-top" : member.name === "V.senthill velan" ? "object-cover object-center" : member.name === "N.Nitish" || member.name === "VIKAASH B G" || member.name === "Sankara Narayanan S" || member.name === "Sri Bharathi R" || member.name === "K Buvaneswaran" || member.name === "ABIJITH P" || member.name === "Bhargavi TR" || member.name === "Dimple Kurugunda" || member.name === "Yogendra" || member.name === "THOUFIKUR RAHAMAN Y" || member.name === "Vaishali V" || member.name === "Sanjana Madankumar" || member.name === "Madhav" ? "object-cover object-top" : "object-cover"}`}
                style={member.name === "Dr.S.Ilaiyavel" || member.name === "Divya Shree M" || member.name === "Baarath Arumugaraja" || member.name === "Yogavarthanee R" ? { objectPosition: "center 5%", transform: "scale(1.1)" } : member.name === "THARUN S" ? { objectPosition: "center 5%" } : member.name === "Jefina Giftlin J" ? { objectPosition: "center 2%", transform: "scale(1.2)" } : member.name === "V.senthill velan" ? { objectPosition: "center 20%" } : member.name === "N.Nitish" || member.name === "VIKAASH B G" || member.name === "Sankara Narayanan S" || member.name === "Sri Bharathi R" || member.name === "K Buvaneswaran" || member.name === "ABIJITH P" || member.name === "Bhargavi TR" || member.name === "Dimple Kurugunda" || member.name === "Yogendra" || member.name === "THOUFIKUR RAHAMAN Y" || member.name === "Vaishali V" || member.name === "Sanjana Madankumar" || member.name === "Madhav" ? { objectPosition: "center 30%" } : {}}
              />
            </div>
            <div className="p-3 sm:p-4 text-center flex-1 flex flex-col justify-center">
              <h3 className="text-base sm:text-lg font-bold mb-1 text-white">{member.name}</h3>
              <p className="text-xs sm:text-sm text-indigo-400 mb-2 font-medium">{member.position}</p>
              <span className="inline-block px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
                {member.domain}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="bg-[#0a0a0a] border border-indigo-500/30 text-white rounded-2xl shadow-xl transition-all duration-300 h-full flex flex-col items-center justify-center p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-bold mb-1 text-center text-white">{member.name}</h3>
            <p className="text-indigo-400 mb-3 text-center text-sm sm:text-base font-semibold">{member.position}</p>
            <span className="inline-block mb-4 px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
              {member.domain}
            </span>
            <div className="flex gap-3 sm:gap-4 mt-2 flex-wrap justify-center">
              <Link 
                href={member.linkedin || "#"} 
                target={member.linkedin ? "_blank" : "_self"} 
                className={`transition-colors p-1 ${member.linkedin ? "hover:text-brand-primary" : "text-gray-500 cursor-not-allowed"}`} 
                title={member.linkedin ? "LinkedIn" : "LinkedIn - Not available"}
                onClick={!member.linkedin ? (e) => e.preventDefault() : undefined}
              >
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </Link>
              <Link 
                href={member.email ? `mailto:${member.email}` : "#"} 
                target={member.email ? "_self" : "_self"} 
                className={`transition-colors p-1 ${member.email ? "hover:text-brand-primary" : "text-gray-500 cursor-not-allowed"}`} 
                title={member.email ? `Email: ${member.email}` : "Email - Not available"}
                onClick={!member.email ? (e) => e.preventDefault() : undefined}
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
              </Link>
              <Link 
                href={member.instagram ? `https://instagram.com/${member.instagram.replace('@', '')}` : "#"} 
                target={member.instagram ? "_blank" : "_self"} 
                className={`transition-colors p-1 ${member.instagram ? "hover:text-brand-primary" : "text-gray-500 cursor-not-allowed"}`} 
                title={member.instagram ? "Instagram" : "Instagram - Not available"}
                onClick={!member.instagram ? (e) => e.preventDefault() : undefined}
              >
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </Link>
              <Link 
                href={member.phone ? `tel:${member.phone}` : "#"} 
                target={member.phone ? "_self" : "_self"} 
                className={`transition-colors p-1 ${member.phone ? "hover:text-brand-primary" : "text-gray-500 cursor-not-allowed"}`} 
                title={member.phone ? "Phone" : "Phone - Not available"}
                onClick={!member.phone ? (e) => e.preventDefault() : undefined}
              >
                <Phone size={18} className="sm:w-5 sm:h-5" />
              </Link>
              <Link 
                href={member.github || "#"} 
                target={member.github ? "_blank" : "_self"} 
                className={`transition-colors p-1 ${member.github ? "hover:text-brand-primary" : "text-gray-500 cursor-not-allowed"}`} 
                title={member.github ? "GitHub" : "GitHub - Not available"}
                onClick={!member.github ? (e) => e.preventDefault() : undefined}
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function TeamPage() {
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  const handleCardFlip = (memberId: number) => {
    setFlippedCardId((prevId) => (prevId === memberId ? null : memberId))
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pageRef.current && !pageRef.current.contains(event.target as Node)) {
        setFlippedCardId(null)
      }
    }
    function handleTouchOutside(event: TouchEvent) {
      if (pageRef.current && !pageRef.current.contains(event.target as Node)) {
        setFlippedCardId(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleTouchOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleTouchOutside)
    }
  }, [pageRef])

  return (
    <div
      className="min-h-screen relative overflow-hidden pt-28 pb-32 flex flex-col page-container bg-grid text-white"
      onClick={() => setFlippedCardId(null)}
    >
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="page-hero relative z-20 py-12 sm:py-16 md:py-20"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
          <div className="w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.15),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_60%_80%,rgba(59,130,246,0.1),transparent_35%)]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-40">
          <AnimatedHeading className="text-white mb-4 text-3xl sm:text-4xl md:text-5xl">Current Team</AnimatedHeading>
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
              <span className="text-white">2026–2027</span>{" "}
              <span className="text-rose-300">E-Cell Crew</span>
            </h2>
            <p className="text-base sm:text-lg text-white/90 px-2">
              The current student team driving innovation, creativity, and startup energy at SVCE.
            </p>
          </motion.div>
          <motion.p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-amber-300 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Meet the passionate individuals leading the next chapter of entrepreneurship at SVCE.
          </motion.p>
        </div>
      </motion.section>

      <section className="page-content py-8 sm:py-12" ref={pageRef}>
        <div className="container mx-auto px-4 sm:px-6">
          {Object.entries(groupedTeamMembers).map(([team, members]) => (
            <div key={team} className="mb-12 sm:mb-16">
              <AnimatedHeading className="text-brand-primary text-2xl sm:text-3xl mb-8 sm:mb-12 text-center px-2">{team}</AnimatedHeading>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                {members.map((member) => (
                  <div key={member.id} onClick={(e) => e.stopPropagation()} className="transform transition-transform duration-200 hover:scale-105">
                    <TeamMemberCard
                      member={member}
                      isFlipped={flippedCardId === member.id}
                      onFlip={() => handleCardFlip(member.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="block sm:hidden mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">Tap cards to flip and learn more</p>
            <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
