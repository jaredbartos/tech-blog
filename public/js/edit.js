const deletePost = async (e) => {
  e.preventDefault();

  const postID = document.querySelector('.postForm').dataset.postid

  const response = await fetch(`/api/posts/${postID}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete post');
  };
};

document.querySelector('#deleteBtn').addEventListener('click', deletePost);