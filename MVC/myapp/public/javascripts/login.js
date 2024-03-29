$("#loginForm").submit((e) => {
  e.preventDefault();
  console.log($("#loginForm").serialize());
  $.ajax({
    url: $("#loginForm").attr("action"),
    type: "POST",
    dataType: "json",
    data: {
      id: $("#id").val(),
      password: $("#password").val(),
    },
    success: (result) => {
      console.log(result);
      alert(result.result);
      if (result.result == "Success") location.href = "/";
      else {
        alert(result.msg);
        location.href = "/login";
      }
    },
    error: (err) => {
      alert(result);

      console.log(err);
      alert("로그인 중 오류발생");
    },
  });
});
