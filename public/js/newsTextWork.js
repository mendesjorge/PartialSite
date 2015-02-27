    			$(document).ready(function(){
    			var pTags = $("p.newsText");

    			for(var i = 0; i < pTags.length; ++i){
    				pTags[i].innerHTML = pTags[i].innerHTML.replace(/(?:\r\n|\r|\n)/g, "<br>");
    			}
    		});