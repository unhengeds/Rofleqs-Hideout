/* =========================================================
   ROFLEQ'S HIDEOUT
   SETTINGS + THEMES + FAVORITES + SEARCH
========================================================= */


/* =========================================================
   DEFAULT SETTINGS
========================================================= */

const DEFAULTS = {

    openInBlank: true,

    animatedBackground: true,

    backgroundSpeed: 6,

    backgroundTransparency: 8,

    theme: 0,

    customColor: "#e3262e"

};


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEYS = {

    openInBlank:
        "rofleq_openInBlank",

    animatedBackground:
        "rofleq_animatedBackground",

    backgroundSpeed:
        "rofleq_backgroundSpeed",

    backgroundTransparency:
        "rofleq_backgroundTransparency",

    theme:
        "rofleq_theme",

    customColor:
        "rofleq_customColor",

    themeUnlocked:
        "rofleq_themeUnlocked",

    favorites:
        "rofleq_favorites"

};


/* =========================================================
   THEMES
========================================================= */

const THEMES = [

    {
        name: "Red",
        primary: "#e3262e",
        bright: "#ff4048",
        rgb: "227, 38, 46"
    },

    {
        name: "Green",
        primary: "#20d65a",
        bright: "#39ff78",
        rgb: "32, 214, 90"
    },

    {
        name: "Purple",
        primary: "#9b4dff",
        bright: "#bd7cff",
        rgb: "155, 77, 255"
    },

    {
        name: "Blue",
        primary: "#2787ff",
        bright: "#55a1ff",
        rgb: "39, 135, 255"
    },

    {
        name: "Orange",
        primary: "#ff7a18",
        bright: "#ff9b4a",
        rgb: "255, 122, 24"
    }

];


/* =========================================================
   DOM
========================================================= */

const siteLogo =
    document.getElementById("siteLogo");

const settingsButton =
    document.getElementById("settingsButton");

const settingsPanel =
    document.getElementById("settingsPanel");

const closeSettings =
    document.getElementById("closeSettings");

const openInBlankToggle =
    document.getElementById("openInBlankToggle");

const animatedBackgroundToggle =
    document.getElementById(
        "animatedBackgroundToggle"
    );

const backgroundSpeed =
    document.getElementById(
        "backgroundSpeed"
    );

const backgroundSpeedBox =
    document.getElementById(
        "backgroundSpeedBox"
    );

const backgroundSpeedValue =
    document.getElementById(
        "backgroundSpeedValue"
    );

const backgroundTransparency =
    document.getElementById(
        "backgroundTransparency"
    );

const backgroundTransparencyBox =
    document.getElementById(
        "backgroundTransparencyBox"
    );

const backgroundTransparencyValue =
    document.getElementById(
        "backgroundTransparencyValue"
    );

const themeName =
    document.getElementById("themeName");

const customThemeColor =
    document.getElementById(
        "customThemeColor"
    );

const customColorLabel =
    document.getElementById(
        "customColorLabel"
    );

const themeNotification =
    document.getElementById(
        "themeNotification"
    );

const favoritesGrid =
    document.getElementById(
        "favoritesGrid"
    );

const gamesGrid =
    document.getElementById(
        "gamesGrid"
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

const gameSearch =
    document.getElementById(
        "gameSearch"
    );

const searchClear =
    document.getElementById(
        "searchClear"
    );

const searchResultsText =
    document.getElementById(
        "searchResultsText"
    );


/* =========================================================
   STORAGE HELPERS
========================================================= */

function getStorage(key, fallback) {

    const value =
        localStorage.getItem(key);

    if (value === null) {
        return fallback;
    }

    return value;

}


function getBoolean(key, fallback) {

    const value =
        localStorage.getItem(key);

    if (value === null) {
        return fallback;
    }

    return value === "true";

}


function getNumber(key, fallback) {

    const value =
        localStorage.getItem(key);

    if (value === null) {
        return fallback;
    }

    const number =
        Number(value);

    return Number.isFinite(number)
        ? number
        : fallback;

}


/* =========================================================
   SETTINGS STATE
========================================================= */

let openInBlank =
    getBoolean(
        STORAGE_KEYS.openInBlank,
        DEFAULTS.openInBlank
    );

let animatedBackground =
    getBoolean(
        STORAGE_KEYS.animatedBackground,
        DEFAULTS.animatedBackground
    );

let currentThemeIndex =
    getNumber(
        STORAGE_KEYS.theme,
        DEFAULTS.theme
    );

let currentBackgroundSpeed =
    getNumber(
        STORAGE_KEYS.backgroundSpeed,
        DEFAULTS.backgroundSpeed
    );

let currentBackgroundTransparency =
    getNumber(
        STORAGE_KEYS.backgroundTransparency,
        DEFAULTS.backgroundTransparency
    );

let customColor =
    getStorage(
        STORAGE_KEYS.customColor,
        DEFAULTS.customColor
    );

let themeUnlocked =
    getBoolean(
        STORAGE_KEYS.themeUnlocked,
        false
    );


/* Make sure theme index is valid */

if (
    currentThemeIndex < 0 ||
    currentThemeIndex >= THEMES.length
) {

    currentThemeIndex =
        DEFAULTS.theme;

}


/* =========================================================
   THEME HELPERS
========================================================= */

function hexToRgb(hex) {

    let clean =
        String(hex)
            .replace("#", "")
            .trim();

    if (clean.length === 3) {

        clean =
            clean
                .split("")
                .map(char => char + char)
                .join("");

    }

    const number =
        parseInt(
            clean,
            16
        );

    if (
        !Number.isFinite(number)
    ) {

        return {
            r: 227,
            g: 38,
            b: 46
        };

    }

    return {

        r:
            (number >> 16) & 255,

        g:
            (number >> 8) & 255,

        b:
            number & 255

    };

}


function applyTheme(
    index = currentThemeIndex,
    custom = false
) {

    const root =
        document.documentElement;

    let primary;
    let bright;
    let rgb;
    let name;

    if (custom) {

        const converted =
            hexToRgb(customColor);

        primary =
            customColor;

        bright =
            customColor;

        rgb =
            ${converted.r}, ${converted.g}, ${converted.b};

        name =
            "Custom";

    } else {

        const theme =
            THEMES[index];

        primary =
            theme.primary;

        bright =
            theme.bright;

        rgb =
            theme.rgb;

        name =
            theme.name;

    }

    root.style.setProperty(
        "--theme-primary",
        primary
    );

    root.style.setProperty(
        "--theme-bright",
        bright
    );

    root.style.setProperty(
        "--theme-rgb",
        rgb
    );

    root.style.setProperty(
        "--border",
        rgba(${rgb}, 0.28)
    );

    if (themeName) {

        themeName.textContent =
            name;

    }

    if (customColorLabel) {

        customColorLabel.textContent =
            custom
                ? Custom: ${customColor}
                : "Custom color";

    }

    updateThemeButtons(
        custom
            ? -1
            : index
    );

}


/* =========================================================
   THEME BUTTONS
========================================================= */

function updateThemeButtons(activeIndex) {

    document
        .querySelectorAll(".theme-option")
        .forEach(button => {

            const index =
                Number(
                    button.dataset.themeIndex
                );

            button.classList.toggle(
                "active",
                index === activeIndex
            );

        });

}


/* =========================================================
   THEME NOTIFICATION
========================================================= */

let notificationTimer = null;


function showThemeNotification() {

    if (!themeNotification) {
        return;
    }

    themeNotification.classList.add(
        "show"
    );

    clearTimeout(
        notificationTimer
    );

    notificationTimer =
        setTimeout(
            () => {

                themeNotification.classList.remove(
                    "show"
                );

            },
            5000
        );

}


/* =========================================================
   LOGO THEME CYCLING
========================================================= */

function cycleTheme() {

    currentThemeIndex++;

    if (
        currentThemeIndex >=
        THEMES.length
    ) {

        /*
         * Returning from Orange to Red.
         * This is the point where the custom
         * theme setting becomes unlocked.
         */

        currentThemeIndex = 0;

        if (!themeUnlocked) {

            themeUnlocked = true;

            localStorage.setItem(
                STORAGE_KEYS.themeUnlocked,
                "true"
            );

            showThemeNotification();

        }

    }

    localStorage.setItem(
        STORAGE_KEYS.theme,
        String(currentThemeIndex)
    );

    applyTheme(
        currentThemeIndex,
        false
    );

}


if (siteLogo) {

    siteLogo.addEventListener(
        "click",
        cycleTheme
    );

}


/* =========================================================
   CUSTOM COLOR
========================================================= */

if (customThemeColor) {

    customThemeColor.value =
        customColor;

    customThemeColor.addEventListener(
        "input",
        () => {

            if (!themeUnlocked) {

                customThemeColor.value =
                    customColor;

                return;

            }

            customColor =
                customThemeColor.value;

            localStorage.setItem(
                STORAGE_KEYS.customColor,
                customColor
            );

            applyTheme(
                currentThemeIndex,
                true
            );

        }
    );

}


/* =========================================================
   THEME BUTTON CLICK
========================================================= */

document
    .querySelectorAll(".theme-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (!themeUnlocked) {

                    showThemeNotification();

                    return;

                }

                const index =
                    Number(
                        button.dataset.themeIndex
                    );

                if (
                    !Number.isFinite(index) ||
                    !THEMES[index]
                ) {
                    return;
                }

                currentThemeIndex =
                    index;

                localStorage.setItem(
                    STORAGE_KEYS.theme,
                    String(
                        currentThemeIndex
                    )
                );

                applyTheme(
                    currentThemeIndex,
                    false
                );

            }
        );

    });


/* =========================================================
   SETTINGS PANEL
========================================================= */

function openSettings() {

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

                openSettings();

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


/* Close when clicking outside */

document.addEventListener(
    "click",
    event => {

        if (!settingsPanel) {
            return;
        }

        if (
            !settingsPanel.classList.contains(
                "open"
            )
        ) {
            return;
        }

        const clickedInside =
            settingsPanel.contains(
                event.target
            );

        const clickedButton =
            settingsButton &&
            settingsButton.contains(
                event.target
            );

        if (
            !clickedInside &&
            !clickedButton
        ) {

            closeSettingsPanel();

        }

    }
);


/* =========================================================
   ABOUT:BLANK
========================================================= */

function updateAboutBlankSetting() {

    if (!openInBlankToggle) {
        return;
    }

    openInBlankToggle.checked =
        openInBlank;

}


if (openInBlankToggle) {

    openInBlankToggle.checked =
        openInBlank;

    openInBlankToggle.addEventListener(
        "change",
        () => {

            openInBlank =
                openInBlankToggle.checked;

            localStorage.setItem(
                STORAGE_KEYS.openInBlank,
                String(openInBlank)
            );

        }
    );

}


/* =========================================================
   BACKGROUND
========================================================= */

function updateBackground() {

    if (!animatedBackgroundToggle) {
        return;
    }

    animatedBackgroundToggle.checked =
        animatedBackground;

    if (backgroundSpeedBox) {

        backgroundSpeedBox.classList.toggle(
            "background-disabled",
            !animatedBackground
        );

    }

    if (backgroundTransparencyBox) {

        backgroundTransparencyBox.classList.toggle(
            "background-disabled",
            !animatedBackground
        );

    }

}


function updateBackgroundSpeed() {

    if (!backgroundSpeed) {
        return;
    }

    currentBackgroundSpeed =
        Number(
            backgroundSpeed.value
        );

    if (backgroundSpeedValue) {

        backgroundSpeedValue.textContent =
            currentBackgroundSpeed;

    }

    /*
     * 0 means stopped.
     * Higher numbers mean faster animation.
     */

    if (
        currentBackgroundSpeed <= 0
    ) {

        document.documentElement.style.setProperty(
            "--checker-speed",
            "999999s"
        );

    } else {

        /*
         * 20 = 1.5 seconds
         * 6 = 6 seconds
         * 1 = 14 seconds
         */

        const duration =
            15 -
            (
                currentBackgroundSpeed *
                0.675
            );

        document.documentElement.style.setProperty(
            "--checker-speed",
            `${Math.max(
                1.5,
                duration
            )}s`
        );

    }

}


function updateBackgroundTransparency() {

    if (!backgroundTransparency) {
        return;
    }

    currentBackgroundTransparency =
        Number(
            backgroundTransparency.value
        );

    if (backgroundTransparencyValue) {

        backgroundTransparencyValue.textContent =
            ${currentBackgroundTransparency}%;

    }

    document.documentElement.style.setProperty(
        "--checker-opacity",
        String(
            currentBackgroundTransparency /
            100
        )
    );

}


if (animatedBackgroundToggle) {

    animatedBackgroundToggle.checked =
        animatedBackground;

    animatedBackgroundToggle.addEventListener(
        "change",
        () => {

            animatedBackground =
                animatedBackgroundToggle.checked;

            localStorage.setItem(
                STORAGE_KEYS.animatedBackground,
                String(
                    animatedBackground
                )
            );

            updateBackground();

        }
    );

}


if (backgroundSpeed) {

    backgroundSpeed.value =
        currentBackgroundSpeed;

    backgroundSpeed.addEventListener(
        "input",
        () => {

            currentBackgroundSpeed =
                Number(
                    backgroundSpeed.value
                );

            localStorage.setItem(
                STORAGE_KEYS.backgroundSpeed,
                String(
                    currentBackgroundSpeed
                )
            );

            updateBackgroundSpeed();

        }
    );

}


if (backgroundTransparency) {

    backgroundTransparency.value =
        currentBackgroundTransparency;

    backgroundTransparency.addEventListener(
        "input",
        () => {

            currentBackgroundTransparency =
                Number(
                    backgroundTransparency.value
                );

            localStorage.setItem(
                STORAGE_KEYS.backgroundTransparency,
                String(
                    currentBackgroundTransparency
                )
            );

            updateBackgroundTransparency();

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
                STORAGE_KEYS.favorites
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

        console.warn(
            "Could not load favorites:",
            error
        );

        return [];

    }

}


let favorites =
    getFavorites();


function saveFavorites() {

    localStorage.setItem(
        STORAGE_KEYS.favorites,
        JSON.stringify(
            favorites
        )
    );

}


function isFavorite(gameId) {

    return favorites.includes(
        gameId
    );

}


/* =========================================================
   FAVORITE CARDS
========================================================= */

function createFavoriteCard(
    originalCard
) {

    const clone =
        originalCard.cloneNode(true);

    clone.removeAttribute(
        "onclick"
    );

    clone.classList.add(
        "favorite-copy"
    );

    clone.addEventListener(
        "click",
        () => {

            launchGame(
                originalCard.dataset.gameUrl
            );

        }
    );


    const star =
        clone.querySelector(
            ".favorite-button"
        );

    if (star) {

        star.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleFavorite(
                    originalCard.dataset.gameId
                );

            }
        );

    }


    const play =
        clone.querySelector(
            ".play-small"
        );

    if (play) {

        play.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                launchGame(
                    originalCard.dataset.gameUrl
                );

            }
        );

    }

    return clone;

}


/* =========================================================
   UPDATE FAVORITES
========================================================= */

function updateFavoriteUI() {

    if (!gamesGrid) {
        return;
    }

    const gameCards =
        gamesGrid.querySelectorAll(
            ".game-card"
        );


    gameCards.forEach(card => {

        const id =
            card.dataset.gameId;

        const star =
            card.querySelector(
                ".favorite-button"
            );

        const favorite =
            isFavorite(id);

        if (star) {

            star.textContent =
                favorite
                    ? "★"
                    : "☆";

            star.classList.toggle(
                "is-favorite",
                favorite
            );

            star.setAttribute(
                "aria-label",
                favorite
                    ? Remove ${card.dataset.gameName} from favorites
                    : Add ${card.dataset.gameName} to favorites
            );

            star.setAttribute(
                "title",
                favorite
                    ? "Remove from favorites"
                    : "Add to favorites"
            );

        }

    });


    renderFavorites();

    updateFavoriteCount();

}


function renderFavorites() {

    if (!favoritesGrid) {
        return;
    }

    favoritesGrid
        .querySelectorAll(
            ".favorite-copy"
        )
        .forEach(card => {
            card.remove();
        });


    const allCards =
        gamesGrid
            ? Array.from(
                gamesGrid.querySelectorAll(
                    ".game-card"
                )
            )
            : [];


    const favoriteCards =
        allCards.filter(
            card =>
                isFavorite(
                    card.dataset.gameId
                )
        );


    if (emptyFavorites) {

        emptyFavorites.style.display =
            favoriteCards.length === 0
                ? ""
                : "none";

    }


    favoriteCards.forEach(
        originalCard => {

            const card =
                createFavoriteCard(
                    originalCard
                );

            favoritesGrid.appendChild(
                card
            );

            /*
             * Make the copied favorite card's
             * star match its favorite state.
             */

            const star =
                card.querySelector(
                    ".favorite-button"
                );

            if (star) {

                star.textContent =
                    "★";

                star.classList.add(
                    "is-favorite"
                );

            }

        }
    );

}


function updateFavoriteCount() {

    if (!favoriteCount) {
        return;
    }

    favoriteCount.textContent =
        favorites.length;

}


/* =========================================================
   TOGGLE FAVORITE
========================================================= */

function toggleFavorite(gameId) {

    const index =
        favorites.indexOf(
            gameId
        );

    if (index === -1) {

        favorites.push(
            gameId
        );

    } else {

        favorites.splice(
            index,
            1
        );

    }

    saveFavorites();

    updateFavoriteUI();

}


/* Make inline HTML handlers work */

window.toggleFavorite =
    toggleFavorite;


/* =========================================================
   GAME LAUNCHER
========================================================= */

function launchGame(url) {

    if (!url) {
        return;
    }


    if (!openInBlank) {

        window.location.href =
            url;

        return;

    }


    /*
     * Open a real about:blank tab first.
     * This needs to happen immediately after
     * the click so popup blockers are less
     * likely to block it.
     */

    const newWindow =
        window.open(
            "about:blank",
            "_blank"
        );


    if (!newWindow) {

        /*
         * If the browser blocks the popup,
         * fall back to opening the game normally.
         */

        window.location.href =
            url;

        return;

    }


    try {

        newWindow.document.open();

        newWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
    <title>Rofleq's Hideout</title>
    <style>
        html,
        body {
            margin: 0;
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
        src="${url.replace(/"/g, "&quot;")}"
        allowfullscreen
    ></iframe>
</body>
</html>
        `);

        newWindow.document.close();

        newWindow.focus();

    } catch (error) {

        console.error(
            "Could not create about:blank game window:",
            error
        );

        try {

            newWindow.location.href =
                url;

        } catch (_) {}

    }

}


window.launchGame =
    launchGame;


/* =========================================================
   SEARCH
========================================================= */

function searchGames() {

    if (!gameSearch || !gamesGrid) {
        return;
    }

    const search =
        gameSearch.value
            .trim()
            .toLowerCase();


    const gameCards =
        gamesGrid.querySelectorAll(
            ".game-card"
        );


    let visibleGames = 0;


    gameCards.forEach(
        card => {

            const name =
                card.dataset.gameName ||
                card.querySelector(
                    ".game-title"
                )?.textContent ||
                "";


            const version =
                card.dataset.gameVersion ||
                card.querySelector(
                    ".game-meta"
                )?.textContent ||
                "";


            const searchableText =
                ${name} ${version}
                    .toLowerCase();


            const matches =
                search === "" ||
                searchableText.includes(
                    search
                );


            card.style.display =
                matches
                    ? ""
                    : "none";


            if (matches) {

                visibleGames++;

            }

        }
    );


    if (searchResultsText) {

        if (search === "") {

            searchResultsText.textContent =
                "";

        } else if (
            visibleGames === 0
        ) {

            searchResultsText.textContent =
                No games found for "${gameSearch.value}";

        } else {

            searchResultsText.textContent =
                `${visibleGames} game${
                    visibleGames === 1
                        ? ""
                        : "s"
                } found`;

        }

    }


    if (searchClear) {

        searchClear.classList.toggle(
            "visible",
            search !== ""
        );

    }

}


if (gameSearch) {

    gameSearch.addEventListener(
        "input",
        searchGames
    );

}


if (searchClear) {

    searchClear.addEventListener(
        "click",
        () => {

            if (!gameSearch) {
                return;
            }

            gameSearch.value =
                "";

            searchGames();

            gameSearch.focus();

        }
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function setActiveNav(
    favoritesActive
) {

    if (!favoritesNav ||
        !gamesNav
    ) {
        return;
    }


    favoritesNav.classList.toggle(
        "active",
        favoritesActive
    );

    gamesNav.classList.toggle(
        "active",
        !favoritesActive
    );

}


/*
 * Track which section is on screen.
 *
 * The active navigation is intentionally
 * swapped to match the behavior requested:
 *
 * Games visible     -> Favorites highlighted
 * Favorites visible -> Games highlighted
 */

const favoritesSection =
    document.getElementById(
        "favorites"
    );

const gamesSection =
    document.getElementById(
        "games"
    );


if (
    favoritesSection &&
    gamesSection &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        if (
                            entry.target ===
                            gamesSection
                        ) {

                            setActiveNav(
                                true
                            );

                        }


                        if (
                            entry.target ===
                            favoritesSection
                        ) {

                            setActiveNav(
                                false
                            );

                        }

                    }
                );

            },
            {
                root: null,

                threshold: 0.35,

                rootMargin:
                    "-80px 0px -35% 0px"

            }
        );


    observer.observe(
        favoritesSection
    );

    observer.observe(
        gamesSection
    );

}


/* =========================================================
   RESET SETTINGS
========================================================= */

document
    .querySelectorAll(
        ".setting-reset"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const setting =
                    button.dataset.reset;


                switch (setting) {


                    case "openInBlank":

                        openInBlank =
                            DEFAULTS.openInBlank;

                        localStorage.setItem(
                            STORAGE_KEYS.openInBlank,
                            String(
                                openInBlank
                            )
                        );

                        if (
                            openInBlankToggle
                        ) {

                            openInBlankToggle.checked =
                                openInBlank;

                        }

                        break;



                    case "animatedBackground":

                        animatedBackground =
                            DEFAULTS.animatedBackground;

                        localStorage.setItem(
                            STORAGE_KEYS.animatedBackground,
                            String(
                                animatedBackground
                            )
                        );

                        updateBackground();

                        break;



                    case "backgroundSpeed":

                        currentBackgroundSpeed =
                            DEFAULTS.backgroundSpeed;

                        if (
                            backgroundSpeed
                        ) {

                            backgroundSpeed.value =
                                currentBackgroundSpeed;

                        }

                        localStorage.setItem(
                            STORAGE_KEYS.backgroundSpeed,
                            String(
                                currentBackgroundSpeed
                            )
                        );

                        updateBackgroundSpeed();

                        break;



                    case "backgroundTransparency":

                        currentBackgroundTransparency =
                            DEFAULTS.backgroundTransparency;

                        if (
                            backgroundTransparency
                        ) {

                            backgroundTransparency.value =
                                currentBackgroundTransparency;

                        }

                        localStorage.setItem(
                            STORAGE_KEYS.backgroundTransparency,
                            String(
                                currentBackgroundTransparency
                            )
                        );

                        updateBackgroundTransparency();

                        break;



                    case "theme":

                        currentThemeIndex =
                            DEFAULTS.theme;

                        customColor =
                            DEFAULTS.customColor;

                        localStorage.setItem(
                            STORAGE_KEYS.theme,
                            String(
                                DEFAULTS.theme
                            )
                        );

                        localStorage.setItem(
                            STORAGE_KEYS.customColor,
                            DEFAULTS.customColor
                        );

                        if (
                            customThemeColor
                        ) {

                            customThemeColor.value =
                                DEFAULTS.customColor;

                        }

                        applyTheme(
                            DEFAULTS.theme,
                            false
                        );

                        break;

                }

            }
        );

    });


/* =========================================================
   INITIALIZE
========================================================= */

function initialize() {

    /*
     * Apply saved theme.
     */

    applyTheme(
        currentThemeIndex,
        false
    );


    /*
     * Apply saved background settings.
     */

    if (backgroundSpeed) {

        backgroundSpeed.value =
            currentBackgroundSpeed;

    }


    if (backgroundTransparency) {

        backgroundTransparency.value =
            currentBackgroundTransparency;

    }


    if (openInBlankToggle) {

        openInBlankToggle.checked =
            openInBlank;

    }


    if (animatedBackgroundToggle) {

        animatedBackgroundToggle.checked =
            animatedBackground;

    }


    updateBackground();

    updateBackgroundSpeed();

    updateBackgroundTransparency();


    /*
     * Load favorites.
     */

    updateFavoriteUI();


    /*
     * Make sure custom color input
     * starts with saved color.
     */

    if (customThemeColor) {

        customThemeColor.value =
            customColor;

    }


    /*
     * Start with the normal Games
     * navigation state.
     */

    setActiveNav(false);

}


initialize();
