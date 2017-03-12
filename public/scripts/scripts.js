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


    window.addEventListener("scroll",fixNavbar);

    function fixNavbar() {

        var elHeight = navbarMenu.clientHeight;
       if(listenTo.clientWidth > 990){
           if (elHeight > listenTo.documentheight){

               if(scrollDown && navbarMenu.getBoundingClientRect().bottom <  listenTo.documentheight) {


                   navbarMenu.classList.remove("relative");
                   navbarMenu.classList.add("fixed");
                   navbarMenu.style = "";
                   navbarMenu.style.bottom = "0px";

                   fixedBottom = true;
                   fixedTop = false;
                   window.removeEventListener("scroll",fixNavbar);
                   window.addEventListener("scroll",unfixNavBar)

               }else if ( srollUp && navbarMenu.getBoundingClientRect().top > 70){


                   navbarMenu.classList.remove("relative");
                   navbarMenu.classList.add("fixed");
                   navbarMenu.style = "";
                   navbarMenu.style.top = "0px";
                   fixedBottom = false;
                   fixedTop = true;
                   window.removeEventListener("scroll",fixNavbar)
                   window.addEventListener("scroll",unfixNavBar)

               }


           }else  {
               if(scrollDown ){
                   console.log("equal!!");
                   navbarMenu.classList.add("fixed");
                   navbarMenu.style.top = "0px"

                   window.removeEventListener("scroll",fixNavbar)
                   window.addEventListener("scroll",unfixNavBar)
               }else if ( srollUp && navbarMenu.getBoundingClientRect().top > 70){


                   navbarMenu.classList.remove("relative");
                   navbarMenu.classList.add("fixed");
                   navbarMenu.style = "";
                   navbarMenu.style.top = "0px";

                   window.removeEventListener("scroll",fixNavbar)
                   window.addEventListener("scroll",unfixNavBar)

               }
           }

       }
    }

    // else if ( srollUp && navbarMenu.getBoundingClientRect().top > 70){
    //
    //
    //     navbarMenu.classList.remove("relative");
    //     navbarMenu.classList.add("fixed");
    //     navbarMenu.style = "";
    //     navbarMenu.style.top = "0px";
    //     fixedBottom = false;
    //     fixedTop = true;
    //     window.removeEventListener("scroll",fixNavbar)
    //     window.addEventListener("scroll",unfixNavBar)
    //
    // }



    function unfixNavBar () {

        var top = (+window.pageYOffset + +navbarMenu.getBoundingClientRect().top);


            console.log(listenTo.getResult())



            if (srollUp && fixedBottom ){


                navbarMenu.classList.remove("fixed");
                navbarMenu.classList.add("relative");
                navbarMenu.style = "";
                navbarMenu.style.top = top+"px";
                fixedBottom = false;
                fixedTop = false;
                console.log(top);

                window.addEventListener("scroll",fixNavbar);
                window.removeEventListener("scroll",unfixNavBar);

            }else if (scrollDown && fixedTop || listenTo.getResult()) {

                navbarMenu.classList.remove("fixed");
                navbarMenu.classList.add("relative");
                navbarMenu.style = "";
                navbarMenu.style.top = (top-150)+"px";
                fixedBottom = false;
                fixedTop = false;
                window.addEventListener("scroll",fixNavbar);
                window.removeEventListener("scroll",unfixNavBar)

            }
                // else if (listenTo.result()) {
            //     navbarMenu.classList.remove("fixed");
            //     navbarMenu.classList.add("relative");
            //     navbarMenu.style = "";
            //     navbarMenu.style.top =  (top-150)+"px";
            //     fixedBottom = false;
            //     fixedTop = false;
            //     console.log(top);
            //
            //     window.addEventListener("scroll",fixNavbar);
            //     window.removeEventListener("scroll",unfixNavBar);
            // }

    }
//========================================================

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

