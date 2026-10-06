/* =========================
   SETTINGS
========================= */

const settingsButton =
    document.getElementById("settingsButton");

const settingsPanel =
    document.getElementById("settingsPanel");

const closeSettings =
    document.getElementById("closeSettings");

const openBlankToggle =
    document.getElementById("openBlankToggle");

const animatedBackgroundToggle =
    document.getElementById("animatedBackgroundToggle");

const backgroundSpeed =
    document.getElementById("backgroundSpeed");

const backgroundSpeedValue =
    document.getElementById("backgroundSpeedValue");

const backgroundTransparency =
    document.getElementById("backgroundTransparency");

const backgroundTransparencyValue =
    document.getElementById("backgroundTransparencyValue");

const background =
    document.querySelector(".background");


/* =========================
   OPEN / CLOSE SETTINGS
========================= */

settingsButton.addEventListener("click", () => {

    settingsPanel.classList.toggle("open");

});


closeSettings.addEventListener("click", () => {

    settingsPanel.classList.remove("open");

});


document.addEventListener("click", (event) => {

    if (
        settingsPanel.classList.contains("open") &&
        !settingsPanel.contains(event.target) &&
        !settingsButton.contains(event.target)
    ) {

        settingsPanel.classList.remove("open");

    }

});


/* =========================
   ABOUT:BLANK
========================= */

const savedOpenBlank =
    localStorage.getItem("openInBlank");


if (savedOpenBlank === null) {

    openBlankToggle.checked = true;

    localStorage.setItem(
        "openInBlank",
        "true"
    );

} else {

    openBlankToggle.checked =
        savedOpenBlank === "true";

}


openBlankToggle.addEventListener("change", () => {

    localStorage.setItem(
        "openInBlank",
        openBlankToggle.checked
    );

});


/* =========================
   ANIMATED BACKGROUND
========================= */

const savedAnimated =
    localStorage.getItem("animatedBackground");


if (savedAnimated === null) {

    animatedBackgroundToggle.checked = true;

    localStorage.setItem(
        "animatedBackground",
        "true"
    );

} else {

    animatedBackgroundToggle.checked =
        savedAnimated === "true";

}


function updateAnimationState() {

    if (animatedBackgroundToggle.checked) {

        background.classList.remove("paused");

    } else {

        background.classList.add("paused");

    }

}


updateAnimationState();


animatedBackgroundToggle.addEventListener(
    "change",
    () => {

        localStorage.setItem(
            "animatedBackground",
            animatedBackgroundToggle.checked
        );

        updateAnimationState();

    }
);


/* =========================
   BACKGROUND SPEED
========================= */

const savedSpeed =
    localStorage.getItem("backgroundSpeed");


if (savedSpeed === null) {

    backgroundSpeed.value = 6;

} else {

    backgroundSpeed.value = savedSpeed;

}


function updateSpeed() {

    const speed =
        Number(backgroundSpeed.value);

    background.style.setProperty(
        "--checker-speed",
        speed + "s"
    );

    backgroundSpeedValue.textContent =
        speed + "s";

}


updateSpeed();


backgroundSpeed.addEventListener(
    "input",
    () => {

        updateSpeed();

        localStorage.setItem(
            "backgroundSpeed",
            backgroundSpeed.value
        );

    }
);


/* =========================
   BACKGROUND TRANSPARENCY
========================= */

const savedTransparency =
    localStorage.getItem(
        "backgroundTransparency"
    );


if (savedTransparency === null) {

    backgroundTransparency.value = 15.5;

} else {

    backgroundTransparency.value =
        savedTransparency;

}


function updateTransparency() {

    const transparency =
        Number(
            backgroundTransparency.value
        );

    background.style.setProperty(
        "--checker-opacity",
        transparency * 0.01
    );

    backgroundTransparencyValue.textContent =
        transparency + "%";

}


updateTransparency();


backgroundTransparency.addEventListener(
    "input",
    () => {

        updateTransparency();

        localStorage.setItem(
            "backgroundTransparency",
            backgroundTransparency.value
        );

    }
);


/* =========================
   GAME LAUNCHER
========================= */

function launchGame(path) {

    const openBlank =
        openBlankToggle.checked;


    if (!openBlank) {

        window.location.href = path;

        return;

    }


    /*
        Create a blank page and place the
        game inside it with an iframe.
    */

    const newWindow =
        window.open("about:blank", "_blank");


    if (!newWindow) {

        alert(
            "The browser blocked the popup. Please allow popups for this site."
        );

        return;

    }


    newWindow.document.open();


    newWindow.document.write(`
        <!DOCTYPE html>

        <html>

        <head>

            <title>Rofleq's Hideout</title>

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >

            <style>

                html,
                body {
                    margin: 0;
                    padding: 0;

                    width: 100%;
                    height: 100%;

                    overflow: hidden;

                    background: black;
                }

                iframe {
                    border: none;

                    width: 100%;
                    height: 100%;
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


    newWindow.document.close();

}
