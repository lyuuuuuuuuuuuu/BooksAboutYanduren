var $ = require('jquery');

// Bind all dropdown
function init() {
    $(".chapter>a").click(function(){
        if($.contains($(this).parent(".chapter"), $("ul.articles"))){//包含二级菜单
            console.log("包含");
            var status = $(this).parent(".chapter").children("ul.articles").css("display");
            if(status == "block"){
                $(".chapter ul.articles").css("display", "none");
            }else{
                $(".chapter ul.articles").css("display", "none");
                $(this).parent(".chapter").children("ul.articles").css('display', "block");
            }
        }
    });


}

module.exports = {
    init: init
};

