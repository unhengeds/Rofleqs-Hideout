/* =========================================================
   ROFLEQ'S HIDEOUT
   SETTINGS + THEMES + FAVORITES + SCROLL NAVIGATION
========================================================= */


/* =========================================================
   DEFAULTS
========================================================= */

const DEFAULTS = {

    openInBlank: true,

    animatedBackground: true,

    backgroundSpeed: 6,

    backgroundTransparency: 15.5,

    themeColor: "#e3262e"

};


/* =========================================================
   THEME COLORS
========================================================= */

const THEMES = [

    "#e3262e", // Red
    "#20d65a", // Green
    "#8b45ff", // Purple
    "#238cff", // Blue
    "#ff8a00"  // Orange

];


let themeIndex = 0;


/* =========================================================
   ELEMENTS
========================================================= */

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

const logoButton =
    document.getElementById(
        "logoButton"
    );

const openInBlankToggle =
    document.getElementById(
        "openInBlankToggle"
    );

const animatedBackgroundToggle =
    document.getElementById(
        "animatedBackgroundToggle"
    );

const aboutBlankHint =
    document.getElementById(
        "aboutBlankHint"
    );

const backgroundSpeed =
    document.getElementById(
        "backgroundSpeed"
    );

const backgroundSpeedValue =
    document.getElementById(
        "backgroundSpeedValue"
    );

const backgroundTransparency =
    document.getElementById(
        "backgroundTransparency"
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

const themeColorPicker =
    document.getElementById(
        "themeColorPicker"
    );

const favoriteCount =
    document.getElementById(
        "favoriteCount"
    );

const favoritesGrid =
    document.getElementById(
        "favoritesGrid"
    );

const emptyFavorites =
    document.getElementById(
        "emptyFavorites"
    );

const gamesGrid =
    document.getElementById(
        "gamesGrid"
    );

const favoritesNav =
    document.getElementById(
        "favoritesNav"
    );

const gamesNav =
    document.getElementById(
        "gamesNav"
    );

const themeNotification =
    document.getElementById(
        "themeNotification"
    );

const removeAllFavorites =
    document.getElementById(
        "removeAllFavorites"
    );


/* =========================================================
   LOCAL STORAGE HELPERS
========================================================= */

function getStorage(
    key,
    fallback
) {

    const value =
        localStorage.getItem(key);

    if (value === null) {
        return fallback;
    }

    return value;
}


function setStorage(
    key,
    value
) {

    localStorage.setItem(
        key,
        String(value)
    );

}


/* =========================================================
   ABOUT:BLANK
========================================================= */

function updateAboutBlank() {

    const enabled =
        openInBlankToggle.checked;

    aboutBlankHint.textContent =
        enabled
            ? "Games open in a new about:blank window."
            : "Games open normally in this tab.";

}


openInBlankToggle.checked =
    getStorage(
        "openInBlank",
        DEFAULTS.openInBlank
    ) === "true";


updateAboutBlank();


openInBlankToggle.addEventListener(
    "change",
    function () {

        setStorage(
            "openInBlank",
            openInBlankToggle.checked
        );

        updateAboutBlank();

    }
);


/* =========================================================
   BACKGROUND
========================================================= */

backgroundSpeed.value =
    getStorage(
        "backgroundSpeed",
        DEFAULTS.backgroundSpeed
    );

backgroundTransparency.value =
    getStorage(
        "backgroundTransparency",
        DEFAULTS.backgroundTransparency
    );


animatedBackgroundToggle.checked =
    getStorage(
        "animatedBackground",
        DEFAULTS.animatedBackground
    ) === "true";


function updateBackground() {

    const enabled =
        animatedBackgroundToggle.checked;

    const speed =
        Number(
            backgroundSpeed.value
        );

    const transparency =
        Number(
            backgroundTransparency.value
        );


    document.documentElement.style.setProperty(
        "--checker-opacity",
        transparency / 100
    );


    if (speed === 0) {

        document.documentElement.style.setProperty(
            "--checker-speed",
            "999999s"
        );

    }

    else {

        /*
         * Higher number = faster.
         */

        const duration =
            36 / speed;

        document.documentElement.style.setProperty(
            "--checker-speed",
            duration + "s"
        );

    }


    backgroundSpeedValue.textContent =
        speed;


    backgroundTransparencyValue.textContent =
        transparency + "%";


    if (enabled) {

        document.body.classList.remove(
            "background-disabled"
        );

        backgroundSpeedBox.style.display =
            "block";

        backgroundTransparencyBox.style.display =
            "block";

    }

    else {

        document.body.classList.add(
            "background-disabled"
        );

        backgroundSpeedBox.style.display =
            "none";

        backgroundTransparencyBox.style.display =
            "none";

    }

}


updateBackground();


animatedBackgroundToggle.addEventListener(
    "change",
    function () {

        setStorage(
            "animatedBackground",
            animatedBackgroundToggle.checked
        );

        updateBackground();

    }
);


backgroundSpeed.addEventListener(
    "input",
    function () {

        setStorage(
            "backgroundSpeed",
            backgroundSpeed.value
        );

        updateBackground();

    }
);


backgroundTransparency.addEventListener(
    "input",
    function () {

        setStorage(
            "backgroundTransparency",
            backgroundTransparency.value
        );

        updateBackground();

    }
);


/* =========================================================
   SETTINGS PANEL
========================================================= */

function openSettings() {

    settingsPanel.classList.add(
        "open"
    );

    settingsButton.classList.add(
        "open"
    );

}


function closeSettingsPanel() {

    settingsPanel.classList.remove(
        "open"
    );

    settingsButton.classList.remove(
        "open"
    );

}


settingsButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        if (
            settingsPanel.classList.contains(
                "open"
            )
        ) {

            closeSettingsPanel();

        }

        else {

            openSettings();

        }

    }
);


closeSettings.addEventListener(
    "click",
    function () {

        closeSettingsPanel();

    }
);


settingsPanel.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

    }
);


document.addEventListener(
    "click",
    function () {

        closeSettingsPanel();

    }
);


/* =========================================================
   FAVORITES
========================================================= */

function getFavorites() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "favorites"
            ) || "[]"
        );

    }

    catch {

        return [];

    }

}


function saveFavorites(
    favorites
) {

    localStorage.setItem(
        "favorites",
        JSON.stringify(
            favorites
        )
    );

}


/* =========================================================
   GAME INFORMATION
========================================================= */

function getGameCards() {

    return Array.from(
        document.querySelectorAll(
            "#gamesGrid .game-card"
        )
    );

}


function getGameData(
    card
) {

    return {

        id:
            card.dataset.gameId,

        name:
            card.dataset.gameName,

        version:
            card.dataset.gameVersion,

        url:
            card.dataset.gameUrl,

        image:
            card.querySelector(
                ".game-thumbnail, .minecraft-thumbnail"
            )?.getAttribute("src") || ""

    };

}


/* =========================================================
   FAVORITE COUNT
========================================================= */

function updateFavoriteCount() {

    const favorites =
        getFavorites();

    favoriteCount.textContent =
        favorites.length;

}


/* =========================================================
   UPDATE STARS
========================================================= */

function updateFavoriteButtons() {

    const favorites =
        getFavorites();


    document
        .querySelectorAll(
            ".favorite-button"
        )
        .forEach(
            function (button) {

                const card =
                    button.closest(
                        ".game-card"
                    );

                if (!card) {
                    return;
                }


                const id =
                    card.dataset.gameId;


                const isFavorite =
                    favorites.includes(id);


                button.classList.toggle(
                    "favorited",
                    isFavorite
                );


                button.textContent =
                    isFavorite
                        ? "★"
                        : "☆";


                button.title =
                    isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites";


                button.setAttribute(
                    "aria-label",
                    isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                );

            }
        );

}


/* =========================================================
   TOGGLE FAVORITE
========================================================= */

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
                function (id) {

                    return id !== gameId;

                }
            );

    }

    else {

        favorites.push(
            gameId
        );

    }


    saveFavorites(
        favorites
    );


    updateFavoriteCount();

    updateFavoriteButtons();

    renderFavorites();

}


/* =========================================================
   RENDER FAVORITES
========================================================= */

function renderFavorites() {

    const favorites =
        getFavorites();


    favoritesGrid
        .querySelectorAll(
            ".game-card"
        )
        .forEach(
            function (card) {

                card.remove();

            }
        );


    if (
        favorites.length === 0
    ) {

        emptyFavorites.style.display =
            "block";

        return;

    }


    emptyFavorites.style.display =
        "none";


    const allGames =
        getGameCards();


    favorites.forEach(
        function (favoriteId) {

            const originalCard =
                allGames.find(
                    function (card) {

                        return (
                            card.dataset.gameId ===
                            favoriteId
                        );

                    }
                );


            if (!originalCard) {
                return;
            }


            const clone =
                originalCard.cloneNode(
                    true
                );


            /*
             * Favorites still use the same
             * game card and game URL.
             */

            clone.addEventListener(
                "click",
                function () {

                    launchGame(
                        clone.dataset.gameUrl
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
                    function (event) {

                        event.stopPropagation();

                        toggleFavorite(
                            clone.dataset.gameId
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
                    function (event) {

                        event.stopPropagation();

                        launchGame(
                            clone.dataset.gameUrl
                        );

                    }
                );

            }


            favoritesGrid.appendChild(
                clone
            );

        }
    );


    updateFavoriteButtons();

}


/* =========================================================
   CONNECT ORIGINAL GAME CARDS
========================================================= */

function setupGameCards() {

    getGameCards().forEach(
        function (card) {

            const url =
                card.dataset.gameUrl;


            card.addEventListener(
                "click",
                function () {

                    launchGame(
                        url
                    );

                }
            );


            const star =
                card.querySelector(
                    ".favorite-button"
                );


            if (star) {

                star.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                        toggleFavorite(
                            card.dataset.gameId
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
                    function (event) {

                        event.stopPropagation();

                        launchGame(
                            url
                        );

                    }
                );

            }

        }
    );

}


setupGameCards();

updateFavoriteCount();

updateFavoriteButtons();

renderFavorites();


/* =========================================================
   REMOVE ALL FAVORITES
========================================================= */

removeAllFavorites.addEventListener(
    "click",
    function () {

        const favorites =
            getFavorites();


        if (
            favorites.length === 0
        ) {

            alert(
                "You don't have any favorite games."
            );

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to remove ALL favorites?\n\n" +
                "This will remove " +
                favorites.length +
                " game" +
                (
                    favorites.length === 1
                        ? ""
                        : "s"
                ) +
                " from your Favorites."
            );


        if (!confirmed) {
            return;
        }


        saveFavorites(
            []
        );


        updateFavoriteCount();

        updateFavoriteButtons();

        renderFavorites();

    }
);


/* =========================================================
   RESET INDIVIDUAL SETTINGS
========================================================= */

document
    .querySelectorAll(
        ".reset-setting"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const setting =
                        button.dataset.reset;


                    if (
                        setting ===
                        "openInBlank"
                    ) {

                        openInBlankToggle.checked =
                            DEFAULTS.openInBlank;

                        setStorage(
                            "openInBlank",
                            DEFAULTS.openInBlank
                        );

                        updateAboutBlank();

                    }


                    if (
                        setting ===
                        "animatedBackground"
                    ) {

                        animatedBackgroundToggle.checked =
                            DEFAULTS.animatedBackground;

                        setStorage(
                            "animatedBackground",
                            DEFAULTS.animatedBackground
                        );

                        updateBackground();

                    }


                    if (
                        setting ===
                        "backgroundSpeed"
                    ) {

                        backgroundSpeed.value =
                            DEFAULTS.backgroundSpeed;

                        setStorage(
                            "backgroundSpeed",
                            DEFAULTS.backgroundSpeed
                        );

                        updateBackground();

                    }


                    if (
                        setting ===
                        "backgroundTransparency"
                    ) {

                        backgroundTransparency.value =
                            DEFAULTS.backgroundTransparency;

                        setStorage(
                            "backgroundTransparency",
                            DEFAULTS.backgroundTransparency
                        );

                        updateBackground();

                    }


                    if (
                        setting ===
                        "themeColor"
                    ) {

                        applyTheme(
                            DEFAULTS.themeColor
                        );

                        themeColorPicker.value =
                            DEFAULTS.themeColor;

                        setStorage(
                            "themeColor",
                            DEFAULTS.themeColor
                        );

                    }

                }
            );

        }
    );


/* =========================================================
   THEME SYSTEM
========================================================= */

function applyTheme(
    color
) {

    document.documentElement.style.setProperty(
        "--theme",
        color
    );


    const lighter =
        lightenColor(
            color,
            25
        );


    document.documentElement.style.setProperty(
        "--theme-light",
        lighter
    );


    themeColorPicker.value =
        normalizeColor(
            color
        );


    setStorage(
        "themeColor",
        color
    );

}


function normalizeColor(
    color
) {

    if (
        /^#[0-9a-f]{6}$/i.test(
            color
        )
    ) {

        return color;

    }

    return DEFAULTS.themeColor;

}


function lightenColor(
    hex,
    amount
) {

    hex =
        hex.replace(
            "#",
            ""
        );


    let r =
        parseInt(
            hex.substring(
                0,
                2
            ),
            16
        );


    let g =
        parseInt(
            hex.substring(
                2,
                4
            ),
            16
        );


    let b =
        parseInt(
            hex.substring(
                4,
                6
            ),
            16
        );


    r =
        Math.min(
            255,
            r + amount
        );


    g =
        Math.min(
            255,
            g + amount
        );


    b =
        Math.min(
            255,
            b + amount
        );


    return (
        "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0")
    );

}


/* Load saved theme */

const savedTheme =
    getStorage(
        "themeColor",
        DEFAULTS.themeColor
    );


applyTheme(
    savedTheme
);


/* =========================================================
   LOGO THEME CYCLING
========================================================= */

logoButton.addEventListener(
    "click",
    function () {

        themeIndex++;

        if (
            themeIndex >=
            THEMES.length
        ) {

            themeIndex = 0;

        }


        const newColor =
            THEMES[
                themeIndex
            ];


        applyTheme(
            newColor
        );


        /*
         * When we return to red,
         * unlock the custom theme picker.
         */

        if (
            themeIndex === 0
        ) {

            showThemeNotification();

        }

    }
);


/* =========================================================
   THEME NOTIFICATION
========================================================= */

function showThemeNotification() {

    themeNotification.classList.add(
        "show"
    );


    setTimeout(
        function () {

            themeNotification.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* =========================================================
   CUSTOM COLOR PICKER
========================================================= */

themeColorPicker.addEventListener(
    "input",
    function () {

        const color =
            themeColorPicker.value;


        applyTheme(
            color
        );

    }
);


/* =========================================================
   NAVIGATION
========================================================= */

function setActiveNavigation(
    section
) {

    favoritesNav.classList.remove(
        "active"
    );

    gamesNav.classList.remove(
        "active"
    );


    if (
        section ===
        "favorites"
    ) {

        favoritesNav.classList.add(
            "active"
        );

    }

    else {

        gamesNav.classList.add(
            "active"
        );

    }

}


/* =========================================================
   CLICK NAVIGATION
========================================================= */

favoritesNav.addEventListener(
    "click",
    function () {

        setActiveNavigation(
            "favorites"
        );

    }
);


gamesNav.addEventListener(
    "click",
    function () {

        setActiveNavigation(
            "games"
        );

    }
);


/* =========================================================
   SCROLL NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        ".game-section"
    );


const sectionObserver =
    new IntersectionObserver(
        function (entries) {

            const visible =
                entries
                    .filter(
                        function (entry) {

                            return entry.isIntersecting;

                        }
                    )
                    .sort(
                        function (a, b) {

                            return (
                                b.intersectionRatio -
                                a.intersectionRatio
                            );

                        }
                    );


            if (
                visible.length === 0
            ) {

                return;

            }


            const id =
                visible[0]
                    .target
                    .id;


            setActiveNavigation(
                id
            );

        },
        {
            threshold: [
                0.15,
                0.3,
                0.5,
                0.7
            ],

            rootMargin:
                "-90px 0px -35% 0px"
        }
    );


sections.forEach(
    function (section) {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   LAUNCH GAME
========================================================= */

function launchGame(
    path
) {

    const useBlank =
        openInBlankToggle.checked;


    if (!useBlank) {

        window.location.href =
            path;

        return;

    }


    const gameWindow =
        window.open(
            "about:blank",
            "_blank"
        );


    if (!gameWindow) {

        alert(
            "The new tab was blocked by your browser. Please allow popups for this site."
        );

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
                src="${path}"
                allowfullscreen
            ></iframe>

        </body>

        </html>

    `);


    gameWindow.document.close();

}
