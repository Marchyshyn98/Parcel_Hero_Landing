$(document).ready(function() {
    setTimeout(() => {
        $("#main").addClass("animate__animated animate__slideInLeft").show();
        setTimeout(() => {
            $("#main").removeClass("animate__animated animate__slideInLeft")
        }, 1000);
    }, 200);

    let stepsDiv = $(".main__card-steps");
    $(".main__card-content").after(stepsDiv);

    $(".btn__start").on("click", function() {
        setTimeout(() => {
            addSlideOut("#main");
        }, 200);

        setTimeout(() => {
            nextStep();
            $(".info__card-content").after(stepsDiv);
        }, 500);

        setTimeout(() => {
            $("#main").remove();
        }, 600);

        setTimeout(() => {
            addSlideIn("#loader");
            loader();
            setTimeout(() => {
                removeSlideIn("#loader");
            }, 1000);
        }, 700);

        setTimeout(() => {
            addSlideOut("#loader");
            setTimeout(() => {
                removeSlideOut("#loader");
                $("#loader").hide();
            }, 500)

            setTimeout(() => {
                addSlideIn("#info");
                $("#info").show();
            }, 600);
            setTimeout(() => {
                removeSlideIn("#info");
            }, 1600);
        }, 7000);
    });

    $(".btn__continue").on("click", function() {
        setTimeout(() => {
            addSlideOut("#info");
        }, 200);

        setTimeout(() => {
            nextStep();
            $(".confirm__card-content").after(stepsDiv);
        }, 500);

        setTimeout(() => {
            $("#info").remove();
        }, 600);

        setTimeout(() => {
            $("#survey").show();
            addSlideIn("#survey");

            setTimeout(() => {
                removeSlideIn("#survey");
            }, 1000);
        }, 700);
    });

    // loader
    function loader() {
        $("#loader").show();
        $(".loader__status li, .spinner").hide();

        var i;
        setTimeout(() => {
            for (i = 0; i < 3; i++) {
                $(".loader__status li:first-child").fadeIn(1500);
                $(".loader__status li:first-child").fadeOut(1500);
            }
        }, 100)
        setTimeout(() => {
            $(".spinner").fadeIn(1000);
            for (i = 0; i < 3; i++) {
                $(".loader__status li:nth-child(2)").fadeIn(1500);
                $(".loader__status li:nth-child(2)").fadeOut(1500);
            }
        }, 600);
        setTimeout(() => {
            for (i = 0; i < 3; i++) {
                $(".loader__status li:last-child").fadeIn(1500);
                $(".loader__status li:last-child").fadeOut(1500);
            }
        }, 1100);
    }

    function addSlideOut(el) {
        $(el).addClass("animate__animated animate__slideOutLeft");
    }

    function removeSlideOut(el) {
        $(el).removeClass("animate__animated animate__slideOutLeft");
    }

    function addSlideIn(el) {
        $(el).addClass("animate__animated animate__slideInRight");
    }

    function removeSlideIn(el) {
        $(el).removeClass("animate__animated animate__slideInRight");
    }

    function nextStep() {
        $(".step--current").addClass("step--done").removeClass("step--current").next().addClass("step--current");
    }

    //Questions 

    $('.question--1 label:not([data-error]), .question--2 label').click(function() {
        var currentQ = $(this).parents('.question'),
            nextQ = $(this).parents('.question').next();

        setTimeout(function() {
            addSlideOut(currentQ);
            setTimeout(() => {
                currentQ.remove();
            }, 500);
        }, 300);

        setTimeout(function() {
            nextQ.show()
            addSlideIn(nextQ);
        }, 800);

        setTimeout(function() {
            removeSlideIn(nextQ);
        }, 1800);
    });

    $(".question--last label").on("click", function() {
        $(".loader__status li:first-child").html("Saving your preferences...");
        $(".loader__status li:nth-child(2)").html("Confirming your package...");
        $(".loader__status li:last-child").html("The package is reserved!");

        setTimeout(() => {
            addSlideOut("#survey");
            setTimeout(() => {
                $("#survey").remove();
            }, 500);

            setTimeout(() => {
                addSlideIn("#loader");
                loader();
                setTimeout(() => {
                    removeSlideIn("#loader");
                }, 1000);
            }, 800);

            setTimeout(() => {
                addSlideOut("#loader");
                setTimeout(() => {
                    removeSlideOut("#loader");
                    $("#loader").remove();
                }, 500)

                setTimeout(() => {
                    addSlideIn("#confirm");
                    $("#confirm").show();
                }, 600);

                setTimeout(() => {
                    removeSlideIn("#confirm");
                }, 1600);
            }, 7000);
        }, 100);
    });

    $('[data-error]').click(function() {
        var message = $(this).data('error');

        $(this).append('<span class="question__error">' + message + '</span');
    });


    // get url params
    const queryString = window.location.search; // grab the query string
    const urlParams = new URLSearchParams(queryString); // parse url params
    let price;

    if (urlParams.has('p')) {
        price = urlParams.get('p');
    } else {
        price = 99;
    }

    price = (price / 100).toFixed(2);
    $(".price").append('&pound;' + price);

    // date-delivery 
    let d = new Date();
    d.setDate(d.getDate() + 2);

    let deliverDate = ('0' + (d.getDate())).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
    $(".date-delivery").append(deliverDate);

    $('#header__menu-icon').click(function() {
        $(this).toggleClass('open');
    });
});