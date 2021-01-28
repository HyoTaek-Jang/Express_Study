$("#loginForm").submit((e) => {
  console.log($("#loginForm").serialize());
  $.ajax({
    url: $("#loginForm").attr("action"),
    type: "POST",
    dataType: "json",
    data: {
      id: $("#id").val(),
      password: $("#password").val(),
    },
    // data: $("#loginForm").serialize(),
    success: (result) => {
      if (result.result == "Success") location.href = "/";
      else {
        alert(result.msg);
        location.href = "/login";
      }
    },
    error: (err) => {
      console.log(err);
      alert("로그인 중 오류발생");
      // location.href = "/";
    },
  });
});
