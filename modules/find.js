exports.findEvent = function(obj, target){
		var finded = {};
		var i = 1;
		if(obj[target] != undefined){
			finded[i] = obj[target];
			i++;
		}else{
			for(var name in obj){
				for(var key in obj[name]){
					if(obj[name][key] == target){
						finded[i] = obj[name];
						i++;
					}
				}	
			}
		}
	return finded;
	console.log('its work!');
}