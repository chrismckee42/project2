// Should be OK (CB 1-15)

$(document).ready(function() {

  //list prompt
  $(".choices, .inputBtn").on("click", function() {
    console.count("CLICK!!")
    let choice = $(this).text();
    let input = $(".inputText").val();
    let response = input ? input : choice;

    let name = $(".message").attr("name");
    let data = {};
    data[name] = response;
    console.log("data", data)
    // Send the PUT request.
    $.ajax("/", {
      type: "get",
      data: {name, response}
    }).then(function(res) {
      console.log("test",res); //html...
      // Reload the page to get the updated prompt
      location.reload();
    });
  });
});
