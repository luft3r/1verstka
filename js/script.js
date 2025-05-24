document.addEventListener('DOMContentLoaded', function() {
    // --- Кнопка наверх ---
    const toTopBtn = document.getElementById('to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            toTopBtn.classList.add('show');
        } else {
            toTopBtn.classList.remove('show');
        }
    });
    toTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Форма обратной связи ---
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = feedbackForm.elements['name'].value.trim();
            const email = feedbackForm.elements['email'].value.trim();
            const message = feedbackForm.elements['message'].value.trim();
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }
            // Отправка через Formspree (или другой сервис)
            fetch('https://formspree.io/f/mjkwqvab', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(feedbackForm)
            })
            .then(response => {
                if (response.ok) {
                    alert('Спасибо! Ваше сообщение отправлено.');
                    feedbackForm.reset();
                } else {
                    alert('Ошибка отправки. Попробуйте позже.');
                }
            })
            .catch(() => {
                alert('Ошибка сети. Попробуйте позже.');
            });
        });
    }

    // --- Переключатель языков ---
    const langBtns = document.querySelectorAll('.lang-btn');
    const langData = {
        ru: {
            about: 'about me',
            aboutText: 'Привет! 1 попытка верстки сайта.<br>Здесь вы найдёте мои контакты, а снизу мой любимый аниме персонаж.',
            haise: 'Хайсе Сасаки',
            haiseQuote: '"Я хочу защищать людей, даже если это будет стоить мне всего."',
            gallery: 'Галерея',
            gallerySoon: '[ Галерея скоро появится ]',
            contacts: 'Контакты',
            achievements: 'Достижения',
            achievementsList: ['Сделал свой первый сайт','Изучаю CSS и JS'],
            aboutMe: 'Обо мне',
            aboutCards: ['Любимый жанр: киберпанк','Хобби: аниме, музыка, кодинг','Любимая цитата: “В этом мире есть вещи, которые нельзя защитить...”'],
            feedback: 'Обратная связь',
            feedbackName: 'Ваше имя',
            feedbackEmail: 'E-mail',
            feedbackMsg: 'Сообщение',
            feedbackBtn: 'Отправить',
            footer: '&copy; 2025 luft3r.dev@gmail.com'
        },
        en: {
            about: 'about me',
            aboutText: 'Hi! My first attempt at web design.<br>Here you will find my contacts, and below is my favorite anime character.',
            haise: 'Haise Sasaki',
            haiseQuote: '"I want to protect people, even if it costs me everything."',
            gallery: 'Gallery',
            gallerySoon: '[ Gallery coming soon ]',
            contacts: 'Contacts',
            achievements: 'Achievements',
            achievementsList: ['Created my first website','Learning CSS and JS'],
            aboutMe: 'About Me',
            aboutCards: ['Favorite genre: cyberpunk','Hobbies: anime, music, coding','Favorite quote: “There are things in this world that cannot be protected...”'],
            feedback: 'Feedback',
            feedbackName: 'Your name',
            feedbackEmail: 'E-mail',
            feedbackMsg: 'Message',
            feedbackBtn: 'Send',
            footer: '&copy; 2025 luft3r.dev@gmail.com'
        },
        ua: {
            about: 'про мене',
            aboutText: 'Привіт! Перша спроба верстки сайту.<br>Тут ви знайдете мої контакти, а нижче — улюблений аніме персонаж.',
            haise: 'Хайсе Сасакі',
            haiseQuote: '"Я хочу захищати людей, навіть якщо це буде коштувати мені всього."',
            gallery: 'Галерея',
            gallerySoon: '[ Галерея скоро з’явиться ]',
            contacts: 'Контакти',
            achievements: 'Досягнення',
            achievementsList: ['Зробив свій перший сайт','Вивчаю CSS та JS'],
            aboutMe: 'Про мене',
            aboutCards: ['Улюблений жанр: кіберпанк','Хобі: аніме, музика, кодування','Улюблена цитата: “У цьому світі є речі, які не можна захистити...”'],
            feedback: 'Зворотний зв’язок',
            feedbackName: "Ваше ім'я",
            feedbackEmail: 'E-mail',
            feedbackMsg: 'Повідомлення',
            feedbackBtn: 'Відправити',
            footer: '&copy; 2025 luft3r.dev@gmail.com'
        }
    };
    if (langBtns.length) {
        langBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                langBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                setLang(this.dataset.lang);
            });
        });
        function setLang(lang) {
            const d = langData[lang];
            if (!d) return;
            document.querySelector('.about h2').textContent = d.about;
            document.querySelector('.about p').innerHTML = d.aboutText;
            document.querySelector('.haise-block h2').textContent = d.haise;
            document.querySelector('.haise-block blockquote').textContent = d.haiseQuote;
            document.querySelector('.gallery h2').textContent = d.gallery;
            document.querySelector('.gallery-placeholder').textContent = d.gallerySoon;
            document.querySelector('.contacts h2').textContent = d.contacts;
            document.querySelector('.achievements h2').textContent = d.achievements;
            const achList = document.querySelectorAll('.achievements ul li');
            d.achievementsList.forEach((txt, i) => { if(achList[i]) achList[i].textContent = txt; });
            document.querySelector('.about-cards h2').textContent = d.aboutMe;
            const aboutCards = document.querySelectorAll('.about-card');
            d.aboutCards.forEach((txt, i) => { if(aboutCards[i]) aboutCards[i].textContent = txt; });
            document.querySelector('.feedback h2').textContent = d.feedback;
            feedbackForm.elements['name'].placeholder = d.feedbackName;
            feedbackForm.elements['email'].placeholder = d.feedbackEmail;
            feedbackForm.elements['message'].placeholder = d.feedbackMsg;
            feedbackForm.querySelector('button[type="submit"]').textContent = d.feedbackBtn;
            document.querySelector('footer p').innerHTML = d.footer;
        }
        setLang('ru');
    }

    // --- Музыкальный плеер ---
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    let isPlaying = false;
    if (music && musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                music.pause();
                musicBtn.classList.remove('active');
            } else {
                music.play();
                musicBtn.classList.add('active');
            }
            isPlaying = !isPlaying;
        });
        window.addEventListener('beforeunload', () => {
            music.pause();
            music.currentTime = 0;
        });
    }

    // --- 5. Аниме-цитата дня ---
    const animeQuotes = [
        '“В этом мире есть вещи, которые нельзя защитить...”',
        '“Все мы носим маски.”',
        '“Я не хочу быть монстром.”',
        '“Боль — это часть взросления.”',
        '“Люди сильнее, чем думают.”',
        '“Я хочу защищать людей, даже если это будет стоить мне всего.”',
        '“Иногда нужно отпустить прошлое.”',
        '“Слабость — не преступление.”',
        '“Я — Гуль. И я человек.”',
        '“Смысл жизни — в борьбе.”'
    ];
    const quoteBlock = document.getElementById('anime-quote-text');
    if (quoteBlock) {
        const q = animeQuotes[Math.floor(Math.random() * animeQuotes.length)];
        quoteBlock.textContent = q;
    }

    // --- 9. Гостевая книга ---
    const guestForm = document.querySelector('.guestbook-form');
    const guestList = document.querySelector('.guestbook-list');
    if (guestForm && guestList) {
        // Загрузка из localStorage
        function renderGuestbook() {
            guestList.innerHTML = '';
            const entries = JSON.parse(localStorage.getItem('guestbook') || '[]');
            entries.slice().reverse().forEach(entry => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="guestbook-name">${entry.name}:</span> ${entry.msg}`;
                guestList.appendChild(li);
            });
        }
        renderGuestbook();
        guestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = guestForm.elements['guestname'].value.trim();
            const msg = guestForm.elements['guestmsg'].value.trim();
            if (!name || !msg) return;
            const entries = JSON.parse(localStorage.getItem('guestbook') || '[]');
            entries.push({ name, msg });
            localStorage.setItem('guestbook', JSON.stringify(entries));
            guestForm.reset();
            renderGuestbook();
        });
    }

    // --- 12. Кнопки поделиться ---
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const url = window.location.href;
            if (btn.dataset.share === 'vk') {
                window.open(`https://vk.com/share.php?url=${encodeURIComponent(url)}`);
            } else if (btn.dataset.share === 'tg') {
                window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`);
            } else if (btn.dataset.share === 'wa') {
                window.open(`https://wa.me/?text=${encodeURIComponent(url)}`);
            } else if (btn.dataset.share === 'copy') {
                navigator.clipboard.writeText(url);
                btn.textContent = 'Скопировано!';
                setTimeout(() => { btn.textContent = 'Скопировать ссылку'; }, 1200);
            }
        });
    });

    // --- 15. Пасхалка ---
    let eggClicks = 0;
    document.body.addEventListener('click', function(e) {
        if (e.ctrlKey && e.altKey) {
            const egg = document.getElementById('easter-egg');
            if (egg) egg.style.display = 'block';
        }
    });
    const egg = document.getElementById('easter-egg');
    if (egg) {
        egg.addEventListener('click', function() {
            eggClicks++;
            if (eggClicks >= 3) {
                egg.style.display = 'none';
                eggClicks = 0;
            }
        });
    }

    // --- Админ-панель для гостевой книги ---
    const ADMIN_PASS = 'kaneki2025'; // Задайте свой пароль!
    let isAdmin = false;
    const adminPanel = document.getElementById('admin-panel');
    const adminLoginBlock = document.getElementById('admin-login-block');
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const adminLogoutBtn = document.getElementById('admin-logout');
    const adminPassInput = document.getElementById('admin-pass');
    const adminLoginError = document.getElementById('admin-login-error');
    const adminGuestList = document.querySelector('.admin-guestbook-list');

    function showAdminPanel() {
        isAdmin = true;
        adminPanel.style.display = 'block';
        adminLoginBlock.style.display = 'none';
        renderAdminGuestbook();
    }
    function hideAdminPanel() {
        isAdmin = false;
        adminPanel.style.display = 'none';
        adminLoginBlock.style.display = 'none';
    }
    function showAdminLogin() {
        adminLoginBlock.style.display = 'block';
        adminPanel.style.display = 'none';
        adminLoginError.textContent = '';
        adminPassInput.value = '';
    }
    function renderAdminGuestbook() {
        adminGuestList.innerHTML = '';
        const entries = JSON.parse(localStorage.getItem('guestbook') || '[]');
        entries.slice().reverse().forEach((entry, idx, arr) => {
            const li = document.createElement('li');
            li.innerHTML = `<span class='guestbook-name'>${entry.name}:</span> ${entry.msg}`;
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Удалить';
            delBtn.className = 'delete-btn';
            delBtn.onclick = function() {
                // Удаляем из оригинального массива
                arr.splice(idx, 1);
                localStorage.setItem('guestbook', JSON.stringify(arr.slice().reverse()));
                renderAdminGuestbook();
                if (guestList) renderGuestbook();
            };
            li.appendChild(delBtn);
            adminGuestList.appendChild(li);
        });
    }
    // Вход по Ctrl+Shift+Alt+клик по футеру
    const footer = document.querySelector('footer');
    if (footer) {
        footer.addEventListener('click', function(e) {
            if (e.ctrlKey && e.shiftKey && e.altKey) {
                showAdminLogin();
            }
        });
    }
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', function() {
            if (adminPassInput.value === ADMIN_PASS) {
                showAdminPanel();
            } else {
                adminLoginError.textContent = 'Неверный пароль!';
            }
        });
    }
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', function() {
            hideAdminPanel();
        });
    }
});