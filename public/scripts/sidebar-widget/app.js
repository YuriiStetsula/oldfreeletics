;(function (global) {

    var NavWidget = function(id){

        this.navbarMenu = document.getElementById(id);



        this.scrollDown = false ;
        this.srollUp = false ;
        this.fixedBottom = false;
        this.fixedTop = false;
        this.scrolling = window.pageYOffset;



        this.listenTo = {

            top : document.documentElement.getBoundingClientRect().top,
            bottom : document.documentElement.getBoundingClientRect().bottom,
            height: Math.round(document.documentElement.getBoundingClientRect().height),
            documentheight : document.documentElement.clientHeight,
            clientWidth : document.documentElement.clientWidth,
            navbarVisible:this.navbarMenu.getBoundingClientRect().height + this.navbarMenu.getBoundingClientRect().top

        }

        this.handalingForEvents()

    }
    debugger;

    NavWidget.prototype.handalingForEvents = function () {



        window.addEventListener("resize", function(){

            this.listenTo.clientWidth = document.documentElement.clientWidth;
            this.listenTo.top = document.documentElement.getBoundingClientRect().top;
            this.listenTo.bottom = document.documentElement.getBoundingClientRect().bottom;
            this.listenTo.height = Math.round(document.documentElement.getBoundingClientRect().height);

            this.listenTo.documentheight  = document.documentElement.clientHeight;

            console.log("resized")


            if(this.listenTo.clientWidth < 990 ){

                this.navbarMenu.classList.remove("fixed");
                window.removeEventListener("scroll",this.fixNavbar.bind(this));
                window.removeEventListener("scroll",this.unfixNavBar.bind(this));

            }else if(this.listenTo.clientWidth > 990  ){
                window.addEventListener("scroll",this.fixNavbar.bind(this));
            };
        }.bind(this));

        window.addEventListener("scroll",this.fixNavbar.bind(this));


    }




    NavWidget.prototype.scrollToTop = function (callback){

        if (window.pageYOffset < this.scrolling){
            this.scrolling = window.pageYOffset;
            this.scrollDown = false ;
            this.srollUp = true ;
            callback.call(this);;
        }
    }

    NavWidget.prototype.scrollToBottom = function (callback){
        // this.scrolling + documentheight >  height -50
        if (window.pageYOffset > this.scrolling){


            this.scrolling = window.pageYOffset;
            this.scrollDown = true ;
            this.srollUp = false ;
            callback.call(this);
        }


    }

// fix navbar
    NavWidget.prototype.bind = function(){

        // adding styles for nailing
        this.navbarMenu.classList.remove("relative");
        this.navbarMenu.classList.add("fixed");
        this.navbarMenu.style = "";
        window.removeEventListener("scroll",this.fixNavbar.bind(this));
        window.addEventListener("scroll",this.unfixNavBar.bind(this))
    }

    NavWidget.prototype.fixNavbar = function (){


        // getting navbar height

        var elHeight = this.listenTo.navbarVisible
        // cheking if client width is grater than 990px
        if(this.listenTo.clientWidth > 990){

            // cheking if element height is grater than document height

            if (elHeight > this.listenTo.documentheight){

                // cheking if scrolling down and reached client bootom , binding to bottom

                this.scrollToBottom(function(){
                    if( this.navbarMenu.getBoundingClientRect().bottom <  this.listenTo.documentheight){
                        // console.log("scrolling down!!")
                        this.bind()
                        this.navbarMenu.style.bottom = "0px";
                        this.fixedBottom = true;
                        this.fixedTop = false;
                    }

                });

                // cheking if scrolling up  and reached client top , binding to top

                this.scrollToTop(function(){

                    if ( this.navbarMenu.getBoundingClientRect().top > 70){
                        // console.log("scrolling uo!!")
                        this.bind()
                        this.navbarMenu.style.top = "0px";
                        this.fixedBottom = false;
                        this.fixedTop = true;
                    }
                })

                // else if navbar height is grater or equal than clientheight
            }else  if(elHeight <= this.listenTo.documentheight){
                // when  navbar hidden
                if(-this.navbarMenu.getBoundingClientRect().top > this.navbarMenu.getBoundingClientRect().height){
                    // fix to client  top
                    this.scrollToBottom(function(){
                        this.bind()
                        this.navbarMenu.style.top = "0px"

                    })
                }
                // else {
                //     this.scrollToTop(function(){
                //
                //         if ( this.srollUp && this.navbarMenu.getBoundingClientRect().top > 70) {
                //             this.bind()
                //             this.navbarMenu.style.top = "0px";
                //
                //         }
                //     })
                // }



            }
        }
    }

    NavWidget.prototype.unbind = function () {
        // remove position fixed

        this.navbarMenu.classList.remove("fixed");
        this.navbarMenu.classList.add("relative");
        this.navbarMenu.style = "";


        this.fixedBottom = false;
        this.fixedTop = false;

        window.removeEventListener("scroll",this.unfixNavBar.bind(this));
        window.addEventListener("scroll",this.fixNavbar.bind(this));

    }

    NavWidget.prototype.unfixNavBar = function () {
        // get top position for navbar
        var top = (+window.pageYOffset + +this.navbarMenu.getBoundingClientRect().top);


        if ( this.srollUp &&  this.fixedBottom ){
            // unbind if scrolling up and navbar fixed to bottom
            this.unbind () ;
            this.navbarMenu.style.top = (top-150)+"px";


        }else if ( this.scrollDown &&  this.fixedTop ) {
            // unbind if scrolling down and navbar fixed to top
            this.unbind ();
            this.navbarMenu.style.top = (top-150)+"px";

        }

        else if ((this.scrollDown && this.fixedBottom) && window.pageYOffset + document.documentElement.clientHeight >  document.documentElement.getBoundingClientRect().height-100 ){
            // remove postion fixed when navbar reached footer
            this.unbind ();
            this.navbarMenu.style.top = (window.pageYOffset - this.navbarMenu.getBoundingClientRect().height/1.5 )+"px";

        }

    }

 global.app = global.app || {};

    global.app.FixSidebar = NavWidget

})(window);


