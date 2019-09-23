var arrwords = [];
//var arrwords=["CCC","BB","A","DDDDD"];
var emptywords = Array();
var score;


$(document).ready(function () {
    if (readCookie("myscore") != null) score = parseInt(readCookie("myscore"));

    else score = 0;

    $('#upper').append(`<h2 id ="score">Score=${score.toString(10)}</h2>`);

    $('#guess').val('');
    getRacks();


    $("#grabmore").on("click", getRacks);
    $("#guess").keypress(function (event) {
        if (event.which === 13) {
            checkGuess();
        }

    })
    $("#submitGuess").click(function () {
        checkGuess();
    });
});

function getRacks() {
    $.ajax({
        method: "GET",
        url: "api.php",
        success: data => {
            racksToArrays(data)
        }
    });
}

function racksToArrays(racks) {
    //console.log(racks);
    let words;
    let points;
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
    $("#bingos").lettering();
    arrwords.sort(function (a, b) {

        return a[0].length - b[0].length;
    });

    //console.log(arrwords);
    for (const c of arrwords) {
        let x = c[0].length;
        let char = 'X';
        emptywords.push(char.repeat(x));


    }
    $("#divracks").empty();
    $.each(emptywords, function (i) {

        $("#divracks").append(`<span class="racks" id="rackNr${i}">${emptywords[i]}</span>`);
        $(".racks").lettering();
    });

}

function checkGuess() {
    let guess = $("#guess").val();
    guess = guess.toUpperCase();
    //console.log(guess);
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
        $('#guess').val('');
        let found = arrwords[pos][0];
        score = score + parseInt(arrwords[pos][1]);
        //console.log(score);
        arrwords[pos][2] = true;

        $(pos2).replaceWith(`<span class="racksFound">${found}</span>`);
        //console.log("score: " + score);

        $('#score').replaceWith(`<h2 id="score">Score=${score.toString(10)}</h2>`);

        createCookie("myscore", score);


    } else {
        alert("You were wrong, try again",);
    }


}

function createCookie(key, value) {
    let oneweek = new Date();
    oneweek.setDate(oneweek.getDate() + 1);
    let cookie = escape(key) + "=" + escape(value) + ";expires=" + oneweek + ";";
    document.cookie = cookie;
    //console.log(cookie);

}

function readCookie(name) {
    let key = name + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(key) === 0) {
            return cookie.substring(key.length, cookie.length);
        }
    }
    return null;
}
