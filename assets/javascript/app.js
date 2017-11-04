$( document ).ready(function() {
// An array of disney, new disney will be pushed into this array;
var disney = ["rapunzel", "snow white", "pocahontas", "mickey mouse", "minnie mouse", "donald duck", "lion king", "ariel", "simba", "nala","tiana"];
// Creating Functions & Methods
// Function that displays all gif buttons
function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < disney.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("character");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", disney[i]);
        gifButton.text(disney[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new character button
function addNewButton(){
    $("#addGif").on("click", function(){
    var character = $("#character-input").val().trim();
    if (character === ""){
      return false; 
    }
    disney.push(character);

    displayGifButtons();
    return false;
    });
}
// Remove last button
function removeLastButton(){
    $("removeGif").on("click", function(){
    disney.pop(character);
    displayGifButtons();
    return false;
    });
}
// Function that displays all of the gifs
function displayGifs(){
    var character = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty();
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this button");
        }
        for (var i=0; i<results.length; i++){
        //div for the gifs
            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            // rating
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling Functions & Methods
displayGifButtons(); 
addNewButton();
removeLastButton();
// Document Event Listeners
$(document).on("click", ".character", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});