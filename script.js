 // Wait for the DOM to be fully loaded
  document.addEventListener ('DOMContentLoaded', function() {
    // Hide loader when page is loaded
    setTimeout(function() {
      document.querySelector('.loader-wrapper').style.opacity = '0';
      setTimeout(function() {
        document.querySelector('.loader-wrapper').style.display = 'none';
      }, 500);
    }, 1000);
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      const backToTop = document.querySelector('.back-to-top');
      
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('active');
      } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('active');
      }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkScroll() {
      animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }

    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      });
    }
  });

// JavaScript untuk AI Assistant
document.addEventListener('DOMContentLoaded', function() {
  // Elemen UI
  const aiButton = document.getElementById('ai-button');
  const aiChatContainer = document.getElementById('ai-chat-container');
  const aiClose = document.getElementById('ai-close');
  const aiChatMessages = document.getElementById('ai-chat-messages');
  const aiUserInput = document.getElementById('ai-user-input');
  const aiSend = document.getElementById('ai-send');
  
  // Toggle chat window
  aiButton.addEventListener('click', () => {
    aiChatContainer.style.display = aiChatContainer.style.display === 'flex' ? 'none' : 'flex';
    if (aiChatContainer.style.display === 'flex') {
      aiUserInput.focus();
    }
  });
  
  aiClose.addEventListener('click', () => {
    aiChatContainer.style.display = 'none';
  });
  
  // Fungsi untuk menampilkan indikator typing
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    aiChatMessages.appendChild(typingDiv);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    return typingDiv;
  }
  
  // Knowledge base untuk AI Assistant
  const knowledgeBase = {
    greetings: ["halo", "hai", "hi", "hello", "hei", "hola", "hey", "apa kabar"],
    skills: ["skill", "kemampuan", "keahlian", "bisa apa", "expertise", "ability", "teknologi", "teknis"],
    projects: ["project", "proyek", "karya", "portfolio", "pekerjaan", "hasil kerja", "aplikasi", "website"],
    contact: ["kontak", "hubungi", "email", "telepon", "whatsapp", "media sosial", "sosmed", "instagram", "linkedin"],
    thanks: ["terima kasih", "thanks", "thank you", "makasih", "thx", "gracias"],
    help: ["bantuan", "help", "bantu", "tolong", "caranya", "how to", "how do", "cara"],
    education: ["pendidikan", "education", "sekolah", "kuliah", "lulusan", "almamater", "kampus", "universitas"],
    experience: ["pengalaman", "experience", "kerja", "bekerja", "pekerjaan", "karir", "pengalaman kerja"],
    services: ["jasa", "service", "layanan", "freelance", "freelancer", "harga", "bayaran", "upah"],
    about: ["tentang", "about", "siapa", "perkenalan", "intro", "perkenalkan"]
  };
  
  // Responses untuk AI Assistant
  const responses = {
    greeting: "Halo! Senang bertemu dengan Anda. Ada yang bisa saya bantu tentang portofolio Zahra?",
    skill: "Zahra memiliki kemampuan dalam HTML, CSS dan JavaScript. Dia juga sedang mempelajari machine learning dan AI development. Skill utamanya adalah UI/UX designer dan frontend development.",
    project: "Zahra telah mengerjakan beberapa project termasuk website portofolio ini, aplikasi todo list, website e-commerce sederhana, dan beberapa project machine learning dasar. Semua project bisa dilihat di halaman project portofolio ini.",
    contact: "Anda dapat menghubungi Zahra melalui email: zyulear27@gmail.com. Jangan ragu untuk menghubungi! Zahra senang berkolaborasi dalam project menarik.",
    thanks: "Sama-sama! Senang bisa membantu. Jika ada pertanyaan lagi, silakan tanyakan saja. Jangan lupa cek project-project Zahra ya!",
    help: "Saya di sini untuk membantu menjawab pertanyaan tentang Zahra. Anda bisa menanyakan tentang skill, project, pengalaman, pendidikan, atau cara menghubungi Zahra.",
    education: "Zahra adalah mahasiswi dari Universitas Muhammadiyah Purwekerto Semester 5. Dia aktif dalam membuat project-project kecil dan sering mengikuti perkembangan inovasi teknologi.",
    experience: "Zahra memiliki pengalaman magang sebagai UI/UX designer dan web developer di Upwork. Dia juga aktif dalam project freelance dan open source. Saat ini Zahra sedang mencari opportunities sebagai UI/UX designer dan frontend developer.",
    services: "Zahra menerima jasa pembuatan website dan aplikasi web. Untuk informasi lebih lanjut tentang layanan dan harga, silakan hubungi Zahra langsung melalui email.",
    about: "Zahra adalah seorang UI/UX designer dan programmer pemula yang passionate terhadap teknologi web dan AI. Selain coding, Zahra juga suka menulis artikel tech dan berbagi pengetahuan di blog pribadi.",
    default: "Maaf, saya tidak mengerti pertanyaan Anda. Cukup ketik skill, freelance, project, pengalaman, pendidikan, atau cara menghubungi Zahra. Atau mungkin Anda bisa menjelaskan dengan cara berbeda?",
  };
  
  // Fungsi untuk memahami pesan pengguna
  function understandMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (knowledgeBase.greetings.some(word => lowerMessage.includes(word))) {
      return "greeting";
    } else if (knowledgeBase.skills.some(word => lowerMessage.includes(word))) {
      return "skill";
    } else if (knowledgeBase.projects.some(word => lowerMessage.includes(word))) {
      return "project";
    } else if (knowledgeBase.contact.some(word => lowerMessage.includes(word))) {
      return "contact";
    } else if (knowledgeBase.thanks.some(word => lowerMessage.includes(word))) {
      return "thanks";
    } else if (knowledgeBase.help.some(word => lowerMessage.includes(word))) {
      return "help";
    } else if (knowledgeBase.education.some(word => lowerMessage.includes(word))) {
      return "education";
    } else if (knowledgeBase.experience.some(word => lowerMessage.includes(word))) {
      return "experience";
    } else if (knowledgeBase.services.some(word => lowerMessage.includes(word))) {
      return "services";
    } else if (knowledgeBase.about.some(word => lowerMessage.includes(word))) {
      return "about";
    } else {
      return "default";
    }
  }
  
  // Fungsi untuk menghasilkan respons AI
  function generateAIResponse(message) {
    const intent = understandMessage(message);
    return responses[intent] || responses.default;
  }
  
  // Fungsi untuk mengirim pesan ke AI (rule-based)
  async function sendMessageToAI(message) {
    // Simulasi delay seperti AI sedang memproses
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
    
    // Generate respons berdasarkan aturan
    return generateAIResponse(message);
  }
  
  // Fungsi untuk menambahkan pesan ke chat
  function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    messageDiv.textContent = text;
    aiChatMessages.appendChild(messageDiv);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }
  
  // Event listener untuk mengirim pesan
  aiSend.addEventListener('click', async () => {
    const message = aiUserInput.value.trim();
    if (message) {
      addMessage(message, true);
      aiUserInput.value = '';
      aiSend.disabled = true;
      
      // Tampilkan indikator typing
      const typingIndicator = showTypingIndicator();
      
      // Kirim ke AI dan dapatkan balasan
      const reply = await sendMessageToAI(message);
      
      // Hapus indikator typing dan tampilkan balasan
      aiChatMessages.removeChild(typingIndicator);
      addMessage(reply, false);
      aiSend.disabled = false;
    }
  });
  
  // Juga kirim dengan Enter key
  aiUserInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      aiSend.click();
    }
  });
});
