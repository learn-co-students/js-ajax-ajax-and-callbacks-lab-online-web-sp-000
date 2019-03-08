var renderCommit = (commit) => {
  return `<h3>${commit.sha}</h3><p>${commit.commit.message}</p>`
}

var commitResults = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return result
}

function showCommits(repo) {
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, data => {
    $('#details').html(commitResults(data))
  })
}

let searchTemplate = (repo) => {
  return `
        <h2><a href="${repo.html_url}">${repo.name}</a></h2>
        <p><a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${repo.description}</p>
      <br>
    `
}

let searchResults = (repos) => repos.items.map( repo => searchTemplate(repo))


function searchRepositories() {
  let term = document.getElementById("searchTerms").value
  let url = 'https://api.github.com/search/repositories?q=' + term
  $.get(url).done(function(data) {
    $('#results').html(searchResults(data))
  })
}

$(document).ready(function (){
});
