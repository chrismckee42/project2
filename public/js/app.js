// Should be OK (CB 1-15)

$(document).ready(function() {

  //list prompt
  $(".choices, .inputBtn").on("click", function() {
    let choice = $(this).text();
    let input = $(".inputText").val();
    let response = choice.length > input.length? choice:input;

    let name = $(".message").attr("name");
    let data = {};
    data[name] = response;

    // Send the PUT request.
    $.ajax("/api/prompt/", {
      type: "PUT",
      data
    }).then(function(res) {
      console.log("test",res,  { name, response });
      // Reload the page to get the updated prompt
      location.reload();
    });
  });
});
