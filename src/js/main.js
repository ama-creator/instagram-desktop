
// Likes 
const postBlock = document.querySelector('.posts');

postBlock.addEventListener('click', (event) => {
    const target = event.target;
    const isLikeClick = target.classList.contains('insta-liked') || target.classList.contains('insta-like');
    if (isLikeClick){
        const parent = target.parentNode;
        if (parent.getAttribute('like') === 'true') {
            parent.removeAttribute('like')
            parent.innerHTML = '<i class="fa-solid fa-heart post-actions__item-icon insta-like" style="color: #a4a4a4"></i>'
        } else {
            parent.setAttribute('like', 'true')
            parent.innerHTML = '<i class="fa-solid fa-heart post-actions__item-icon insta-liked"></i>'
        }
    }



})





// Posts render
{
const defaultPostData = {
    img: 'http://placeimg.com/378/570/any?img=',
    user: {
        photo: 'https://i.pravatar.cc/240?img=',
        nickName: '@anatoly_m'
    }
}

function postGenerator (postCount = 1){
    const posts = [];
    let isGorizontal = false;

    for (let i = 1; i <= postCount / 2; i++){

        const postImg = defaultPostData.img+i;
        const userPhoto = defaultPostData.user.photo+i;
        const post = postHTMLGenerate(postImg, userPhoto, isGorizontal);
      
        const post2Img = defaultPostData.img+i+1;
        const user2Photo = defaultPostData.user.photo+i+1;
        const post2 = postHTMLGenerate(post2Img, user2Photo, !isGorizontal);
     
        const postColumn = document.createElement('div');
        postColumn.appendChild(post)
        postColumn.appendChild(post2)

        posts.push(postColumn)

        isGorizontal = !isGorizontal;
    }
    return posts
}

function postHTMLGenerate(postImg, userPhoto, isGorizontal){
    const post = document.createElement('div');
    post.className = isGorizontal ? 'post post-gorizontal' : 'post';
    post.innerHTML = `
    <div class="post-pic"> 
    <img class="post-pic__item" src="${postImg}" alt="">
</div>
    <div class="post-footer">
        <div class="post-user">
            <div class="user user--row">
                <div>
                    <img src="${userPhoto}" alt="" class="user-avatar">
                </div>
                <div class="user-nickname">@anatoly_m</div>
            </div>
        </div>
        <div class="post-container">
            <div class="post-actions">
                <div class="post-actions__item">
                    <i class="fa-solid fa-heart post-actions__item-icon insta-like"></i>
                </div>
                <div class="post-actions__item">
                    <i class="fa-solid fa-comment post-actions__item-icon"></i>
                </div>
                <div class="post-actions__item">
                    <i class="fa-solid fa-paper-plane post-actions__item-icon"></i>
                </div>
            </div>
        </div>
    </div>
    `

    return post;
}

const postsGenerated = postGenerator(11);

const postsBlock = document.querySelector('.posts');
postsBlock.innerHTML = '';

postsGenerated.forEach((post) => {
    postsBlock.appendChild(post)
})

// Modal window 
const createBtn = document.querySelector('.new-post__button');
const modal = document.querySelector('.modal');
const modalElement = {
    text: modal.querySelector('.modal-text'),
    img: modal.querySelector('#image-link'),
    hashteg: modal.querySelector('#hashtag'),
    saveBtn: modal.querySelector('#save-post')
}

createBtn.addEventListener('click', () => {
    if (modal.classList.contains('modal--hidden')){
        modal.classList.remove('modal--hidden');
    }
})

modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeAndClearModal();
    }
})

function closeAndClearModal() {
    modal.classList.add('modal--hidden')
    modalElement.text.value = '';
    modalElement.img.value = '';
    modalElement.hashteg.value = '';
}


// add post 
modalElement.saveBtn.addEventListener('click', ()=> {
    if (isHaveErrors()) return
    buildNewPostHTML(modalElement.img.value);
    closeAndClearModal();
})

function isHaveErrors(){
    let isError = false;
    modalElement.text.classList.remove('modal-arror');
    modalElement.img.classList.remove('modal-error');

    if (!modalElement.text.value) {
        modalElement.text.classList.add('modal-error');
        isError = true;
    }

    if (!modalElement.img.value) {
        modalElement.img.classList.add('modal-error')
        isError = true;
    }

    return isError;
}

// function render html code new post 
function buildNewPostHTML(postPhotoURL) {
    const postsBlock = document.querySelector('.posts');
    const lastColumn = document.querySelector('.posts > div:last-child');
    const lastColumnPosts = lastColumn.querySelectorAll('.post');
    const lastPostIndex = lastColumnPosts.length - 1;
    const isGorizontalLastPost = lastColumnPosts[lastPostIndex].classList.contains('post-gorizontal');
    const isGorizontalNewPostType = lastColumnPosts.length < 2 ? !isGorizontalLastPost : isGorizontalLastPost;
    const postHTML = postHTMLGenerate(postPhotoURL, 'https://i.pravatar.cc/240', isGorizontalNewPostType);
    
    console.log(lastColumnPosts);
    
    if (lastColumnPosts.length > 1) {
        const newColumn = document.createElement('div');
        newColumn.appendChild(postHTML);

        postsBlock.appendChild(newColumn);
    } else {
        lastColumn.appendChild(postHTML);
    }
}
}





