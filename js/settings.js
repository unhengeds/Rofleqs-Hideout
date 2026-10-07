// ================================
// ROFLEQ'S HIDEOUT — SETTINGS.JS
// ================================

document.addEventListener("DOMContentLoaded", () => {

    // ================================
    // ELEMENTS
    // ================================

    const settingsButton = document.getElementById("settingsButton");
    const settingsPanel = document.getElementById("settingsPanel");
    const siteLogo = document.getElementById("siteLogo");

    const openInBlankToggle = document.getElementById("openInBlankToggle");
    const animatedBackgroundToggle = document.getElementById("animatedBackgroundToggle");

    const backgroundSpeed = document.getElementById("backgroundSpeed");
    const backgroundSpeedValue = document.getElementById("backgroundSpeedValue");

    const backgroundTransparency = document.getElementById("backgroundTransparency");
    const backgroundTransparencyValue = document.getElementById("backgroundTransparencyValue");

    const customThemeColor = document.getElementById("customThemeColor");

    const themeNotification = document.getElementById("themeNotification");

    const favoriteCount = document.getElementById("favoriteCount");
    const favoritesGrid = document.getElementById("favoritesGrid");
    const emptyFavorites = document.getElementById("emptyFavorites");

    const gamesGrid = document.getElementById("gamesGrid");

    const favoritesNav = document.getElementById("favoritesNav");
    const gamesNav = document.getElementById("gamesNav");

    const favoritesSection = document.getElementById("favorites");
    const gamesSection = document.getElementById("games");

    // Search
    const gameSearch = document.getElementById("gameSearch");
    const clearGameSearch = document.getElementById("clearGameSearch");
    const gameSearchEmpty = document.getElementById("gameSearchEmpty");


    // ================================
    // DEFAULT SETTINGS
    // ================================

    const defaultSettings = {
        openInBlank: true,
        animatedBackground: true,
        backgroundSpeed: 6,
        backgroundTransparency: 8
    };

    const SETTINGS_KEY = "rofleqHideoutSettings";

    const FAVORITES_KEY = "rofleqHideoutFavorites";

    const THEME_KEY = "rofleqHideoutTheme";

    const CUSTOM_THEME_KEY = "rofleqHideoutCustomTheme";


    // ================================
    // THEMES
    // ================================

    const themes = [
        {
            name: "Red",
            color: "#ff3b30"
        },
        {
            name: "Green",
            color: "#34c759"
        },
        {
            name: "Purple",
            color: "#af52de"
        },
        {
            name: "Blue",
            color: "#0a84ff"
        },
        {
            name: "Orange",
            color: "#ff9500"
        }
    ];


    // ================================
    // LOAD SETTINGS
    // ================================

    function loadSettings() {

        let savedSettings;

        try {
            savedSettings = JSON.parse(
                localStorage.getItem(SETTINGS_KEY)
            );
        } catch (error) {
            savedSettings = null;
        }

        const settings = {
            ...defaultSettings,
            ...(savedSettings || {})
        };

        if (openInBlankToggle) {
            openInBlankToggle.checked = settings.openInBlank;
        }

        if (animatedBackgroundToggle) {
            animatedBackgroundToggle.checked = settings.animatedBackground;
        }

        if (backgroundSpeed) {
            backgroundSpeed.value = settings.backgroundSpeed;
        }

        if (backgroundTransparency) {
            backgroundTransparency.value = settings.backgroundTransparency;
        }

        updateBackgroundSpeed();

        updateBackgroundTransparency();

        applyAnimatedBackground(
            settings.animatedBackground
        );
    }


    // ================================
    // SAVE SETTINGS
    // ================================

    function saveSettings() {

        const settings = {
            openInBlank:
                openInBlankToggle
                    ? openInBlankToggle.checked
                    : defaultSettings.openInBlank,

            animatedBackground:
                animatedBackgroundToggle
                    ? animatedBackgroundToggle.checked
                    : defaultSettings.animatedBackground,

            backgroundSpeed:
                backgroundSpeed
                    ? Number(backgroundSpeed.value)
                    : defaultSettings.backgroundSpeed,

            backgroundTransparency:
                backgroundTransparency
                    ? Number(backgroundTransparency.value)
                    : defaultSettings.backgroundTransparency
        };

        localStorage.setItem(
            SETTINGS_KEY,
            JSON.stringify(settings)
        );
    }


    // ================================
    // BACKGROUND SPEED
    // ================================

    function updateBackgroundSpeed() {

        if (!backgroundSpeed) return;

        const value = Number(backgroundSpeed.value);

        if (backgroundSpeedValue) {
            backgroundSpeedValue.textContent = value;
        }

        /*
            Higher number = faster animation.
            The CSS variable controls the animation duration.
        */

        const duration = Math.max(
            2,
            22 - value * 2
        );

        document.documentElement.style.setProperty(
            "--checker-speed",
            `${duration}s`
        );
    }


    // ================================
    // BACKGROUND TRANSPARENCY
    // ================================

    function updateBackgroundTransparency() {

        if (!backgroundTransparency) return;

        const value = Number(
            backgroundTransparency.value
        );

        if (backgroundTransparencyValue) {
            backgroundTransparencyValue.textContent =
                value + "%";
        }

        /*
            Convert slider value into opacity.
        */

        const opacity =
            Math.max(0, Math.min(1, value / 100));

        document.documentElement.style.setProperty(
            "--checker-opacity",
            opacity
        );
    }


    // ================================
    // ANIMATED BACKGROUND
    // ================================

    function applyAnimatedBackground(enabled) {

        document.body.classList.toggle(
            "no-animated-background",
            !enabled
        );
    }


    // ================================
    // SETTINGS EVENTS
    // ================================

    if (openInBlankToggle) {

        openInBlankToggle.addEventListener(
            "change",
            () => {
                saveSettings();
            }
        );
    }


    if (animatedBackgroundToggle) {

        animatedBackgroundToggle.addEventListener(
            "change",
            () => {

                applyAnimatedBackground(
                    animatedBackgroundToggle.checked
                );

                saveSettings();
            }
        );
    }


    if (backgroundSpeed) {

        backgroundSpeed.addEventListener(
            "input",
            () => {

                updateBackgroundSpeed();

                saveSettings();
            }
        );
    }


    if (backgroundTransparency) {

        backgroundTransparency.addEventListener(
            "input",
            () => {

                updateBackgroundTransparency();

                saveSettings();
            }
        );
    }


    // ================================
    // SETTINGS PANEL
    // ================================

    if (settingsButton && settingsPanel) {

        settingsButton.addEventListener(
            "click",
            () => {

                settingsPanel.classList.toggle(
                    "open"
                );
            }
        );
    }


    // Close settings if clicking outside

    document.addEventListener(
        "click",
        (event) => {

            if (
                !settingsPanel ||
                !settingsButton
            ) {
                return;
            }

            if (
                settingsPanel.classList.contains("open") &&
                !settingsPanel.contains(event.target) &&
                !settingsButton.contains(event.target)
            ) {

                settingsPanel.classList.remove(
                    "open"
                );
            }
        }
    );


    // ================================
    // THEME FUNCTIONS
    // ================================

    function applyTheme(color) {

        if (!color) return;

        document.documentElement.style.setProperty(
            "--theme",
            color
        );

        document.documentElement.style.setProperty(
            "--theme-border",
            `color-mix(in srgb, ${color} 55%, transparent)`
        );

        document.documentElement.style.setProperty(
            "--theme-soft",
            `color-mix(in srgb, ${color} 10%, transparent)`
        );

        document.documentElement.style.setProperty(
            "--theme-glow",
            `color-mix(in srgb, ${color} 35%, transparent)`
        );

        document.documentElement.style.setProperty(
            "--theme-strong",
            `color-mix(in srgb, ${color} 80%, white 0%)`
        );
    }


    function saveTheme(index) {

        localStorage.setItem(
            THEME_KEY,
            String(index)
        );
    }


    function loadTheme() {

        const savedTheme =
            localStorage.getItem(THEME_KEY);

        const customTheme =
            localStorage.getItem(
                CUSTOM_THEME_KEY
            );

        if (
            customTheme &&
            customTheme.trim() !== ""
        ) {

            applyTheme(customTheme);

            if (customThemeColor) {
                customThemeColor.value =
                    customTheme;
            }

            return;
        }

        let index = Number(savedTheme);

        if (
            Number.isNaN(index) ||
            index < 0 ||
            index >= themes.length
        ) {
            index = 0;
        }

        applyTheme(
            themes[index].color
        );

        updateThemeSelection(index);
    }


    function updateThemeSelection(index) {

        const themeButtons =
            document.querySelectorAll(
                ".theme-option"
            );

        themeButtons.forEach(
            (button) => {

                const buttonIndex =
                    Number(
                        button.dataset.themeIndex
                    );

                button.classList.toggle(
                    "active",
                    buttonIndex === index
                );
            }
        );
    }


    // ================================
    // THEME BUTTONS
    // ================================

    const themeButtons =
        document.querySelectorAll(
            ".theme-option"
        );

    themeButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.themeIndex
                        );

                    if (
                        Number.isNaN(index) ||
                        !themes[index]
                    ) {
                        return;
                    }

                    const color =
                        themes[index].color;

                    applyTheme(color);

                    saveTheme(index);

                    localStorage.removeItem(
                        CUSTOM_THEME_KEY
                    );

                    if (customThemeColor) {
                        customThemeColor.value =
                            color;
                    }

                    updateThemeSelection(index);
                }
            );
        }
    );


    // ================================
    // CUSTOM THEME COLOR
    // ================================

    if (customThemeColor) {

        customThemeColor.addEventListener(
            "input",
            () => {

                const color =
                    customThemeColor.value;

                if (!color) return;

                applyTheme(color);

                localStorage.setItem(
                    CUSTOM_THEME_KEY,
                    color
                );

                themeButtons.forEach(
                    button => {
                        button.classList.remove(
                            "active"
                        );
                    }
                );
            }
        );
    }


    // ================================
    // LOGO THEME SWITCHING
    // ================================

    let currentThemeIndex = 0;

    function getCurrentThemeIndex() {

        const saved =
            Number(
                localStorage.getItem(
                    THEME_KEY
                )
            );

        if (
            !Number.isNaN(saved) &&
            saved >= 0 &&
            saved < themes.length
        ) {
            return saved;
        }

        return 0;
    }


    function showThemeNotification() {

        if (!themeNotification) return;

        themeNotification.classList.add(
            "show"
        );

        clearTimeout(
            window.themeNotificationTimeout
        );

        window.themeNotificationTimeout =
            setTimeout(
                () => {

                    themeNotification.classList.remove(
                        "show"
                    );

                },
                3500
            );
    }


    if (siteLogo) {

        siteLogo.addEventListener(
            "click",
            () => {

                currentThemeIndex =
                    getCurrentThemeIndex();

                currentThemeIndex++;

                /*
                    When we loop from Orange back
                    to Red, show the unlock message.
                */

                if (
                    currentThemeIndex >=
                    themes.length
                ) {

                    currentThemeIndex = 0;

                    showThemeNotification();
                }

                const theme =
                    themes[currentThemeIndex];

                applyTheme(theme.color);

                saveTheme(
                    currentThemeIndex
                );

                localStorage.removeItem(
                    CUSTOM_THEME_KEY
                );

                if (customThemeColor) {

                    customThemeColor.value =
                        theme.color;
                }

                updateThemeSelection(
                    currentThemeIndex
                );
            }
        );
    }


    // ================================
    // FAVORITES
    // ================================

    function getFavorites() {

        try {

            const favorites =
                JSON.parse(
                    localStorage.getItem(
                        FAVORITES_KEY
                    )
                );

            return Array.isArray(favorites)
                ? favorites
                : [];

        } catch (error) {

            return [];
        }
    }


    function saveFavorites(favorites) {

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(favorites)
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
            favorites.includes(gameId)
        ) {

            favorites =
                favorites.filter(
                    id => id !== gameId
                );

        } else {

            favorites.push(gameId);
        }

        saveFavorites(favorites);

        updateFavoriteButtons();

        updateFavoriteCount();

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
            (button) => {

                const gameId =
                    button.dataset.gameId;

                const active =
                    favorites.includes(
                        gameId
                    );

                button.classList.toggle(
                    "active",
                    active
                );

                button.setAttribute(
                    "aria-label",
                    active
                        ? "Remove from favorites"
                        : "Add to favorites"
                );

                button.textContent =
                    active
                        ? "★"
                        : "☆";
            }
        );
    }


    function updateFavoriteCount() {

        if (!favoriteCount) return;

        const count =
            getFavorites().length;

        favoriteCount.textContent =
            count;
    }


    // ================================
    // CREATE FAVORITE CARD
    // ================================

    function createFavoriteCard(originalCard) {

        const card =
            originalCard.cloneNode(true);

        /*
            Reconnect the favorite button
            because cloneNode does not copy
            event listeners.
        */

        const favoriteButton =
            card.querySelector(
                ".favorite-button"
            );

        if (favoriteButton) {

            favoriteButton.onclick =
                (event) => {

                    event.stopPropagation();

                    const gameId =
                        favoriteButton.dataset.gameId;

                    toggleFavorite(gameId);
                };
        }

        /*
            Make the entire card launchable.
        */

        card.addEventListener(
            "click",
            (event) => {

                if (
                    event.target.closest(
                        ".favorite-button"
                    )
                ) {
                    return;
                }

                const url =
                    card.dataset.gameUrl;

                if (url) {
                    launchGame(url);
                }
            }
        );

        return card;
    }


    // ================================
    // RENDER FAVORITES
    // ================================

    function renderFavorites() {

        if (!favoritesGrid) return;

        const favorites =
            getFavorites();

        favoritesGrid.innerHTML = "";

        let found = 0;

        favorites.forEach(
            (gameId) => {

                if (!gamesGrid) return;

                const originalCard =
                    gamesGrid.querySelector(
                        `.game-card[data-game-id="${CSS.escape(gameId)}"]`
                    );

                if (!originalCard) return;

                const favoriteCard =
                    createFavoriteCard(
                        originalCard
                    );

                favoritesGrid.appendChild(
                    favoriteCard
                );

                found++;
            }
        );

        if (emptyFavorites) {

            emptyFavorites.style.display =
                found === 0
                    ? "flex"
                    : "none";
        }
    }


    // ================================
    // MAIN GAME FAVORITE BUTTONS
    // ================================

    const favoriteButtons =
        document.querySelectorAll(
            "#gamesGrid .favorite-button"
        );

    favoriteButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    const gameId =
                        button.dataset.gameId;

                    if (!gameId) return;

                    toggleFavorite(gameId);
                }
            );
        }
    );


    // ================================
    // GAME SEARCH
    // ================================

    function filterGames() {

        if (!gamesGrid || !gameSearch) {
            return;
        }

        const query =
            gameSearch.value
                .trim()
                .toLowerCase();

        const gameCards =
            gamesGrid.querySelectorAll(
                ".game-card[data-game-id]"
            );

        let visibleGames = 0;

        gameCards.forEach(
            (card) => {

                const gameName =
                    (
                        card.dataset.gameName ||
                        ""
                    ).toLowerCase();

                const gameVersion =
                    (
                        card.dataset.gameVersion ||
                        ""
                    ).toLowerCase();

                const titleElement =
                    card.querySelector(
                        ".game-title"
                    );

                const metaElement =
                    card.querySelector(
                        ".game-meta"
                    );

                const title =
                    titleElement
                        ? titleElement.textContent.toLowerCase()
                        : "";

                const meta =
                    metaElement
                        ? metaElement.textContent.toLowerCase()
                        : "";

                const matches =
                    query === "" ||
                    gameName.includes(query) ||
                    gameVersion.includes(query) ||
                    title.includes(query) ||
                    meta.includes(query);

                if (matches) {

                    card.style.display = "";

                    visibleGames++;

                } else {

                    card.style.display =
                        "none";
                }
            }
        );


        // ================================
        // NO RESULTS MESSAGE
        // ================================

        if (gameSearchEmpty) {

            if (
                query !== "" &&
                visibleGames === 0
            ) {

                gameSearchEmpty.style.display =
                    "flex";

            } else {

                gameSearchEmpty.style.display =
                    "none";
            }
        }


        // ================================
        // CLEAR BUTTON
        // ================================

        if (clearGameSearch) {

            clearGameSearch.classList.toggle(
                "show",
                query.length > 0
            );
        }
    }


    if (gameSearch) {

        gameSearch.addEventListener(
            "input",
            filterGames
        );

        gameSearch.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    gameSearch.value !== ""
                ) {

                    gameSearch.value = "";

                    filterGames();

                    gameSearch.focus();
                }
            }
        );
    }


    if (clearGameSearch) {

        clearGameSearch.addEventListener(
            "click",
            () => {

                if (!gameSearch) return;

                gameSearch.value = "";

                filterGames();

                gameSearch.focus();
            }
        );
    }


    // ================================
    // GAME LAUNCHING
    // ================================

    window.launchGame = function(url) {

        if (!url) return;

        let openInBlank = true;

        try {

            const savedSettings =
                JSON.parse(
                    localStorage.getItem(
                        SETTINGS_KEY
                    )
                );

            if (
                savedSettings &&
                typeof savedSettings.openInBlank ===
                    "boolean"
            ) {

                openInBlank =
                    savedSettings.openInBlank;
            }

        } catch (error) {

            openInBlank = true;
        }


        if (openInBlank) {

            /*
                Opens the game in a new blank tab.
                The iframe keeps the original game
                page inside the blank tab.
            */

            const newWindow =
                window.open(
                    "about:blank",
                    "_blank"
                );

            if (!newWindow) {

                window.location.href = url;

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
                            padding: 0;
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                            background: #000;
                        }

                        iframe {
                            border: 0;
                            width: 100%;
                            height: 100%;
                            display: block;
                        }
                    </style>
                </head>

                <body>

                    <iframe
                        src="${url.replace(/"/g, "&quot;")}"
                        allowfullscreen
                        allow="fullscreen; autoplay; gamepad; keyboard-lock"
                    ></iframe>

                </body>
                </html>
            `);

            newWindow.document.close();

        } else {

            window.location.href = url;
        }
    };


    // ================================
    // GAME CARD CLICKING
    // ================================

    const gameCards =
        document.querySelectorAll(
            "#gamesGrid .game-card"
        );

    gameCards.forEach(
        (card) => {

            card.addEventListener(
                "click",
                (event) => {

                    /*
                        Don't launch the game when
                        clicking the favorite button.
                    */

                    if (
                        event.target.closest(
                            ".favorite-button"
                        )
                    ) {
                        return;
                    }

                    const url =
                        card.dataset.gameUrl;

                    if (url) {
                        launchGame(url);
                    }
                }
            );
        }
    );


    // ================================
    // NAVIGATION
    // ================================

    /*
        The navigation is intentionally swapped:

        Clicking "Favorites" goes to Games.
        Clicking "Games" goes to Favorites.

        This matches the behavior requested.
    */

    if (favoritesNav) {

        favoritesNav.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                if (gamesSection) {

                    gamesSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        );
    }


    if (gamesNav) {

        gamesNav.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                if (favoritesSection) {

                    favoritesSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        );
    }


    // ================================
    // SCROLL NAVIGATION
    // ================================

    function updateNavigation() {

        if (
            !favoritesSection ||
            !gamesSection
        ) {
            return;
        }

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;

        const favoritesTop =
            favoritesSection.offsetTop;

        const gamesTop =
            gamesSection.offsetTop;

        /*
            Navigation is swapped intentionally.
        */

        if (
            scrollPosition >= gamesTop
        ) {

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

        } else {

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
        }
    }


    window.addEventListener(
        "scroll",
        updateNavigation,
        {
            passive: true
        }
    );


    // ================================
    // PAGE STARTUP
    // ================================

    loadSettings();

    loadTheme();

    renderFavorites();

    updateFavoriteButtons();

    updateFavoriteCount();

    filterGames();

    updateNavigation();

});
