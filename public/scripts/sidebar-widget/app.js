;(function (global) {

    var NavWidget = function(object){

        this.navbarMenu = document.getElementById(object.sidebarID);
        // this.prevSibling = this.getPrevSibling(this.navbarMenu)



        this.header = document.getElementById(object.headerID)
        this.footer = document.getElementById(object.footerID)

        this.upperElemnt = document.getElementById(object.upperElement)

        this.unBindPosition = this.getCoords(this.upperElemnt).bottom || this.header.getBoundingClientRect().bottom
        this.elementStartPostion = this.getCoords(this.navbarMenu).top

        // this.stickyBinded = this.sticky.bind(this)
        this.scroll = this.scrollDirection.bind(this)
        this.scrolled = 0;
        this.scrollTop = false ;
        this.scrollDown = false ;
        this.sticky = false ;
        this.reachedFooter = false;
        this.dontCatch = false
        this.handleForEvents()

        this.navbarPositionBottom = this.getCoords(this.navbarMenu).bottom
        this.navbarPositionTop = this.getCoords(this.navbarMenu).top



    }


    NavWidget.prototype.handleForEvents = function (){
        // window.addEventListener("scroll",this.stickyBinded,false)
        window.addEventListener("scroll",this.scroll,false)
    }
    NavWidget.prototype.scrollDirection = function () {


        if (window.pageYOffset > this.scrolled){

            console.log(this.navbarPositionBottom )

            this.scrollTop = false;
            this.scrollDown = true;
            this.scrolled = window.pageYOffset
            // if (this.navbarMenu.classList.contains("fixed") && window.pageYOffset+document.documentElement.clientHeight  > this.getCoords(this.footer).top ){
            //     alert(1)
            // }
            if (this.sidebarVisible()){
                // BIND TO CLIENT TOP (within header height) WHEN SIDEBAR TOP REACHED IT
                if (!this.sticky && window.pageYOffset > this.getCoords(this.navbarMenu).top ){
                    this.navbarMenu.classList.remove("relative");
                    this.navbarMenu.style = ""
                    this.navbarMenu.classList.add("fixed");
                    this.navbarMenu.style.top = this.header.clientHeight+"px";
                    console.log("ahah")
                    this.sticky = true;
                }
                if (this.navbarMenu.classList.contains("fixed") && this.getCoords(this.navbarMenu).bottom  > this.getCoords(this.footer).top ){
                 // UNBIND SIDEBAR WHEN IT REACHES FOOTER
                    console.log("+++++++++++++++++++++++++++++++++")
                    var top = this.getCoords(this.navbarMenu).top
                    this.navbarMenu.classList.remove("fixed")
                    this.sticky = false;
                    this.reachedFooter = true;
                    this.navbarMenu.classList.add("relative")
                    this.navbarMenu.style.top =  top-this.navbarPositionTop+"px";
                }
            }else {

                if (!this.reachedFooter  &&  this.navbarMenu.getBoundingClientRect().bottom < document.documentElement.clientHeight ){
                    // BIND TO WINDOW BOTTOM
                    this.navbarMenu.classList.remove("relative")
                    this.navbarMenu.style = "";
                    this.navbarMenu.classList.add("fixed");

                    this.navbarMenu.style.bottom = "0px";
                    console.log("WOOOOOOOOOOOOW")
                    this.sticky = true;
                }
                if (this.navbarMenu.classList.contains("fixed") && this.getCoords(this.navbarMenu).bottom  > this.getCoords(this.footer).top ){
                    // UNBIND WHEN SIDEBAR REACHES FOOTER
                    console.log("+++++++++++++++++++++++++++++++++")
                    var top = this.getCoords(this.navbarMenu).top
                    this.navbarMenu.classList.remove("fixed")
                    this.navbarMenu.style = "";
                    this.sticky = false;
                    this.reachedFooter = true;
                    this.navbarMenu.classList.add("relative")
                    this.navbarMenu.style.top =  top-this.navbarPositionTop+"px";
                }
                if (this.sticky && this.navbarMenu.style.top){
                    // UNBIND FROM  WINDOW TOP
                    var top = this.getCoords(this.navbarMenu).top
                    this.navbarMenu.classList.remove("fixed")
                    this.navbarMenu.style = ""
                    this.navbarMenu.classList.add("relative")
                    this.navbarMenu.style.top = top-this.navbarPositionTop+"px";
                    this.sticky = false
                }
            }




        }else if (window.pageYOffset < this.scrolled){

            console.log("scroll up")
            this.scrolled = window.pageYOffset
            this.scrollTop = true;
            this.scrollDown = false;
            if(this.sidebarVisible()){
                if (this.sticky && window.pageYOffset < this.unBindPosition){
                    // UNBIND FROM CLIENT WINDOW TOP WHEN REACHED HEADER OR UPPER ELEMENT
                    console.log("coool========")
                    var top = this.getCoords(this.navbarMenu).top
                    this.navbarMenu.classList.remove("fixed")
                    this.navbarMenu.style = "";
                    this.navbarMenu.classList.add("relative");
                    this.navbarMenu.style.top = top-this.navbarPositionTop +"px"
                    this.sticky = false;
                }
                if ( this.reachedFooter && this.getCoords(this.navbarMenu).top > this.header.getBoundingClientRect().bottom ){
                    // BIND TO TOP WHEN SCROLLING UP ,AFTER this.reachedFooter = true
                    this.navbarMenu.classList.remove("relative")
                    this.navbarMenu.classList.add("fixed");
                    console.log("==============================================")
                    this.navbarMenu.style.top = this.header.clientHeight+"px";
                    this.reachedFooter = false;
                    this.sticky = true;
                }
            }else {
                if (this.navbarMenu.classList.contains("fixed")  && this.navbarMenu.style.bottom ){
                // SCROLLING UP TO UNBIND FROM BOTTOM
                    console.log("coool========")
                    var top = this.getCoords(this.navbarMenu).top
                    this.navbarMenu.style = ""
                    this.navbarMenu.classList.remove("fixed")
                    this.navbarMenu.classList.add("relative")
                    this.navbarMenu.style.top = top-this.navbarPositionTop +"px"
                    this.sticky = false;
                }
                // if ( this.reachedFooter && this.navbarMenu.getBoundingClientRect().top > this.header.getBoundingClientRect().bottom ){
                //       // BIND TO TOP WHEN SCROLLING UP ,AFTER this.reachedFooter = true
                //     this.navbarMenu.style = ""
                //     this.navbarMenu.classList.remove("relative")
                //     this.navbarMenu.classList.add("fixed");
                //     console.log("zzzzzzzzzzzz")
                //     this.navbarMenu.style.top = this.header.clientHeight+"px";
                //     this.reachedFooter = false;
                //     this.sticky = true;
                // }
                if (!this.sticky && this.navbarMenu.getBoundingClientRect().top > 0 ) {
                    //BIND TO of CLIENT WINDOW TOP WHEN SCROLLING UP
                    this.navbarMenu.style = "";
                    this.navbarMenu.classList.remove("relative")
                    this.navbarMenu.classList.add("fixed")
                    this.navbarMenu.style.top = this.header.clientHeight+"px";
                    this.sticky = true;
                    this.reachedFooter = false;
                }
                if (this.sticky && window.pageYOffset < this.header.getBoundingClientRect().bottom){
                    // UNBIND FROM CLIENT WINDOW TOP WHEN REACHED HEADER
                    console.log("superpeupr========")
                    var top = this.getCoords(this.navbarMenu).top
                    this.navbarMenu.classList.remove("fixed")
                    this.navbarMenu.style = "";
                    this.navbarMenu.classList.add("relative");
                    this.navbarMenu.style.top = top-this.navbarPositionTop +"px"
                    this.sticky = false;
                }
            }




        }



    }


    NavWidget.prototype.sidebarVisible = function (){
        if ( this.navbarMenu.clientHeight + this.navbarPositionTop < document.documentElement.clientHeight ){
            return true
        }else {
            return false
        }
    }

    // NavWidget.prototype.sticky = function () {
    //
    //     if (document.documentElement.clientWidth > 990){
    //         // if navbar height is less then clientheight
    //         if ( this.navbarMenu.clientHeight + this.getCoords(this.navbarMenu).top < document.documentElement.clientHeight ){
    //
    //            else
    //             if (this.navbarMenu.classList.contains("fixed") && window.pageYOffset+document.documentElement.clientHeight  > this.getCoords(this.footer).top ){
    //                 alert(1)
    //             }
    //
    //         }
    //
    //
    //     }
    //
    //
    //
    //
    // }


    NavWidget.prototype.getCoords = function (element) {
        if (element){
            var elCoords = element.getBoundingClientRect();
            return {
                top: elCoords.top + window.pageYOffset,
                bottom : elCoords.bottom + window.pageYOffset,
                left : elCoords.left + window.pageXOffset,
                right : elCoords.right + window.pageXOffset,
                height : elCoords.height + window.pageYOffset
            }
        } else return false
        }


    global.app = global.app || {};
    global.app.FixSidebar = NavWidget

})(window);


