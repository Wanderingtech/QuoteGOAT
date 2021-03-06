$(document).ready(function () {
  $.get("/api/categories").then(categories=>{
    $.each(categories, function(val, text){
      $("#categoryOptions").append(
        $("<option></option>").val(val).text(text.categoryName).attr("id", text.categoryId)
      );
    });
    $.each(categories, function(val, text){
      $("#categoryDropdown").append(
        $("<option></option>").val(val).text(text.categoryName).attr("id", text.categoryId)
      );
    });
  });

  $("#submitQuoteBtn").on("click", function (event) {

    function play() {
      let audio = new Audio ("https://www.fesliyanstudios.com/play-mp3/6554");
      audio.play();
    }
    play();
    event.preventDefault();

    $.get("/api/user_data").then(user=>{
      let newQuote = {
        quote: $("#textBoxFormatting").val().trim(),
        categoryId: $("#categoryOptions option:selected").attr("id"),
        userId: user.userId,
        UserUserId: user.userId,
      };

      $.post("/api/quotes", newQuote).then(location.reload());

    });
    //$.post("/api/quotes", newQuote).then(function () {});
  });

  $("#searchFilterBtn").on("click", function(event){
    event.preventDefault();
    function play() {
      let audio = new Audio ("https://www.fesliyanstudios.com/play-mp3/6554");
      audio.play();
    }
    play();
    $("#searchQuotes").empty();
    //get the user input
    const category = $("#categoryDropdown option:selected").attr("id");
    const orderby = $("#orderByDropdown").val().trim();

    //ping our routes to get the data
    $.get("/api/searchBy/"+category+"/"+orderby)
      .then(
        quotes=>{
          $.each(quotes, function(val, text){
            $("#searchQuotes").append(
              $("<li></li>").text(text.quote)
            );
          });
        },
        //clear hidden visibility
        $("#searchDiv").css("visibility", "visible")
      );
  });

  //Logout functionality
  // $("#logOut").on("click", function() {
  //   app.get("/logout", function(req, res){
  //     req.logout();
  //     res.redirect("/");
  //   });
  // });
  $("#logOut").on("click", function(event) {
    event.preventDefault();
    function play() {
      let audio = new Audio ("https://www.fesliyanstudios.com/play-mp3/6553");
      audio.play();
    }
    play();
    $.get("/logout").then(() => {
      window.location.href="/logout";
    });
  });

  $("#randomQuoteButton").on("click", function(event){
    event.preventDefault();
    function play() {
      let audio = new Audio ("https://www.fesliyanstudios.com/play-mp3/6553");
      audio.play();
    }
    play();
    $.get("/api/random_quote").then(randomQuote=>{
      $("#randomQuotePlace").text(randomQuote[0].quote);
    });
  });
});
