$(document).ready(function (){

});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, (response) => {
      $('#results').html(showRepos(response)) 
    }).fail(error => {
      displayError()
    })
}

function showRepos(response) {
  response.items.map( (result) => {
    return 
    `<div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="getCommits(this)">Show Commits</a></p>
      <p>${result.description}</p>
    </div>
    <hr>`
  })
}

function getCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, (response) => {
    $('#details').html( showCommits(response)) 
  }).fail(error => {
    displayError()
  })
}

function showCommits(response) {
  let result = response.items.map((commit) => {
    return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
  })
  return `<ul>${result}</ul>`;
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
}