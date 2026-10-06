/* =========================================================
   ROFLEQ'S HIDEOUT
   settings.js
   ========================================================= */


/* =========================================================
   DEFAULT SETTINGS
   ========================================================= */

const defaultSettings = {
    openInBlank: true,
    animatedBackground: true,
    backgroundSpeed: 1,
    backgroundTransparency: 1
};

const SETTINGS_KEYS = {
    openInBlank: "rofleqHideoutOpenInBlank",
    animatedBackground: "rofleqHideoutAnimatedBackground",
    backgroundSpeed: "rofleqHideoutBackgroundSpeed",
    backgroundTransparency: "rofleqHideoutBackgroundTransparency"
};

const FAVORITES_KEY =
    "rofleqHideoutFavorites";

const THEME_KEY =
    "rofleqHideoutTheme";


/* =========================================================
   THEME SYSTEM
   ========================================================= */

const THEMES = [
    {
        name: "red",
        primary: "#e3262e",
        secondary: "#20d65a"
    },
    {
        name: "green",
        primary: "#20d65a",
        secondary: "#e3262e"
    },
    {
        name: "purple",
        primary: "#9b59ff",
        secondary: "#20d65a"
    },
    {
        name: "blue",
        primary: "#3185ff",
        secondary: "#20d65a"
    },
    {
        name: "orange",
        primary: "#ff8a24",
        secondary: "#20d65a"
    }
];


function getThemeIndex() {
    const savedTheme =
        localStorage.getItem(THEME_KEY);

    const index =
        parseInt(savedTheme, 10);

    if (
        Number.isInteger(index) &&
        index >= 0 &&
        index < THEMES.length
    ) {
        return index;
    }

    return 0;
}


function applyTheme(index) {
    if (
        index < 0 ||
        index >= THEMES.length
    ) {
        index = 0;
    }

    const theme =
        THEMES[index];

    document.documentElement.setAttribute(
        "data-theme",
        theme.name
    );

    /*
       These variables make the theme work even if
       your CSS uses --theme-primary / --theme-secondary.
    */
    document.documentElement.style.setProperty(
        "--theme-primary",
        theme.primary
    );

    document.documentElement.style.setProperty(
        "--theme-secondary",
        theme.secondary
    );

    document.documentElement.style.setProperty(
        "--accent-color",
        theme.primary
    );

    document.documentElement.style.setProperty(
        "--theme-color",
        theme.primary
    );

    localStorage.setItem(
        THEME_KEY,
        String(index)
    );
}


function showThemeUnlockedNotification() {
    let notification =
        document.getElementById(
            "themeNotification"
        );

    if (!notification) {
        notification =
            document.createElement("div");

        notification.id =
            "themeNotification";

        notification.innerHTML = `
            <div class="theme-notification-title">
                Theme changes now unlocked!
            </div>

            <div class="theme-notification-text">
                Click the logo to cycle through themes.
            </div>
        `;

        document.body.appendChild(
            notification
        );
    }

    notification.classList.remove(
        "show"
    );

    void notification.offsetWidth;

    notification.classList.add(
        "show"
    );

    clearTimeout(
        notification._hideTimer
    );

    notification._hideTimer =
        setTimeout(
            function() {
                notification.classList.remove(
                    "show"
                );
            },
            3500
        );
}


function cycleTheme() {
    const oldIndex =
        getThemeIndex();

    const newIndex =
        (oldIndex + 1) %
        THEMES.length;

    applyTheme(newIndex);

    /*
       Show the notification when the cycle
       wraps from orange back to red.
    */
    if (
        oldIndex === THEMES.length - 1 &&
        newIndex === 0
    ) {
        showThemeUnlockedNotification();
    }
}


function initializeTheme() {
    applyTheme(
        getThemeIndex()
    );

    const logo =
        document.getElementById(
            "siteLogo"
        );

    if (!logo) {
        return;
    }

    logo.addEventListener(
        "click",
        function(event) {
            event.preventDefault();
            cycleTheme();
        }
    );
}


/* =========================================================
   SETTINGS STORAGE
   ========================================================= */

function getSetting(
    key,
    fallback
) {
    const value =
        localStorage.getItem(key);

    if (value === null) {
        return fallback;
    }

    if (
        value === "true"
    ) {
        return true;
    }

    if (
        value === "false"
    ) {
        return false;
    }

    const numberValue =
        Number(value);

    if (
        !Number.isNaN(numberValue)
    ) {
        return numberValue;
    }

    return value;
}


function setSetting(
    key,
    value
) {
    localStorage.setItem(
        key,
        String(value)
    );
}


function resetSetting(
    key,
    fallback
) {
    setSetting(
        key,
        fallback
    );

    initializeSettings();
}


/* =========================================================
   SETTINGS PANEL
   ========================================================= */

function initializeSettings() {
    const openInBlank =
        document.getElementById(
            "openInBlank"
        );

    const animatedBackground =
        document.getElementById(
            "animatedBackground"
        );

    const backgroundSpeed =
        document.getElementById(
            "backgroundSpeed"
        );

    const backgroundTransparency =
        document.getElementById(
            "backgroundTransparency"
        );


    if (openInBlank) {
        openInBlank.checked =
            getSetting(
                SETTINGS_KEYS.openInBlank,
                defaultSettings.openInBlank
            );

        openInBlank.onchange =
            function() {
                setSetting(
                    SETTINGS_KEYS.openInBlank,
                    openInBlank.checked
                );
            };
    }


    if (animatedBackground) {
        animatedBackground.checked =
            getSetting(
                SETTINGS_KEYS.animatedBackground,
                defaultSettings.animatedBackground
            );

        animatedBackground.onchange =
            function() {
                setSetting(
                    SETTINGS_KEYS.animatedBackground,
                    animatedBackground.checked
                );

                updateAnimatedBackground();
            };
    }


    if (backgroundSpeed) {
        backgroundSpeed.value =
            getSetting(
                SETTINGS_KEYS.backgroundSpeed,
                defaultSettings.backgroundSpeed
            );

        backgroundSpeed.oninput =
            function() {
                setSetting(
                    SETTINGS_KEYS.backgroundSpeed,
                    backgroundSpeed.value
                );

                updateBackgroundSpeed();
            };
    }


    if (backgroundTransparency) {
        backgroundTransparency.value =
            getSetting(
                SETTINGS_KEYS.backgroundTransparency,
                defaultSettings.backgroundTransparency
            );

        backgroundTransparency.oninput =
            function() {
                setSetting(
                    SETTINGS_KEYS.backgroundTransparency,
                    backgroundTransparency.value
                );

                updateBackgroundTransparency();
            };
    }


    updateAnimatedBackground();
    updateBackgroundSpeed();
    updateBackgroundTransparency();


    /*
       Reset buttons.

       They should have:
       data-setting="openInBlank"
       data-setting="animatedBackground"
       data-setting="backgroundSpeed"
       data-setting="backgroundTransparency"
    */

    const resetButtons =
        document.querySelectorAll(
            "[data-setting-reset]"
        );

    resetButtons.forEach(
        function(button) {
            button.onclick =
                function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    const setting =
                        button.getAttribute(
                            "data-setting-reset"
                        );

                    resetSettingByName(
                        setting
                    );
                };
        }
    );
}


function resetSettingByName(
    setting
) {
    if (
        setting === "openInBlank"
    ) {
        resetSetting(
            SETTINGS_KEYS.openInBlank,
            defaultSettings.openInBlank
        );
    }

    if (
        setting === "animatedBackground"
    ) {
        resetSetting(
            SETTINGS_KEYS.animatedBackground,
            defaultSettings.animatedBackground
        );
    }

    if (
        setting === "backgroundSpeed"
    ) {
        resetSetting(
            SETTINGS_KEYS.backgroundSpeed,
            defaultSettings.backgroundSpeed
        );
    }

    if (
        setting === "backgroundTransparency"
    ) {
        resetSetting(
            SETTINGS_KEYS.backgroundTransparency,
            defaultSettings.backgroundTransparency
        );
    }
}


/* =========================================================
   SETTINGS PANEL OPEN / CLOSE
   ========================================================= */

function initializeSettingsPanel() {
    const settingsButton =
        document.getElementById(
            "settingsButton"
        );

    const settingsPanel =
        document.getElementById(
            "settingsPanel"
        );

    const settingsClose =
        document.getElementById(
            "settingsClose"
        );


    if (
        settingsButton &&
        settingsPanel
    ) {
        settingsButton.addEventListener(
            "click",
            function() {
                settingsPanel.classList.toggle(
                    "open"
                );
            }
        );
    }


    if (
        settingsClose &&
        settingsPanel
    ) {
        settingsClose.addEventListener(
            "click",
            function() {
                settingsPanel.classList.remove(
                    "open"
                );
            }
        );
    }


    document.addEventListener(
        "keydown",
        function(event) {
            if (
                event.key === "Escape" &&
                settingsPanel
            ) {
                settingsPanel.classList.remove(
                    "open"
                );
            }
        }
    );
}


/* =========================================================
   ANIMATED BACKGROUND
   ========================================================= */

function updateAnimatedBackground() {
    const enabled =
        getSetting(
            SETTINGS_KEYS.animatedBackground,
            defaultSettings.animatedBackground
        );

    document.body.classList.toggle(
        "background-animation-disabled",
        !enabled
    );
}


function updateBackgroundSpeed() {
    const speed =
        Number(
            getSetting(
                SETTINGS_KEYS.backgroundSpeed,
                defaultSettings.backgroundSpeed
            )
        );

    const safeSpeed =
        Math.max(
            0.1,
            Math.min(
                speed,
                5
            )
        );

    document.documentElement.style.setProperty(
        "--background-speed",
        safeSpeed
    );
}


function updateBackgroundTransparency() {
    const transparency =
        Number(
            getSetting(
                SETTINGS_KEYS.backgroundTransparency,
                defaultSettings.backgroundTransparency
            )
        );

    const safeTransparency =
        Math.max(
            0,
            Math.min(
                transparency,
                1
            )
        );

    document.documentElement.style.setProperty(
        "--background-transparency",
        safeTransparency
    );
}


/* =========================================================
   FAVORITES
   ========================================================= */

function getFavorites() {
    try {
        const saved =
            localStorage.getItem(
                FAVORITES_KEY
            );

        if (!saved) {
            return [];
        }

        const parsed =
            JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed;
    } catch (error) {
        return [];
    }
}


function saveFavorites(
    favorites
) {
    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}


function isFavorite(
    gameId
) {
    return getFavorites().includes(
        gameId
    );
}


function toggleFavorite(
    gameId
) {
    let favorites =
        getFavorites();

    if (
        favorites.includes(gameId)
    ) {
        favorites =
            favorites.filter(
                function(id) {
                    return id !== gameId;
                }
            );
    } else {
        favorites.push(
            gameId
        );
    }

    saveFavorites(
        favorites
    );

    updateFavoriteButtons();
    renderFavorites();
}


function updateFavoriteButtons() {
    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );

    const favorites =
        getFavorites();

    buttons.forEach(
        function(button) {
            const card =
                button.closest(
                    ".game-card"
                );

            if (!card) {
                return;
            }

            const gameId =
                card.getAttribute(
                    "data-game-id"
                );

            const active =
                favorites.includes(
                    gameId
                );

            button.textContent =
                active ? "★" : "☆";

            button.classList.toggle(
                "favorited",
                active
            );

            button.setAttribute(
                "aria-label",
                active
                    ? "Remove from favorites"
                    : "Add to favorites"
            );

            button.setAttribute(
                "title",
                active
                    ? "Remove from favorites"
                    : "Add to favorites"
            );
        }
    );


    updateFavoriteCount();
}


function updateFavoriteCount() {
    const count =
        getFavorites().length;

    const elements =
        document.querySelectorAll(
            "[data-favorite-count]"
        );

    elements.forEach(
        function(element) {
            element.textContent =
                count;
        }
    );
}


/* =========================================================
   FAVORITE CARD CREATION
   ========================================================= */

function createFavoriteCard(
    originalCard
) {
    const clone =
        originalCard.cloneNode(
            true
        );

    clone.removeAttribute(
        "onclick"
    );

    const gameId =
        clone.getAttribute(
            "data-game-id"
        );

    const gameUrl =
        clone.getAttribute(
            "data-game-url"
        );

    clone.addEventListener(
        "click",
        function() {
            launchGame(
                gameUrl
            );
        }
    );


    const favoriteButton =
        clone.querySelector(
            ".favorite-button"
        );

    if (favoriteButton) {
        favoriteButton.onclick =
            function(event) {
                event.preventDefault();
                event.stopPropagation();

                toggleFavorite(
                    gameId
                );
            };
    }


    const playButton =
        clone.querySelector(
            ".play-small"
        );

    if (playButton) {
        playButton.onclick =
            function(event) {
                event.preventDefault();
                event.stopPropagation();

                launchGame(
                    gameUrl
                );
            };
    }


    return clone;
}


/* =========================================================
   RENDER FAVORITES
   ========================================================= */

function renderFavorites() {
    const favoritesGrid =
        document.getElementById(
            "favoritesGrid"
        );

    const emptyFavorites =
        document.getElementById(
            "emptyFavorites"
        );

    if (!favoritesGrid) {
        return;
    }


    favoritesGrid.innerHTML =
        "";


    const favorites =
        getFavorites();


    const gameCards =
        document.querySelectorAll(
            "#gamesGrid .game-card"
        );


    let rendered =
        0;


    gameCards.forEach(
        function(card) {
            const gameId =
                card.getAttribute(
                    "data-game-id"
                );

            if (
                favorites.includes(
                    gameId
                )
            ) {
                favoritesGrid.appendChild(
                    createFavoriteCard(
                        card
                    )
                );

                rendered++;
            }
        }
    );


    if (emptyFavorites) {
        emptyFavorites.style.display =
            rendered === 0
                ? "block"
                : "none";
    }


    updateFavoriteButtons();

    /*
       Make sure newly-created favorite cards
       also get their missing-image line logic.
    */
    updateGameImageAccents();
}


/* =========================================================
   IMAGE / RED ACCENT HANDLING
   ========================================================= */

/*
   If a game has a working image:
       hide .red-accent

   If it has no image or the image fails:
       show .red-accent

   This is intentionally based on the actual
   naturalWidth of the image.
*/

function updateGameImageAccent(
    image
) {
    if (!image) {
        return;
    }

    const card =
        image.closest(
            ".game-card"
        );

    if (!card) {
        return;
    }

    const accent =
        card.querySelector(
            ".red-accent"
        );

    if (!accent) {
        return;
    }


    if (
        image.complete &&
        image.naturalWidth > 0
    ) {
        accent.style.display =
            "none";

        card.classList.add(
            "has-game-image"
        );

        card.classList.remove(
            "missing-game-image"
        );

        return;
    }


    accent.style.display =
        "block";

    card.classList.remove(
        "has-game-image"
    );

    card.classList.add(
        "missing-game-image"
    );
}


function updateGameImageAccents() {
    const images =
        document.querySelectorAll(
            ".game-card .game-image img"
        );


    images.forEach(
        function(image) {

            /*
               Handle an image that has already
               finished loading.
            */
            updateGameImageAccent(
                image
            );


            /*
               Handle an image that loads after
               the JS has initialized.
            */
            image.addEventListener(
                "load",
                function() {
                    updateGameImageAccent(
                        image
                    );
                }
            );


            image.addEventListener(
                "error",
                function() {
                    updateGameImageAccent(
                        image
                    );
                }
            );
        }
    );
}


/* =========================================================
   NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const favoritesNav =
    document.getElementById(
        "favoritesNav"
    );

const gamesNav =
    document.getElementById(
        "gamesNav"
    );


function setActiveNav(
    sectionId
) {
    if (favoritesNav) {
        favoritesNav.classList.toggle(
            "active",
            sectionId === "favorites"
        );
    }

    if (gamesNav) {
        gamesNav.classList.toggle(
            "active",
            sectionId === "games"
        );
    }
}


function scrollToSection(
    sectionId
) {
    const section =
        document.getElementById(
            sectionId
        );

    if (!section) {
        return;
    }


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    setActiveNav(
        sectionId
    );


    history.replaceState(
        null,
        "",
        "#" + sectionId
    );
}


function initializeNavigation() {
    if (favoritesNav) {
        favoritesNav.addEventListener(
            "click",
            function(event) {
                event.preventDefault();

                scrollToSection(
                    "favorites"
                );
            }
        );
    }


    if (gamesNav) {
        gamesNav.addEventListener(
            "click",
            function(event) {
                event.preventDefault();

                scrollToSection(
                    "games"
                );
            }
        );
    }
}


/* =========================================================
   SCROLL NAVIGATION
   ========================================================= */

function updateNavigationFromScroll() {
    const currentSections =
        document.querySelectorAll(
            "main section[id]"
        );


    const marker =
        window.scrollY +
        Math.min(
            window.innerHeight * 0.28,
            220
        );


    let currentSection =
        "games";


    currentSections.forEach(
        function(section) {
            if (
                marker >=
                section.offsetTop
            ) {
                currentSection =
                    section.id;
            }
        }
    );


    /*
       Welcome is not a navigation item,
       so treat it as Games.
    */
    if (
        currentSection === "welcome"
    ) {
        currentSection =
            "games";
    }


    setActiveNav(
        currentSection
    );
}


function initializeScrollNavigation() {
    window.addEventListener(
        "scroll",
        updateNavigationFromScroll,
        {
            passive: true
        }
    );

    window.addEventListener(
        "resize",
        updateNavigationFromScroll
    );

    updateNavigationFromScroll();
}


/* =========================================================
   GAME LAUNCHING
   ========================================================= */

function launchGame(
    gameUrl
) {
    const openInBlank =
        getSetting(
            SETTINGS_KEYS.openInBlank,
            defaultSettings.openInBlank
        );


    /*
       Normal navigation.
    */
    if (!openInBlank) {
        window.location.href =
            gameUrl;

        return;
    }


    /*
       Open an about:blank tab and
       put the game inside an iframe.
    */
    const gameWindow =
        window.open(
            "about:blank",
            "_blank"
        );


    /*
       If the browser blocks the popup,
       fall back to normal navigation.
    */
    if (!gameWindow) {
        window.location.href =
            gameUrl;

        return;
    }


    gameWindow.document.open();


    gameWindow.document.write(`
        <!DOCTYPE html>

        <html lang="en">

        <head>

            <meta charset="UTF-8">

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >

            <title>
                Rofleq's Hideout
            </title>

            <style>

                html,
                body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    background: #000;
                }

                iframe {
                    width: 100%;
                    height: 100%;
                    border: 0;
                    display: block;
                }

            </style>

        </head>

        <body>

            <iframe
                src="${gameUrl}"
                allowfullscreen
            ></iframe>

        </body>

        </html>
    `);


    gameWindow.document.close();
}


/* =========================================================
   FIX GAME CARD EVENTS
   ========================================================= */

function initializeGameCards() {
    const cards =
        document.querySelectorAll(
            "#gamesGrid .game-card"
        );


    cards.forEach(
        function(card) {

            const gameUrl =
                card.getAttribute(
                    "data-game-url"
                );

            const gameId =
                card.getAttribute(
                    "data-game-id"
                );


            /*
               Whole card launches the game.
            */
            card.onclick =
                function(event) {

                    if (
                        event.target.closest(
                            ".favorite-button"
                        ) ||
                        event.target.closest(
                            ".play-small"
                        )
                    ) {
                        return;
                    }

                    launchGame(
                        gameUrl
                    );
                };


            /*
               Favorite button.
            */
            const favoriteButton =
                card.querySelector(
                    ".favorite-button"
                );


            if (favoriteButton) {
                favoriteButton.onclick =
                    function(event) {
                        event.preventDefault();
                        event.stopPropagation();

                        toggleFavorite(
                            gameId
                        );
                    };
            }


            /*
               PLAY button.
            */
            const playButton =
                card.querySelector(
                    ".play-small"
                );


            if (playButton) {
                playButton.onclick =
                    function(event) {
                        event.preventDefault();
                        event.stopPropagation();

                        launchGame(
                            gameUrl
                        );
                    };
            }
        }
    );
}


/* =========================================================
   STORAGE SYNCHRONIZATION
   ========================================================= */

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === FAVORITES_KEY
        ) {
            updateFavoriteButtons();
            renderFavorites();
        }


        if (
            event.key === THEME_KEY
        ) {
            applyTheme(
                getThemeIndex()
            );
        }


        if (
            event.key ===
            SETTINGS_KEYS.openInBlank ||
            event.key ===
            SETTINGS_KEYS.animatedBackground ||
            event.key ===
            SETTINGS_KEYS.backgroundSpeed ||
            event.key ===
            SETTINGS_KEYS.backgroundTransparency
        ) {
            initializeSettings();
        }
    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeAll() {
    initializeSettings();
    initializeSettingsPanel();

    initializeTheme();

    initializeNavigation();
    initializeScrollNavigation();

    initializeGameCards();

    updateFavoriteButtons();
    renderFavorites();

    /*
       Run this after the game cards exist.
    */
    updateGameImageAccents();


    /*
       Always open on Favorites when the
       launcher is refreshed.
    */
    setTimeout(
        function() {
            const favorites =
                document.getElementById(
                    "favorites"
                );


            if (favorites) {
                favorites.scrollIntoView({
                    behavior: "instant",
                    block: "start"
                });
            }


            setActiveNav(
                "favorites"
            );


            history.replaceState(
                null,
                "",
                "#favorites"
            );
        },
        50
    );
}


/*
   Normally settings.js loads before the end
   of the page, so DOMContentLoaded is enough.

   This also handles the case where the script
   gets loaded after the DOM is already ready.
*/
if (
    document.readyState === "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initializeAll
    );
} else {
    initializeAll();
}
