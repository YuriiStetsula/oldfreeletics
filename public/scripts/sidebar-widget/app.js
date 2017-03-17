;(function (global) {

    var NavWidget = function(object){

        this.navbarMenu = document.getElementById(object.sidebarID);
        this.header = document.getElementById(object.headerID);
        this.footer = document.getElementById(object.footerID);

        this.upperElemnt = document.getElementById(object.upperElementID);

        // setting top position for unfixing sidebar when scroll up
        //  this.unBindPosition will be refer to bottom position of previous element or header bottom position
        this.unBindPositionTop = this.getCoords(this.upperElemnt).bottom || this.header.getBoundingClientRect().bottom
        // start top position
        this.navbarPositionTop = this.getCoords(this.navbarMenu).top

        this.elementStyles = getComputedStyle(this.navbarMenu);
        this.elementWidth = this.setStyles( this.elementStyles,"width")

        this.resize = this.resizeBind.bind(this)
        this.scroll = this.scrollDirection.bind(this)
        this.scrolled = 0;

        this.sticky = false ;
        this.reachedFooter = false;

        this.handleForEvents()
    }

    NavWidget.prototype.setStyles = function (styles,styleName) {
        for ( prop in styles){
            if (prop === styleName) {
                return (styles[prop])
            }
        }
    }

    NavWidget.prototype.handleForEvents = function (){
        window.addEventListener("scroll",this.scroll,false)
        window.addEventListener("resize",this.resize,false)
    }

    NavWidget.prototype.resizeBind = function(){
        if( document.documentElement.clientWidth <= 990) {
            window.removeEventListener("scroll",this.scroll,false)
            this.navbarMenu.classList.remove("fixed")
            this.navbarMenu.classList.remove("relative")
            this.navbarMenu.style = "";
        }else if (document.documentElement.clientWidth > 990){
            window.addEventListener("scroll",this.scroll,false)
            var elementStyles = getComputedStyle(this.navbarMenu);
            this.elementWidth = this.setStyles(elementStyles,"width")
        }
    }

    NavWidget.prototype.scrollDirection = function () {

        if(document.documentElement.clientWidth > 990){

            if (window.pageYOffset > this.scrolled){

                // SCROLL DOWN

                this.scrolled = window.pageYOffset

                if (this.sidebarVisible()){
                    // behavior for sidebar when it height + start postion top is less than window client height

                    if (!this.sticky  && window.pageYOffset > this.getCoords(this.navbarMenu).top ){
                        // BIND TO CLIENT TOP (within header height) WHEN SIDEBAR TOP REACHED IT
                        this.fixToTop();
                    }
                    if (this.sticky && this.getCoords(this.navbarMenu).bottom  > this.getCoords(this.footer).top-50 ){
                        // UNBIND SIDEBAR WHEN IT REACHES FOOTER
                        this.unFix()

                        if ( !this.reachedFooter){
                            this.reachedFooter = true;
                        }

                    }
                }else {
                    // behavior for sidebar when it height + start postion top is grater than window client height
                    if (!this.reachedFooter  &&  this.navbarMenu.getBoundingClientRect().bottom < document.documentElement.clientHeight ){
                        // BIND TO WINDOW BOTTOM
                        this.fixToTop()
                        this.navbarMenu.style = "";
                        this.navbarMenu.style.width = this.elementWidth
                        this.navbarMenu.style.bottom = "0px";

                    }
                    if (this.sticky && this.getCoords(this.navbarMenu).bottom  > this.getCoords(this.footer).top-50 ){
                        // UNBIND WHEN SIDEBAR REACHES FOOTER
                        this.unFix()
                        if ( !this.reachedFooter){
                            this.reachedFooter = true;
                        }
                    }
                    if (this.sticky && this.navbarMenu.style.top){
                        // UNBIND FROM  WINDOW TOP
                        this.unFix()
                    }
                }




            }else if (window.pageYOffset < this.scrolled){

                // SCROLL UP

                this.scrolled = window.pageYOffset

                if(this.sidebarVisible()){
                    // behavior for sidebar when it height + start postion top is less than window client height
                    if (this.sticky && window.pageYOffset < this.unBindPositionTop){
                        // UNBIND FROM CLIENT WINDOW TOP WHEN REACHED HEADER OR UPPER ELEMENT
                        this.unFix()
                    }
                    if ( this.reachedFooter && this.getCoords(this.navbarMenu).top > this.header.getBoundingClientRect().bottom ){
                        // BIND TO TOP WHEN SCROLLING UP ,AFTER this.reachedFooter = true
                        this.fixToTop()
                        if (this.reachedFooter){
                            this.reachedFooter = false;
                        }

                    }
                }else {
                    // behavior for sidebar when it height + start postion top is grater than window client height
                    if (this.sticky  && this.navbarMenu.style.bottom ){
                        // SCROLLING UP TO UNBIND FROM BOTTOM
                        this.unFix()
                    }
                    if (!this.sticky && this.navbarMenu.getBoundingClientRect().top > 0 && window.pageYOffset>this.navbarPositionTop ) {
                        //BIND TO  CLIENT WINDOW TOP WHEN SCROLLING UP
                        this.fixToTop();
                        if (this.reachedFooter){
                            this.reachedFooter = false;
                        }

                    }
                    if (this.sticky && window.pageYOffset <  this.unBindPositionTop){
                        // UNBIND FROM CLIENT WINDOW TOP WHEN REACHED HEADER OR UPPER ELEMENT
                        this.unFix()
                    }

                }




            }
        }

    }

    NavWidget.prototype.fixToTop = function (){
        if( this.navbarMenu.classList.contains("relative")){
            this.navbarMenu.classList.remove("relative")
        }
        this.navbarMenu.style = "";
        this.navbarMenu.style.width = this.elementWidth
        this.navbarMenu.style.margin = "0px"
        this.navbarMenu.classList.add("fixed")
        this.navbarMenu.style.top = this.header.clientHeight+"px";
        this.sticky = true;
    }

    NavWidget.prototype.unFix = function () {
        var top = this.getCoords(this.navbarMenu).top
        this.navbarMenu.classList.remove("fixed")
        this.navbarMenu.style = "";
        this.navbarMenu.classList.add("relative");
        this.navbarMenu.style.top = top-this.navbarPositionTop +"px"
        this.navbarMenu.style.width = this.elementWidth
        this.sticky = false;
    }

    NavWidget.prototype.sidebarVisible = function (){
        if ( this.navbarMenu.clientHeight < document.documentElement.clientHeight-this.header.clientHeight ){
            return true
        }else {
            return false
        }
    }


    NavWidget.prototype.getCoords = function (element) {
        if (element){
            var elCoords = element.getBoundingClientRect();
            return {

                top: elCoords.top + window.pageYOffset,
                bottom : elCoords.bottom + window.pageYOffset,
                left : elCoords.left + window.pageXOffset,
                right : elCoords.right + window.pageXOffset,

            }
        } else return false
    }




    global.app = global.app || {};
    global.app.FixSidebar = NavWidget

})(window);