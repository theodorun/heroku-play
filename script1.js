var arrwords;

$(document).ready(function () {
    let words;
    let showRacks = function (racks) {
        $("#bingos").html('');
        racks.map(rack => {
            $("#bingos").append(`<li>${rack.rack}</li>`);
            words = rack.words;
            arrwords.push(words.split('@@'));

        });
        console.log(arrwords);


        $("#bingos li").on("click", function (evt) {
            $(evt.currentTarget).find(".answer").toggleClass("hidden");
        });
    }

    $("#grabmore").on("click", function () {
        $.ajax({
            method: "GET",
            url: "api.php",
            success: data => {
                showRacks(data)
            }
        });
    });
    $("#guess").keypress(function (event) {
        if (event.which === 13) {
            checkGuess();
        }

    })
    $("#submitGuess").click(function (){
        checkGuess();
    } );
});

function checkGuess() {
    let guess = $("#guess").val();
    guess = guess.toUpperCase();
    console.log(guess);
    console.log(arrwords.indexOf(guess));
    if (arrwords.indexOf(guess) != -1) {
        alert("You were right great Job");
        $("#guess").empty();
    } else {
        alert("You were wrong again, tr",);
    }


}
