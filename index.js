// DOM elements
const postList = document.getElementById('post-list');
const postDetail = document.getElementById('post-detail');
const postCount = document.getElementById('post-count');
const newPostForm = document.getElementById('new-post-form');
const editForm = document.getElementById('edit-form');
const postTitle = document.getElementById('post-title');
const postAuthorDate = document.getElementById('post-author-date');
const postContent = document.getElementById('post-content');
const postImage = document.getElementById('post-image');
const postActions = document.getElementById('post-actions');
const editPostBtn = document.getElementById('edit-post');
const deletePostBtn = document.getElementById('delete-post');
const editTitle = document.getElementById('edit-title');
const editContent = document.getElementById('edit-content');
const cancelEditBtn = document.getElementById('cancel-edit');
let currentPostId = null;

// Fetch posts from API
async function fetchPosts() {
  try {
    const response = await fetch('http://localhost:3000/posts');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Display posts in the sidebar
function displayPosts(posts) {
  postList.innerHTML = '';
  posts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = post.title;
    li.dataset.id = post.id;
    li.addEventListener('click', () => handlePostClick(post.id));
    postList.appendChild(li);
  });
  postCount.textContent = posts.length;
}

// Handle post click to show details
async function handlePostClick(id) {
  const post = await fetch(`http://localhost:3000/posts/${id}`).then(res => res.json());
  postTitle.textContent = post.title;
  postAuthorDate.textContent = `By ${post.author} - ${post.date}`;
  postContent.textContent = post.content;
  postImage.src = post.image;
  postActions.style.display = 'block';
  editForm.style.display = 'none';
  currentPostId = id;
  document.querySelectorAll('#post-list li').forEach(li => li.classList.remove('active'));
  document.querySelector(`#post-list li[data-id="${id}"]`).classList.add('active');
}

// Add new post
async function addNewPost(event) {
  event.preventDefault();
  const newPost = {
    title: document.getElementById('new-title').value,
    content: document.getElementById('new-content').value,
    author: document.getElementById('new-author').value,
    image: 'https://via.placeholder.com/400x200',
    date: new Date().toISOString().split('T')[0]
  };
  await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost)
  });
  const posts = await fetchPosts();
  displayPosts(posts);
  newPostForm.reset();
}

// Edit post
function handleEditClick() {
  const post = fetch(`http://localhost:3000/posts/${currentPostId}`).then(res => res.json());
  editTitle.value = postTitle.textContent;
  editContent.value = postContent.textContent;
  postActions.style.display = 'none';
  editForm.style.display = 'flex';
}

async function handleEditSubmit(event) {
  event.preventDefault();
  const updatedPost = {
    title: editTitle.value,
    content: editContent.value,
    author: postAuthorDate.textContent.split(' - ')[0].replace('By ', ''),
    image: postImage.src,
    date: postAuthorDate.textContent.split(' - ')[1]
  };
  await fetch(`http://localhost:3000/posts/${currentPostId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost)
  });
  const posts = await fetchPosts();
  displayPosts(posts);
  handlePostClick(currentPostId);
  editForm.style.display = 'none';
  postActions.style.display = 'block';
}

function handleCancelEdit() {
  editForm.style.display = 'none';
  postActions.style.display = 'block';
}

// Delete post
async function handleDeleteClick() {
  await fetch(`http://localhost:3000/posts/${currentPostId}`, { method: 'DELETE' });
  const posts = await fetchPosts();
  displayPosts(posts);
  postDetail.innerHTML = '<h1>Nothing</h1>';
  postActions.style.display = 'none';
  currentPostId = null;
}

// Main function to start the app
async function main() {
  displayPosts(await fetchPosts());
  addNewPostListener();
  // Advanced: Display first post on load
  if (await fetchPosts().length > 0) handlePostClick(1);
}

// Add event listeners
function addNewPostListener() {
  newPostForm.addEventListener('submit', addNewPost);
  editPostBtn.addEventListener('click', handleEditClick);
  deletePostBtn.addEventListener('click', handleDeleteClick);
  editForm.addEventListener('submit', handleEditSubmit);
  cancelEditBtn.addEventListener('click', handleCancelEdit);
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', main);