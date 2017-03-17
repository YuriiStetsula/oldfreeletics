;(function (global) {

    var NavWidget = function(id,footer){

        this.navbarMenu = document.getElementById(id);
        this.footer = document.getElementById(footer)

        this.startPosition  = this.navbarMenu.getBoundingClientRect()
        this.scrollDown = false ;
        this.srollUp = false ;
        this.fixedBottom = false;
        this.fixedTop = false;
        this.scrolling = window.pageYOffset;
        this.clientWidth = document.documentElement.clientWidth;

        this.fixNavbarBinded = this.fixNavbar.bind(this);
        this.unfixNavBarBinded = this.unfixNavBar.bind(this);
        this.listenScrollingBinded = this.listenScrolling.bind(this);
        this.handalingForEvents()

    }


    NavWidget.prototype.handalingForEvents = function () {

        window.addEventListener("resize", function(){

            // var top = (+window.pageYOffset + +this.navbarMenu.getBoundingClientRect().top);
            this.clientWidth = document.documentElement.clientWidth;
            this.unbind ()

            // this.navbarMenu.style.top = (top-150)+"px";
            console.log("resized")

            if(this.clientWidth < 990 ){
                this.navbarMenu.style = ""
                console.log(this.navbarMenu.classList)
                this.navbarMenu.classList.remove("fixed");
                this.navbarMenu.classList.remove("relative");
                window.removeEventListener("scroll",this.fixNavbarBinded);
                window.removeEventListener("scroll" ,this.unfixNavBarBinded);

            }else if(this.clientWidth > 990  ){
                window.addEventListener("scroll",this.fixNavbarBinded);
            }
        }.bind(this));

        window.addEventListener("scroll",this.fixNavbarBinded);
        window.addEventListener("scroll", this.listenScrollingBinded)
    }
    NavWidget.prototype.listenScrolling = function (){
        if (window.pageYOffset < this.scrolling){
            console.log("scrolling up")
            this.scrolling = window.pageYOffset;
            this.scrollDown = false ;
            this.srollUp = true ;

        }else  if (window.pageYOffset > this.scrolling){
            console.log("scrolling down!!")
            this.scrolling = window.pageYOffset;
            this.scrollDown = true ;
            this.srollUp = false ;

        }
    }
// scroll functions
    NavWidget.prototype.scrollToTop = function (callback){

        if ( this.srollUp ){
            // console.log("scrolling up")
            callback.call(this);;
        }
    }

    NavWidget.prototype.scrollToBottom = function (callback){

        if (this.scrollDown){
            // console.log("scrolling down!!")

            callback.call(this);
        }


    }

// fix navbar
    NavWidget.prototype.bind = function(){

        // adding styles for nailing
        this.navbarMenu.classList.remove("relative");
        this.navbarMenu.classList.add("fixed");
        this.navbarMenu.style = "";
        window.removeEventListener("scroll",this.fixNavbarBinded);
        window.addEventListener("scroll", this.unfixNavBarBinded)
    }

    NavWidget.prototype.fixNavbar = function (){

        // cheking if client width is grater than 990px
        if( this.clientWidth > 990){

            // cheking if element height is grater than document height
            if (this.navbarMenu.getBoundingClientRect().height-15+this.startPosition.top  > document.documentElement.clientHeight  ){

                // cheking if scrolling down and reached client bootom , binding to bottom
                this.scrollToBottom(function(){
                    if( this.navbarMenu.getBoundingClientRect().bottom <  document.documentElement.clientHeight ){
                        console.log("====================")
                        this.bind()
                        this.navbarMenu.style.bottom = "0px";
                        this.fixedBottom = true;
                        this.fixedTop = false;
                    }
                });

                // cheking if scrolling up  and reached client top , binding to top
                this.scrollToTop(function(){
                    if ( this.navbarMenu.getBoundingClientRect().top > 70){
                        console.log("scrolling uo!!")
                        this.bind()
                        this.navbarMenu.style.top = "0px";
                        this.fixedBottom = false;
                        this.fixedTop = true;
                    }
                })

                // else if navbar height is grater or equal than clientheight
            }else  if(this.navbarMenu.getBoundingClientRect().height <= document.documentElement.clientHeight){
                // when  navbar hidden
                // if(-this.navbarMenu.getBoundingClientRect().top > this.navbarMenu.getBoundingClientRect().height){
                // fix to client  top
                this.scrollToBottom(function(){
                    if(-this.navbarMenu.getBoundingClientRect().top > this.navbarMenu.getBoundingClientRect().height) {
                        this.bind()
                        this.navbarMenu.style.top = "0px"
                    }
                })

                this.scrollToTop(function(){
                    if ( this.srollUp && this.navbarMenu.getBoundingClientRect().top > 70) {
                        this.bind()
                        this.navbarMenu.style.top = "0px";
                    }
                })
            }
        }
    }

    NavWidget.prototype.unbind = function () {
        // remove position fixed
        var top = (+window.pageYOffset + +this.navbarMenu.getBoundingClientRect().top);

        this.navbarMenu.classList.remove("fixed");
        this.navbarMenu.classList.add("relative");
        this.navbarMenu.style = "";

        this.fixedBottom = false;
        this.fixedTop = false;

        this.navbarMenu.style.top = (top-150)+"px";

        window.removeEventListener("scroll",this.unfixNavBarBinded);
        window.addEventListener("scroll",this.fixNavbarBinded);

    }

    NavWidget.prototype.unfixNavBar = function () {
        // get top position for navbar


        if ( this.srollUp &&  this.fixedBottom ){
            // unbind if scrolling up and navbar fixed to bottom
            this.unbind () ;


        } else if ( this.scrollDown &&  this.fixedTop ) {
            // unbind if scrolling down and navbar fixed to top
            this.unbind ();



        } else if (this.scrollDown  && this.navbarMenu.getBoundingClientRect().bottom  > this.footer.getBoundingClientRect().top-10  ){
            // remove postion fixed when navbar reached footer
            // console.log("yes")
            this.unbind ();
            console.log("+++++++++++++++++++++++")
            // this.navbarMenu.style.top = (window.pageYOffset - this.navbarMenu.getBoundingClientRect().height/1.2 )+"px";
        }
    }



    global.app = global.app || {};
    global.app.FixSidebar = NavWidget

})(window);