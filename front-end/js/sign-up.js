axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

const user = document.getElementsByClassName("form-control");

const handleSignUp = () => {
  const firstname = user[0].value;
  const lastname = user[1].value;
  const email = user[2].value;
  const password = user[3].value;

  if (
    !firstname.trim() ||
    !email.trim() ||
    !lastname.trim() ||
    !password.trim()
  ) {
    alert("First name | laste name | email | password not be blank");
    return;
  }

  axios
    .post("/authentication/register", {
      firstname,
      lastname,
      email,
      password,
    })
    .then(function (response) {
      console.log(response);
      Redirect("index.html");
    })
    .catch(function (error) {
      console.log(error);
    });
  event.preventDefault();
};

function Redirect(url) {
  window.location = `http://127.0.0.1:5500/front-end/${url}`;
}
