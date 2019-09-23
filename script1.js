var arrwords=[];
//var arrwords=["CCC","BB","A","DDDDD"];
var emptywords=Array();


$(document).ready(function () {
    let words;
    let points
    let showRacks = function (racks) {
        console.log(racks);

        arrwords=[];
        emptywords=Array();
        racks.map(rack => {

            words = rack.words;
            points=rack.points;
            let tem = words.split('@@');
            tem.forEach(function(entry) {
               arrwords.push([entry,points]);

            });

        });
        let onlyrack=racks[0]["rack"];
        $("#bingos").append(`<h2>${onlyrack}</h2>`);
        console.log("ARR");
        console.log(arrwords);
        arrwords.sort(function(a, b){

            return a[0].length - b[0].length;
        });

        console.log(arrwords);
        for (const c of arrwords) {
            let x=c[0].length;
            let char = 'X';
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
    let flag=false
    let pos=-1;
    for (var i = 0; i < arrwords.length; i++) {
        if(arrwords[i][0].localeCompare(guess)===0){
            flag=true;
            pos=i;
        };
    };
    if (flag) {
        alert("You were right great Job");
        let pos2 ="#rackNr"+pos.toString(10);
        console.log(pos2);

        $("#guess").empty();
        $(pos2).replaceWith( "<li>Found</li>" );

    } else {
        alert("You were wrong, try again",);
    }


}
