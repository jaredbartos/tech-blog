// Function to login user or return error, if needed
const userLogin = async (e) => {
  e.preventDefault();
  const username = document.querySelector('#loginUser').value.trim();
  const password = document.querySelector('#loginPass').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const res = await response.json();
      alert(res.message);
      return;
    };

    document.location.replace('/');
  } else {
    alert('Please enter both a username and a password');
  };
};

document.querySelector('#loginBtn').addEventListener('click', userLogin);