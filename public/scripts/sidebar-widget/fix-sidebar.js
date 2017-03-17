(function(){
    var object = {

        sidebarID : "fixedNav",
        headerID : "header",
        footerID : "main_footer",

        upperElementID : "upper_elemnt",

    }
    if (document.getElementById(object.sidebarID)) {
        var myFixSidebarWidget = new app.FixSidebar(object)
    }




}())