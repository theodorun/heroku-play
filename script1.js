var arrwords=Array();
//var arrwords=["bb","a","ccccc"];

$(document).ready(function () {
    let words;
    let showRacks = function (racks) {
        $("#racks").html('');
        racks.map(rack => {
            $("#racks").append(`<li>${rack.rack}</li>`);
            words = rack.words;
            let tem = words.split('@@');
            console.log(tem);
            tem.forEach(function(entry) {
                //console.log(entry);
               arrwords.push(entry);
            });

        });
       /* arrwords.sort();
        console.log(arrwords);
        console.log("held");*/

    }
    arrwords.sort();
    console.log(arrwords);


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
