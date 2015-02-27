function setImagesStatus(){

	var elems = $("[status]");
	
	/*var growOpacity = function(ev){
		this.style.opacity = "100%";
	};

	var dimOpacity = function(ev){
			this.style.opacity = "70%";
		};*/

	for(var idx=0; idx<elems.length;++idx){
		
		var elem = elems[idx];
		console.log(elem);
		var inImg = $(elem).find("img")[0];
		
		var oflImg = document.createElement("img");
		oflImg.src = "../img/"+elem.getAttribute("status")+".png";
		oflImg.className= "status-"+elem.getAttribute("status");

		/*inImg.style.opacity = "70%";

		oflImg.onmouseover = dimOpacity;
		inImg.onmouseover = growOpacity;*/

		inImg.parentElement.appendChild(oflImg);
	}
}