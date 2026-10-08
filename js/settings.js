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
   EXTRA SETTINGS
========================= */

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


const EXTRA_SETTINGS_KEYS = {

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

    document
        .querySelectorAll(
            ".theme-option"
        )
        .forEach(
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
   SETTINGS PANEL
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
                settingsPanel &&
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
   ORIGINAL SETTINGS
========================= */

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


/* =========================
   OPEN IN BLANK
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
   STORAGE HELPERS
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
   FAVORITES
========================= */

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
                clone.dataset.gameUrl,
                clone.dataset.gameName
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
                    clone.dataset.gameUrl,
                    clone.dataset.gameName
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
        foundFavorites === 0 &&
        emptyFavorites
    ) {

        favoritesGrid.appendChild(
            emptyFavorites
        );


        emptyFavorites.style.display =
            "flex";

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
            sectionId === "games"
        );

    }


    if (gamesNav) {

        gamesNav.classList.toggle(
            "active",
            sectionId === "favorites"
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
   EXTRA SETTINGS UI
========================= */

function getExtraSetting(
    name
) {

    return getSetting(
        EXTRA_SETTINGS_KEYS[name],
        EXTRA_SETTINGS[name]
    );

}


function saveExtraSetting(
    name,
    value
) {

    setSetting(
        EXTRA_SETTINGS_KEYS[name],
        value
    );


    applyExtraSettings();

}


function injectExtraSettingsStyles() {

    if (
        document.getElementById(
            "rofleqExtraSettingsStyles"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "rofleqExtraSettingsStyles";


    style.textContent = `

        .rofleq-extra-settings {
            margin-top: 18px;
            padding-top: 18px;
            border-top: 1px solid var(--theme-border, rgba(255,255,255,.1));
        }

        .rofleq-extra-title {
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: var(--theme, #e3262e);
            margin-bottom: 12px;
        }

        .rofleq-extra-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin: 10px 0;
        }

        .rofleq-extra-row label {
            font-size: 14px;
        }

        .rofleq-extra-row select {
            min-width: 135px;
            padding: 7px 10px;
            border-radius: 7px;
            border: 1px solid var(--theme-border, rgba(255,255,255,.15));
            background: var(--panel2, #160909);
            color: var(--text, #fff);
        }

        .rofleq-extra-toggle {
            appearance: none;
            width: 42px;
            height: 23px;
            border-radius: 20px;
            background: rgba(255,255,255,.15);
            border: 1px solid rgba(255,255,255,.1);
            position: relative;
            cursor: pointer;
            transition: .2s;
        }

        .rofleq-extra-toggle::after {
            content: "";
            position: absolute;
            width: 17px;
            height: 17px;
            border-radius: 50%;
            left: 2px;
            top: 2px;
            background: #fff;
            transition: .2s;
        }

        .rofleq-extra-toggle:checked {
            background: var(--theme, #e3262e);
        }

        .rofleq-extra-toggle:checked::after {
            transform: translateX(19px);
        }

        .rofleq-continue-button {
            display: none;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin: 0 0 18px;
            padding: 11px 18px;
            border: 1px solid var(--theme-border, rgba(255,255,255,.2));
            border-radius: 9px;
            background: var(--theme-soft, rgba(227,38,46,.12));
            color: var(--text, #fff);
            cursor: pointer;
            font-weight: 800;
            transition: transform .18s, box-shadow .18s, background .18s;
        }

        .rofleq-continue-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 22px var(--theme-glow, rgba(227,38,46,.18));
        }

        body.glow-disabled *,
        body.glow-disabled *::before,
        body.glow-disabled *::after {
            box-shadow: none !important;
            text-shadow: none !important;
        }

        body.cards-no-animation .game-card,
        body.cards-no-animation .game-card:hover {
            animation: none !important;
            transition: none !important;
            transform: none !important;
        }

        body.reduce-motion *,
        body.reduce-motion *::before,
        body.reduce-motion *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .001ms !important;
            scroll-behavior: auto !important;
        }

        body.card-size-small .game-card .game-image {
            min-height: 125px;
        }

        body.card-size-large .game-card .game-image {
            min-height: 220px;
        }

        body.bg-style-none::before,
        body.bg-style-none::after {
            display: none !important;
        }

        body.bg-style-grid {
            background-image:
                linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px) !important;
            background-size: 32px 32px !important;
        }

        body.bg-style-dots {
            background-image:
                radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px) !important;
            background-size: 20px 20px !important;
        }

        body.bg-style-scanlines {
            background-image:
                repeating-linear-gradient(
                    0deg,
                    rgba(255,255,255,.035) 0px,
                    rgba(255,255,255,.035) 1px,
                    transparent 1px,
                    transparent 5px
                ) !important;
        }

        body.bg-style-solid {
            background-image: none !important;
        }

        .rofleq-launch-overlay {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,.78);
            pointer-events: none;
            opacity: 0;
        }

        .rofleq-launch-overlay.show {
            opacity: 1;
        }

        .rofleq-launch-overlay.fade {
            transition: opacity .28s ease;
        }

        .rofleq-launch-overlay.zoom {
            transition: opacity .22s ease;
        }

        .rofleq-launch-overlay .rofleq-launch-text {
            font-size: clamp(22px, 4vw, 48px);
            font-weight: 900;
            color: #fff;
            text-shadow: 0 0 25px var(--theme-glow, rgba(227,38,46,.3));
        }

        .rofleq-launch-overlay.zoom .rofleq-launch-text {
            transform: scale(.75);
            transition: transform .28s ease;
        }

        .rofleq-launch-overlay.zoom.show .rofleq-launch-text {
            transform: scale(1);
        }

    `;


    document.head.appendChild(
        style
    );

}


function createExtraSettingsUI() {

    if (
        document.getElementById(
            "rofleqExtraSettings"
        )
    ) {
        return;
    }


    const panel =
        settingsPanel ||
        document.querySelector(
            ".settings-panel"
        );


    if (!panel) {
        return;
    }


    const section =
        document.createElement(
            "div"
        );


    section.id =
        "rofleqExtraSettings";


    section.className =
        "rofleq-extra-settings";


    section.innerHTML = `

        <div class="rofleq-extra-title">
            More Settings
        </div>

        <div class="rofleq-extra-row">
            <label for="backgroundStyle">
                Background style
            </label>

            <select id="backgroundStyle">

                <option value="checkerboard">
                    Checkerboard
                </option>

                <option value="grid">
                    Grid
                </option>

                <option value="dots">
                    Dots
                </option>

                <option value="scanlines">
                    Scanlines
                </option>

                <option value="solid">
                    Solid
                </option>

                <option value="none">
                    None
                </option>

            </select>
        </div>

        <div class="rofleq-extra-row">

            <label for="glowEffectsToggle">
                Glow effects
            </label>

            <input
                id="glowEffectsToggle"
                class="rofleq-extra-toggle"
                type="checkbox"
            >

        </div>

        <div class="rofleq-extra-row">

            <label for="cardAnimationsToggle">
                Card animations
            </label>

            <input
                id="cardAnimationsToggle"
                class="rofleq-extra-toggle"
                type="checkbox"
            >

        </div>

        <div class="rofleq-extra-row">

            <label for="reduceMotionToggle">
                Reduce motion
            </label>

            <input
                id="reduceMotionToggle"
                class="rofleq-extra-toggle"
                type="checkbox"
            >

        </div>

        <div class="rofleq-extra-row">

            <label for="continueButtonToggle">
                Continue button
            </label>

            <input
                id="continueButtonToggle"
                class="rofleq-extra-toggle"
                type="checkbox"
            >

        </div>

        <div class="rofleq-extra-row">

            <label for="launchAnimationControl">
                Launch animation
            </label>

            <select id="launchAnimationControl">

                <option value="fade">
                    Fade
                </option>

                <option value="zoom">
                    Zoom
                </option>

                <option value="none">
                    None
                </option>

            </select>

        </div>

        <div class="rofleq-extra-row">

            <label for="confirmLaunchToggle">
                Confirm launch
            </label>

            <input
                id="confirmLaunchToggle"
                class="rofleq-extra-toggle"
                type="checkbox"
            >

        </div>

        <div class="rofleq-extra-row">

            <label for="cardSizeControl">
                Game card size
            </label>

            <select id="cardSizeControl">

                <option value="small">
                    Small
                </option>

                <option value="medium">
                    Medium
                </option>

                <option value="large">
                    Large
                </option>

            </select>

        </div>
    `;


    panel.appendChild(
        section
    );

}


function applyBackgroundStyle(
    value
) {

    const styles = [
        "checkerboard",
        "grid",
        "dots",
        "scanlines",
        "solid",
        "none"
    ];


    styles.forEach(
        style => {

            document.body.classList.remove(
                `bg-style-${style}`
            );

        }
    );


    document.body.classList.add(
        `bg-style-${value}`
    );

}


function applyGlowEffects(
    value
) {

    document.body.classList.toggle(
        "glow-disabled",
        !value
    );

}


function applyCardAnimations(
    value
) {

    document.body.classList.toggle(
        "cards-no-animation",
        !value
    );

}


function applyReduceMotion(
    value
) {

    document.body.classList.toggle(
        "reduce-motion",
        value
    );

}


function applyCardSize(
    value
) {

    [
        "small",
        "medium",
        "large"
    ].forEach(
        size => {

            document.body.classList.remove(
                `card-size-${size}`
            );

        }
    );


    document.body.classList.add(
        `card-size-${value}`
    );

}


function updateContinueButton() {

    let button =
        document.getElementById(
            "rofleqContinueButton"
        );


    const enabled =
        getExtraSetting(
            "continueButton"
        );


    if (!enabled) {

        if (button) {

            button.style.display =
                "none";

        }

        return;

    }


    const lastGame =
        getSetting(
            EXTRA_SETTINGS_KEYS.lastGame,
            null
        );


    if (
        !lastGame ||
        !lastGame.url
    ) {

        if (button) {

            button.style.display =
                "none";

        }

        return;

    }


    if (!button) {

        button =
            document.createElement(
                "button"
            );


        button.id =
            "rofleqContinueButton";


        button.className =
            "rofleq-continue-button";


        const target =
            document.getElementById(
                "favorites"
            ) ||

            document.getElementById(
                "games"
            ) ||

            document.querySelector(
                "main"
            );


        if (target) {

            target.prepend(
                button
            );

        }

    }


    button.innerHTML =
        `▶ Continue ${lastGame.name || "last game"}`;


    button.style.display =
        "flex";


    button.onclick =
        () => {

            launchGame(
                lastGame.url,
                lastGame.name
            );

        };

}


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


    updateContinueButton();


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
            "launchAnimationControl"
        );


    const confirmLaunchToggle =
        document.getElementById(
            "confirmLaunchToggle"
        );


    const cardSizeControl =
        document.getElementById(
            "cardSizeControl"
        );


    if (backgroundStyleControl) {

        backgroundStyleControl.value =
            getExtraSetting(
                "backgroundStyle"
            );

    }


    if (glowEffectsToggle) {

        glowEffectsToggle.checked =
            getExtraSetting(
                "glowEffects"
            );

    }


    if (cardAnimationsToggle) {

        cardAnimationsToggle.checked =
            getExtraSetting(
                "cardAnimations"
            );

    }


    if (reduceMotionToggle) {

        reduceMotionToggle.checked =
            getExtraSetting(
                "reduceMotion"
            );

    }


    if (continueButtonToggle) {

        continueButtonToggle.checked =
            getExtraSetting(
                "continueButton"
            );

    }


    if (launchAnimationControl) {

        launchAnimationControl.value =
            getExtraSetting(
                "launchAnimation"
            );

    }


    if (confirmLaunchToggle) {

        confirmLaunchToggle.checked =
            getExtraSetting(
                "confirmLaunch"
            );

    }


    if (cardSizeControl) {

        cardSizeControl.value =
            getExtraSetting(
                "cardSize"
            );

    }

}


function connectExtraSettings() {

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
            "launchAnimationControl"
        );


    const confirmLaunchToggle =
        document.getElementById(
            "confirmLaunchToggle"
        );


    const cardSizeControl =
        document.getElementById(
            "cardSizeControl"
        );


    if (backgroundStyleControl) {

        backgroundStyleControl.onchange =
            () => {

                saveExtraSetting(
                    "backgroundStyle",
                    backgroundStyleControl.value
                );

            };

    }


    if (glowEffectsToggle) {

        glowEffectsToggle.onchange =
            () => {

                saveExtraSetting(
                    "glowEffects",
                    glowEffectsToggle.checked
                );

            };

    }


    if (cardAnimationsToggle) {

        cardAnimationsToggle.onchange =
            () => {

                saveExtraSetting(
                    "cardAnimations",
                    cardAnimationsToggle.checked
                );

            };

    }


    if (reduceMotionToggle) {

        reduceMotionToggle.onchange =
            () => {

                saveExtraSetting(
                    "reduceMotion",
                    reduceMotionToggle.checked
                );

            };

    }


    if (continueButtonToggle) {

        continueButtonToggle.onchange =
            () => {

                saveExtraSetting(
                    "continueButton",
                    continueButtonToggle.checked
                );

            };

    }


    if (launchAnimationControl) {

        launchAnimationControl.onchange =
            () => {

                saveExtraSetting(
                    "launchAnimation",
                    launchAnimationControl.value
                );

            };

    }


    if (confirmLaunchToggle) {

        confirmLaunchToggle.onchange =
            () => {

                saveExtraSetting(
                    "confirmLaunch",
                    confirmLaunchToggle.checked
                );

            };

    }


    if (cardSizeControl) {

        cardSizeControl.onchange =
            () => {

                saveExtraSetting(
                    "cardSize",
                    cardSizeControl.value
                );

            };

    }

}


function getGameInfoFromUrl(
    gameUrl
) {

    const cards =
        document.querySelectorAll(
            ".game-card[data-game-url]"
        );


    for (
        const card of cards
    ) {

        if (
            card.dataset.gameUrl ===
            gameUrl
        ) {

            return {

                name:
                    card.dataset.gameName ||

                    card.querySelector(
                        ".game-title"
                    )?.textContent.trim() ||

                    "game",

                url:
                    gameUrl

            };

        }

    }


    return {

        name:
            "last game",

        url:
            gameUrl

    };

}


function showLaunchAnimation(
    name
) {

    if (
        getExtraSetting(
            "reduceMotion"
        )
    ) {

        return 0;

    }


    const animation =
        getExtraSetting(
            "launchAnimation"
        );


    if (
        animation ===
        "none"
    ) {

        return 0;

    }


    let overlay =
        document.getElementById(
            "rofleqLaunchOverlay"
        );


    if (!overlay) {

        overlay =
            document.createElement(
                "div"
            );


        overlay.id =
            "rofleqLaunchOverlay";


        overlay.className =
            "rofleq-launch-overlay";


        overlay.innerHTML = `

            <div
                class="rofleq-launch-text"
            ></div>

        `;


        document.body.appendChild(
            overlay
        );

    }


    overlay.className =
        `rofleq-launch-overlay ${animation}`;


    overlay.querySelector(
        ".rofleq-launch-text"
    ).textContent =
        `Launching ${name || "game"}...`;


    requestAnimationFrame(
        () => {

            overlay.classList.add(
                "show"
            );

        }
    );


    return 280;

}


function connectExtraSettingsWhenReady() {

    injectExtraSettingsStyles();

    createExtraSettingsUI();

    applyExtraSettings();

    connectExtraSettings();

}


/* =========================
   GAME LAUNCHING
========================= */

function rofBaseLaunchGame(
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
   NEW LAUNCH WRAPPER
========================= */

function launchGame(
    gameUrl,
    gameName = null
) {

    const info =
        gameName
            ? {
                name: gameName,
                url: gameUrl
            }
            : getGameInfoFromUrl(
                gameUrl
            );


    if (
        getExtraSetting(
            "confirmLaunch"
        )
    ) {

        const confirmed =
            window.confirm(
                `Launch ${info.name || "this game"}?`
            );


        if (!confirmed) {
            return;
        }

    }


    setSetting(
        EXTRA_SETTINGS_KEYS.lastGame,
        info
    );


    updateContinueButton();


    const delay =
        showLaunchAnimation(
            info.name
        );


    if (delay > 0) {

        setTimeout(
            () => {

                rofBaseLaunchGame(
                    gameUrl
                );

            },
            delay
        );

    } else {

        rofBaseLaunchGame(
            gameUrl
        );

    }

}


/* =========================
   RESET BUTTONS
========================= */

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


                    const setting =
                        button.dataset.reset;


                    if (
                        setting ===
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
                        setting ===
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
                        setting ===
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
                        setting ===
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
                        setting ===
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


                        if (customThemeColor) {

                            customThemeColor.value =
                                "#e3262e";

                        }


                        applyTheme(
                            0,
                            false
                        );

                    }


                    if (
                        setting ===
                        "extra"
                    ) {

                        Object.keys(
                            EXTRA_SETTINGS
                        ).forEach(
                            name => {

                                setSetting(
                                    EXTRA_SETTINGS_KEYS[name],
                                    EXTRA_SETTINGS[name]
                                );

                            }
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

    connectExtraSettingsWhenReady();


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


        if (customThemeColor) {

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


    if (customThemeColor) {

        customThemeColor.value =
            getCustomTheme();

    }

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


/* =========================
   KONAMI CODE / DOUG
========================= */

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


if (!window.dougKeySequence) {

    window.dougKeySequence =
        [];

}


document.addEventListener(
    "keydown",
    event => {

        window.dougKeySequence.push(
            event.key
        );


        if (
            window.dougKeySequence.length >
            konamiCode.length
        ) {

            window.dougKeySequence.shift();

        }


        const correct =
            window.dougKeySequence.length ===
                konamiCode.length &&

            window.dougKeySequence.every(
                (
                    key,
                    index
                ) =>
                    key ===
                    konamiCode[index]
            );


        if (!correct) {
            return;
        }


        window.dougKeySequence =
            [];


        const doug =
            document.createElement(
                "img"
            );


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
            mouseMoveEvent => {

                mouseX =
                    mouseMoveEvent.clientX;


                mouseY =
                    mouseMoveEvent.clientY;

            }
        );


        function followCursor() {

            dougX +=
                (mouseX - dougX) *
                0.08;


            dougY +=
                (mouseY - dougY) *
                0.08;


            doug.style.transform =
                `translate(${dougX - 50}px, ${dougY - 50}px)`;


            requestAnimationFrame(
                followCursor
            );

        }


        followCursor();

    }
);
