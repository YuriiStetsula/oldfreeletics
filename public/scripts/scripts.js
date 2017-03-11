(function () {


    // console.log(document.documentElement.clientWidth)

    var navbarMenu = document.getElementById("fixedNav");



    window.addEventListener("scroll",fixNavbar)
    window.addEventListener("resize", function(){
        if(document.documentElement.clientWidth < 990){
            navbarMenu.classList.remove("fixed")
        }
    });


    function fixNavbar() {

        if(window.pageYOffset > 500 && document.documentElement.clientWidth > 990 ) {

            navbarMenu.classList.add("fixed")
            window.removeEventListener("scroll",fixNavbar)
            window.addEventListener("scroll",unfixNavBar)
        }

    }





    function unfixNavBar () {

        if(window.pageYOffset  < 500) {
            // console.log(navbarMenu.getBoundingClientRect().top)
            navbarMenu.classList.remove("fixed")
            window.addEventListener("scroll",fixNavbar)
        }

    }

//========================================================


   var li =  document.querySelectorAll(".list-group-item");

    window.addEventListener("load",function(){
        if(window.location.hash){


            check()


            li.forEach(function(element){

                if(element.parentNode.getAttribute("href") === window.location.hash){
                    element.classList.add("active")
                }
            })
        }
    })

    function check(){

        li.forEach(function(element){
            if(element.classList.contains("active") ){
                element.classList.remove("active")
            }
        })}


     li.forEach(function(element){

         element.addEventListener("click",function(e){

             console.log(this)
             check();
             if(!this.classList.contains("active") ){
                 this.classList.add("active")
             }

         })
     })





}())

