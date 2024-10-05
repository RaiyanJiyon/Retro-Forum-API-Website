const allPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts
    displayAllPost(posts);
}

const displayAllPost = (posts) => {
    const discussContainer = document.getElementById('discuss-container');

    posts.forEach(post => {
        const discussCard = document.createElement('div');
        discussCard.classList.add('card', 'bg-[#F3F3F5]');

        discussCard.innerHTML = `
            <div class="card-body">
                <div class="flex flex-col md:flex-row gap-6">
                    <!-- avatar -->
                    <div class="avatar">
                        <div class="w-16 h-16 rounded-full">
                            <img src="${post.image}" />
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="flex">
                            <p class="text-[#12132DCC] text-sm font-bold">
                                #${post.category || 'No category'}
                            </p>
                            <p class="text-[#12132DCC] text-sm font-bold">
                                Author: ${post.author.name || 'Undefined name'}
                            </p>
                        </div>

                        <div class="mt-3 space-y-3">
                            <h2 class="card-title font-extrabold">
                                ${post.title || 'Undefined title'}
                            </h2>
                            <p>
                                ${post.description || 'Undefined description'}
                            </p>
                        </div>

                        <div class="border-dashed border border-[#12132D40]"></div>

                        <div class="flex justify-between items-center gap-6">
                            <div class="flex justify-between gap-6">
                                <div class="flex justify-center items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <p class="text-[#12132D99]">
                                        ${post.comment_count || 'Undefined comment count'}
                                    </p>
                                </div>

                                <div class="flex justify-center items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <p class="text-[#12132D99]">
                                        ${post.view_count || 'Undefined view count'}
                                    </p>
                                </div>

                                <div class="flex justify-center items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <p class="text-[#12132D99]">
                                        ${post.posted_time || 'Undefined posted time'}
                                    </p>
                                </div>
                            </div>

                            <div onclick="bookmark('${post.id}', '${post.title}', ${post.view_count})" id="bookmark-msg" class="w-10 h-10 rounded-full bg-green-500 flex justify-center items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        discussContainer.appendChild(discussCard);
    });
}

let count = 0;

const bookmark = (id, title, view_count) => {
    const bookmarkCount = document.getElementById('bookmark-count')
    const bookmarkContainer = document.getElementById('bookmark-container');
    const existingBookmarks = bookmarkContainer.querySelectorAll('.card-body p');
    
    // Check if the bookmark already exists
    const isBookmarked = Array.from(existingBookmarks).some(el => el.textContent === title);
    
    if (!isBookmarked) {
        const bookmarkCard = document.createElement('div');
        bookmarkCard.classList.add('card', 'bg-base-100', 'mt-4');
        bookmarkCard.innerHTML = `
            <div class="card-body flex-row">
                <p>${title || 'No title available'}</p>
                <div class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <p>${view_count || 'No view count'}</p>
                </div>
            </div>`;
        bookmarkContainer.appendChild(bookmarkCard);
        
        count++;
        bookmarkCount.innerText = count;
    }
}

const loadPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayLatestPost(data);
}

const displayLatestPost = (posts) => {
    const postsContainer = document.getElementById('posts-container');

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('card', 'bg-base-100', 'border', 'border-[#12132D26]', 'mt-12');

        postCard.innerHTML = `
            <figure class="px-10 pt-10 w-11/12 mx-auto">
                <img src="${post.cover_image}" alt="Post image" class="rounded-xl w-full" />
            </figure>
            <div class="card-body justify-start items-start w-11/12 mx-auto space-y-3">
                <div class="flex justify-between items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                    </svg>
                    <p>${post.author.posted_date || 'No publish date'}</p>
                </div>
                <h2 class="card-title text-left font-bold">${post.title || 'No title available'}</h2>
                <p class="text-left">${post.description || 'No description available'}</p>
                <div class="flex justify-between gap-6">
                    <div class="avatar">
                        <div class="w-14 h-14 rounded-full">
                            <img src="${post.profile_image}" />
                        </div>
                    </div>
                    <div class="flex flex-col items-start">
                        <h3 class="font-bold">${post.author.name || 'No name available'}</h3>
                        <p class="text-[#12132D99]">${post.author.designation || 'No designation'}</p>
                    </div>
                </div>
            </div>
        `;

        postsContainer.appendChild(postCard);
    });
}

loadPost();
allPost();


