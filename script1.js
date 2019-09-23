var arrwords=Array();
//var arrwords=["CCC","BB","A","DDDDD"];
var emptywords=Array();

$(document).ready(function () {
    let words;
    let showRacks = function (racks) {
        arrwords=Array();
        emptywords=Array();
        racks.map(rack => {
           // $("#racks").append(`<li>${rack.rack}</li>`);
            words = rack.words;
            let tem = words.split('@@');
            tem.forEach(function(entry) {
               arrwords.push(entry);
            });

        });
        let onlyrack=racks[0]["rack"];
        $("#bingos").append(`<h2>${onlyrack}</h2>`);
        arrwords.sort();
        arrwords.sort();
        console.log(arrwords);
        for (const c of arrwords) {
            x=c.length;
            var char = 'X';
            emptywords.push(char.repeat(x));



        }
        console.log(emptywords);

        $.each(emptywords, function(i)

        {

            $("#racks").append(`<li class="racks" id="rackNr${i}">${emptywords[i]}</li>`);
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
        let pos ="#rackNr"+arrwords.indexOf(guess).toString(10);
        console.log(pos);

        $("#guess").empty();
        $(pos).replaceWith( "<li>Found</li>" );

    } else {
        alert("You were wrong, try again",);
    }


}
