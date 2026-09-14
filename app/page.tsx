"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Briefcase, Lightbulb, Users, Globe, Rocket, Star, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import ServiceModal from "@/components/ServiceModal"
import StartupSimulatorGame from "@/components/StartupSimulatorGame"
import FounderQuiz from "@/components/FounderQuiz"
import { motion, AnimatePresence } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function Home() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [speakersApi, setSpeakersApi] = useState<CarouselApi | null>(null)

  const services = [
    {
      title: "Entrepreneurship",
      icon: <Lightbulb className="w-8 h-8 text-indigo-400" />,
      description: "Start a roadmap that will determine where you want to go with your entrepreneurial efforts.",
      details: "We provide comprehensive guidance and resources to help students develop their entrepreneurial mindset and skills. Our programs include mentorship, workshops, and hands-on experience in business development.",
      features: [
        "Personalized mentorship programs",
        "Business model canvas workshops",
        "Pitching and presentation training",
        "Market research and validation support",
        "Networking with industry experts",
      ],
    },
    {
      title: "Incubation Center",
      icon: <Briefcase className="w-8 h-8 text-indigo-400" />,
      description: "Entrepreneurial and Managerial Development of SMEs through Incubator MSME.",
      details: "Our incubation center provides a supportive environment for startups to grow and scale. We offer workspace, funding opportunities, and expert guidance to help transform ideas into successful businesses.",
      features: [
        "Co-working spaces and facilities",
        "Seed funding and investment connections",
        "Legal and regulatory guidance",
        "Technology and infrastructure support",
        "Access to investor networks",
      ],
    },
    {
      title: "Builders Guild",
      icon: <BookOpen className="w-8 h-8 text-indigo-400" />,
      description: "Promoting Entrepreneurship and Facilities to help you grow your business ideas.",
      details: "We offer a comprehensive suite of services designed to support every stage of your entrepreneurial journey, from ideation to execution and growth.",
      features: [
        "Workshop and seminar series",
        "Competition and hackathon events",
        "Industry collaboration programs",
        "Resource library and tools",
        "Community building and networking",
      ],
    },
  ]

  const speakers = [
    { name: "Dr. Arvind A R", designation: "Deputy General Manager, Ashok Leyland Limited", image: "/inspirational-speakers/Arvind AR.jpg" },
    { name: "Mr. T. Vignesh", designation: "Chief Guest, Associate Business Facilitation Officer", image: "" },
    { name: "Gurunathraje", designation: "Executive Member, E-cell", image: "" },
    { name: "Subash Chandra Bose", designation: "Executive Member E-cell Svce, Co-founder, hraipal.com", image: "" },
    { name: "Mr. Palaniappan Narayanan", designation: "Co-Founder & CEO at Mocero Health Solutions, Chennai", image: "/inspirational-speakers/Palaniappan.jpg" },
    { name: "Mr. Shri Sivarajah Ramanathan", designation: "Mission Director of Tamil Nadu Startup and Innovation Mission", image: "/inspirational-speakers/Shivarajah.jpg" },
    { name: "Nithin Alexander", designation: "Founder, Entrepreneurs of Madras", image: "/inspirational-speakers/Nithin.jpg" },
    { name: "Mr. Ajay Prasath G A", designation: "Founder & CEO, Loopmans Automation Pvt Ltd.", image: "/inspirational-speakers/Ajay.jpg" },
    { name: "Mr. sarabesh Sriram", designation: "Founder & partner, Stacia corp", image: "/inspirational-speakers/Sarabesh.jpg" },
    { name: "Mr. Deepak Kumar", designation: "Founder of ScrollMe, Habitate.io, and C3", image: "/inspirational-speakers/Deepak kumar.jpg" },
    { name: "T. G. Ramakrishnan", designation: "Founder of TGR Tex", image: "/inspirational-speakers/Ramakrishan.jpg" },
  ]

  const events = [
    {
      id: 20,
      title: "IIT Madras E-Summit 2025 & E-Auction",
      category: "Summit",
      description: "SVCE E - Cell members participated in the E-Auction, simulating real-world investment and startup valuation scenarios, testing financial decision-making, negotiation, and strategic thinking.",
      date: "March 1, 2025",
      location: "IIT Madras",
      participantsInfo: "SVCE E - Cell Team",
      image: "/events/iit_2025.jpg",
      color: "indigo",
    },
    {
      id: 19,
      title: "MSME Idea Hackathon 4.0",
      category: "Hackathon",
      description: "A high-energy hackathon where students pitched innovative solutions to real-world challenges. 18 proposals from SVCE were forwarded for incubation.",
      date: "October 29, 2024",
      location: "Library Conference Hall, SVCE",
      participantsInfo: "18 Proposals Selected",
      image: "/events/msme.JPG",
      color: "purple",
    },
    {
      id: 18,
      title: "MoU with E - Cell MANIT Bhopal",
      category: "Collaboration",
      description: "A collaboration to promote joint events and mutual support. SVCE E - Cell was named the official outreach partner for MANIT Bhopal's E-Summit 2025.",
      date: "October 14, 2024",
      location: "SVCE & MANIT Bhopal",
      participantsInfo: "Official Partnership",
      image: "/events/bhopal.jpg",
      color: "blue",
    },
  ]

  // Autoplay for speakers
  useEffect(() => {
    if (!speakersApi) return;
    const interval = setInterval(() => {
      speakersApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [speakersApi]);

  return (
    <div className="page-container relative bg-grid">
      
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-8 py-20 md:py-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 max-w-5xl"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.2)]">
            SVCE • Innovation • Leadership
          </div>
          <h1 className="mb-6 md:mb-8 leading-[0.9] tracking-[-0.065em]">
            <span className="block text-[3.1rem] sm:text-6xl md:text-8xl lg:text-[7rem] font-black text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]">
              ENTREPRENEURSHIP
            </span>
            <span className="mt-2 block bg-gradient-to-r from-rose-300 via-amber-200 to-white bg-clip-text text-transparent text-[2.2rem] sm:text-4xl md:text-6xl lg:text-[5rem] font-black tracking-[-0.05em]">
              CELL
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-medium mb-12 leading-relaxed max-w-3xl mx-auto">
            A bold student ecosystem where ideas ignite, founders rise, and the next generation of startup leaders builds with purpose at SVCE.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/events">
              <button className="premium-button">Explore Events</button>
            </Link>
            <Link href="/about">
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl border border-white/10 transition-all hover:border-rose-300/40 hover:text-rose-100">
                Our Mission
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Simulator Section */}
      <section className="py-24 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Startup Simulator</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium">
              Experience the highs and lows of the Indian startup ecosystem in our 
              interactive game. Strategize, scale, and succeed.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="shadow-[0_0_100px_rgba(79,70,229,0.1)] rounded-[3rem]"
          >
            <StartupSimulatorGame />
          </motion.div>
        </div>
      </section>

      {/* Founder Readiness Quiz Section */}
      <section className="py-24 px-4 md:px-8 relative bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Are You Ready to Founder?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium">
              Take our 25-question interactive diagnostic quiz to evaluate your founder mindset, 
              validation strategy, execution power, and get custom recommendations for SVCE programs!
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <FounderQuiz />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 md:px-8 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
           {[
             { label: "Community", value: "2500+", icon: <Users /> },
             { label: "Startups", value: "50+", icon: <Rocket /> },
             { label: "Collaborations", value: "15+", icon: <Globe /> },
             { label: "Awards", value: "20+", icon: <Star /> }
           ].map((stat, i) => (
             <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
             >
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-400">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">{stat.label}</div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="section-title">Our Programs</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium">
              We provide the necessary tools and mentorship to turn 
              innovative ideas into real-world business solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-primary flex flex-col h-full"
              >
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/20">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-10 leading-relaxed font-medium">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <button
                    onClick={() => setSelectedService(index)}
                    className="flex items-center gap-3 text-indigo-400 font-bold text-xs uppercase tracking-widest hover:gap-5 transition-all"
                  >
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-24 px-4 md:px-8 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="section-title">Past Speakers</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium">
              Industry leaders and visionaries who have shared their journey 
              with the SVCE community.
            </p>
          </motion.div>

          <div className="relative">
            <Carousel
              opts={{ align: "start", loop: true }}
              setApi={setSpeakersApi}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {speakers.map((speaker, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <div className="glass-card rounded-[2.5rem] p-8 h-full flex flex-col items-center text-center border-white/5">
                      <div className="h-36 w-36 rounded-3xl overflow-hidden bg-white/5 flex items-center justify-center mb-6 border border-white/10 p-2 shadow-2xl">
                        {speaker.image ? (
                          <Image
                            src={speaker.image}
                            alt={speaker.name}
                            width={144}
                            height={144}
                            className="h-full w-full object-cover rounded-2xl"
                          />
                        ) : (
                          <div className="h-full w-full bg-indigo-500/10 flex items-center justify-center rounded-2xl border border-indigo-500/20">
                            <span className="text-2xl font-bold text-indigo-500">
                             {speaker.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{speaker.name}</h3>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest line-clamp-2 px-4">
                        {speaker.designation}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-12">
                 <CarouselPrevious className="static translate-y-0 bg-white/5 border-white/10 hover:bg-white/10 text-white w-12 h-12" />
                 <CarouselNext className="static translate-y-0 bg-white/5 border-white/10 hover:bg-white/10 text-white w-12 h-12" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="section-title">Latest Highlights</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium">
              Recent events and collaborations from the E-Cell SVCE ecosystem.
            </p>
          </motion.div>

          <div className="space-y-24">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row gap-16 items-center ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-4">
                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border ${
                        event.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                        event.color === 'purple' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                     }`}>
                        {event.category}
                     </span>
                     <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{event.date}</span>
                  </div>
                  <h3 className="heading-md">{event.title}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed font-medium">
                    {event.description}
                  </p>
                  <div className="pt-4">
                    <Link href="/events">
                      <button className="flex items-center gap-3 text-indigo-400 font-bold text-xs uppercase tracking-widest hover:gap-6 transition-all group">
                        View Details <ExternalLink className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex-1 w-full lg:max-w-[500px]">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-indigo-500/10 rounded-[3rem] blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none" />
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                       <Image
                        src={event.image}
                        alt={event.title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover aspect-[4/3] transition-all duration-700"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 text-center"
          >
            <Link href="/events">
              <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.3em] rounded-2xl border border-white/10 transition-all shadow-2xl flex items-center gap-4 mx-auto group">
                View All Events <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <ServiceModal
            isOpen={selectedService !== null}
            onClose={() => setSelectedService(null)}
            service={services[selectedService]}
          />
        )}
      </AnimatePresence>

    </div>
  )
}