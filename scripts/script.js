const APIEndpoint = "https://en.wikipedia.org/w/api.php";
const ImagePlaceholder = "https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg";

function SearchWikipedia(searchString) {
  $.ajax({
    url: APIEndpoint,
    dataType: "jsonp",
    data: {
      'format': "json",
      'action': "query",
      'generator': 'search',
      'gsrsearch': searchString,
      'gsrlimit': 10,
      'gsrnamespace': 0,
      'prop': 'pageimages|extracts|info',
      'pilimit': 'max',
      'pithumbsize': 120,
      'exsentences': 5,
      'exlimit': 'max',
      'exintro': 1,
      'inprop': 'url|displaytitle'
    },
    success: function(data) {
      for (var key in data.query.pages) {
        var page = data.query.pages[key];
        var result = $("<article></article>").addClass("row search-result");
        var a = $("<a></a>").attr("href", page.fullurl).attr("target", "_blank");
        var imageDiv = $("<div></div>").addClass("col-sm-3 search-image hidden-xs");
        if (page.thumbnail) {
          imageDiv.append($("<img>").attr("src", page.thumbnail.source).addClass("img-thumbnail"));
        } else {
          imageDiv.append($("<img>").attr("src", ImagePlaceholder).addClass("img-thumbnail"));
        }
        var bodyDiv = $("<div></div>").addClass("col-sm-9 search-body");
        bodyDiv.append("<h4>" + page.title + "</h4>", page.extract);
        a.append(imageDiv, bodyDiv);
        result.append(a);
        $(".search-results").append(result);
      }
    }
  });
}

$("#search-form").submit(function(event) {
  if ($("#search-box").val()) {
    $(".search-results").empty();
    $(".search-wrapper").toggleClass("search-wrapper-centered", false);
    SearchWikipedia($("#search-box").val())
  }
  event.preventDefault();
});