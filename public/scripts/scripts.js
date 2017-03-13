



//========================================================
//  switch colors
//========================================================
;(function () {

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
