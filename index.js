$(document).ready(function (){
});

function searchRepositories() {
  let searchTerms = $("#searchTerms").val();
  let url = `https://api.github.com/search/repositories?q=${searchTerms}`;
  $.get(url).done(displayResults).fail(displayError);
}


function displayResults(response) {
  const repoList = response.items.map(item =>{
    return (`<h3>${item.name}</h3>
             <p>${item.description}</p>
             <a href="${item.html_url}">Link to Repo</a>
             <p>${item.owner.login}</p><br />
             <img src="${item.owner.avatar_url}" /><br />
             <a href="${item.owner.url}">Owner Profile</a>
             <a href="#" data-owner="${item.owner.login}" data-repository="${item.name}" onclick="showCommits(this)">Show commits</a>`);
  })
  $('#results').html(repoList)
}

function showCommits(el) {
  const repo = el.dataset
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`).done(displayCommits).fail(displayError);
}

function displayError() {
  $('#errors').html(`<h3>I'm sorry, there's been an error. Please try again.</h3>`);
}

function displayCommits(data) {
  const commits = data.map(commit => {
    return (`
      <h2>SHA: ${commit.sha}</h2>
      <p>Author: ${commit.commit.author.name}</p>
      <p>Login: ${commit.author.login}</p>
      <img src="${commit.author.avatar_url}"/>
      `)
  });
  $('#details').html(commits)
}
