function notify(msg,delay) {
	$.bootstrapGrowl(
	    '<span style="color:black">'+msg+'</span>', { 
	    position:'fixed', 
	    type: 'danger', 
	    align: 'center', 
	    delay: 10 * 1000,
	    width:'auto', 
	    offset: { from: 'top', amount: 3 } 
	})
}