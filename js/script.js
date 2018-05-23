var variable = {
  contentDiv: document.getElementById("content"),
  baseURL:
    "https://en.wikipedia.org/w/api.php?&action=opensearch&format=json&origin=*&search=",
  searchText: document.getElementById("searchText"),
  searchWikiEntry: document.getElementById("buttonSearchWikiEntry")
};

var listener = {
  searchButtonClick: function() {
    variable.searchWikiEntry.addEventListener("click", function() {
      action.getArticles(
        variable.baseURL,
        variable.searchText.value,
        variable.contentDiv
      );
    });
  },
  enterKeyPress: function() {
    document.addEventListener("keypress", function(event) {
      action.checkKey(
        variable.baseURL,
        variable.searchText.value,
        event,
        variable.contentDiv
      );
    });
  }
};

var action = {
  addListeners: function(listeners) {
    listeners.searchButtonClick();
    listeners.enterKeyPress();
  },

  getArticles: function(baseURL, searchText, contentDiv) {
    var url = baseURL + searchText;

    fetch(url)
      .then(function(data) {
        return data.json();
      })
      .then(function(articles) {
        action.populate(articles, contentDiv);
      });

  },

  checkKey: function(baseURL, searchText, event, contentDiv) {
    if (event.keyCode === 13) {
      action.getArticles(baseURL, searchText, contentDiv);
    }
  },

  populate: function(articles, contentDiv) {
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
      action.createDOMElements(AddSomething, contentDiv);
    } else if (articles[1].length === 0) {
      action.createDOMElements(nothingFound, contentDiv);
    } else if (articles[1].length !== 0) {
      action.createDOMElements(articles, contentDiv);
    }
  },

  createDOMElements: function(articles, contentDiv) {
    if (contentDiv.firstChild) {
      while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild);
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

      contentDiv.appendChild(article);
    }
  }
};


action.addListeners(listener);

