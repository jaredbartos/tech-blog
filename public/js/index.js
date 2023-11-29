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

    if (response.ok) {
      document.location.replace('/')
    };
  } else if (username && password.length < 8) {
    alert('Password must be at least 8 characters');
  } else {
    alert('Please enter a username');
  };
};

const userLogin = async (e) => {
  e.preventDefault()
}

document.querySelector('#signupBtn').addEventListener('click', userSignUp);