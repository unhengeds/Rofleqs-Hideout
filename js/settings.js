/* =========================
   GAME SEARCH
========================= */

const gameSearch =
    document.getElementById(
        "gameSearch"
    );


const clearGameSearch =
    document.getElementById(
        "clearGameSearch"
    );


const gameSearchEmpty =
    document.getElementById(
        "gameSearchEmpty"
    );


function filterGames() {

    if (!gameSearch) {
        return;
    }


    const search =
        gameSearch.value
            .trim()
            .toLowerCase();


    const gameCards =
        document.querySelectorAll(
            "#gamesGrid .game-card[data-game-id]"
        );


    let visibleGames = 0;


    gameCards.forEach(
        card => {

            const name =
                card.dataset.gameName ||
                "";


            const version =
                card.dataset.gameVersion ||
                "";


            const id =
                card.dataset.gameId ||
                "";


            const titleElement =
                card.querySelector(
                    ".game-title"
                );


            const title =
                titleElement
                    ? titleElement.textContent
                    : "";


            const searchableText = (

                name +
                " " +
                version +
                " " +
                id +
                " " +
                title

            ).toLowerCase();


            const matches =
                searchableText.includes(
                    search
                );


            card.style.display =
                matches
                    ? ""
                    : "none";


            if (matches) {

                visibleGames++;

            }

        }
    );


    if (gameSearchEmpty) {

        gameSearchEmpty.style.display =

            visibleGames === 0

                ? "flex"

                : "none";

    }


    if (clearGameSearch) {

        clearGameSearch.classList.toggle(
            "visible",
            search.length > 0
        );

    }

}


if (gameSearch) {

    gameSearch.addEventListener(
        "input",
        filterGames
    );

}


if (clearGameSearch) {

    clearGameSearch.addEventListener(
        "click",
        () => {

            gameSearch.value = "";

            filterGames();

            gameSearch.focus();

        }
    );

}
