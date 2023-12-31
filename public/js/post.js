// Function to add comment to post
const addComment = async (e) => {
  e.preventDefault();
  const content = document.querySelector('#commentInput').value;
  const postID = document.querySelector('.post').dataset.postid;

  if (content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        post_id: postID,
      }),
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add comment');
    };
  } else {
    alert('Add a comment in order to submit')
  };
};

document.querySelector('#commentSubmitBtn').addEventListener('click', addComment);