(function () {



    var navbarMenu = document.getElementById("fixedNav");


    var scrollDown = false ;
    var srollUp = false ;
    var fixedBottom = false;
    var fixedTop = false;
    var scrolling = window.pageYOffset;


    //  GET WINDOW SIZES
    var listenTo = {

        top : document.documentElement.getBoundingClientRect().top,
        bottom : document.documentElement.getBoundingClientRect().bottom,
        height: Math.round(document.documentElement.getBoundingClientRect().height),
        documentheight : document.documentElement.clientHeight,
        clientWidth : document.documentElement.clientWidth,
        getResult : function (){
            // console.log("============");
            // console.log(this.top+"top");
            //
            // console.log(window.pageYOffset)
            // console.log(this.bottom+"bottom");
            // console.log(this.height+"height");
            // console.log("============");
            // console.log(documentheight + window.pageYOffset);
            if (this.height === this.documentheight + window.pageYOffset){
                return true;
            } else return false
        }


    }
    // LISTEN for events
    window.addEventListener("scroll",function(){

        if (window.pageYOffset > scrolling ){
             scrolling = window.pageYOffset;
             scrollDown = true ;
             srollUp = false ;


        }else if (window.pageYOffset < scrolling){
            scrolling = window.pageYOffset;
            scrollDown = false ;
            srollUp = true ;

        }
    });





    window.addEventListener("resize", function(){
        listenTo.clientWidth = document.documentElement.clientWidth;
        listenTo.top = document.documentElement.getBoundingClientRect().top;
        listenTo.bottom = document.documentElement.getBoundingClientRect().bottom;
        listenTo.height = Math.round(document.documentElement.getBoundingClientRect().height);

        listenTo.documentheight  = document.documentElement.clientHeight;

        console.log("resized")

        console.log(listenTo)

        if(listenTo.clientWidth < 990 ){

            navbarMenu.classList.remove("fixed");
            window.removeEventListener("scroll",fixNavbar);
            window.removeEventListener("scroll",unfixNavBar);

        }else if(listenTo.clientWidth > 990  ){
            window.addEventListener("scroll",fixNavbar);
        }



    });

// fix navbar




    window.addEventListener("scroll",fixNavbar);


        function bind (){
            // adding styles for nailing
            navbarMenu.classList.remove("relative");
            navbarMenu.classList.add("fixed");
            navbarMenu.style = "";
            window.removeEventListener("scroll",fixNavbar);
            window.addEventListener("scroll",unfixNavBar)
        }

    function fixNavbar() {
        // getting navbar height
        var elHeight = navbarMenu.clientHeight;
        // cheking if client width is grater than 990px
       if(listenTo.clientWidth > 990){
           // cheking if element height is grater than document height
           if (elHeight > listenTo.documentheight){
               // cheking if scrolling down , binding to bottom
               if(scrollDown && navbarMenu.getBoundingClientRect().bottom <  listenTo.documentheight) {
                   bind()
                   navbarMenu.style.bottom = "0px";
                   fixedBottom = true;
                   fixedTop = false;
                   // cheking if scrolling up , binding to top
               }else if ( srollUp && navbarMenu.getBoundingClientRect().top > 70){
                   bind()
                   navbarMenu.style.top = "0px";
                   fixedBottom = false;
                   fixedTop = true;
               }
               // if navbar height is less than document height
           }else  {
               // binding to top
               if(scrollDown ){
                   bind()
                   navbarMenu.style.top = "0px"
                   // nailing to top when navbar riched footer
               }else if ( srollUp && navbarMenu.getBoundingClientRect().top > 70){
                   bind()
                   navbarMenu.style.top = "0px";
               }
           }
       }
    }


        function unbind (){

            navbarMenu.classList.remove("fixed");
            navbarMenu.classList.add("relative");
            navbarMenu.style = "";

            fixedBottom = false;
            fixedTop = false;


            window.addEventListener("scroll",fixNavbar);
            window.removeEventListener("scroll",unfixNavBar);
        }

    function unfixNavBar () {

        var top = (+window.pageYOffset + +navbarMenu.getBoundingClientRect().top);
        console.log(listenTo.getResult())
        if (srollUp && fixedBottom ){
            unbind ()
            navbarMenu.style.top = top+"px";
        }else if (scrollDown && fixedTop || listenTo.getResult()) {
                unbind ()
                navbarMenu.style.top = (top-150)+"px";
        }
    }
//========================================================
//  switch colors
//========================================================


   var li =  document.querySelectorAll(".list-group-item");

    window.addEventListener("load",function(){
        if(window.location.hash){
            check();
            li.forEach(function(element){
                if(element.parentNode.getAttribute("href") === window.location.hash){
                    element.classList.add("active")
                }
            })
        }
    });

    function check(){
        li.forEach(function(element){
            if(element.classList.contains("active") ){
                element.classList.remove("active")
            }
        })}


     li.forEach(function(element){
         element.addEventListener("click",function(e){
             console.log(this);
             check();
             if(!this.classList.contains("active") ){
                 this.classList.add("active")
             }
         })
     })





}());

