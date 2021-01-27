$("#loginForm").submit((e) => {
  $.ajax({
    url: $("#loginForm").attr("action"),
    type: "POST",
    dataType: "json",
    data: $("#loginForm").serialize(),
    success: (result) => {
      if (result.result == "Success") location.href = "/";
      else {
        alert(result.result);
        location.href = "/login";
      }
    },
  });
});
