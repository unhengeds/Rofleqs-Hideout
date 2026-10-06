```javascript
/* =========================
   GAME LAUNCHER
========================= */

function launchGame(path) {
    window.location.href = path;
}


/* =========================
   ELEMENTS
========================= */

const search = document.getElementById("search");

const cards = [
    ...document.querySelectorAll(".game-card")
];

const noResults =
    document.getElementById("noResults");

const clearSearch =
    document.getElementById("clearSearch");


/* =========================
   STATE
========================= */

let currentFilter = "all";


/* =========================
   UPDATE GAME GRID
========================= */

function updateGames() {

    const query =
        search.value.trim().toLowerCase();

    let visible = 0;

    cards.forEach(card => {

        const title =
            card.dataset.title.toLowerCase();

        const categories =
            card.dataset.category.toLowerCase();

        const favorite =
            card.dataset.favorite === "true";


        /* SEARCH */

        const matchesSearch =
            !query || title.includes(query);


        /* CATEGORY */

        let matchesFilter = true;

        if (currentFilter === "favorites") {

            matchesFilter = favorite;

        } else if (currentFilter !== "all") {

            matchesFilter =
                categories.includes(currentFilter);

        }


        /* SHOW */

        if (matchesSearch && matchesFilter) {

            card.style.display = "";

            requestAnimationFrame(() => {

                card.style.opacity = "1";
                card.style.transform = "";

            });

            visible++;

        }


        /* HIDE */

        else {

            card.style.opacity = "0";
            card.style.transform =
                "scale(.96)";

            setTimeout(() => {

                if (
                    !(matchesSearch && matchesFilter)
                ) {

                    card.style.display = "none";

                }

            }, 180);

        }

    });


    /* EMPTY STATE */

    noResults.style.display =
        visible === 0
            ? "block"
            : "none";
}


/* =========================
   SEARCH
========================= */

search.addEventListener(
    "input",
    updateGames
);


/* =========================
   CLEAR SEARCH
========================= */

clearSearch.addEventListener(
    "click",
    () => {

        search.value = "";

        currentFilter = "all";


        document
            .querySelectorAll(".category")
            .forEach(button => {

                button.classList.remove(
                    "active"
                );

            });


        document
            .querySelector(
                '.category[data-filter="all"]'
            )
            .classList.add("active");


        updateGames();

        search.focus();

    }
);


/* =========================
   CATEGORY BUTTONS
========================= */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                updateGames();

            }
        );

    });


/* =========================
   SIDEBAR
========================= */

document
    .querySelectorAll(".nav button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".nav button")
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.category;


                document
                    .querySelectorAll(".category")
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                const matching =
                    document.querySelector(
                        `.category[data-filter="${currentFilter}"]`
                    );


                if (matching) {

                    matching.classList.add(
                        "active"
                    );

                }


                updateGames();

            }
        );

    });


/* =========================
   GAME CARD LAUNCHING
========================= */

document
    .querySelectorAll("[data-launch]")
    .forEach(element => {

        element.addEventListener(
            "click",
            event => {

                /*
                 * Buttons inside game cards
                 * should launch the game directly.
                 */

                const path =
                    element.dataset.launch;

                if (!path) {
                    return;
                }


                /*
                 * Prevent the card's click
                 * from firing twice.
                 */

                if (
                    element.classList.contains(
                        "play-small"
                    )
                ) {

                    event.stopPropagation();

                }


                launchGame(path);

            }
        );

    });


/* =========================
   KEYBOARD SEARCH
========================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * Press "/" to search.
         */

        if (
            event.key === "/" &&
            document.activeElement !== search
        ) {

            event.preventDefault();

            search.focus();

        }

    }
);


/* =========================
   INITIALIZE
========================= */

updateGames();
```
