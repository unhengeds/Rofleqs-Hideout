/* =========================================================
   ROFLEQ'S HIDEOUT
   settings.js
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

const SETTINGS = {
    openInBlank: "rofleq_openInBlank",
    animatedBackground: "rofleq_animatedBackground",
    backgroundSpeed: "rofleq_backgroundSpeed",
    backgroundTransparency: "rofleq_backgroundTransparency",
    theme: "rofleq_theme",
    favorites: "rofleq_favorites"
};


const DEFAULTS = {
    openInBlank: true,
    animatedBackground: true,
    backgroundSpeed: 1,
    backgroundTransparency: 1,
    theme: 0
};


function getValue(key, fallback) {

    try {

        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return value;

    } catch {

        return fallback;

    }

}


function setValue(key, value) {

    try {

        localStorage.setItem(
            key,
            String(value)
        );

    } catch {

        /* Storage unavailable */

    }

}


/* =========================================================
   THEMES
   ========================================================= */

const THEMES = [

    {
        name: "red",
        primary: "#e3262e"
    },

    {
        name: "green",
        primary: "#20d65a"
    },

    {
        name: "purple",
        primary: "#9b59ff"
    },

    {
        name: "blue",
        primary: "#3185ff"
    },

    {
        name: "orange",
        primary: "#ff8a24"
    }

];


function getTheme() {

    let theme = Number(
        getValue(
            SETTINGS.theme,
            DEFAULTS.theme
        )
    );

    if (
        !Number.isInteger(theme) ||
        theme < 0 ||
        theme >= THEMES.length
    ) {

        theme = DEFAULTS.theme;

    }

    return theme;

}


function setTheme(index) {

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= THEMES.length
    ) {

        return;

    }


    const theme = THEMES[index];


    document.documentElement.setAttribute(
        "data-theme",
        theme.name
    );


    document.documentElement.style.setProperty(
        "--theme-primary",
        theme.primary
    );


    document.documentElement.style.setProperty(
        "--theme-color",
        theme.primary
    );


    document.documentElement.style.setProperty(
        "--accent-color",
        theme.primary
    );


    setValue(
        SETTINGS.theme,
        index
    );


    updateThemeButtons(index);

}


function cycleTheme() {

    const current = getTheme();

    const next =
        (current + 1) % THEMES.length;


    setTheme(next);


    if (
        current ===
        THEMES.length - 1
    ) {

        showThemeNotification();

    }

}


function updateThemeButtons(index) {

    document
        .querySelectorAll("[data-theme-index]")
        .forEach(function(button) {

            const buttonIndex =
                Number(
                    button.getAttribute(
                        "data-theme-index"
                    )
                );


            const selected =
                buttonIndex === index;


            button.classList.toggle(
                "active",
                selected
            );


            button.classList.toggle(
                "selected",
                selected
            );


            button.setAttribute(
                "aria-pressed",
                selected
                    ? "true"
                    : "false"
            );

        });

}


function showThemeNotification() {

    let notification =
        document.getElementById(
            "themeNotification"
        );


    if (!notification) {

        notification =
            document.createElement(
                "div"
            );


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


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notification._timer
    );


    notification._timer =
        setTimeout(function() {

            notification.classList.remove(
                "show"
            );

        }, 3500);

}


/* =========================================================
   INITIALIZE THEME
   ========================================================= */

function initializeTheme() {

    setTheme(
        getTheme()
    );


    const logo =
        document.getElementById(
            "siteLogo"
        );


    if (logo) {

        logo.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                event.stopPropagation();

                cycleTheme();

            }
        );

    }


    document
        .querySelectorAll(
            "[data-theme-index]"
        )
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const index =
                        Number(
                            button.getAttribute(
                                "data-theme-index"
                            )
                        );


                    setTheme(index);

                }
            );

        });

}


/* =========================================================
   SETTINGS
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
            getValue(
                SETTINGS.openInBlank,
                DEFAULTS.openInBlank
            ) === "true";


        openInBlank.onchange =
            function() {

                setValue(
                    SETTINGS.openInBlank,
                    openInBlank.checked
                );

            };

    }


    if (animatedBackground) {

        animatedBackground.checked =
            getValue(
                SETTINGS.animatedBackground,
                DEFAULTS.animatedBackground
            ) === "true";


        animatedBackground.onchange =
            function() {

                setValue(
                    SETTINGS.animatedBackground,
                    animatedBackground.checked
                );


                updateBackground();

            };

    }


    if (backgroundSpeed) {

        backgroundSpeed.value =
            getValue(
                SETTINGS.backgroundSpeed,
                DEFAULTS.backgroundSpeed
            );


        backgroundSpeed.oninput =
            function() {

                setValue(
                    SETTINGS.backgroundSpeed,
                    backgroundSpeed.value
                );


                updateBackground();

            };

    }


    if (backgroundTransparency) {

        backgroundTransparency.value =
            getValue(
                SETTINGS.backgroundTransparency,
                DEFAULTS.backgroundTransparency
            );


        backgroundTransparency.oninput =
            function() {

                setValue(
                    SETTINGS.backgroundTransparency,
                    backgroundTransparency.value
                );


                updateBackground();

            };

    }


    updateBackground();


    document
        .querySelectorAll(
            "[data-setting-reset]"
        )
        .forEach(function(button) {

            button.onclick =
                function(event) {

                    event.preventDefault();

                    event.stopPropagation();


                    resetSetting(
                        button.getAttribute(
                            "data-setting-reset"
                        )
                    );

                };

        });

}


/* =========================================================
   RESET SETTINGS
   ========================================================= */

function resetSetting(name) {

    switch (name) {

        case "openInBlank":

            setValue(
                SETTINGS.openInBlank,
                DEFAULTS.openInBlank
            );

            break;


        case "animatedBackground":

            setValue(
                SETTINGS.animatedBackground,
                DEFAULTS.animatedBackground
            );

            break;


        case "backgroundSpeed":

            setValue(
                SETTINGS.backgroundSpeed,
                DEFAULTS.backgroundSpeed
            );

            break;


        case "backgroundTransparency":

            setValue(
                SETTINGS.backgroundTransparency,
                DEFAULTS.backgroundTransparency
            );

            break;


        case "theme":

            setValue(
                SETTINGS.theme,
                DEFAULTS.theme
            );

            setTheme(
                DEFAULTS.theme
            );

            break;

    }


    initializeSettings();

}


/* =========================================================
   BACKGROUND
   ========================================================= */

function updateBackground() {

    const animated =
        getValue(
            SETTINGS.animatedBackground,
            DEFAULTS.animatedBackground
        ) === "true";


    const speed =
        Number(
            getValue(
                SETTINGS.backgroundSpeed,
                DEFAULTS.backgroundSpeed
            )
        );


    const transparency =
        Number(
            getValue(
                SETTINGS.backgroundTransparency,
                DEFAULTS.backgroundTransparency
            )
        );


    document.body.classList.toggle(
        "background-animation-disabled",
        !animated
    );


    document.documentElement.style.setProperty(
        "--background-speed",
        Number.isFinite(speed)
            ? speed
            : DEFAULTS.backgroundSpeed
    );


    document.documentElement.style.setProperty(
        "--background-transparency",
        Number.isFinite(transparency)
            ? transparency
            : DEFAULTS.backgroundTransparency
    );

}


/* =========================================================
   SETTINGS PANEL
   ========================================================= */

function initializeSettingsPanel() {

    const panel =
        document.getElementById(
            "settingsPanel"
        );


    const open =
        document.getElementById(
            "settingsButton"
        );


    const close =
        document.getElementById(
            "settingsClose"
        );


    if (open && panel) {

        open.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                event.stopPropagation();

                panel.classList.add(
                    "open"
                );

            }
        );

    }


    if (close && panel) {

        close.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                event.stopPropagation();

                panel.classList.remove(
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
                panel
            ) {

                panel.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   FAVORITES
   ========================================================= */

function getFavorites() {

    try {

        const saved =
            localStorage.getItem(
                SETTINGS.favorites
            );


        if (!saved) {
            return [];
        }


        const favorites =
            JSON.parse(saved);


        return Array.isArray(favorites)
            ? favorites
            : [];

    } catch {

        return [];

    }

}


function saveFavorites(favorites) {

    try {

        localStorage.setItem(
            SETTINGS.favorites,
            JSON.stringify(favorites)
        );

    } catch {

        /* Storage unavailable */

    }

}


function isFavorite(gameId) {

    return getFavorites().includes(
        gameId
    );

}


function toggleFavorite(gameId) {

    let favorites =
        getFavorites();


    if (
        favorites.includes(
            gameId
        )
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


/* =========================================================
   FAVORITE BUTTONS
   ========================================================= */

function updateFavoriteButtons() {

    const favorites =
        getFavorites();


    document
        .querySelectorAll(
            ".favorite-button"
        )
        .forEach(function(button) {

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
                active
                    ? "★"
                    : "☆";


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

        });

}


/* =========================================================
   FAVORITES SECTION
   ========================================================= */

function renderFavorites() {

    const grid =
        document.getElementById(
            "favoritesGrid"
        );


    const empty =
        document.getElementById(
            "emptyFavorites"
        );


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    const favorites =
        getFavorites();


    document
        .querySelectorAll(
            "#gamesGrid .game-card"
        )
        .forEach(function(card) {

            const gameId =
                card.getAttribute(
                    "data-game-id"
                );


            if (
                !favorites.includes(
                    gameId
                )
            ) {

                return;

            }


            const copy =
                card.cloneNode(true);


            const gameUrl =
                card.getAttribute(
                    "data-game-url"
                );


            copy.removeAttribute(
                "onclick"
            );


            copy.addEventListener(
                "click",
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

                }
            );


            const favoriteButton =
                copy.querySelector(
                    ".favorite-button"
                );


            if (favoriteButton) {

                favoriteButton.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        event.stopPropagation();


                        toggleFavorite(
                            gameId
                        );

                    }
                );

            }


            const play =
                copy.querySelector(
                    ".play-small"
                );


            if (play) {

                play.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        event.stopPropagation();


                        launchGame(
                            gameUrl
                        );

                    }
                );

            }


            grid.appendChild(
                copy
            );

        });


    const count =
        grid.children.length;


    if (empty) {

        empty.style.display =
            count === 0
                ? "block"
                : "none";

    }


    updateFavoriteButtons();

    updateImageLines();

}


/* =========================================================
   IMAGE / RED ACCENT LINE
   ========================================================= */

function updateImageLine(image) {

    const card =
        image.closest(
            ".game-card"
        );


    if (!card) {
        return;
    }


    const line =
        card.querySelector(
            ".red-accent"
        );


    if (!line) {
        return;
    }


    if (
        image.complete &&
        image.naturalWidth > 0
    ) {

        line.style.display =
            "none";

    } else {

        line.style.display =
            "block";

    }

}


function updateImageLines() {

    document
        .querySelectorAll(
            ".game-card .game-image img"
        )
        .forEach(function(image) {

            updateImageLine(
                image
            );


            if (
                image.dataset.lineListener
            ) {

                return;

            }


            image.dataset.lineListener =
                "true";


            image.addEventListener(
                "load",
                function() {

                    updateImageLine(
                        image
                    );

                }
            );


            image.addEventListener(
                "error",
                function() {

                    updateImageLine(
                        image
                    );

                }
            );

        });

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setActiveNav(section) {

    const favorites =
        document.getElementById(
            "favoritesNav"
        );


    const games =
        document.getElementById(
            "gamesNav"
        );


    if (favorites) {

        favorites.classList.toggle(
            "active",
            section === "favorites"
        );

    }


    if (games) {

        games.classList.toggle(
            "active",
            section === "games"
        );

    }

}


function scrollToSection(id) {

    const section =
        document.getElementById(
            id
        );


    if (!section) {
        return;
    }


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    setActiveNav(
        id
    );


    history.replaceState(
        null,
        "",
        "#" + id
    );

}


function initializeNavigation() {

    const favorites =
        document.getElementById(
            "favoritesNav"
        );


    const games =
        document.getElementById(
            "gamesNav"
        );


    if (favorites) {

        favorites.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                scrollToSection(
                    "favorites"
                );

            }
        );

    }


    if (games) {

        games.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                scrollToSection(
                    "games"
                );

            }
        );

    }


    window.addEventListener(
        "scroll",
        function() {

            const sections =
                document.querySelectorAll(
                    "main section[id]"
                );


            const marker =
                window.scrollY +
                Math.min(
                    window.innerHeight * 0.28,
                    220
                );


            let current =
                "games";


            sections.forEach(
                function(section) {

                    if (
                        marker >=
                        section.offsetTop
                    ) {

                        current =
                            section.id;

                    }

                }
            );


            if (
                current === "welcome"
            ) {

                current =
                    "games";

            }


            setActiveNav(
                current
            );

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   GAME CARDS
   ========================================================= */

function initializeGameCards() {

    document
        .querySelectorAll(
            "#gamesGrid .game-card"
        )
        .forEach(function(card) {

            const gameId =
                card.getAttribute(
                    "data-game-id"
                );


            const gameUrl =
                card.getAttribute(
                    "data-game-url"
                );


            card.addEventListener(
                "click",
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

                }
            );


            const favorite =
                card.querySelector(
                    ".favorite-button"
                );


            if (favorite) {

                favorite.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        event.stopPropagation();


                        toggleFavorite(
                            gameId
                        );

                    }
                );

            }


            const play =
                card.querySelector(
                    ".play-small"
                );


            if (play) {

                play.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        event.stopPropagation();


                        launchGame(
                            gameUrl
                        );

                    }
                );

            }

        });

}


/* =========================================================
   GAME LAUNCHER
   ========================================================= */

function launchGame(gameUrl) {

    const blank =
        getValue(
            SETTINGS.openInBlank,
            DEFAULTS.openInBlank
        ) === "true";


    if (!blank) {

        window.location.href =
            gameUrl;

        return;

    }


    const win =
        window.open(
            "about:blank",
            "_blank"
        );


    if (!win) {

        window.location.href =
            gameUrl;

        return;

    }


    win.document.open();


    win.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >

            <title>Rofleq's Hideout</title>

            <style>

                html,
                body {

                    width: 100%;
                    height: 100%;

                    margin: 0;
                    padding: 0;

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


    win.document.close();

}


/* =========================================================
   STARTUP
   ========================================================= */

function startSite() {

    initializeSettings();

    initializeTheme();

    initializeSettingsPanel();

    initializeNavigation();

    initializeGameCards();

    updateFavoriteButtons();

    renderFavorites();

    updateImageLines();


    /*
       Always start on Favorites.
       This intentionally ignores whatever section
       was previously in the URL.
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


                setActiveNav(
                    "favorites"
                );


                history.replaceState(
                    null,
                    "",
                    "#favorites"
                );

            }

        },
        50
    );

}


/* =========================================================
   DOM READY
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startSite
    );

} else {

    startSite();

}
