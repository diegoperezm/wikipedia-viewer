/**
 *
 * @namespace
 *
 */

var variables = {
  contentDiv: document.getElementById("content"),
  url:
    "https://en.wikipedia.org/w/api.php?&action=opensearch&format=json&origin=*&search=",
  searchText: document.getElementById("searchText"),
  searchWikiEntry: document.getElementById("buttonSearchWikiEntry"),
};

var  nameSpace = { 
  search: function() {
    variables.searchWikiEntry.addEventListener("click", function() {
      fetch(variables.url + variables.searchText.value)
        .then(function(data) {
          return data.json();
        })
        .then(function(articles) {
          nameSpace.populate(articles);
        });
    });
  },
  enterListener: function() {
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13) {
        fetch(variables.url + variables.searchText.value)
          .then(function(data) {
            return data.json();
          })
          .then(function(articles) {
            nameSpace.populate(articles);
          });
      }
    });
  },
  populate: function(articles) {

   var AddSomething = [
        ["add something"],
        ["add something"],
        ["add something"],
        [""]
      ];

    var nothingFound = [
        ["nothing found"],
        ["Nothing Found"],
        ["Nothing Found"],
        [""]
    ];
    

   if (articles.error) {
     nameSpace.createDOMElements(AddSomething);
   } else if (articles[1].length === 0) {
     nameSpace.createDOMElements(nothingFound);
    } else if (articles[1].length !== 0) {
      nameSpace.createDOMElements(articles);
    }
  },

  createDOMElements: function(articles) {

    if (variables.contentDiv.firstChild) {
      while (variables.contentDiv.firstChild) {
        variables.contentDiv.removeChild(variables.contentDiv.firstChild);
      }
    }

    for (var i = 0; i < articles[1].length; i += 1) {
      var article = document.createElement("article");
      var title = document.createElement("h2");
      var header = document.createElement("header");
      var paragraph = document.createElement("p");
      var breakLine = document.createElement("br");
      var anchor = document.createElement("a");

      title.innerText = articles[1][i];
      paragraph.innerText = articles[2][i];

      /* 
       Replaces each escape sequence in the encoded URI component 
       with the character that it represents.
      */
      anchor.href = decodeURIComponent(articles[3][i]);
      anchor.innerText = decodeURIComponent(articles[3][i]);

      header.appendChild(title);
      paragraph.appendChild(breakLine);
      paragraph.appendChild(anchor);

      article.appendChild(header);
      article.appendChild(paragraph);

      variables.contentDiv.appendChild(article);
    }
  }
};

nameSpace.search();
nameSpace.enterListener();


