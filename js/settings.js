/* =====================================================
   PAGE STARTUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeSettings();

        initializeFavorites();

        initializeTheme();


        /*
         * Always open the site on Favorites.
         */

        setTimeout(
            function() {

                const favorites =
                    document.getElementById(
                        "favorites"
                    );


                if (favorites) {

                    favorites.scrollIntoView({
                        behavior:
                            "instant",

                        block:
                            "start"
                    });

                }


                setActiveNav(
                    "favorites"
                );


                /*
                 * Make the URL show #favorites
                 * without reloading the page.
                 */

                history.replaceState(
                    null,
                    "",
                    "#favorites"
                );

            },
            50
        );

    }
);
