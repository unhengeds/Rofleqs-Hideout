/* =====================================================
   ELEMENTS
===================================================== */

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


/* =====================================================
   DEFAULT SETTINGS
===================================================== */

const defaultSettings = {

    openInBlank: true,

    animatedBackground: true,

    backgroundSpeed: 6,

    backgroundTransparency: 1.8

};


/* =====================================================
   LOAD SETTINGS
===================================================== */

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


/* =====================================================
   SETTINGS PANEL
===================================================== */

settingsButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        const isOpen =
            settingsPanel.classList.contains("open");

        settingsPanel.classList.toggle(
            "open",
            !isOpen
        );

        settingsButton.classList.toggle(
            "open",
            !isOpen
        );

    }
);


/* =====================================================
   CLOSE SETTINGS WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        if (
            !settingsPanel.contains(event.target) &&
            !settingsButton.contains(event.target)
        ) {

            settingsPanel.classList.remove("open");

            settingsButton.classList.remove("open");

        }

    }
);


/* =====================================================
   ABOUT:BLANK SETTING
===================================================== */

blankToggle.checked =
    openInBlank;


function updateBlankHint() {

    blankHint.textContent =
        blankToggle.checked
            ? "Currently enabled"
            : "Currently disabled";

}


blankToggle.addEventListener(
    "change",
    function () {

        openInBlank =
            blankToggle.checked;

        localStorage.setItem(
            "openInBlank",
            openInBlank
        );

        updateBlankHint();

    }
);

updateBlankHint();


/* =====================================================
   BACKGROUND SETTING
===================================================== */

backgroundToggle.checked =
    animatedBackground;


function updateBackground() {

    if (backgroundToggle.checked) {

        document.body.classList.remove(
            "background-disabled"
        );

        speedSetting.classList.add(
            "visible"
        );

        transparencySetting.classList.add(
            "visible"
        );

        backgroundHint.textContent =
            "Currently enabled";

    } else {

        document.body.classList.add(
            "background-disabled"
        );

        speedSetting.classList.remove(
            "visible"
        );

        transparencySetting.classList.remove(
            "visible"
        );

        backgroundHint.textContent =
            "Currently disabled";

    }

}


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

updateBackground();


/* =====================================================
   BACKGROUND SPEED
===================================================== */

speedSlider.value =
    backgroundSpeed;


function updateSpeed() {

    const value =
        Number(speedSlider.value);

    speedValue.textContent =
        value;

    if (value <= 0) {

        document.documentElement.style.setProperty(
            "--checker-speed",
            "999999s"
        );

        return;
    }

    /*
        Lower slider value =
        slower animation.

        Higher slider value =
        faster animation.
    */

    const seconds =
        21 - value;

    document.documentElement.style.setProperty(
        "--checker-speed",
        `${seconds}s`
    );

}


speedSlider.addEventListener(
    "input",
    function () {

        backgroundSpeed =
            Number(speedSlider.value);

        localStorage.setItem(
            "backgroundSpeed",
            backgroundSpeed
        );

        updateSpeed();

    }
);

updateSpeed();


/* =====================================================
   BACKGROUND TRANSPARENCY
===================================================== */

transparencySlider.value =
    backgroundTransparency;


function updateTransparency() {

    const value =
        Number(transparencySlider.value);

    transparencyValue.textContent =
        `${value}%`;

    /*
        Convert percentage to the
        opacity used by the checkerboard.
    */

    const opacity =
        value / 100;

    document.documentElement.style.setProperty(
        "--checker-opacity",
        opacity
    );

}


transparencySlider.addEventListener(
    "input",
    function () {

        backgroundTransparency =
            Number(transparencySlider.value);

        localStorage.setItem(
            "backgroundTransparency",
            backgroundTransparency
        );

        updateTransparency();

    }
);

updateTransparency();


/* =====================================================
   LAUNCH GAME
===================================================== */

function launchGame(gameUrl) {

    if (openInBlank) {

        const newTab =
            window.open("about:blank", "_blank");

        if (!newTab) {

            window.location.href =
                gameUrl;

            return;
        }

        newTab.document.open();

        newTab.document.write(`
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

        newTab.document.close();

    } else {

        window.location.href =
            gameUrl;

    }

}
