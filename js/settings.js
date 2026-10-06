/* =========================
   DEFAULT SETTINGS
========================= */

const defaultSettings = {
    openInBlank: true,
    animatedBackground: true,
    backgroundSpeed: 6,
    backgroundTransparency: 8
};


/* =========================
   STORAGE KEYS
========================= */

const SETTINGS_KEYS = {
    openInBlank: "openInBlank",
    animatedBackground: "animatedBackground",
    backgroundSpeed: "backgroundSpeed",
    backgroundTransparency: "backgroundTransparency"
};

const FAVORITES_KEY =
    "rofleqHideoutFavorites";


/* =========================
   ELEMENTS
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

function getSetting(key, fallback) {

    const saved =
        localStorage.getItem(key);

    if (saved === null) {
        return fallback;
    }

    try {
        return JSON.parse(saved);
    } catch {
        return fallback;
    }
}


function setSetting(key, value) {

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
   ABOUT:BLANK
========================= */

function applyOpenInBlank(value) {

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

            applyOpenInBlank(value);

        }
    );

}


/* =========================
   ANIMATED BACKGROUND
========================= */

function applyAnimatedBackground(value) {

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

function applyBackgroundSpeed(value) {

    value = Number(value);

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

function applyBackgroundTransparency(value) {

    value = Number(value);

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


function saveFavorites(favorites) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(
            favorites
        )
    );

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
                id => id !== gameId
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


/* =========================
   FAVORITE BUTTONS
========================= */

function updateFavoriteButtons() {

    const cards =
        document.querySelectorAll(
            ".game-card[data-game-id]"
        );

    cards.forEach(card => {

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

    });

}


/* =========================
   FAVORITE COUNT
========================= */

function updateFavoriteCount() {

    if (!favoriteCount) {
        return;
    }

    favoriteCount.textContent =
        getFavorites().length;

}


/* =========================
   CREATE FAVORITE CARD
========================= */

function createFavoriteCard(
    originalCard
) {

    const clone =
        originalCard.cloneNode(
            true
        );


    clone.onclick = () => {

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


/* =========================
   RENDER FAVORITES
========================= */

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


    favoritesGrid.innerHTML = "";


    let foundFavorites = 0;


    allCards.forEach(card => {

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

    });


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
   SCROLL NAVIGATION
========================= */

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
   ACTIVE NAVIGATION
========================= */

const sections = [

    document.getElementById(
        "favorites"
    ),

    document.getElementById(
        "games"
    )

].filter(Boolean);


const observer =
    new IntersectionObserver(
        entries => {

            const visible =
                entries
                    .filter(
                        entry =>
                            entry.isIntersecting
                    )
                    .sort(
                        (a, b) =>
                            b.intersectionRatio -
                            a.intersectionRatio
                    )[0];


            if (!visible) {
                return;
            }


            const id =
                visible.target.id;


            if (favoritesNav) {

                favoritesNav.classList.toggle(
                    "active",
                    id === "favorites"
                );

            }


            if (gamesNav) {

                gamesNav.classList.toggle(
                    "active",
                    id === "games"
                );

            }

        },

        {
            root: null,

            threshold: 0.2
        }
    );


sections.forEach(
    section => {

        observer.observe(
            section
        );

    }
);


/* =========================
   GAME LAUNCHER
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
   INITIALIZE SETTINGS
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


/* =========================
   INITIALIZE FAVORITES
========================= */

function initializeFavorites() {

    updateFavoriteButtons();

    renderFavorites();

    updateFavoriteCount();

}


/* =========================
   PAGE STARTUP
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeSettings();

        initializeFavorites();


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

                },
                100
            );

        }

    }
);
