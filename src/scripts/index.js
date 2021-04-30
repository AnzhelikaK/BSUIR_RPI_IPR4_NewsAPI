import '../styles/style.css';

loadBy('top-headlines?country=ru&pageSize=5&page=1&');

let lastUrl = '', page = 0, newsCount = 0;

const HIDE = (element) => {
    document.querySelector(element).style.display = 'none';
};

const SHOW = (element) => {
    document.querySelector(element).style.display = 'unset';
};

document.querySelector('#load-button').addEventListener('click', () => {
    getMore();
});

function loadBy(src) {
    const uri = 'https://newsapi.org/v2/' + src + 'apiKey=f43f70cf39ef42929b58013df7a02a4c';
    const request = new Request(uri);
    fetch(request)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const newsBlock = document.querySelector('#list');
            newsBlock.innerHTML = '';
            const newsNumber = data.articles.length;
            const block = fillTemplate(newsNumber, data.articles);
            newsBlock.appendChild(block);
            if (newsNumber < 5) {
                HIDE('#load-button');
            } else {
                SHOW('#load-button');
            }
            lastUrl = uri;
            page = 2;
            newsCount = newsNumber;
        });
}

function fillTemplate(count, data) {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#template');
    for (let i = 0; i < count; i++) {
        const item = (template.content) ? template.content.cloneNode(true).querySelector('.item')
            : template.querySelector('.item').cloneNode(true);
        const child = createArticle(item, data[i]);
        fragment.appendChild(child);
    }
    return fragment;
}

function createArticle(item, data) {
    item.querySelector('.title').textContent = data.title;
    item.querySelector('.description').textContent = data.description;
    item.querySelector('a').setAttribute('href', data.url);
    return item;
}

function getMore() {
    lastUrl = lastUrl.replace(new RegExp('page=.*&'), 'page=' + page + '&');
    const request = new Request(lastUrl);
    fetch(request)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const count = data.articles.length;
            if (count === 0) {
                HIDE('#load-button');
                return;
            }
            const block = fillTemplate(count, data.articles);
            const newsBlock = document.querySelector('#list');
            newsBlock.appendChild(block);
            newsCount += count;
            page++;
            if (count < 5 || newsCount === 40) {
                HIDE('#load-button');
            }
        });
}
