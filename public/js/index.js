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
}

if (location.pathname === '/signup') {
  document.querySelector('#signupBtn').addEventListener('click', userSignUp);
};

if (location.pathname === '/login') {
  document.querySelector('#loginBtn').addEventListener('click', userLogin);
};