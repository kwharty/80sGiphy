$(document).ready(function () {

    //this is the API endpoint with string to use
    //var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=xn5Vzcz6J67ylLvaToFPaqTDwth1efjV&limit=10";

    /* var topics = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=xn5Vzcz6J67ylLvaToFPaqTDwth1efjV&limit=10");
  xhr.done(function(data) { console.log("success got data", data); }); */

    //Start with the array of topics
    var topics = {
        movies: ["Sixteen Candles", "Ferris Buehler's Day Off", "Willow", "Weird Science", "Desperately    Seeking Susan", "The Goonies", "E.T.", "Gremlins", "Princess Bride", "Spaceballs"],


        //make the buttons for the existing array
        makeButtons: function () {

            //experiment with movies[i] or movies.length
            for (var i = 0; i < topics.movies.length; i++) {

                var newBtn = $("<button>");
                newBtn.attr("data-search", topics.movies[i]);
                newBtn.addClass("btn");
                newBtn.addClass("addMovieButton");
                newBtn.text(topics.movies[i]);
                $("#buttons-view").append(newBtn);

            }

        },

        addMovie: function (event) {
            event.preventDefault();
            var userMovie = $("#movie-input").val();

            if (topics.movies.indexOf(userMovie) < 0 && userMovie.length > 0) {
                topics.movies.push(userMovie);
                var newBtn = $("<button>");
                newBtn.attr("data-search", userMovie);
                newBtn.addClass("btn");
                newBtn.addClass("addMovieButton");
                newBtn.text(userMovie);
                $("#buttons-view").append(newBtn);
            }

        },

        showGifs: function (event) {
            $("#gifCont").empty();
            event.preventDefault();

            //  var userMovie =  $("#movie-input").val();

            // if (topics.movies.indexof(userMovie) < 0 && userMovie.length > 0) {

            var userSearch = $(this).data("search");
            var key = "&api_key=xn5Vzcz6J67ylLvaToFPaqTDwth1efjV";
            var limit = "&limit=10";
            var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + userSearch + limit + key;
            console.log(queryUrl);



            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function (response) {
                 console.log(response);



                //this is where the gifs go
                for (var i = 0; i < response.data.length; i++) {


                    var gifOutput = $("<div>");
                    gifOutput.addClass("gifOutput");
                    var activeGif = response.data[i].images["fixed_height"].url;
                    var stillGif = response.data[i].images["fixed_height_still"].url;
                    var rating = response.data[i].rating;
                    console.log(rating);
                    var newGif = $("<img>");
                    gifOutput.append(newGif);
                    newGif.attr("src", stillGif);
                    newGif.attr("data-animate", activeGif);
                    newGif.attr("data-still", stillGif);
                    newGif.attr("data-state", "still");
                    newGif.addClass("gif");
                    gifOutput.append(newGif);

                    $("#gifCont").append(gifOutput);





                }

                //this is how you get the gifs to move or stop
                $(".gif").on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr('src', $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
        },

    }

    //make buttons
    topics.makeButtons();



    $("#add-movie").click(topics.addMovie);
    $(document).on("click", ".addMovieButton", topics.showGifs);
});

           //};












          // Initial array of movies
       //   var topics = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

          // Generic function for capturing the movie name from the data-attribute
      //    function alertMovieName() {
         //   var movieName = $(this).attr("data-name");

       //     alert(movieName);
         // }

          // Function for displaying movie data
       /*   function renderButtons() {
    
            // Deleting the movies prior to adding new movies
            // (this is necessary otherwise we will have repeat buttons)
            $("#buttons-view").empty();
    
            // Looping through the array of movies
            for (var i = 0; i < topics.length; i++) {
    
              // Then dynamicaly generating buttons for each movie in the array
              // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
              var a = $("<button>");
              // Adding a class of movie to our button
              a.addClass("movie");
              // Adding a data-attribute
              a.attr("data-name", topics[i]);
              // Providing the initial button text
              a.text(topics[i]);
              // Adding the button to the HTML
              $("#buttons-view").append(a);
            }
          }
    
          // This function handles events where one button is clicked
          $("#add-movie").on("click", function(event) {
            // Preventing the buttons default behavior when clicked (which is submitting a form)
            event.preventDefault();
            // This line grabs the input from the textbox
            var movie = $("#movie-input").val().trim();
    
            // Adding the movie from the textbox to our array
            movies.push(movie);
    
            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
    
          },
    
          // Function for displaying the movie info
          // We're adding a click event listener to all elements with the class "movie"
          // We're adding the event listener to the document because it will work for dynamically generated elements
          // $(".movies").on("click") will only add listeners to elements that are on the page at that time
          $(document).on("click", ".movie", alertMovieName);
    
          // Calling the renderButtons function to display the intial buttons
        
        renderButtons(); */

        

   // }



   // }

//});