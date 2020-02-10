// Should be OK (CB 1-15)

$(document).ready(function() {
  $(".choices").on("click", function() {
    let choice = $(this).text();
    let name = $(".message").attr("name");
    console.log("thest", { name, choice });

    let response = {};
    response[name] = choice;

    // Send the PUT request.
    $.ajax("/api/userPrompt/" + id, {
      type: "PUT",
      data: response
    }).then(function() {
      console.log("changed devoured to", newDevoured);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".inputBtn").on("click", () => {
    let input = $(".inputText").val();
    let name = $(".message").attr("name");
    console.log("thest", { name, input });

    let response = {};
    response[name] = input;

    // Send the PUT request.
    $.ajax("/api/userPrompt/" + id, {
      type: "PUT",
      data: response
    }).then(function() {
      console.log("changed devoured to", newDevoured);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
