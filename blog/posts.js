fetch('/blog/blog.json')
  .then(response => response.json())
  .then(data => {
    const postsContainer = document.querySelector('.posts');
    const tagsData = data.tags;

    data.blogPosts.forEach(post => {
      const linkEl = document.createElement('a');
      linkEl.href = post.link;

      const postLinkDiv = document.createElement('div');
      postLinkDiv.classList.add('post-link');

      const imgEl = document.createElement('img');
      imgEl.src = `${post.link}/img/${post.thumb}`;

      const infoDiv = document.createElement('div');
      infoDiv.classList.add('post-link-info');

      const titleEl = document.createElement('h2');
      titleEl.textContent = post.title;

      const dateEl = document.createElement('p');
      dateEl.textContent = post.date;

      const tagsContainer = document.createElement('div');
      tagsContainer.classList.add('blog-tags');

      post.tags.forEach(tag => {
        const tagDef = tagsData[tag.toLowerCase()];
        if (!tagDef) return;
        const tagEl = document.createElement('span');
        tagEl.classList.add('blog-tag');
        tagEl.textContent = tag;
        const borderGradient = Array.isArray(tagDef.borderColor)
          ? tagDef.borderColor.join(', ')
          : tagDef.borderColor;
        tagEl.style.border = '1px solid transparent';
        tagEl.style.background = `linear-gradient(30deg, ${tagDef.bgColor[0]}, ${tagDef.bgColor[1]}) padding-box, linear-gradient(to right, ${borderGradient}) border-box`;
        tagEl.style.color = tagDef.textColor;
        tagEl.style.display = 'inline-block';
        tagsContainer.appendChild(tagEl);
      });

      infoDiv.appendChild(titleEl);
      infoDiv.appendChild(dateEl);
      infoDiv.appendChild(tagsContainer);
      postLinkDiv.appendChild(imgEl);
      postLinkDiv.appendChild(infoDiv);
      linkEl.appendChild(postLinkDiv);
      postsContainer.appendChild(linkEl);
    });
  })
  .catch(err => console.error('Error loading blog posts:', err));
