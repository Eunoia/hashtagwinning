function loadCheckInData(){
	var badges = JSON.parse(localStorage['badgesEarned'])
	badges = ['go-fly-a-kite.png','volconologist.png'];
	for(var i = 0; i<badges.length ; i++){
		$("#badgeList").append($("<li><img src='"+badges[i]+"' /></li>"))
	}
}
function checkIn(data){
	data++;
}

function saveCheckInData(badges){
	localStorage['badgesEarned'] = JSON.stringify(badges)
}