function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, (data) => {
    const commits = data
    let str = "<ul>"
    commits.forEach(c => {
        str += `<li>${c.sha}<br>`
        str += `<img src="${c.author.avatar_url}" height="40" width="40"> ${c. author.login } (${c. commit.author.name })`
        str += `</li>`
    });
    $('#details').html(str+'</ul>')
  }).fail((error) => {
    displayError()
  })
}

function displayResults(data) {
  const repos = data.items
  let str = ""
  repos.forEach((r) => {
      str += `<h3><a href="${r.html_url}">${r.name}</a></h3>`
      str += `<img height="40" width="40" src="${r.owner.avatar_url}" alt="${r.owner.login}"> <a href="${r.owner.html_url}">${r.owner.login}</a>`
      str += `<p>${r.description}</p>`
      str += `<p><a href="#" onclick="showCommits(this)" data-owner="${r.owner.login}" data-repository="${r.name}">Show Commits</a></p>`
  });
  $('#results').html(str)
}

function displayError() {
  $('#errors').html("<p>I'm sorry, there's been an error.</p>")
}

function searchRepositories() {
  const terms = $('#searchTerms')[0].value
  const query = terms.replace(" ", "+")
  $.get(`https://api.github.com/search/repositories?q=${query}`, (data) => {
    displayResults(data)
  }).fail((error) => {
    displayError()
  })
}

$(document).ready(() => {

});
