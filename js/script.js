// Profile information
const profileInfo = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
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