function searchRepositories() {
  $.getJSON('https:\/\/api.github.com\/search\/repositories\?q=tetris/').done(response => {
    // console.log(response.items);
    $("#results").html("Tetris")
  })
}

// const searchTermValue = $("#searchTerms").val()
// if (searchTermValue) {
// $(document).ready(function() {
//   $.get('https:api.github.com/search/repositories?q=tetris', function(response) {
//     console.log(response.items);
//     $(response.items).each(function(index, repo) {
//       // $("#results").html(`<p>${repo.name} <br> ${repo.description} <br> ${repo.html_url} <br> ${repo.owner.login} <br> <img src=${repo.owner.avatar_url}> <br> ${repo.homepage}</p>`)
//       // $("#results").html("Tetris")
//     })
//   })
// })
// }

function showCommits() {
  $.getJSON('/https:\/\/api.github.com\/repos\/owner\/repo\/commits/').done(response => {
    $("#details").html("6dcb09b5b57875f334f61aebed695e2e4193db5e")
  })
}

function displayError() {
  $("#errors").html("error")
}
