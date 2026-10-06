/* =========================================================
   SETTINGS
========================================================= */

const settingsButton =
    document.getElementById("settingsButton");

const settingsPanel =
    document.getElementById("settingsPanel");

const blankToggle =
    document.getElementById("blankToggle");

const blankHint =
    document.getElementById("blankHint");

const backgroundToggle =
    document.getElementById("backgroundToggle");

const backgroundHint =
    document.getElementById("backgroundHint");

const speedSlider =
    document.getElementById("speedSlider");

const speedValue =
    document.getElementById("speedValue");

const transparencySlider =
    document.getElementById("transparencySlider");

const transparencyValue =
    document.getElementById("transparencyValue");

const speedSetting =
    document.getElementById("speedSetting");

const transparencySetting =
    document.getElementById("transparencySetting");


/* =========================================================
   DEFAULT SETTINGS
========================================================= */

const defaultSettings = {

    openInBlank: true,

    animatedBackground: true,

    backgroundSpeed: 6,

    backgroundTransparency: 8

};


/* =========================================================
   LOAD SETTINGS
========================================================= */

let openInBlank =
    localStorage.getItem("openInBlank");

let animatedBackground =
    localStorage.getItem("animatedBackground");

let backgroundSpeed =
    localStorage.getItem("backgroundSpeed");

let backgroundTransparency =
    localStorage.getItem("backgroundTransparency");


if (openInBlank === null) {

    openInBlank =
        defaultSettings.openInBlank;

} else {

    openInBlank =
        openInBlank === "true";

}


if (animatedBackground === null) {

    animatedBackground =
        defaultSettings.animatedBackground;

} else {

    animatedBackground =
        animatedBackground === "true";

}


if (backgroundSpeed === null) {

    backgroundSpeed =
        defaultSettings.backgroundSpeed;

} else {

    backgroundSpeed =
        Number(backgroundSpeed);

}


if (backgroundTransparency === null) {

    backgroundTransparency =
        defaultSettings.backgroundTransparency;

} else {

    backgroundTransparency =
        Number(backgroundTransparency);

}


/* =========================================================
   SETTINGS PANEL
========================================================= */

if (settingsButton && settingsPanel) {

    settingsButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            const isOpen =
                settingsPanel.classList.toggle(
                    "open"
                );

            settingsButton.classList.toggle(
                "open",
                isOpen
            );

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !settingsPanel.contains(event.target) &&
                !settingsButton.contains(event.target)
            ) {

                settingsPanel.classList.remove(
                    "open"
                );

                settingsButton.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   ABOUT:BLANK
========================================================= */

function updateBlankSetting() {

    if (!blankToggle) {
        return;
    }

    if (blankToggle.checked) {

        blankHint.textContent =
            "Currently enabled";

    } else {

        blankHint.textContent =
            "Currently disabled";

    }

}


if (blankToggle) {

    blankToggle.checked =
        openInBlank;

    updateBlankSetting();


    blankToggle.addEventListener(
        "change",
        function () {

            openInBlank =
                blankToggle.checked;

            localStorage.setItem(
                "openInBlank",
                openInBlank
            );

            updateBlankSetting();

        }
    );

}


/* =========================================================
   BACKGROUND
========================================================= */

function updateBackground() {

    if (!backgroundToggle) {
        return;
    }


    const enabled =
        backgroundToggle.checked;


    if (enabled) {

        document.body.classList.remove(
            "background-disabled"
        );

        backgroundHint.textContent =
            "Currently enabled";

        if (speedSetting) {
            speedSetting.style.display =
                "block";
        }

        if (transparencySetting) {
            transparencySetting.style.display =
                "block";
        }

    } else {

        document.body.classList.add(
            "background-disabled"
        );

        backgroundHint.textContent =
            "Currently disabled";

        if (speedSetting) {
            speedSetting.style.display =
                "none";
        }

        if (transparencySetting) {
            transparencySetting.style.display =
                "none";
        }

    }

}


if (backgroundToggle) {

    backgroundToggle.checked =
        animatedBackground;

    updateBackground();


    backgroundToggle.addEventListener(
        "change",
        function () {

            animatedBackground =
                backgroundToggle.checked;

            localStorage.setItem(
                "animatedBackground",
                animatedBackground
            );

            updateBackground();

        }
    );

}


/* =========================================================
   BACKGROUND SPEED
========================================================= */

function updateBackgroundSpeed() {

    if (!speedSlider) {
        return;
    }


    const value =
        Number(speedSlider.value);


    speedValue.textContent =
        value;


    /*
       20 = fastest
       1 = slow
       0 = essentially stopped
    */

    let seconds;


    if (value <= 0) {

        seconds =
            999999;

    } else {

        seconds =
            21 - value;

    }


    document.documentElement.style.setProperty(
        "--checker-speed",
        seconds + "s"
    );

}


if (speedSlider) {

    speedSlider.value =
        backgroundSpeed;

    updateBackgroundSpeed();


    speedSlider.addEventListener(
        "input",
        function () {

            backgroundSpeed =
                Number(
                    speedSlider.value
                );

            localStorage.setItem(
                "backgroundSpeed",
                backgroundSpeed
            );

            updateBackgroundSpeed();

        }
    );

}


/* =========================================================
   BACKGROUND TRANSPARENCY
========================================================= */

function updateBackgroundTransparency() {

    if (!transparencySlider) {
        return;
    }


    const value =
        Number(
            transparencySlider.value
        );


    transparencyValue.textContent =
        value + "%";


    document.documentElement.style.setProperty(
        "--checker-opacity",
        value / 100
    );

}


if (transparencySlider) {

    transparencySlider.value =
        backgroundTransparency;

    updateBackgroundTransparency();


    transparencySlider.addEventListener(
        "input",
        function () {

            backgroundTransparency =
                Number(
                    transparencySlider.value
                );

            localStorage.setItem(
                "backgroundTransparency",
                backgroundTransparency
            );

            updateBackgroundTransparency();

        }
    );

}


/* =========================================================
   FAVORITES
========================================================= */

const FAVORITES_KEY =
    "rofleqHideoutFavorites";


/*
   Get the saved favorites.

   This is an array of game IDs, for example:

   [
       "minecraft-1.9.4"
   ]
*/

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

        console.warn(
            "Could not load favorites:",
            error
        );

        return [];

    }

}


/* =========================================================
   SAVE FAVORITES
========================================================= */

function saveFavorites(favorites) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}


/* =========================================================
   CHECK FAVORITE
========================================================= */

function isFavorite(gameId) {

    return getFavorites().includes(
        gameId
    );

}


/* =========================================================
   TOGGLE FAVORITE
========================================================= */

function toggleFavorite(gameId) {

    let favorites =
        getFavorites();


    const index =
        favorites.indexOf(gameId);


    if (index === -1) {

        /*
           Add to favorites
        */

        favorites.push(gameId);

    } else {

        /*
           Remove from favorites
        */

        favorites.splice(
            index,
            1
        );

    }


    saveFavorites(
        favorites
    );


    updateFavoriteButtons();

    renderFavorites();

    updateFavoriteCount();

}


/* =========================================================
   UPDATE STAR BUTTONS
========================================================= */

function updateFavoriteButtons() {

    const favorites =
        getFavorites();


    const cards =
        document.querySelectorAll(
            ".game-card"
        );


    cards.forEach(
        function (card) {

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
                favorites.includes(
                    gameId
                );


            if (favorite) {

                button.classList.add(
                    "favorited"
                );

                button.textContent =
                    "★";

                button.title =
                    "Remove from favorites";

                button.setAttribute(
                    "aria-label",
                    "Remove from favorites"
                );

            } else {

                button.classList.remove(
                    "favorited"
                );

                button.textContent =
                    "☆";

                button.title =
                    "Add to favorites";

                button.setAttribute(
                    "aria-label",
                    "Add to favorites"
                );

            }

        }
    );

}


/* =========================================================
   FAVORITE COUNT
========================================================= */

function updateFavoriteCount() {

    const count =
        document.getElementById(
            "favoriteCount"
        );


    if (!count) {
        return;
    }


    count.textContent =
        getFavorites().length;

}


/* =========================================================
   CLONE GAME CARD FOR FAVORITES
========================================================= */

function createFavoriteCard(originalCard) {

    const clone =
        originalCard.cloneNode(
            true
        );


    /*
       Reconnect the game's click handler.

       cloneNode copies the HTML but not
       JavaScript event listeners.
    */

    const gameUrl =
        clone.dataset.gameUrl;


    clone.onclick =
        function () {

            launchGame(
                gameUrl
            );

        };


    /*
       Reconnect the star button.
    */

    const star =
        clone.querySelector(
            ".favorite-button"
        );


    if (star) {

        star.onclick =
            function (event) {

                event.stopPropagation();

                toggleFavorite(
                    clone.dataset.gameId
                );

            };

    }


    /*
       Reconnect the play button.
    */

    const play =
        clone.querySelector(
            ".play-small"
        );


    if (play) {

        play.onclick =
            function (event) {

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


    grid.innerHTML =
        "";


    const favorites =
        getFavorites();


    const allCards =
        document.querySelectorAll(
            "#gamesGrid .game-card"
        );


    let found =
        0;


    allCards.forEach(
        function (card) {

            const gameId =
                card.dataset.gameId;


            if (
                favorites.includes(
                    gameId
                )
            ) {

                const favoriteCard =
                    createFavoriteCard(
                        card
                    );


                grid.appendChild(
                    favoriteCard
                );


                found++;

            }

        }
    );


    if (empty) {

        if (found === 0) {

            empty.style.display =
                "block";

        } else {

            empty.style.display =
                "none";

        }

    }


    updateFavoriteButtons();

}


/* =========================================================
   NAVIGATION
========================================================= */

const favoritesNav =
    document.getElementById(
        "favoritesNav"
    );

const gamesNav =
    document.getElementById(
        "gamesNav"
    );

const favoritesSection =
    document.getElementById(
        "favoritesSection"
    );

const gamesSection =
    document.getElementById(
        "gamesSection"
    );


function showFavorites() {

    if (favoritesSection) {

        favoritesSection.classList.remove(
            "hidden-section"
        );

    }


    if (gamesSection) {

        gamesSection.classList.add(
            "hidden-section"
        );

    }


    if (favoritesNav) {

        favoritesNav.classList.add(
            "active"
        );

    }


    if (gamesNav) {

        gamesNav.classList.remove(
            "active"
        );

    }


    renderFavorites();


    history.replaceState(
        null,
        "",
        "#favorites"
    );

}


function showGames() {

    if (favoritesSection) {

        favoritesSection.classList.add(
            "hidden-section"
        );

    }


    if (gamesSection) {

        gamesSection.classList.remove(
            "hidden-section"
        );

    }


    if (favoritesNav) {

        favoritesNav.classList.remove(
            "active"
        );

    }


    if (gamesNav) {

        gamesNav.classList.add(
            "active"
        );

    }


    history.replaceState(
        null,
        "",
        "#games"
    );

}


if (favoritesNav) {

    favoritesNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showFavorites();

        }
    );

}


if (gamesNav) {

    gamesNav.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showGames();

        }
    );

}


/* =========================================================
   LAUNCH GAME
========================================================= */

function launchGame(gameUrl) {

    if (openInBlank) {

        const newWindow =
            window.open(
                "about:blank",
                "_blank"
            );


        if (!newWindow) {

            window.location.href =
                gameUrl;

            return;

        }


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

                        border: none;

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


        newWindow.document.close();

    } else {

        window.location.href =
            gameUrl;

    }

}


/* =========================================================
   COMMENTS
========================================================= */

const commentsButton =
    document.getElementById(
        "commentsButton"
    );

const commentsPanel =
    document.getElementById(
        "commentsPanel"
    );

const commentsClose =
    document.getElementById(
        "commentsClose"
    );


if (
    commentsButton &&
    commentsPanel
) {

    commentsButton.addEventListener(
        "click",
        function () {

            commentsPanel.classList.toggle(
                "open"
            );

        }
    );

}


if (
    commentsClose &&
    commentsPanel
) {

    commentsClose.addEventListener(
        "click",
        function () {

            commentsPanel.classList.remove(
                "open"
            );

        }
    );

}


/* =========================================================
   INITIALIZE FAVORITES
========================================================= */

updateFavoriteButtons();

updateFavoriteCount();

renderFavorites();


/* =========================================================
   LOAD PAGE FROM URL HASH
========================================================= */

if (
    window.location.hash ===
    "#favorites"
) {

    showFavorites();

} else {

    showGames();

}
