const loadPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayPost(data);
}

const displayPost = (posts) => {
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