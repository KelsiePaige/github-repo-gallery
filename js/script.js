// Profile information
const profileInfo = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const reposAll = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const username = "KelsiePaige";

const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayInfo(data);
};
getData();

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

const getRepos = async function () {
    const getList = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await getList.json();
    console.log(repoData);
    displayRepos(repoData);
};

const displayRepos = function(repos) {
    for (const repo of repos) {
        const eachItem = document.createElement("li");
        eachItem.classList.add("repo");
        eachItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(eachItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getInfo(repoName);
    }
});

const getInfo = async function (repoName) {
    const repoFetch = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoFetch.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    };

    console.log(languages);
    displaySpecs(repoInfo, languages);
};

const displaySpecs = function(repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    reposAll.classList.add("hide");
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


