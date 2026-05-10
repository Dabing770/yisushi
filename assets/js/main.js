document.addEventListener('DOMContentLoaded', () => {
    initPageTransitions();
    initIntro();

    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileNavToggle.setAttribute('aria-expanded', nav.classList.contains('active').toString());
        });
    }

    // Language switcher
    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const lang = e.target.dataset.lang;
                if (lang) {
                    setLanguage(lang);
                }
            }
        });
    }
    
    // Set initial language
    const savedLang = localStorage.getItem('lang') || (navigator.language.startsWith('fi') ? 'fi' : 'en');
    setLanguage(savedLang);


    // Menu rendering
    const menuContainer = document.getElementById('menu-container');
    const menuSource = window.menuData;
    if (menuContainer) {
        if (menuSource && Array.isArray(menuSource.categories)) {
            renderMenu(menuSource.categories);
        } else {
            menuContainer.innerHTML = '<p class="menu-empty">Menu data could not be loaded.</p>';
        }
    }

    // Menu search
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput && menuSource && Array.isArray(menuSource.categories)) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCategories = menuSource.categories.map(category => {
                const filteredItems = category.items.filter(item => item.name.toLowerCase().includes(searchTerm));
                return { ...category, items: filteredItems };
            }).filter(category => category.items.length > 0);
            renderMenu(filteredCategories);
        });
    }

});

function initPageTransitions() {
    const transitionMs = 260;

    window.requestAnimationFrame(() => {
        if (!document.body.classList.contains('has-intro')) {
            document.body.classList.add('page-loaded');
        }
    });

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) {
            return;
        }

        const href = link.getAttribute('href');
        const target = link.getAttribute('target');
        const isLanguageLink = link.closest('.lang-switcher');
        const isModifiedClick = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

        if (
            !href ||
            href.startsWith('#') ||
            href.startsWith('tel:') ||
            href.startsWith('mailto:') ||
            target === '_blank' ||
            isLanguageLink ||
            isModifiedClick
        ) {
            return;
        }

        const nextUrl = new URL(href, window.location.href);
        if (nextUrl.origin !== window.location.origin || nextUrl.href === window.location.href) {
            return;
        }

        e.preventDefault();
        document.body.classList.add('page-leaving');
        window.setTimeout(() => {
            window.location.href = nextUrl.href;
        }, transitionMs);
    });

    window.addEventListener('pageshow', () => {
        document.body.classList.remove('page-leaving');
        if (!document.body.classList.contains('has-intro')) {
            document.body.classList.add('page-loaded');
        }
    });
}

function initIntro() {
    const intro = document.querySelector('.intro');
    if (!intro) {
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealDelay = reduceMotion ? 180 : 1900;
    const removeDelay = reduceMotion ? 360 : 2850;

    window.setTimeout(() => {
        document.body.classList.remove('has-intro');
        document.body.classList.add('intro-ready');
        document.body.classList.add('page-loaded');
    }, revealDelay);

    window.setTimeout(() => {
        intro.classList.add('is-hidden');
        intro.remove();
    }, removeDelay);
}

function renderMenu(categories) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('menu-category');
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.name;
        categoryDiv.appendChild(categoryTitle);

        category.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');

            const itemHeader = document.createElement('div');
            itemHeader.classList.add('menu-item-header');

            const itemName = document.createElement('span');
            itemName.classList.add('menu-item-name');
            itemName.textContent = item.name;
            itemHeader.appendChild(itemName);

            const itemPrice = document.createElement('span');
            itemPrice.classList.add('menu-item-price');
            itemPrice.textContent = item.price;
            itemHeader.appendChild(itemPrice);
            
            itemDiv.appendChild(itemHeader);

            if (item.description) {
                const itemDescription = document.createElement('p');
                itemDescription.classList.add('menu-item-description');
                itemDescription.textContent = item.description;
                itemDiv.appendChild(itemDescription);
            }

            categoryDiv.appendChild(itemDiv);
        });
        menuContainer.appendChild(categoryDiv);
    });
}

const translations = {
    en: {
        home: 'Home',
        mobileMenu: 'Menu',
        menuSearch: 'Search the menu...',
        makeReservation: 'Make a Reservation',
        callButton: 'Call 0449819446',
        viewMenu: 'View Menu',
        address: 'Address',
        openingHours: 'Opening Hours',
        weekdayRange: 'MON-FRI',
        weekendRange: 'SAT-SUN',
        lunchLabel: 'Lunch',
        aboutUs: 'About Us',
        homeType: 'Sushi and Chinese restaurant',
        homeLead: 'Fresh sushi and warm Chinese dishes in the centre of Loimaa. Welcome for lunch, dinner or a table reservation by phone.',
        byPhone: 'By phone',
        reservationPhone: 'Reserve a table by calling 0449819446.',
        menuHeading: 'Sushi, warm dishes and lunch.',
        menuIntro: 'On the menu page you can browse dishes by category and search by dish name.',
        openMenu: 'Open menu',
        welcomeHeading: 'Welcome to Yi Sushi.',
        lunchSummary: 'MON-FRI 10:30-20:00, lunch 10:30-19:00. SAT-SUN 11:30-20:00, lunch 11:30-19:00.',
        aboutText1: 'Yi Sushi is a family-owned restaurant in the heart of Loimaa. We proudly offer a combination of authentic Chinese flavors and fresh, high-quality sushi. It is important to us to use the best ingredients and prepare each dish with care and love.',
        aboutText2: 'Whether it’s lunch, dinner, or a takeaway meal, our goal is always to provide warm service and a delicious taste experience. We believe that good food brings people together, and we want to be a place where locals can gather to enjoy good company and an excellent meal. Welcome!',
        menu: 'Menu',
        location: 'Location',
        lunchHours: 'Lunch Hours',
        reservation: 'Reservation',
        reservationInfo: 'Please make a reservation by phone:',
        contact: 'Contact',
        phone: 'Phone',
        lunchFull: 'MON-FRI 10:30-20:00, lunch 10:30-19:00. SAT-SUN 11:30-20:00, lunch 11:30-19:00.',
    },
    fi: {
        home: 'Etusivu',
        mobileMenu: 'Valikko',
        menuSearch: 'Hae ruokalistalta...',
        makeReservation: 'Tee pöytävaraus',
        callButton: 'Soita 0449819446',
        viewMenu: 'Katso menu',
        address: 'Osoite',
        openingHours: 'Aukioloajat',
        weekdayRange: 'MA-PE',
        weekendRange: 'LA-SU',
        lunchLabel: 'Lounas',
        aboutUs: 'Meistä',
        homeType: 'Sushi ja kiinalainen ravintola',
        homeLead: 'Tuoretta sushia ja lämpimiä kiinalaisia annoksia Loimaan keskustassa. Tervetuloa lounaalle, illalliselle tai tekemään pöytävaraus puhelimitse.',
        byPhone: 'Puhelimitse',
        reservationPhone: 'Varaa pöytä soittamalla numeroon 0449819446.',
        menuHeading: 'Sushi, lämpimät annokset ja lounas.',
        menuIntro: 'Menu-sivulla voit selata annoksia kategorioittain ja hakea ruokia nimen perusteella.',
        openMenu: 'Avaa menu',
        welcomeHeading: 'Tervetuloa Yi Sushiin.',
        lunchSummary: 'MA-PE 10:30-20:00, lounas 10:30-19:00. LA-SU 11:30-20:00, lounas 11:30-19:00.',
        aboutText1: 'Yi Sushi on perheomisteinen ravintola Loimaan sydämessä. Tarjoamme ylpeänä yhdistelmän aitoja kiinalaisia makuja ja tuoretta, laadukasta sushia. Meille on tärkeää käyttää parhaita raaka-aineita ja valmistaa jokainen annos huolella ja rakkaudella.',
        aboutText2: 'Olipa kyseessä lounas, illallinen tai noutoateria, tavoitteemme on aina tarjota lämmin palvelu ja herkullinen makuelämys. Uskomme, että hyvä ruoka yhdistää ihmisiä, ja haluamme olla paikka, jossa paikalliset voivat kokoontua nauttimaan hyvästä seurasta ja erinomaisesta ateriasta. Tervetuloa tutustumaan!',
        menu: 'Menu',
        location: 'Sijainti',
        lunchHours: 'Lounasajat',
        reservation: 'Pöytävaraus',
        reservationInfo: 'Teethän pöytävarauksen puhelimitse numeroon:',
        contact: 'Yhteystiedot',
        phone: 'Puhelin',
        lunchFull: 'MA-PE 10:30-20:00, lounas 10:30-19:00. LA-SU 11:30-20:00, lounas 11:30-19:00.',
    }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    
    // Update UI text
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.dataset.translatePlaceholder;
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // Update active language link
    document.querySelectorAll('.lang-switcher a').forEach(a => {
        if (a.dataset.lang === lang) {
            a.classList.add('lang-active');
        } else {
            a.classList.remove('lang-active');
        }
    });
}
