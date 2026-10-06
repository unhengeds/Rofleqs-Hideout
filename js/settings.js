const settingsButton =
document.getElementById(
"settingsButton"
);

const settingsPanel =
document.getElementById(
"settingsPanel"
);

const blankToggle =
document.getElementById(
"blankToggle"
);

const blankHint =
document.getElementById(
"blankHint"
);

const backgroundToggle =
document.getElementById(
"backgroundToggle"
);

const backgroundHint =
document.getElementById(
"backgroundHint"
);

const speedSlider =
document.getElementById(
"speedSlider"
);

const speedValue =
document.getElementById(
"speedValue"
);

const transparencySlider =
document.getElementById(
"transparencySlider"
);

const transparencyValue =
document.getElementById(
"transparencyValue"
);

const speedSetting =
document.getElementById(
"speedSetting"
);

const transparencySetting =
document.getElementById(
"transparencySetting"
);


const savedBlankSetting =
localStorage.getItem(
"openInBlank"
);


if (
savedBlankSetting === null
) {

    blankToggle.checked =
    true;

    localStorage.setItem(
        "openInBlank",
        "true"
    );

}

else {

    blankToggle.checked =
    savedBlankSetting === "true";

}


function updateBlankHint() {

    if (
        blankToggle.checked
    ) {

        blankHint.textContent =
        "Currently enabled";

    }

    else {

        blankHint.textContent =
        "Currently disabled";

    }

}


updateBlankHint();


const savedBackground =
localStorage.getItem(
"animatedBackground"
);


if (
savedBackground === null
) {

    backgroundToggle.checked =
    true;

    localStorage.setItem(
        "animatedBackground",
        "true"
    );

}

else {

    backgroundToggle.checked =
    savedBackground === "true";

}


const savedSpeed =
localStorage.getItem(
"backgroundSpeed"
);


if (
savedSpeed === null
) {

    speedSlider.value =
    6;

}

else {

    speedSlider.value =
    savedSpeed;

}


const savedTransparency =
localStorage.getItem(
"backgroundTransparency"
);


if (
savedTransparency === null
) {

    transparencySlider.value =
    1.8;

}

else {

    transparencySlider.value =
    savedTransparency;

}


function updateBackground() {

    const enabled =
    backgroundToggle.checked;

    const speed =
    Number(
        speedSlider.value
    );

    const transparency =
    Number(
        transparencySlider.value
    );


    backgroundHint.textContent =
    enabled
        ? "Currently enabled"
        : "Currently disabled";


    const opacity =
    transparency * 0.01;


    document.documentElement.style.setProperty(
        "--checker-opacity",
        opacity
    );


    if (
        speed === 0
    ) {

        document.documentElement.style.setProperty(
            "--checker-speed",
            "999999s"
        );

    }

    else {

        const duration =
        36 / speed;

        document.documentElement.style.setProperty(
            "--checker-speed",
            duration + "s"
        );

    }


    speedValue.textContent =
    speed;

    transparencyValue.textContent =
    transparency + "%";


    if (
        enabled
    ) {

        document.body.classList.remove(
            "background-disabled"
        );

        speedSetting.classList.add(
            "visible"
        );

        transparencySetting.classList.add(
            "visible"
        );

    }

    else {

        document.body.classList.add(
            "background-disabled"
        );

        speedSetting.classList.remove(
            "visible"
        );

        transparencySetting.classList.remove(
            "visible"
        );

    }

}


updateBackground();


backgroundToggle.addEventListener(
"change",
function() {

    localStorage.setItem(
        "animatedBackground",
        backgroundToggle.checked
    );

    updateBackground();

}
);


speedSlider.addEventListener(
"input",
function() {

    localStorage.setItem(
        "backgroundSpeed",
        speedSlider.value
    );

    updateBackground();

}
);


transparencySlider.addEventListener(
"input",
function() {

    localStorage.setItem(
        "backgroundTransparency",
        transparencySlider.value
    );

    updateBackground();

}
);


settingsButton.addEventListener(
"click",
function(event) {

    event.stopPropagation();


    const isOpen =
    settingsPanel.classList.contains(
        "open"
    );


    if (
        isOpen
    ) {

        settingsPanel.classList.remove(
            "open"
        );

        settingsButton.classList.remove(
            "open"
        );

    }

    else {

        settingsPanel.classList.add(
            "open"
        );

        settingsButton.classList.add(
            "open"
        );

    }

}
);


settingsPanel.addEventListener(
"click",
function(event) {

    event.stopPropagation();

}
);


document.addEventListener(
"click",
function() {

    settingsPanel.classList.remove(
        "open"
    );

    settingsButton.classList.remove(
        "open"
    );

}
);


blankToggle.addEventListener(
"change",
function() {

    localStorage.setItem(
        "openInBlank",
        blankToggle.checked
    );

    updateBlankHint();

}
);


function launchGame(path) {


    const useBlank =
    blankToggle.checked;


    if (
        !useBlank
    ) {

        window.location.href =
        path;

        return;

    }


    const gameWindow =
    window.open(
        "about:blank",
        "_blank"
    );


    if (
        !gameWindow
    ) {

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
