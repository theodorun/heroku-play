

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
            let arrwords = words.split('@@');
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
    });


    }
);
