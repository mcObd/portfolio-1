// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll(".section")
const typedText = document.getElementById("typed-text")
const contactForm = document.getElementById("contact-form")

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

// Intersection Observer for section animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

sections.forEach((section) => {
  observer.observe(section)
})

// Typing animation
const typingTexts = ["Web Design", "UI/UX", "Copywriting", "Front-End Dev"]
let textIndex = 0
let charIndex = 0
let isDeleting = false

function typeText() {
  const currentText = typingTexts[textIndex]

  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    typedText.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % typingTexts.length
    typeSpeed = 500
  }

  setTimeout(typeText, typeSpeed)
}

// Start typing animation
typeText()

// Testimonial Slider
class TestimonialSlider {
  constructor() {
    this.slides = document.querySelectorAll(".testimonial-slide")
    this.prevBtn = document.querySelector(".prev-arrow")
    this.nextBtn = document.querySelector(".next-arrow")
    this.currentSlide = 0
    this.isAutoPlaying = true
    this.autoPlayInterval = null

    this.init()
  }

  init() {
    this.showSlide(0)
    this.startAutoPlay()

    this.prevBtn.addEventListener("click", () => this.prevSlide())
    this.nextBtn.addEventListener("click", () => this.nextSlide())

    // Pause autoplay on hover
    const slider = document.querySelector(".testimonial-slider")
    slider.addEventListener("mouseenter", () => this.stopAutoPlay())
    slider.addEventListener("mouseleave", () => this.startAutoPlay())
  }

  showSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"))
    this.slides[index].classList.add("active")
    this.currentSlide = index
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length
    this.showSlide(next)
  }

  prevSlide() {
    const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.showSlide(prev)
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval)
  }
}

// Initialize testimonial slider
new TestimonialSlider()

// Contact Form Handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const project = formData.get("project")

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".btn-pulse")
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>'
  submitBtn.disabled = true

  setTimeout(() => {
    submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>'
    submitBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)"

    setTimeout(() => {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      submitBtn.style.background = ""
      contactForm.reset()
    }, 3000)
  }, 2000)
})

// Scroll event listeners
window.addEventListener("scroll", () => {
  updateActiveNavLink()
})

// Page load animation
window.addEventListener("load", () => {
  document.body.style.opacity = "1"
})

// Add fade-in animation to body
document.body.style.opacity = "0"
document.body.style.transition = "opacity 0.5s ease-in-out"

// Parallax effect for floating shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".floating-shape")

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
  })
})

// Add smooth hover effects to service cards
const serviceCards = document.querySelectorAll(".service-card")
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Add click effect to buttons
const buttons = document.querySelectorAll(".btn")
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect CSS
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add initial visible class to hero section
  document.querySelector("#home").classList.add("visible")

  // Preload images for better performance
  const images = [
    "/placeholder.svg?height=400&width=350",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
  ]

  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})
