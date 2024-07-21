# GitHub Repo Gallery

Using GitHub’s API, the project pulls data from my GitHub profile to create a gallery of repos where visitors can easily search, filter, and get information on each repo. Visitors to the site get a brief overview of my GitHub profile that shows my picture, name, bio, location, and an auto updated count of how many repos I have. When a repo is clicked on, more details such as a description, the default branch, languages used, and a direct link to view the repo on GitHub itself.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Use dynamic search functionality to search repo names
- View name, bio, location, and the number of public repos
- Click on a repo to see more information and to get a link to the repo on GitHub

### Screenshot

![github-repo-gallery](https://github.com/user-attachments/assets/e3b7d81d-3319-45bd-af3d-7bf14cc9c101)

### Links

- Solution URL: [Solution](https://github.com/KelsiePaige/github-repo-gallery)
- Live Site URL: [Demo](https://kelsiepaige.github.io/github-repo-gallery/)

## My process

### Built with

- JavaScript
- GitHub API
- JSON
- HTML
- CSS

### What I learned

- Use API JSON data to fetch user data


```js
const displayInfo = function (data) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = 
    `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    profileInfo.append(newDiv);
    getRepos();
};
```

- Fetch repo data
  
```js
const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayInfo(data);
};
getData();

const displayRepos = function(repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const eachItem = document.createElement("li");
        eachItem.classList.add("repo");
        eachItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(eachItem);
    }
};
```

- Display repo info

```js
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getInfo(repoName);
    }
});

const getInfo = async function (repoName) {
    const repoFetch = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoFetch.json();

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    };

    displaySpecs(repoInfo, languages);
};

const displaySpecs = function(repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    reposAll.classList.add("hide");
    backButton.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" 
                rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
};
```

- Create a dynamic search

```js
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowSearchText = searchText;
    for (const repo of repos) {
        const lowText = repo.innerText.toLowerCase();
        if (lowText.includes(lowSearchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
```

## Author

- Website - [Kelsie Brown](https://kelsiepaige.github.io/portfolio/)
- LinkedIn - [Profile](https://www.linkedin.com/in/kelsiebrowndeveloper/)

## Acknowledgments

- Skillcrush - [Online Bootcamp](https://skillcrush.com/)
