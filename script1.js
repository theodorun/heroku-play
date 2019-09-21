var arrwords;
$(document).ready(function () {
    $(document).ready(function(){
        let words;
        let showRacks = function(racks){
            $("#bingos").html('');
            racks.map(rack=>{
                $("#bingos").append(`<li>${rack.rack}: <span class="answer hidden">${rack.words}</span></li>`);
                words =rack.words;

            });

            console.log(words);
            arrwords = words.split('@@');
            console.log(arrwords);


            $("#bingos li").on("click", function(evt){
                $(evt.currentTarget).find(".answer").toggleClass("hidden");
            });
        }

        $("#grabmore").on("click", function(){
            $.ajax({
                method: "GET",
                url: "api.php",
                success: data=>{ showRacks(data)}
            });
        });
        $("#submitGuess").click(function(){
            let guess = $("#guess").val();
            console.log(guess);
            console.log(arrwords.indexOf('giraffe'));
            if(arrwords.indexOf(guess)) {
                alert("You were right great Job");}
            else {
                alert("You were wrong again, tr",);}


        });
    });


    }
);
