$(document).ready(function (){
});

function displayError() {
  return $('#errors').html("error");
}

function renderSearchResults(data) {
  let repoList = data.items.map(repo => `<ul>
                                          <li><strong>${repo.name}:</strong>
                                            ${repo.description}
                                            <a href="#" data-repo="${repo}"><button onclick="showCommits(data-repo)">Show Commits</button></a></li>
                                          </ul>`)
  return repoList
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $('#results').html(renderSearchResults(data))}).fail(error => {
      displayError()
    });
}

function showCommits(repo) {
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  });
}

function renderCommits(data) {
}
