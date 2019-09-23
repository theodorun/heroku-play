var arrwords = [];
//var arrwords=["CCC","BB","A","DDDDD"];
var emptywords = Array();
var score;


$(document).ready(function () {
    score = 0;
    $('#guess').val('');
    let words;
    let points
    let showRacks = function (racks) {
        console.log(racks);

        arrwords = [];
        emptywords = Array();
        racks.map(rack => {

            words = rack.words;
            points = rack.weight;
            let tem = words.split('@@');
            tem.forEach(function (entry) {
                arrwords.push([entry, points, false]);

            });

        });
        let onlyrack = racks[0]["rack"];
        $("#bingos").empty();
        $("#bingos").append(`<h2>${onlyrack}</h2>`);
        arrwords.sort(function (a, b) {

            return a[0].length - b[0].length;
        });

        console.log(arrwords);
        for (const c of arrwords) {
            let x = c[0].length;
            let char = 'X';
            emptywords.push(char.repeat(x));


        }
        console.log(emptywords);
        $("#divracks").empty();
        $.each(emptywords, function (i) {

            $("#divracks").append(`<span class="racks" id="rackNr${i}">${emptywords[i]}</span>`);
            $(".racks").lettering();
        });

    };


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
    $("#submitGuess").click(function () {
        checkGuess();
    });
});

function checkGuess() {
    let guess = $("#guess").val();
    guess = guess.toUpperCase();
    console.log(guess);
    let flag = false
    let pos = -1;
    for (var i = 0; i < arrwords.length; i++) {
        if (arrwords[i][0].localeCompare(guess) === 0) {
            if (arrwords[i][2]) {
                alert("Nice try cheater, ypu already found this one");
                return;
            } else {
                flag = true;
                pos = i;
            }
        }
        ;
    }
    ;
    if (flag) {
        alert("You were right great Job");
        let pos2 = "#rackNr" + pos.toString(10);
        score = arrwords[pos][1];
        arrwords[pos][2] = true;
        console.log(score);
        $('#guess').val('');
        let found = arrwords[pos][0];
        $(pos2).replaceWith(`<li>Found=${found}</li>`);
        $('#score').replaceWith(`<h2>Score=${arrwords[pos][1]}</h2>`);


    } else {
        alert("You were wrong, try again",);
    }


}
