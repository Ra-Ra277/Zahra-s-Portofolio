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
/* FILENAME: ai-widget.js
   DESCRIPTION: Script ini akan menyuntikkan (inject) AI Assistant ke dalam halaman HTML manapun.
*/

(function() {
    // --- 1. DEFINISI CSS (TAMPILAN) ---
    const widgetStyles = `
        #ai-assistant-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9999;
            font-family: 'Poppins', sans-serif;
        }
        
        #ai-toggle-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff6b6b, #6c5ce7);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            font-size: 24px;
            transition: all 0.3s ease;
            animation: pulse-ai 2s infinite;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #ai-toggle-btn:hover {
            transform: scale(1.1);
        }

        @keyframes pulse-ai {
            0% { box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(108, 92, 231, 0); }
            100% { box-shadow: 0 0 0 0 rgba(108, 92, 231, 0); }
        }
        
        #ai-chat-box {
            display: none;
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 450px;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(0,0,0,0.1);
            animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes popIn {
            from { opacity: 0; transform: scale(0.5) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        #ai-header {
            padding: 15px;
            background: linear-gradient(to right, #6c5ce7, #ff6b6b);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #ai-header h3 { margin: 0; font-size: 1rem; font-weight: 600; }
        
        #ai-close-btn {
            background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem;
        }
        
        #ai-messages-area {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background: #f8f9fa;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .ai-msg-bubble {
            padding: 10px 15px;
            border-radius: 15px;
            max-width: 80%;
            font-size: 0.9rem;
            line-height: 1.4;
            word-wrap: break-word;
        }
        
        .user-bubble {
            background: #6c5ce7;
            color: white;
            margin-left: auto;
            border-bottom-right-radius: 2px;
        }
        
        .bot-bubble {
            background: #e9ecef;
            color: #333;
            margin-right: auto;
            border-bottom-left-radius: 2px;
        }
        
        #ai-input-area {
            padding: 15px;
            border-top: 1px solid #eee;
            background: white;
            display: flex;
            gap: 10px;
        }
        
        #ai-input-text {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
            font-size: 0.9rem;
        }
        
        #ai-send-btn {
            background: none; border: none;
            color: #6c5ce7;
            font-size: 1.2rem;
            cursor: pointer;
            transition: 0.2s;
        }
        
        #ai-send-btn:hover { transform: scale(1.1); color: #ff6b6b; }

        /* Typing Indicator */
        .typing-indicator { display: flex; gap: 5px; padding: 10px; background: #e9ecef; width: fit-content; border-radius: 15px; }
        .typing-dot { width: 6px; height: 6px; background: #888; border-radius: 50%; animation: bounce 1.4s infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
    `;

    // --- 2. BUAT ELEMEN HTML ---
    const widgetHTML = `
        <button id="ai-toggle-btn"><i class="fas fa-robot"></i></button>
        <div id="ai-chat-box">
            <div id="ai-header">
                <h3>Zahra Assistant</h3>
                <button id="ai-close-btn"><i class="fas fa-times"></i></button>
            </div>
            <div id="ai-messages-area">
                <div class="ai-msg-bubble bot-bubble">Halo! Aku asisten virtual Zahra. Ada yang bisa dibantu tentang portfolio ini? 😊</div>
            </div>
            <div id="ai-input-area">
                <input type="text" id="ai-input-text" placeholder="Tanya sesuatu..." autocomplete="off">
                <button id="ai-send-btn"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;

    // --- 3. FUNGSI INISIALISASI ---
    function initAIWidget() {
        // A. Inject CSS ke Head
        const styleSheet = document.createElement("style");
        styleSheet.innerText = widgetStyles;
        document.head.appendChild(styleSheet);

        // B. Inject HTML ke Body
        const container = document.createElement("div");
        container.id = "ai-assistant-widget";
        container.innerHTML = widgetHTML;
        document.body.appendChild(container);

        // C. Logika JavaScript (Otak AI)
        setupAILogic();
    }

    // --- 4. LOGIKA AI (KNOWLEDGE BASE & EVENT LISTENERS) ---
    function setupAILogic() {
        const toggleBtn = document.getElementById('ai-toggle-btn');
        const chatBox = document.getElementById('ai-chat-box');
        const closeBtn = document.getElementById('ai-close-btn');
        const inputField = document.getElementById('ai-input-text');
        const sendBtn = document.getElementById('ai-send-btn');
        const messagesArea = document.getElementById('ai-messages-area');

        // Toggle Chat
        toggleBtn.addEventListener('click', () => {
            chatBox.style.display = 'flex';
            toggleBtn.style.display = 'none';
            inputField.focus();
        });

        closeBtn.addEventListener('click', () => {
            chatBox.style.display = 'none';
            toggleBtn.style.display = 'flex';
        });

        // Knowledge Base
        const knowledgeBase = {
            greetings: ["halo", "hai", "hi", "pagi", "siang", "malam", "assalamualaikum"],
            about: ["siapa", "zahra", "profil", "tentang", "pembuat", "author"],
            skills: ["skill", "bisa apa", "kemampuan", "coding", "bahasa", "tools"],
            projects: ["project", "karya", "portfolio", "buatan", "hasil"],
            contact: ["kontak", "email", "hubungi", "wa", "whatsapp", "ig", "instagram"],
            games: ["game", "main", "permainan", "labirin"],
            love: ["pacar", "jomblo", "cinta", "sayang", "love"]
        };

        const responses = {
            greetings: "Halo kak! Selamat datang di portfolio Zahra Yulia. Mau lihat project atau main game?",
            about: "Aku adalah AI representasi dari Zahra Yulia. Zahra adalah UI/UX Designer, Programmer, dan Penulis yang kreatif! ✨",
            skills: "Zahra jago di UI/UX Design (Figma), Web Development (HTML, CSS, JS, PHP), dan juga menulis kreatif.",
            projects: "Banyak project keren! Ada 'Restaurant App', 'SmartBudget', sampai game interaktif. Scroll ke bagian Projects ya!",
            contact: "Bisa hubungi Zahra via email di zyulear27@gmail.com atau DM Instagram @zyulear.",
            games: "Bosen? Main game aja! Zahra bikin game 'Labirin Aksara' lho. Cek menu Games di atas.",
            love: "Waduh, privasi dong! 😜 Tapi kalau mau kasih surprise, coba klik 'Special Surprise' di bagian project.",
            default: "Maaf, aku kurang paham. Coba tanya tentang 'Skill', 'Project', atau 'Kontak' ya! 🙏"
        };

        function getBotResponse(input) {
            input = input.toLowerCase();
            if (knowledgeBase.greetings.some(k => input.includes(k))) return responses.greetings;
            if (knowledgeBase.about.some(k => input.includes(k))) return responses.about;
            if (knowledgeBase.skills.some(k => input.includes(k))) return responses.skills;
            if (knowledgeBase.projects.some(k => input.includes(k))) return responses.projects;
            if (knowledgeBase.contact.some(k => input.includes(k))) return responses.contact;
            if (knowledgeBase.games.some(k => input.includes(k))) return responses.games;
            if (knowledgeBase.love.some(k => input.includes(k))) return responses.love;
            return responses.default;
        }

        function addMessage(text, sender) {
            const div = document.createElement('div');
            div.classList.add('ai-msg-bubble', sender === 'user' ? 'user-bubble' : 'bot-bubble');
            div.textContent = text;
            messagesArea.appendChild(div);
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }

        async function handleSend() {
            const text = inputField.value.trim();
            if (!text) return;

            // 1. User Message
            addMessage(text, 'user');
            inputField.value = '';

            // 2. Typing Indicator
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
            messagesArea.appendChild(typingDiv);
            messagesArea.scrollTop = messagesArea.scrollHeight;

            // 3. Simulate Thinking Delay
            await new Promise(r => setTimeout(r, 1000));
            typingDiv.remove();

            // 4. Bot Response
            const reply = getBotResponse(text);
            addMessage(reply, 'bot');
        }

        sendBtn.addEventListener('click', handleSend);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    // Jalankan Widget saat halaman selesai dimuat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAIWidget);
    } else {
        initAIWidget();
    }

})();

