const defaultSettings = {

    openInBlank: true,

    animatedBackground: true,

    backgroundSpeed: 6,

    backgroundTransparency: 8,

    sidebarCollapsed: false,

    favoriteSort: "library"

};


const SETTINGS_KEYS = {

    openInBlank:
        "openInBlank",

    animatedBackground:
        "animatedBackground",

    backgroundSpeed:
        "backgroundSpeed",

    backgroundTransparency:
        "backgroundTransparency",

    sidebarCollapsed:
        "sidebarCollapsed",

    favoriteSort:
        "favoriteSort"

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


const sidebarCollapsedToggle =
    document.getElementById(
        "sidebarCollapsedToggle"
    );


const favoriteSort =
    document.getElementById(
        "favoriteSort"
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
   SIDEBAR COLLAPSE
========================= */

function applySidebarCollapsed(
    value
) {

    value =
        Boolean(value);


    document.body.classList.toggle(
        "sidebar-collapsed",
        value
    );


    if (sidebarCollapsedToggle) {

        sidebarCollapsedToggle.checked =
            value;

    }

}


if (sidebarCollapsedToggle) {

    sidebarCollapsedToggle.addEventListener(
        "change",
        () => {

            const value =
                sidebarCollapsedToggle.checked;


            setSetting(
                SETTINGS_KEYS.sidebarCollapsed,
                value
            );


            applySidebarCollapsed(
                value
            );

        }
    );

}


/* =========================
   FAVORITE SORTING
========================= */

function applyFavoriteSort(
    value
) {

    if (
        value !== "library" &&
        value !== "az" &&
        value !== "recent"
    ) {

        value =
            defaultSettings.favoriteSort;

    }


    if (favoriteSort) {

        favoriteSort.value =
            value;

    }


    renderFavorites();

}


if (favoriteSort) {

    favoriteSort.addEventListener(
        "change",
        () => {

            const value =
                favoriteSort.value;


            setSetting(
                SETTINGS_KEYS.favoriteSort,
                value
            );


            applyFavoriteSort(
                value
            );

        }
    );

}


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
                        "sidebarCollapsed"
                    ) {

                        setSetting(
                            SETTINGS_KEYS.sidebarCollapsed,
                            defaultSettings.sidebarCollapsed
                        );


                        applySidebarCollapsed(
                            defaultSettings.sidebarCollapsed
                        );

                    }


                    if (
                        setting ===
                        "favoriteSort"
                    ) {

                        setSetting(
                            SETTINGS_KEYS.favoriteSort,
                            defaultSettings.favoriteSort
                        );


                        applyFavoriteSort(
                            defaultSettings.favoriteSort
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

                }
            );

        }
    );


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
        Array.from(
            document.querySelectorAll(
                "#gamesGrid .game-card[data-game-id]"
            )
        );


    const favoriteCards =
        allCards.filter(
            card =>
                favorites.includes(
                    card.dataset.gameId
                )
        );


    const sort =
        getSetting(
            SETTINGS_KEYS.favoriteSort,
            defaultSettings.favoriteSort
        );


    if (sort === "az") {

        favoriteCards.sort(
            (a, b) => {

                const nameA =
                    a.dataset.gameName ||
                    "";

                const nameB =
                    b.dataset.gameName ||
                    "";

                return nameA.localeCompare(
                    nameB,
                    undefined,
                    {
                        sensitivity: "base"
                    }
                );

            }
        );

    } else if (sort === "recent") {

        const favoriteOrder =
            new Map(
                favorites.map(
                    (id, index) =>
                        [id, index]
                )
            );


        favoriteCards.sort(
            (a, b) => {

                const indexA =
                    favoriteOrder.get(
                        a.dataset.gameId
                    );

                const indexB =
                    favoriteOrder.get(
                        b.dataset.gameId
                    );

                return indexB - indexA;

            }
        );

    }


    favoritesGrid.innerHTML =
        "";


    favoriteCards.forEach(
        card => {

            favoritesGrid.appendChild(
                createFavoriteCard(
                    card
                )
            );

        }
    );


    if (
        favoriteCards.length === 0
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


    applySidebarCollapsed(

        getSetting(

            SETTINGS_KEYS.sidebarCollapsed,

            defaultSettings.sidebarCollapsed

        )

    );


    applyFavoriteSort(

        getSetting(

            SETTINGS_KEYS.favoriteSort,

            defaultSettings.favoriteSort

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
        saved === "custom"
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


/* =========================================================
   EXTRA SETTINGS
========================================================= */

const EXTRA_SETTINGS = {
    backgroundStyle: "checkerboard",
    glowEffects: true,
    cardAnimations: true,
    reduceMotion: false,
    continueButton: true,
    launchAnimation: "fade",
    confirmLaunch: false,
    cardSize: "medium"
};

const EXTRA_KEYS = {
    backgroundStyle: "rofleqBackgroundStyle",
    glowEffects: "rofleqGlowEffects",
    cardAnimations: "rofleqCardAnimations",
    reduceMotion: "rofleqReduceMotion",
    continueButton: "rofleqContinueButton",
    launchAnimation: "rofleqLaunchAnimation",
    confirmLaunch: "rofleqConfirmLaunch",
    cardSize: "rofleqCardSize",
    lastGame: "rofleqLastGame"
};

function extraSetting(key) {
    return getSetting(
        EXTRA_KEYS[key],
        EXTRA_SETTINGS[key]
    );
}

function saveExtraSetting(
    key,
    value
) {
    setSetting(
        EXTRA_KEYS[key],
        value
    );
}

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


function applyExtraSettings() {

    const backgroundStyle =
        extraSetting(
            "backgroundStyle"
        );

    const glowEffects =
        extraSetting(
            "glowEffects"
        );

    const cardAnimations =
        extraSetting(
            "cardAnimations"
        );

    const reduceMotion =
        extraSetting(
            "reduceMotion"
        );

    const continueButton =
        extraSetting(
            "continueButton"
        );

    const cardSize =
        extraSetting(
            "cardSize"
        );


    document.body.classList.remove(

        "bg-style-checkerboard",

        "bg-style-grid",

        "bg-style-dots",

        "bg-style-scanlines",

        "bg-style-none"

    );


    document.body.classList.add(
        `bg-style-${backgroundStyle}`
    );


    document.body.classList.toggle(
        "glow-disabled",
        !glowEffects
    );


    document.body.classList.toggle(
        "cards-no-animation",
        !cardAnimations
    );


    document.body.classList.toggle(
        "reduce-motion",
        reduceMotion
    );


    document.body.classList.remove(

        "card-size-small",

        "card-size-medium",

        "card-size-large"

    );


    document.body.classList.add(
        `card-size-${cardSize}`
    );


    if (backgroundStyleControl)
        backgroundStyleControl.value =
            backgroundStyle;


    if (glowEffectsToggle)
        glowEffectsToggle.checked =
            glowEffects;


    if (cardAnimationsToggle)
        cardAnimationsToggle.checked =
            cardAnimations;


    if (reduceMotionToggle)
        reduceMotionToggle.checked =
            reduceMotion;


    if (continueButtonToggle)
        continueButtonToggle.checked =
            continueButton;


    if (launchAnimationControl)
        launchAnimationControl.value =
            extraSetting(
                "launchAnimation"
            );


    if (confirmLaunchToggle)
        confirmLaunchToggle.checked =
            extraSetting(
                "confirmLaunch"
            );


    if (cardSizeControl)
        cardSizeControl.value =
            cardSize;


    updateContinueButton();

}


function updateContinueButton() {

    if (!continueGameButton)
        return;


    const enabled =
        extraSetting(
            "continueButton"
        );


    const lastGame =
        extraSetting(
            "lastGame"
        );


    if (
        !enabled ||
        !lastGame
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


function connectExtraSetting(
    control,
    key,
    type = "value"
) {

    if (!control)
        return;


    control.addEventListener(

        type === "change"
            ? "change"
            : "input",

        () => {

            let value =
                type === "checked"
                    ? control.checked
                    : control.value;


            saveExtraSetting(
                key,
                value
            );


            applyExtraSettings();

        }

    );

}


connectExtraSetting(
    backgroundStyleControl,
    "backgroundStyle"
);


connectExtraSetting(
    glowEffectsToggle,
    "glowEffects",
    "checked"
);


connectExtraSetting(
    cardAnimationsToggle,
    "cardAnimations",
    "checked"
);


connectExtraSetting(
    reduceMotionToggle,
    "reduceMotion",
    "checked"
);


connectExtraSetting(
    continueButtonToggle,
    "continueButton",
    "checked"
);


connectExtraSetting(
    launchAnimationControl,
    "launchAnimation"
);


connectExtraSetting(
    confirmLaunchToggle,
    "confirmLaunch",
    "checked"
);


connectExtraSetting(
    cardSizeControl,
    "cardSize"
);


if (continueGameButton) {

    continueGameButton.addEventListener(
        "click",
        () => {

            const lastGame =
                extraSetting(
                    "lastGame"
                );


            if (
                lastGame?.url
            ) {

                launchGame(
                    lastGame.url
                );

            }

        }
    );

}


/* Wrap the existing launcher with confirmation,
   last-played tracking, and a visual launch animation. */

const rofOriginalLaunchGame =
    launchGame;


launchGame = function(
    gameUrl
) {

    const card =
        Array.from(
            document.querySelectorAll(
                ".game-card[data-game-url]"
            )
        ).find(
            element =>
                element.dataset.gameUrl ===
                gameUrl
        );


    const gameName =

        card?.dataset.gameName ||

        card
            ?.querySelector(
                ".game-title"
            )
            ?.textContent
            .trim() ||

        "Game";


    if (
        extraSetting(
            "confirmLaunch"
        )
    ) {

        const confirmed =
            window.confirm(
                `Launch ${gameName}?`
            );


        if (!confirmed)
            return;

    }


    saveExtraSetting(
        "lastGame",
        {
            name:
                gameName,

            url:
                gameUrl
        }
    );


    updateContinueButton();


    const animation =
        extraSetting(
            "launchAnimation"
        );


    const reduced =
        extraSetting(
            "reduceMotion"
        );


    if (
        reduced ||
        animation === "none"
    ) {

        rofOriginalLaunchGame(
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
            `<div class="launch-text">Launching...</div>`;


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

            rofOriginalLaunchGame(
                gameUrl
            );

        },
        280
    );

};


document
    .querySelectorAll(
        ".setting-reset"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const key =
                        button.dataset.reset;


                    const extraKey =
                        EXTRA_KEYS[key];


                    if (!extraKey)
                        return;


                    saveExtraSetting(
                        key,
                        EXTRA_SETTINGS[key]
                    );


                    applyExtraSettings();

                }
            );

        }
    );


applyExtraSettings();

/* =========================================================
   DOUG / KONAMI CODE
   ↑ ↑ ↓ ↓ ← → ← →
========================================================= */

const dougKonamiCode = [

    "ArrowUp",
    "ArrowUp",

    "ArrowDown",
    "ArrowDown",

    "ArrowLeft",
    "ArrowRight",

    "ArrowLeft",
    "ArrowRight"

];


let dougKonamiIndex = 0;

let doug = null;


/* =========================================================
   DOUG POSITION
========================================================= */

let dougTargetX = 0;
let dougTargetY = 0;

let dougX = 0;
let dougY = 0;


/* =========================================================
   CURSOR TRACKING
========================================================= */

document.addEventListener(
    "mousemove",
    event => {

        dougTargetX =
            event.clientX;

        dougTargetY =
            event.clientY;

    }
);


/* =========================================================
   CREATE DOUG
========================================================= */

function createDoug() {

    /*
        Don't create multiple Dougs
        if the code is entered again.
    */

    if (doug) {
        return;
    }


    doug =
        document.createElement(
            "img"
        );


    /*
        Doug's image.
        
        Your file is:
        
        assets/doug.png
    */

    doug.src =
        "assets/doug.png";


    doug.alt =
        "";


    doug.id =
        "doug";


    doug.draggable =
        false;


    /* =====================================================
       DOUG STYLE
    ===================================================== */

    doug.style.position =
        "fixed";


    doug.style.left =
        "0px";


    doug.style.top =
        "0px";


    doug.style.width =
        "80px";


    doug.style.height =
        "80px";


    doug.style.objectFit =
        "contain";


    /*
        Doug shouldn't block
        buttons or other elements.
    */

    doug.style.pointerEvents =
        "none";


    /*
        Put Doug above everything.
    */

    doug.style.zIndex =
        "999999";


    doug.style.userSelect =
        "none";


    doug.style.webkitUserDrag =
        "none";


    /*
        Let the browser optimize
        the smooth movement.
    */

    doug.style.willChange =
        "transform";


    /*
        Make sure Doug doesn't
        have an accidental border.
    */

    doug.style.border =
        "none";


    /*
        Prevent the image from
        creating weird inline spacing.
    */

    doug.style.display =
        "block";


    document.body.appendChild(
        doug
    );


    /* =====================================================
       INITIAL POSITION
    ===================================================== */

    dougX =
        dougTargetX;


    dougY =
        dougTargetY;


    updateDougPosition();


    /*
        Start the smooth following
        animation.
    */

    requestAnimationFrame(
        dougFollowLoop
    );

}


/* =========================================================
   SMOOTH DOUG FOLLOWING
========================================================= */

function dougFollowLoop() {

    /*
        Stop if Doug somehow
        doesn't exist anymore.
    */

    if (!doug) {
        return;
    }


    /*
        How smoothly Doug follows.

        Smaller:
            More delayed / floaty.

        Larger:
            Faster / tighter.

        0.075 gives Doug a noticeable
        smooth delay behind the cursor.
    */

    const smoothness =
        0.075;


    dougX +=
        (
            dougTargetX -
            dougX
        ) *
        smoothness;


    dougY +=
        (
            dougTargetY -
            dougY
        ) *
        smoothness;


    updateDougPosition();


    requestAnimationFrame(
        dougFollowLoop
    );

}


/* =========================================================
   UPDATE DOUG POSITION
========================================================= */

function updateDougPosition() {

    if (!doug) {
        return;
    }


    /*
        Doug sits slightly down/right
        from the actual cursor.
    */

    const offsetX =
        18;


    const offsetY =
        18;


    doug.style.transform =
        `translate3d(
            ${dougX + offsetX}px,
            ${dougY + offsetY}px,
            0
        )`;

}


/* =========================================================
   KONAMI CODE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Only arrow keys count.
        */

        if (
            event.key !== "ArrowUp" &&
            event.key !== "ArrowDown" &&
            event.key !== "ArrowLeft" &&
            event.key !== "ArrowRight"
        ) {

            return;

        }


        /*
            Correct next key.
        */

        if (
            event.key ===
            dougKonamiCode[
                dougKonamiIndex
            ]
        ) {

            dougKonamiIndex++;


            /*
                The entire code has
                been entered.

                ↑ ↑ ↓ ↓ ← → ← →
            */

            if (
                dougKonamiIndex ===
                dougKonamiCode.length
            ) {

                /*
                    Reset so the code can
                    be entered again later.
                */

                dougKonamiIndex =
                    0;


                createDoug();

            }

        } else {

            /*
                Wrong arrow.

                Start the sequence over.
            */

            dougKonamiIndex =
                0;

        }

    }
);

/* =========================================================
   GAMES-ONLY SEARCH
========================================================= */

(function () {
    function initializeGamesSearch() {
        const searchInput = document.getElementById("gamesSearch");
        const clearButton = document.getElementById("clearGamesSearch");
        const gamesGrid = document.getElementById("gamesGrid");
        const emptyMessage = document.getElementById("gamesSearchEmpty");

        if (!searchInput || !gamesGrid) return;

        function filterGames() {
            const query = searchInput.value.trim().toLowerCase();

            const gameCards = gamesGrid.querySelectorAll(".game-card");
            let visibleCount = 0;

            gameCards.forEach(function (card) {
                const name = (
                    card.dataset.gameName ||
                    card.querySelector(".game-title")?.textContent ||
                    ""
                ).toLowerCase();

                const matches = name.includes(query);

                card.hidden = !matches;

                if (matches) visibleCount++;
            });

            if (emptyMessage) {
                emptyMessage.hidden = visibleCount !== 0;
            }

            if (clearButton) {
                clearButton.classList.toggle(
                    "visible",
                    searchInput.value.length > 0
                );
            }
        }

        searchInput.addEventListener("input", filterGames);

        if (clearButton) {
            clearButton.addEventListener("click", function () {
                searchInput.value = "";
                filterGames();
                searchInput.focus();
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeGamesSearch
        );
    } else {
        initializeGamesSearch();
    }
})();

/* =========================================================
   MEDIA LAUNCHER
========================================================= */

function launchMedia(mediaUrl) {
    const openInBlank =
        typeof getSetting === "function"
            ? getSetting("rofleqHideoutOpenInBlank", true)
            : true;

    if (openInBlank) {
        const tab = window.open("about:blank", "_blank");

        if (tab) {
            const iframe = tab.document.createElement("iframe");

            iframe.src = new URL(mediaUrl, window.location.href).href;
            iframe.style.cssText =
                "position:fixed;inset:0;width:100%;height:100%;border:0;";

            tab.document.body.style.cssText =
                "margin:0;overflow:hidden;background:#000;";

            tab.document.body.appendChild(iframe);
        } else {
            window.location.href = mediaUrl;
        }
    } else {
        window.location.href = mediaUrl;
    }
}
