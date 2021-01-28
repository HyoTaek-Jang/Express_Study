$("#registerForm").submit((e) => {
  $.ajax({
    url: $("#registerForm").attr("action"),
    type: "POST",
    dataType: "json",
    data: $("#registerForm").serialize(),
    success: (result) => {
      if (result.result == "Success") location.href = "/";
      else {
        alert(result.msg);
        location.href = "/register";
      }
    },
    error: (err) => {
      console.log(err);
      alert("회원가입 중 오류발생");
      // location.href = "/";
    },
  });
});
