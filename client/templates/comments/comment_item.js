function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
Template.commentItem.onRendered(function () {

$('.accordion')
  .accordion()
;

});

Template.commentItem.helpers({
  submittedText: function() {

  	tnow= new Date();
  	tsub= this.submitted;

  	var timeinsec= (tnow-tsub)/1000;
  	var timeampm= formatAMPM(this.submitted);
  	var day = parseInt((tnow-tsub)/(24*3600*1000));
  	var minutes = Math.floor(timeinsec / 60);
  	var seconds = timeinsec - minutes * 60;

		if (timeinsec<60){
			return "Just now";
		}
		else if (day>1){
    	return day+" days ago";
		}
		else if (day == 1){
    	return "Yesterday at "+timeampm;
		}
		else if(day == 0 && minutes !== 0) {
			return "Today at "+timeampm;
		}
  },
  commentReply: function() {
    
  }
});