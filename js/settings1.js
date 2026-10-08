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


const THEME_KEY =
    "rofleqHideoutTheme";


const CUSTOM_THEME_KEY =
    "rofleqHideoutCustomTheme";


/* =========================
   THEMES
========================= */

const THEMES = [

    {
        name: "Red",

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
        name: "Green",

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
        name: "Purple",

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
        name: "Blue",

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
        name: "Orange",

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


const themeNotification =
    document.getElementById(
        "themeNotification"
    );


const themeName =
    document.getElementById(
        "themeName"
    );


const customThemeColor =
    document.getElementById(
        "customThemeColor"
    );


const customColorLabel =
    document.getElementById(
        "customColorLabel"
    );


/* =========================
   THEME HELPERS
========================= */

function hexToRgba(
    hex,
    alpha
) {

    hex =
        hex.replace(
            "#",
            ""
        );


    if (
        hex.length === 3
    ) {

        hex =
            hex
                .split("")
                .map(
                    char =>
                        char + char
                )
                .join("");

    }


    const number =
        parseInt(
            hex,
            16
        );


    const r =
        (number >> 16) & 255;

    const g =
        (number >> 8) & 255;

    const b =
        number & 255;


    return `rgba(${r},${g},${b},${alpha})`;

}


function createCustomTheme(
    color
) {

    return {

        name:
            "Custom",

        color:
            color,

        color2:
            color,

        soft:
            hexToRgba(
                color,
                0.12
            ),

        border:
            hexToRgba(
                color,
                0.42
            ),

        glow:
            hexToRgba(
                color,
                0.18
            )

    };

}


function getThemeIndex() {

    const saved =
        Number(
            localStorage.getItem(
                THEME_KEY
            )
        );


    if (

        Number.isInteger(
            saved
        ) &&

        saved >= 0 &&

        saved < THEMES.length

    ) {

        return saved;

    }


    return 0;

}


function getCustomTheme() {

    const saved =
        localStorage.getItem(
            CUSTOM_THEME_KEY
        );


    if (
        saved &&
        /^#[0-9a-fA-F]{6}$/.test(
            saved
        )
    ) {

        return saved;

    }


    return "#e3262e";

}


/* =========================
   APPLY THEME
========================= */

function applyTheme(
    index,
    save = true
) {

    const theme =
        THEMES[index];


    if (!theme) {
        return;
    }


    applyThemeObject(
        theme,
        save
    );


    if (themeName) {

        themeName.textContent =
            theme.name;

    }


    updateThemeButtons(
        index,
        false
    );

}


function applyThemeObject(
    theme,
    save = true
) {

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


    if (save) {

        localStorage.setItem(
            THEME_KEY,
            theme.name === "Custom"
                ? "custom"
                : getThemeIndex()
        );

    }

}


function applyCustomTheme(
    color,
    save = true
) {

    const theme =
        createCustomTheme(
            color
        );


    applyThemeObject(
        theme,
        false
    );


    if (save) {

        localStorage.setItem(
            THEME_KEY,
            "custom"
        );

        localStorage.setItem(
            CUSTOM_THEME_KEY,
            color
        );

    }


    if (themeName) {

        themeName.textContent =
            "Custom";

    }


    updateThemeButtons(
        null,
        true
    );


    if (customColorLabel) {

        customColorLabel.textContent =
            color.toUpperCase();

    }

}


function updateThemeButtons(
    selectedIndex,
    customSelected
) {

    const buttons =
        document.querySelectorAll(
            ".theme-option"
        );


    buttons.forEach(
        button => {

            const index =
                Number(
                    button.dataset.themeIndex
                );


            button.classList.toggle(
                "selected",

                !customSelected &&
                index === selectedIndex

            );

        }
    );


    const customOption =
        document.querySelector(
            ".custom-color-option"
        );


    if (customOption) {

        customOption.classList.toggle(
            "selected",
            customSelected
        );

    }

}


/* =========================
   LOGO THEME CYCLE
========================= */

function cycleTheme() {

    let index =
        getThemeIndex();


    index++;


    if (
        index >= THEMES.length
    ) {

        index = 0;

        showThemeUnlockedNotification();

    }


    localStorage.setItem(
        THEME_KEY,
        index
    );


    applyTheme(
        index,
        false
    );

}


/* =========================
   THEME NOTIFICATION
========================= */

let notificationTimer =
    null;


function showThemeUnlockedNotification() {

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
            4500
        );

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
        localStorage.getItem(
            key
        );


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
        JSON.stringify(
            value
        )
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

    value =
        Boolean(value);


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
   THEME BUTTONS
========================= */

document
    .querySelectorAll(
        ".theme-option"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.themeIndex
                        );


                    localStorage.setItem(
                        THEME_KEY,
                        index
                    );


                    applyTheme(
                        index,
                        false
                    );

                }
            );

        }
    );


/* =========================
   CUSTOM COLOR
========================= */

if (customThemeColor) {

    customThemeColor.addEventListener(
        "input",
        () => {

            const color =
                customThemeColor.value;


            applyCustomTheme(
                color,
                true
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

    /*
        INTENTIONALLY SWAPPED.

        Favorites section
        -> Games navigation active.

        Games section
        -> Favorites navigation active.
    */

    if (favoritesNav) {

        favoritesNav.classList.toggle(
            "active",

            sectionId ===
                "games"
        );

    }


    if (gamesNav) {

        gamesNav.classList.toggle(
            "active",

            sectionId ===
                "favorites"
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

const sections = [

    document.getElementById(
        "favorites"
    ),

    document.getElementById(
        "games"
    )

].filter(Boolean);


function updateNavigationFromScroll() {

    const scrollPosition =
        window.scrollY + 140;


    let currentSection =
        null;


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


    if (!currentSection) {

        currentSection =
            "games";

    }


    setActiveNav(
        currentSection
    );

}


window.addEventListener(
    "scroll",
    updateNavigationFromScroll,
    {
        passive: true
    }
);


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


    } else {

        window.location.href =
            gameUrl;

    }

}


/* =========================================================
   EXTRA SETTINGS
========================================================= */

const EXTRA_SETTINGS = {

    backgroundStyle:
        "checkerboard",

    glowEffects:
        true,

    cardAnimations:
        true,

    reduceMotion:
        false,

    continueButton:
        true,

    launchAnimation:
        "fade",

    confirmLaunch:
        false,

    cardSize:
        "medium"

};


const EXTRA_KEYS = {

    backgroundStyle:
        "rofleqBackgroundStyle",

    glowEffects:
        "rofleqGlowEffects",

    cardAnimations:
        "rofleqCardAnimations",

    reduceMotion:
        "rofleqReduceMotion",

    continueButton:
        "rofleqContinueButton",

    launchAnimation:
        "rofleqLaunchAnimation",

    confirmLaunch:
        "rofleqConfirmLaunch",

    cardSize:
        "rofleqCardSize",

    lastGame:
        "rofleqLastGame"

};


/* =========================
   EXTRA STORAGE
========================= */

function getExtraSetting(
    key
) {

    return getSetting(
        EXTRA_KEYS[key],
        EXTRA_SETTINGS[key]
    );

}


function setExtraSetting(
    key,
    value
) {

    setSetting(
        EXTRA_KEYS[key],
        value
    );

}


/* =========================
   EXTRA SETTINGS ELEMENTS
========================= */

/*
    IMPORTANT:

    These elements ALREADY EXIST
    in index.html.

    We are NOT creating another
    "More Settings" section.
*/

const backgroundStyleControl =
    document.getElementById(
        "backgroundStyle"
    );


const glowEffectsToggle =
    document.getElementById(
        "glowEffectsToggle"
    );


const cardAnimationsToggle =
    document.getElementById(
        "cardAnimationsToggle"
    );


const reduceMotionToggle =
    document.getElementById(
        "reduceMotionToggle"
    );


const continueButtonToggle =
    document.getElementById(
        "continueButtonToggle"
    );


const launchAnimationControl =
    document.getElementById(
        "launchAnimation"
    );


const confirmLaunchToggle =
    document.getElementById(
        "confirmLaunchToggle"
    );


const cardSizeControl =
    document.getElementById(
        "cardSize"
    );


const continueGameButton =
    document.getElementById(
        "continueGameButton"
    );


/* =========================
   BACKGROUND STYLE
========================= */

function applyBackgroundStyle(
    value
) {

    const validStyles = [

        "checkerboard",

        "grid",

        "dots",

        "scanlines",

        "none"

    ];


    if (
        !validStyles.includes(
            value
        )
    ) {

        value =
            EXTRA_SETTINGS.backgroundStyle;

    }


    document.body.classList.remove(

        "bg-style-checkerboard",

        "bg-style-grid",

        "bg-style-dots",

        "bg-style-scanlines",

        "bg-style-none"

    );


    document.body.classList.add(
        `bg-style-${value}`
    );


    if (
        backgroundStyleControl
    ) {

        backgroundStyleControl.value =
            value;

    }

}


/* =========================
   GLOW EFFECTS
========================= */

function applyGlowEffects(
    value
) {

    value =
        Boolean(value);


    document.body.classList.toggle(
        "glow-disabled",
        !value
    );


    if (
        glowEffectsToggle
    ) {

        glowEffectsToggle.checked =
            value;

    }

}


/* =========================
   CARD ANIMATIONS
========================= */

function applyCardAnimations(
    value
) {

    value =
        Boolean(value);


    document.body.classList.toggle(
        "cards-no-animation",
        !value
    );


    if (
        cardAnimationsToggle
    ) {

        cardAnimationsToggle.checked =
            value;

    }

}


/* =========================
   REDUCE MOTION
========================= */

function applyReduceMotion(
    value
) {

    value =
        Boolean(value);


    document.body.classList.toggle(
        "reduce-motion",
        value
    );


    if (
        reduceMotionToggle
    ) {

        reduceMotionToggle.checked =
            value;

    }

}


/* =========================
   CONTINUE BUTTON
========================= */

function updateContinueButton() {

    if (
        !continueGameButton
    ) {

        return;

    }


    const enabled =
        getExtraSetting(
            "continueButton"
        );


    const lastGame =
        getExtraSetting(
            "lastGame"
        );


    if (
        !enabled ||
        !lastGame ||
        !lastGame.url
    ) {

        continueGameButton.hidden =
            true;

        return;

    }


    continueGameButton.hidden =
        false;


    continueGameButton.textContent =
        `▶ CONTINUE ${lastGame.name}`;


    continueGameButton.dataset.url =
        lastGame.url;

}


/* =========================
   CARD SIZE
========================= */

function applyCardSize(
    value
) {

    const validSizes = [

        "small",

        "medium",

        "large"

    ];


    if (
        !validSizes.includes(
            value
        )
    ) {

        value =
            EXTRA_SETTINGS.cardSize;

    }


    document.body.classList.remove(

        "card-size-small",

        "card-size-medium",

        "card-size-large"

    );


    document.body.classList.add(
        `card-size-${value}`
    );


    if (
        cardSizeControl
    ) {

        cardSizeControl.value =
            value;

    }

}


/* =========================
   APPLY ALL EXTRA SETTINGS
========================= */

function applyExtraSettings() {

    applyBackgroundStyle(
        getExtraSetting(
            "backgroundStyle"
        )
    );


    applyGlowEffects(
        getExtraSetting(
            "glowEffects"
        )
    );


    applyCardAnimations(
        getExtraSetting(
            "cardAnimations"
        )
    );


    applyReduceMotion(
        getExtraSetting(
            "reduceMotion"
        )
    );


    applyCardSize(
        getExtraSetting(
            "cardSize"
        )
    );


    if (
        continueButtonToggle
    ) {

        continueButtonToggle.checked =
            Boolean(
                getExtraSetting(
                    "continueButton"
                )
            );

    }


    if (
        launchAnimationControl
    ) {

        launchAnimationControl.value =
            getExtraSetting(
                "launchAnimation"
            );

    }


    if (
        confirmLaunchToggle
    ) {

        confirmLaunchToggle.checked =
            Boolean(
                getExtraSetting(
                    "confirmLaunch"
                )
            );

    }


    updateContinueButton();

}


/* =========================================================
   EXTRA SETTING EVENTS
========================================================= */

/*
    SELECT ELEMENTS MUST USE "change".

    CHECKBOXES ALSO USE "change".

    This is the important part that was
    broken in the previous version.
*/


if (
    backgroundStyleControl
) {

    backgroundStyleControl.addEventListener(
        "change",
        () => {

            const value =
                backgroundStyleControl.value;


            setExtraSetting(
                "backgroundStyle",
                value
            );


            applyBackgroundStyle(
                value
            );

        }
    );

}


if (
    glowEffectsToggle
) {

    glowEffectsToggle.addEventListener(
        "change",
        () => {

            const value =
                glowEffectsToggle.checked;


            setExtraSetting(
                "glowEffects",
                value
            );


            applyGlowEffects(
                value
            );

        }
    );

}


if (
    cardAnimationsToggle
) {

    cardAnimationsToggle.addEventListener(
        "change",
        () => {

            const value =
                cardAnimationsToggle.checked;


            setExtraSetting(
                "cardAnimations",
                value
            );


            applyCardAnimations(
                value
            );

        }
    );

}


if (
    reduceMotionToggle
) {

    reduceMotionToggle.addEventListener(
        "change",
        () => {

            const value =
                reduceMotionToggle.checked;


            setExtraSetting(
                "reduceMotion",
                value
            );


            applyReduceMotion(
                value
            );

        }
    );

}


if (
    continueButtonToggle
) {

    continueButtonToggle.addEventListener(
        "change",
        () => {

            const value =
                continueButtonToggle.checked;


            setExtraSetting(
                "continueButton",
                value
            );


            updateContinueButton();

        }
    );

}


if (
    launchAnimationControl
) {

    launchAnimationControl.addEventListener(
        "change",
        () => {

            const value =
                launchAnimationControl.value;


            setExtraSetting(
                "launchAnimation",
                value
            );

        }
    );

}


if (
    confirmLaunchToggle
) {

    confirmLaunchToggle.addEventListener(
        "change",
        () => {

            const value =
                confirmLaunchToggle.checked;


            setExtraSetting(
                "confirmLaunch",
                value
            );

        }
    );

}


if (
    cardSizeControl
) {

    cardSizeControl.addEventListener(
        "change",
        () => {

            const value =
                cardSizeControl.value;


            setExtraSetting(
                "cardSize",
                value
            );


            applyCardSize(
                value
            );

        }
    );

}


/* =========================================================
   CONTINUE BUTTON
========================================================= */

if (
    continueGameButton
) {

    continueGameButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const lastGame =
                getExtraSetting(
                    "lastGame"
                );


            if (
                lastGame &&
                lastGame.url
            ) {

                launchGame(
                    lastGame.url
                );

            }

        }
    );

}


/* =========================================================
   GAME LAUNCH WRAPPER
========================================================= */

const originalLaunchGame =
    launchGame;


launchGame = function(
    gameUrl
) {

    const cards =
        document.querySelectorAll(
            ".game-card[data-game-url]"
        );


    let gameName =
        "Game";


    cards.forEach(
        card => {

            if (
                card.dataset.gameUrl ===
                gameUrl
            ) {

                gameName =
                    card.dataset.gameName ||
                    card.querySelector(
                        ".game-title"
                    )?.textContent.trim() ||
                    "Game";

            }

        }
    );


    /* =========================
       CONFIRM LAUNCH
    ========================= */

    if (
        getExtraSetting(
            "confirmLaunch"
        )
    ) {

        const confirmed =
            window.confirm(
                `Launch ${gameName}?`
            );


        if (
            !confirmed
        ) {

            return;

        }

    }


    /* =========================
       SAVE LAST GAME
    ========================= */

    setExtraSetting(
        "lastGame",
        {
            name:
                gameName,

            url:
                gameUrl
        }
    );


    updateContinueButton();


    /* =========================
       LAUNCH ANIMATION
    ========================= */

    const animation =
        getExtraSetting(
            "launchAnimation"
        );


    const reduced =
        getExtraSetting(
            "reduceMotion"
        );


    if (
        reduced ||
        animation === "none"
    ) {

        originalLaunchGame(
            gameUrl
        );

        return;

    }


    let overlay =
        document.getElementById(
            "gameLaunchOverlay"
        );


    if (!overlay) {

        overlay =
            document.createElement(
                "div"
            );


        overlay.id =
            "gameLaunchOverlay";


        overlay.innerHTML =

            `<div class="launch-text">
                Launching...
            </div>`;


        document.body.appendChild(
            overlay
        );

    }


    overlay.className =
        "";


    overlay.id =
        "gameLaunchOverlay";


    overlay.classList.add(
        `launch-${animation}`,
        "active"
    );


    window.setTimeout(
        () => {

            originalLaunchGame(
                gameUrl
            );

        },
        280
    );

};


/* =========================================================
   RESET BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".setting-reset"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const key =
                        button.dataset.reset;


                    /* =========================
                       ORIGINAL SETTINGS
                    ========================= */

                    if (
                        key ===
                        "openInBlank"
                    ) {

                        setSetting(
                            SETTINGS_KEYS.openInBlank,
                            defaultSettings.openInBlank
                        );


                        applyOpenInBlank(
                            defaultSettings.openInBlank
                        );

                    }


                    if (
                        key ===
                        "animatedBackground"
                    ) {

                        setSetting(
                            SETTINGS_KEYS.animatedBackground,
                            defaultSettings.animatedBackground
                        );


                        applyAnimatedBackground(
                            defaultSettings.animatedBackground
                        );

                    }


                    if (
                        key ===
                        "backgroundSpeed"
                    ) {

                        setSetting(
                            SETTINGS_KEYS.backgroundSpeed,
                            defaultSettings.backgroundSpeed
                        );


                        applyBackgroundSpeed(
                            defaultSettings.backgroundSpeed
                        );

                    }


                    if (
                        key ===
                        "backgroundTransparency"
                    ) {

                        setSetting(
                            SETTINGS_KEYS.backgroundTransparency,
                            defaultSettings.backgroundTransparency
                        );


                        applyBackgroundTransparency(
                            defaultSettings.backgroundTransparency
                        );

                    }


                    if (
                        key ===
                        "theme"
                    ) {

                        localStorage.setItem(
                            THEME_KEY,
                            0
                        );


                        localStorage.setItem(
                            CUSTOM_THEME_KEY,
                            "#e3262e"
                        );


                        if (
                            customThemeColor
                        ) {

                            customThemeColor.value =
                                "#e3262e";

                        }


                        applyTheme(
                            0,
                            false
                        );

                    }


                    /* =========================
                       EXTRA SETTINGS
                    ========================= */

                    if (
                        Object.prototype.hasOwnProperty.call(
                            EXTRA_KEYS,
                            key
                        )
                    ) {

                        setExtraSetting(
                            key,
                            EXTRA_SETTINGS[key]
                        );


                        applyExtraSettings();

                    }

                }
            );

        }
    );


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


    applyExtraSettings();

}


function initializeFavorites() {

    updateFavoriteButtons();

    renderFavorites();

    updateFavoriteCount();

}


function initializeTheme() {

    const saved =
        localStorage.getItem(
            THEME_KEY
        );


    if (
        saved ===
        "custom"
    ) {

        const color =
            getCustomTheme();


        if (
            customThemeColor
        ) {

            customThemeColor.value =
                color;

        }


        applyCustomTheme(
            color,
            false
        );


        return;

    }


    const index =
        getThemeIndex();


    applyTheme(
        index,
        false
    );


    if (
        customThemeColor
    ) {

        customThemeColor.value =
            getCustomTheme();

    }

}


/* =========================================================
   KONAMI CODE / DOUG EASTER EGG
========================================================= */

const konamiCode = [

    "ArrowUp",

    "ArrowUp",

    "ArrowDown",

    "ArrowDown",

    "ArrowLeft",

    "ArrowRight",

    "ArrowLeft",

    "ArrowRight"

];


let dougKeySequence = [];


document.addEventListener(
    "keydown",
    event => {

        dougKeySequence.push(
            event.key
        );


        if (
            dougKeySequence.length >
            konamiCode.length
        ) {

            dougKeySequence.shift();

        }


        const matches =
            dougKeySequence.length ===
                konamiCode.length &&

            dougKeySequence.every(
                (
                    key,
                    index
                ) =>
                    key ===
                    konamiCode[index]
            );


        if (
            !matches
        ) {

            return;

        }


        dougKeySequence = [];


        const existingDoug =
            document.querySelector(
                ".rofleq-doug"
            );


        if (
            existingDoug
        ) {

            existingDoug.remove();

        }


        const doug =
            document.createElement(
                "img"
            );


        doug.className =
            "rofleq-doug";


        doug.src =
            "assets/doug.png";


        doug.style.position =
            "fixed";


        doug.style.width =
            "100px";


        doug.style.height =
            "100px";


        doug.style.objectFit =
            "contain";


        doug.style.pointerEvents =
            "none";


        doug.style.zIndex =
            "999999";


        doug.style.left =
            "0px";


        doug.style.top =
            "0px";


        document.body.appendChild(
            doug
        );


        let mouseX =
            window.innerWidth / 2;


        let mouseY =
            window.innerHeight / 2;


        let dougX =
            mouseX;


        let dougY =
            mouseY;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            }
        );


        function followDoug() {

            if (
                !doug.isConnected
            ) {

                return;

            }


            dougX +=
                (
                    mouseX -
                    dougX
                ) * 0.08;


            dougY +=
                (
                    mouseY -
                    dougY
                ) * 0.08;


            doug.style.transform =
                `translate(
                    ${dougX - 50}px,
                    ${dougY - 50}px
                )`;


            requestAnimationFrame(
                followDoug
            );

        }


        followDoug();

    }
);


/* =========================
   PAGE STARTUP
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeSettings();

        initializeFavorites();

        initializeTheme();


        updateNavigationFromScroll();


        const hash =
            window.location.hash;


        if (
            hash ===
            "#favorites"
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
            hash ===
            "#games"
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

/* =========================================================
   BACKGROUND STYLE SETTINGS
========================================================= */


/* =========================
   CHECKERBOARD
========================= */

body.bg-style-checkerboard::before {

    background:

        linear-gradient(
            45deg,

            var(--theme)
            25%,

            transparent 25%,

            transparent 75%,

            var(--theme) 75%
        ),

        linear-gradient(
            45deg,

            var(--theme)
            25%,

            transparent 25%,

            transparent 75%,

            var(--theme) 75%
        );

    background-size:
        80px 80px;

    background-position:
        0 0,
        40px 40px;

    animation:
        checkerMove
        var(--checker-speed)
        linear
        infinite;

}


/* =========================
   GRID
========================= */

body.bg-style-grid::before {

    background:

        linear-gradient(
            to right,

            var(--theme)
            1px,

            transparent 1px
        ),

        linear-gradient(
            to bottom,

            var(--theme)
            1px,

            transparent 1px
        );

    background-size:
        40px 40px;

    background-position:
        0 0,
        0 0;

    animation:
        gridMove
        var(--checker-speed)
        linear
        infinite;

}


/* =========================
   DOTS
========================= */

body.bg-style-dots::before {

    background:

        radial-gradient(
            circle,

            var(--theme)
            2px,

            transparent 2px
        );

    background-size:
        30px 30px;

    background-position:
        0 0;

    animation:
        dotsMove
        var(--checker-speed)
        linear
        infinite;

}


/* =========================
   SCANLINES
========================= */

body.bg-style-scanlines::before {

    background:

        repeating-linear-gradient(
            to bottom,

            var(--theme)
            0px,

            var(--theme)
            2px,

            transparent
            2px,

            transparent
            8px
        );

    background-size:
        100% 8px;

    background-position:
        0 0;

    animation:
        scanlinesMove
        var(--checker-speed)
        linear
        infinite;

}


/* =========================
   NONE
========================= */

body.bg-style-none::before {

    background:
        none !important;

    animation:
        none !important;

    opacity:
        0 !important;

}


/* =========================
   BACKGROUND DISABLED
========================= */

body.background-disabled::before {

    animation:
        none !important;

    opacity:
        0 !important;

}


/* =========================
   GRID ANIMATION
========================= */

@keyframes gridMove {

    from {

        transform:
            translate3d(
                0,
                0,
                0
            );

    }

    to {

        transform:
            translate3d(
                40px,
                40px,
                0
            );

    }

}


/* =========================
   DOT ANIMATION
========================= */

@keyframes dotsMove {

    from {

        transform:
            translate3d(
                0,
                0,
                0
            );

    }

    to {

        transform:
            translate3d(
                30px,
                30px,
                0
            );

    }

}


/* =========================
   SCANLINE ANIMATION
========================= */

@keyframes scanlinesMove {

    from {

        transform:
            translate3d(
                0,
                0,
                0
            );

    }

    to {

        transform:
            translate3d(
                0,
                8px,
                0
            );

    }

}


/* =========================
   REDUCED MOTION
========================= */

body.reduce-motion::before {

    animation:
        none !important;

}


/* =========================
   MAKE PATTERNS USE
   THE TRANSPARENCY SETTING
========================= */

body.bg-style-grid::before,
body.bg-style-dots::before,
body.bg-style-scanlines::before {

    opacity:
        var(--checker-opacity);

    transition:
        opacity 0.3s ease;

}
