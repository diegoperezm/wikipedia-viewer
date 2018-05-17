var variable = {

 contentDiv: document.getElementById("content"),
 url:
  "https://en.wikipedia.org/w/api.php?&action=opensearch&format=json&origin=*&search=",
 searchText: document.getElementById("searchText"),
 searchWikiEntry: document.getElementById("buttonSearchWikiEntry"),

};


var listener = {

 searchButtonClick: function() {
  variable.searchWikiEntry.addEventListener("click", action.fetch);
 },
 enterKeyPress: function() {
 document.addEventListener("keypress", action.checkKey);
 },

};


var action = {
  addListeners: function() {
    listener.searchButtonClick();
    listener.enterKeyPress();
  },

  fetch: function() {
    fetch(variable.url + variable.searchText.value)
      .then(function(data) {
        return data.json();
      })
      .then(function(articles) {
        action.populate(articles);
      });
  },

  checkKey: function(event) {
    if (event.keyCode === 13) {
      action.fetch(variable.url + variable.searchText.value);
    }
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
      action.createDOMElements(AddSomething);
    } else if (articles[1].length === 0) {
      action.createDOMElements(nothingFound);
    } else if (articles[1].length !== 0) {
      action.createDOMElements(articles);
    }
  },

  createDOMElements: function(articles) {
    if (variable.contentDiv.firstChild) {
      while (variable.contentDiv.firstChild) {
        variable.contentDiv.removeChild(variable.contentDiv.firstChild);
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

      variable.contentDiv.appendChild(article);
    }
  }
};

action.addListeners();

