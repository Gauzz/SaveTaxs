function mediumFeedView() {

    var feedUrl = 'https://medium.com/feed/LateralX';

    $.ajax(feedUrl, {
        accepts: {
            xml: "application/rss+xml"
        },

        dataType: "xml",
        success: function(data) {
            $(data)
                .find("item")
                .each(function() {
                    var $this = $(this);
                    item = {
                        title: $this.find("title").textcontent(),
                    };
                    $('#medium-feeds').append($('<h2/>').textcontent(item.title));

                });
        }
    });
}
mediumFeedView();