// YAHEARDDDDDD
$(document).ready(function () {
    var tag = ["sasuke", "naruto", "ichigo", "gon", "killua"];
    var main = $("body");
    var buttons = main.find("#buttonsGoHere")

    addButtonsFromArray();
    $("#submit").on("click", function (event) {
        event.preventDefault();

        var newTag = $("#newGifButton").val().trim()
        tag.push(newTag);
        addButtonsFromArray();
    });
    $(".searchTagButton").on("click", function (event) {
        $("#gifReults").empty();
        console.log("clicked" + event);

        var search = $(this).attr("data-tag");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            search + "&api_key=bDLAGAP1mVS9HflboWvAZtmkNHv4oXjU&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var resultsDiv = $("<div>")
                var p = $("<p>").text("Rating: " + results[i].rating);
                var resultsImage = $("<img>");

                resultsImage.attr("src", results[i].images.downsized_still.url);
                resultsImage.attr("data-still", results[i].images.downsized_still.url);
                resultsImage.attr("data-animate", results[i].images.downsized.url);
                resultsImage.attr("data-state", "still");
                resultsImage.addClass("gif");

                resultsDiv.append(p);
                resultsDiv.append(resultsImage);

                $("#gifReults").prepend(resultsDiv);
            }
            $(".gif").on("click", function () {
                console.log("still/animate click detected");
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    });

    function addButtonsFromArray() {
        $("#buttonsGoHere").empty();
        
        for (var i = 0; i < tag.length; i++) {
            var setBtn = $("<button type='button' class='btn btn-outline-primary searchTagButton'>");
            setBtn.attr("data-tag", tag[i]);
            setBtn.text(tag[i]);
            buttons.append(setBtn);
        }
    }
});
// end of YAHEARRDD