(function(){
    var  sidebarID = "fixedNav",
         footerID  = "main_footer";

    if (document.getElementById(sidebarID)) {
        var myFixSidebarWidget = new app.FixSidebar(sidebarID,footerID)
    }




}())