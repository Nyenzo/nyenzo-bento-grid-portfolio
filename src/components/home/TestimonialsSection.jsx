import { Section } from "../shared/Section"
import { useEffect, useState, useRef } from "react"
import { motion } from "motion/react"
import { Star } from "lucide-react"
import tonyAvatar from "../../assets/avatars/tony.jpg"
import liamAvatar from "../../assets/avatars/liam.jpg"
// import pamAvatar from "../../assets/avatars/pam.jpg"
import catieAvatar from "../../assets/avatars/catie.jpg"
import "../../styles/testimonials.css"
import "../../styles/cards.css"

export default function TestimonialsSection({ delay = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonialHeight, setTestimonialHeight] = useState(200)
  const testimonialRef = useRef(null)
  
  const testimonials = [
    {
      name: "Tony Kamande",
      location: "Nairobi, Kenya. 27, Aug 2025",
      quote: "Peter is a natural leader who consistently takes initiative. On the bento-grid-ai project, he stepped up to guide the team, showcasing his ability to manage tasks and motivate others. His strong technical skills combined with his proactive approach make him an asset to any team. I was always impressed by his drive and commitment to success.",
      avatar: tonyAvatar
    },
    {
      name: "William Nzuli",
      location: "Mombasa, Kenya. 28, Aug 2025",
      quote: "I highly recommend Nyenzo as an exceptional software engineer and data scientist. Throughout our work together, he has consistently demonstrated deep technical expertise in web development and machine learning, coupled with an unwavering commitment to delivering high-quality results.",
      avatar: liamAvatar
    },
    {
      name: "Catherine Matu",
      location: "Nairobi, Kenya. 30, Aug 2025",
      quote: "I had the pleasure of working with Nyenzo on several projects, and I was consistently impressed by his technical acumen and reliability. His skills in React, JavaScript, and debugging are top-notch—he approaches challenges with precision and always delivers high-quality work on time.",
      avatar: catieAvatar
    },
    // {
    //   name: "Pam Rodriguez",
    //   location: "Nakuru, Kenya. 8, Apr 2024",
    //   quote: "Sid is an outstanding team player. His collaborative approach, clear communication, and problem-solving abilities make him invaluable to any project.",
    //   avatar: pamAvatar
    // }
  ]

  // Create a duplicated array for seamless looping
  const loopedTestimonials = [...testimonials, ...testimonials]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1
        // When we reach the end of the original testimonials, reset to 0
        if (nextIndex >= testimonials.length) {
          return 0
        }
        return nextIndex
      })
    }, 5000) // Slowed down to 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    if (testimonialRef.current) {
      const testimonialElement = testimonialRef.current
      const height = testimonialElement.offsetHeight
      const marginBottom = parseInt(window.getComputedStyle(testimonialElement).marginBottom)
      const totalHeight = height + marginBottom
      setTestimonialHeight(totalHeight)
    }
  }, [])

  const MotionDiv = motion.div

  return (
    <Section delay={delay}>
      <div className="card-header">
        <div className="card-semi-header">
          <Star size={16} className="card-icon" />
          <p>LinkedIn</p>
        </div>
        <h3>Peer Recommendations</h3>
      </div>
      <div className="testimonials-carousel">
        <MotionDiv
          className="testimonials-track"
          animate={{ y: -currentIndex * testimonialHeight }}
          transition={{ 
            duration: 1.2, 
            ease: [0.4, 0.0, 0.2, 1] 
          }}
        >
          {loopedTestimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`testimonial ${index % 2 === 0 ? 'testimonial-even' : ''}`}
              ref={index === 0 ? testimonialRef : null}
            >
              <div className="testimonial-avatar">
                <img src={testimonial.avatar} alt={testimonial.name} />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-name">{testimonial.name}</div>
                <div className="testimonial-location">{testimonial.location}</div>
                <div className="testimonial-quote">"{testimonial.quote}"</div>
              </div>
            </div>
          ))}
        </MotionDiv>
      </div>
    </Section>
  )
}


