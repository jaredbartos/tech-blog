const createPost = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#postTitle').value;
  const content = document.querySelector('#postContent').value;

  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to create new post');
  };
};

document.querySelector('#createBtn').addEventListener('click', createPost);