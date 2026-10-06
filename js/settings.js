const defaultSettings = {

    openInBlank: true,

    animatedBackground: true,

    backgroundSpeed: 6,

    backgroundTransparency: 8

};


const SETTINGS_KEYS = {

    openInBlank:
        "openInBlank",

    animatedBackground:
        "animatedBackground",

    backgroundSpeed:
        "backgroundSpeed",

    backgroundTransparency:
        "backgroundTransparency"

};


const FAVORITES_KEY =
    "rofleqHideoutFavorites";


/* =========================
   WHOLE SITE THEMES
========================= */

const THEME_KEY =
    "rofleqHideoutTheme";


const THEMES = [

    {
        name: "red",

        color: "#e3262e",

        color2: "#ff4048",

        soft:
            "rgba(227,38,46,0.12)",

        border:
            "rgba(227,38,46,0.42)",

        glow:
            "rgba(227,38,46,0.18)"
    },


    {
        name: "green",

        color: "#20d65a",

        color2: "#39ff78",

        soft:
            "rgba(32,214,90,0.12)",

        border:
            "rgba(32,214,90,0.42)",

        glow:
            "rgba(32,214,90,0.18)"
    },


    {
        name: "purple",

        color: "#a855f7",

        color2: "#c084fc",

        soft:
            "rgba(168,85,247,0.12)",

        border:
            "rgba(168,85,247,0.42)",

        glow:
            "rgba(168,85,247,0.18)"
    },


    {
        name: "blue",

        color: "#3b82f6",

        color2: "#60a5fa",

        soft:
            "rgba(59,130,246,0.12)",

        border:
            "rgba(59,130,246,0.42)",

        glow:
            "rgba(59,130,246,0.18)"
    },


    {
        name: "orange",

        color: "#f97316",

        color2: "#fb923c",

        soft:
            "rgba(249,115,22,0.12)",

        border:
            "rgba(249,115,22,0.42)",

        glow:
            "rgba(249,115,22,0.18)"
    }

];


const siteLogo =
    document.getElementById(
        "siteLogo"
    );


/* =========================
   THEME FUNCTIONS
========================= */

function getThemeIndex() {

    const saved =
        Number(
            localStorage.getItem(
                THEME_KEY
            )
        );


    if (

        Number.isInteger(saved) &&

        saved >= 0 &&

        saved < THEMES.length

    ) {

        return saved;

    }


    return 0;
}


function applyTheme(index) {

    const theme =
        THEMES[index];


    if (!theme) {
        return;
    }


    const root =
        document.documentElement;


    root.style.setProperty(
        "--theme",
        theme.color
    );


    root.style.setProperty(
        "--theme2",
        theme.color2
    );


    root.style.setProperty(
        "--theme-soft",
        theme.soft
    );


    root.style.setProperty(
        "--theme-border",
        theme.border
    );


    root.style.setProperty(
        "--theme-glow",
        theme.glow
    );

}


function cycleTheme() {

    let index =
        getThemeIndex();


    index++;


    if (
        index >= THEMES.length
    ) {

        index = 0;

    }


    localStorage.setItem(
        THEME_KEY,
        index
    );


    applyTheme(index);

}


/* =========================
   LOGO CLICK
========================= */

if (siteLogo) {

    siteLogo.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            cycleTheme();

        }
    );

}


/* =========================
   SETTINGS ELEMENTS
========================= */

const settingsButton =
    document.getElementById(
        "settingsButton"
    );


const settingsPanel =
    document.getElementById(
        "settingsPanel"
    );


const closeSettings =
    document.getElementById(
        "closeSettings"
    );


const openInBlankToggle =
    document.getElementById(
        "openInBlankToggle"
    );


const animatedBackgroundToggle =
    document.getElementById(
        "animatedBackgroundToggle"
    );


const backgroundSpeed =
    document.getElementById(
        "backgroundSpeed"
    );


const backgroundTransparency =
    document.getElementById(
        "backgroundTransparency"
    );


const backgroundSpeedValue =
    document.getElementById(
        "backgroundSpeedValue"
    );


const backgroundTransparencyValue =
    document.getElementById(
        "backgroundTransparencyValue"
    );


const backgroundSpeedBox =
    document.getElementById(
        "backgroundSpeedBox"
    );


const backgroundTransparencyBox =
    document.getElementById(
        "backgroundTransparencyBox"
    );


const aboutBlankHint =
    document.getElementById(
        "aboutBlankHint"
    );


const favoritesGrid =
    document.getElementById(
        "favoritesGrid"
    );


const emptyFavorites =
    document.getElementById(
        "emptyFavorites"
    );


const favoriteCount =
    document.getElementById(
        "favoriteCount"
    );


const favoritesNav =
    document.getElementById(
        "favoritesNav"
    );


const gamesNav =
    document.getElementById(
        "gamesNav"
    );


/* =========================
   SETTINGS STORAGE
========================= */

function getSetting(
    key,
    fallback
) {

    const saved =
        localStorage.getItem(key);


    if (
        saved === null
    ) {

        return fallback;

    }


    try {

        return JSON.parse(
            saved
        );

    } catch {

        return fallback;

    }

}


function setSetting(
    key,
    value
) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}


/* =========================
   SETTINGS PANEL
========================= */

function openSettingsPanel() {

    if (!settingsPanel) {
        return;
    }


    settingsPanel.classList.add(
        "open"
    );

}


function closeSettingsPanel() {

    if (!settingsPanel) {
        return;
    }


    settingsPanel.classList.remove(
        "open"
    );

}


if (settingsButton) {

    settingsButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            if (

                settingsPanel.classList.contains(
                    "open"
                )

            ) {

                closeSettingsPanel();

            } else {

                openSettingsPanel();

            }

        }
    );

}


if (closeSettings) {

    closeSettings.addEventListener(
        "click",
        closeSettingsPanel
    );

}


document.addEventListener(
    "click",
    event => {

        if (
            !settingsPanel ||
            !settingsButton
        ) {

            return;

        }


        if (

            settingsPanel.classList.contains(
                "open"
            ) &&

            !settingsPanel.contains(
                event.target
            ) &&

            !settingsButton.contains(
                event.target
            )

        ) {

            closeSettingsPanel();

        }

    }
);


/* =========================
   ABOUT BLANK
========================= */

function applyOpenInBlank(
    value
) {

    if (openInBlankToggle) {

        openInBlankToggle.checked =
            value;

    }


    if (aboutBlankHint) {

        aboutBlankHint.textContent =
            value

                ? "Games open in a new about:blank window."

                : "Games open directly in this page.";

    }

}


if (openInBlankToggle) {

    openInBlankToggle.addEventListener(
        "change",
        () => {

            const value =
                openInBlankToggle.checked;


            setSetting(
                SETTINGS_KEYS.openInBlank,
                value
            );


            applyOpenInBlank(
                value
            );

        }
    );

}


/* =========================
   ANIMATED BACKGROUND
========================= */

function applyAnimatedBackground(
    value
) {

    if (animatedBackgroundToggle) {

        animatedBackgroundToggle.checked =
            value;

    }


    document.body.classList.toggle(
        "background-disabled",
        !value
    );


    if (backgroundSpeedBox) {

        backgroundSpeedBox.style.display =
            value ? "" : "none";

    }


    if (backgroundTransparencyBox) {

        backgroundTransparencyBox.style.display =
            value ? "" : "none";

    }

}


if (animatedBackgroundToggle) {

    animatedBackgroundToggle.addEventListener(
        "change",
        () => {

            const value =
                animatedBackgroundToggle.checked;


            setSetting(
                SETTINGS_KEYS.animatedBackground,
                value
            );


            applyAnimatedBackground(
                value
            );

        }
    );

}


/* =========================
   BACKGROUND SPEED
========================= */

function applyBackgroundSpeed(
    value
) {

    value =
        Number(value);


    if (backgroundSpeed) {

        backgroundSpeed.value =
            value;

    }


    if (backgroundSpeedValue) {

        backgroundSpeedValue.textContent =
            value;

    }


    const seconds =

        value <= 0

            ? 999999

            : 21 - value;


    document.documentElement.style.setProperty(
        "--checker-speed",
        `${seconds}s`
    );

}


if (backgroundSpeed) {

    backgroundSpeed.addEventListener(
        "input",
        () => {

            const value =
                Number(
                    backgroundSpeed.value
                );


            setSetting(
                SETTINGS_KEYS.backgroundSpeed,
                value
            );


            applyBackgroundSpeed(
                value
            );

        }
    );

}


/* =========================
   BACKGROUND TRANSPARENCY
========================= */

function applyBackgroundTransparency(
    value
) {

    value =
        Number(value);


    if (backgroundTransparency) {

        backgroundTransparency.value =
            value;

    }


    if (backgroundTransparencyValue) {

        backgroundTransparencyValue.textContent =
            `${value}%`;

    }


    document.documentElement.style.setProperty(
        "--checker-opacity",
        value / 100
    );

}


if (backgroundTransparency) {

    backgroundTransparency.addEventListener(
        "input",
        () => {

            const value =
                Number(
                    backgroundTransparency.value
                );


            setSetting(
                SETTINGS_KEYS.backgroundTransparency,
                value
            );


            applyBackgroundTransparency(
                value
            );

        }
    );

}


/* =========================
   FAVORITES
========================= */

function getFavorites() {

    try {

        const favorites =
            JSON.parse(
                localStorage.getItem(
                    FAVORITES_KEY
                )
            );


        return Array.isArray(
            favorites
        )
            ? favorites
            : [];

    } catch {

        return [];

    }

}


function saveFavorites(
    favorites
) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(
            favorites
        )
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
        favorites.includes(
            gameId
        )
    ) {

        favorites =
            favorites.filter(
                id =>
                    id !== gameId
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

    updateFavoriteCount();

}


function updateFavoriteButtons() {

    const cards =
        document.querySelectorAll(
            ".game-card[data-game-id]"
        );


    cards.forEach(
        card => {

            const gameId =
                card.dataset.gameId;


            const button =
                card.querySelector(
                    ".favorite-button"
                );


            if (!button) {
                return;
            }


            const favorite =
                isFavorite(
                    gameId
                );


            button.textContent =
                favorite
                    ? "★"
                    : "☆";


            button.classList.toggle(
                "favorited",
                favorite
            );


            const gameName =
                card.dataset.gameName ||
                "game";


            button.setAttribute(
                "aria-label",

                favorite

                    ? `Remove ${gameName} from favorites`

                    : `Add ${gameName} to favorites`
            );


            button.title =
                favorite

                    ? "Remove from favorites"

                    : "Add to favorites";

        }
    );

}


function updateFavoriteCount() {

    if (!favoriteCount) {
        return;
    }


    favoriteCount.textContent =
        getFavorites().length;

}


function createFavoriteCard(
    originalCard
) {

    const clone =
        originalCard.cloneNode(
            true
        );


    clone.onclick =
        () => {

            launchGame(
                clone.dataset.gameUrl
            );

        };


    const favoriteButton =
        clone.querySelector(
            ".favorite-button"
        );


    if (favoriteButton) {

        favoriteButton.onclick =
            event => {

                event.stopPropagation();


                toggleFavorite(
                    clone.dataset.gameId
                );

            };

    }


    const playButton =
        clone.querySelector(
            ".play-small"
        );


    if (playButton) {

        playButton.onclick =
            event => {

                event.stopPropagation();


                launchGame(
                    clone.dataset.gameUrl
                );

            };

    }


    return clone;

}


function renderFavorites() {

    if (!favoritesGrid) {
        return;
    }


    const favorites =
        getFavorites();


    const allCards =
        document.querySelectorAll(
            "#gamesGrid .game-card[data-game-id]"
        );


    favoritesGrid.innerHTML =
        "";


    let foundFavorites =
        0;


    allCards.forEach(
        card => {

            const gameId =
                card.dataset.gameId;


            if (
                !favorites.includes(
                    gameId
                )
            ) {

                return;

            }


            const favoriteCard =
                createFavoriteCard(
                    card
                );


            favoritesGrid.appendChild(
                favoriteCard
            );


            foundFavorites++;

        }
    );


    if (
        foundFavorites === 0
    ) {

        if (emptyFavorites) {

            favoritesGrid.appendChild(
                emptyFavorites
            );


            emptyFavorites.style.display =
                "flex";

        }

    }

}


/* =========================
   NAVIGATION
========================= */

function setActiveNav(
    sectionId
) {

    if (favoritesNav) {

        favoritesNav.classList.toggle(
            "active",

            sectionId ===
                "favorites"
        );

    }


    if (gamesNav) {

        gamesNav.classList.toggle(
            "active",

            sectionId ===
                "games"
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

        behavior:
            "smooth",

        block:
            "start"

    });


    history.replaceState(

        null,

        "",

        `#${sectionId}`

    );


    setActiveNav(
        sectionId
    );

}


if (favoritesNav) {

    favoritesNav.addEventListener(
        "click",
        event => {

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
        event => {

            event.preventDefault();


            scrollToSection(
                "games"
            );

        }
    );

}


/* =========================
   SCROLL DETECTION
========================= */

/*
    Instead of IntersectionObserver,
    use the actual scroll position.

    This prevents both sections from
    being considered active at the
    same time.
*/

const sections = [

    document.getElementById(
        "favorites"
    ),

    document.getElementById(
        "games"
    )

].filter(Boolean);


function updateNavigationFromScroll() {

    /*
        Account for the fixed top bar.
    */

    const scrollPosition =
        window.scrollY + 140;


    let currentSection =
        null;


    /*
        Find the last section whose
        top has already been passed.
    */

    sections.forEach(
        section => {

            if (
                scrollPosition >=
                section.offsetTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    /*
        At the very top of the page,
        keep Games selected.
    */

    if (!currentSection) {

        currentSection =
            "games";

    }


    setActiveNav(
        currentSection
    );

}


/*
    Update while scrolling.
*/

window.addEventListener(
    "scroll",
    updateNavigationFromScroll,
    {
        passive: true
    }
);


/*
    Update after everything has
    finished loading.
*/

window.addEventListener(
    "load",
    updateNavigationFromScroll
);


/* =========================
   GAME LAUNCHING
========================= */

function launchGame(
    gameUrl
) {

    const openInBlank =
        getSetting(

            SETTINGS_KEYS.openInBlank,

            defaultSettings.openInBlank

        );


    if (openInBlank) {

        const gameWindow =
            window.open(

                "about:blank",

                "_blank"

            );


        if (!gameWindow) {

            window.location.href =
                gameUrl;

            return;

        }


        gameWindow.document.open();


        gameWindow.document.write(`

            <!DOCTYPE html>

            <html>

            <head>

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


    } else {

        window.location.href =
            gameUrl;

    }

}


/* =========================
   INITIALIZATION
========================= */

function initializeSettings() {

    applyOpenInBlank(

        getSetting(

            SETTINGS_KEYS.openInBlank,

            defaultSettings.openInBlank

        )

    );


    applyAnimatedBackground(

        getSetting(

            SETTINGS_KEYS.animatedBackground,

            defaultSettings.animatedBackground

        )

    );


    applyBackgroundSpeed(

        getSetting(

            SETTINGS_KEYS.backgroundSpeed,

            defaultSettings.backgroundSpeed

        )

    );


    applyBackgroundTransparency(

        getSetting(

            SETTINGS_KEYS.backgroundTransparency,

            defaultSettings.backgroundTransparency

        )

    );

}


function initializeFavorites() {

    updateFavoriteButtons();

    renderFavorites();

    updateFavoriteCount();

}


function initializeTheme() {

    applyTheme(
        getThemeIndex()
    );

}


/* =========================
   PAGE STARTUP
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeSettings();

        initializeFavorites();

        initializeTheme();


        /*
            Make sure the navigation
            starts on the correct section.
        */

        updateNavigationFromScroll();


        const hash =
            window.location.hash;


        if (
            hash === "#favorites"
        ) {

            setTimeout(
                () => {

                    document
                        .getElementById(
                            "favorites"
                        )
                        ?.scrollIntoView();


                    updateNavigationFromScroll();

                },
                100
            );

        }


        if (
            hash === "#games"
        ) {

            setTimeout(
                () => {

                    document
                        .getElementById(
                            "games"
                        )
                        ?.scrollIntoView();


                    updateNavigationFromScroll();

                },
                100
            );

        }

    }
);
