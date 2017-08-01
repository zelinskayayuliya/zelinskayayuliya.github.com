$(window).on('load', function () { 
    const padding = $("#title").height();

    $("#topNavbar").affix({
        offset: {
            top: padding
        }
    });

    $("#topNavbar").on("affixed.bs.affix", function() {
      return $("#main").css("padding-top", padding)
    });

    $("#topNavbar").on("affixed-top.bs.affix", function() {
      return $("#main").css("padding-top", "")
    });
});