// Function to sign up user or display error, if needed
const userSignUp = async (e) => {
  e.preventDefault();
  const username = document.querySelector('#signupUser').value.trim();
  const password = document.querySelector('#signupPass').value.trim();

  if (username && password.length >= 8) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const res = await response.json();
      if (res.errors[0].message === "username must be unique") {
        alert('Username already taken. Please try again.');
      } else {
        alert(res.errors[0].message);
      };
    } else {
      document.location.replace('/')
    };
  } else if (username && password.length < 8) {
    alert('Password must be at least 8 characters');
  } else {
    alert('Please enter a username');
  };
};

document.querySelector('#signupBtn').addEventListener('click', userSignUp);