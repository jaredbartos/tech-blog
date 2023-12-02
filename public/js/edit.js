const updatePost = async (e) => {
  e.preventDefault();

  const postID = document.querySelector('.postForm').dataset.postid;
  const title = document.querySelector('#postTitle').value;
  const content = document.querySelector('#postContent').value;

  const response = await fetch(`/api/posts/${postID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content })
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update post');
  };
};

const deletePost = async (e) => {
  e.preventDefault();

  const postID = document.querySelector('.postForm').dataset.postid;

  const response = await fetch(`/api/posts/${postID}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete post');
  };
};

document.querySelector('#updateBtn').addEventListener('click', updatePost);

document.querySelector('#deleteBtn').addEventListener('click', deletePost);