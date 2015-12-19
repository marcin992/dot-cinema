var TimesheetView = function(id, date_start, date_end) {
	this.id = id;
	this.date_start = date_start;
	this.date_end = date_end;
	this.employerName = "";
	this.hours = convertToHours();

	this.date_start = date_start.replace("T", " ").split(".")[0];
	this.date_end = date_end != null 
		? date_end.replace("T", " ").split(".")[0]
		: null ;

	function convertToHours() {
		if ((date_end != null && date_end != undefined) ||
			 (this.date_end != null && this.date_end != undefined)) {
			var date1 = new Date(date_start);
			var date2 = new Date(date_end);

			return parseFloat((((date2 - date1) / 1000) / 60) / 60)
				.toFixed(2);
		}
		
		return "";
	};

	function setEmployerName(employer) {
		this.employerName = employer.name + " " + employer.surname;
	};

	function getEmployerName() {
		return this.employerName;
	};
}

function getTimesheetViews(timesheets) {
	var timesheetViews = [];

	for (var index in timesheets) {
		var timesheet = timesheets[index];
		timesheetViews.push(
			new TimesheetView(
				timesheet._id, 
				timesheet.date_start, 
				timesheet.date_end)
		);
	}

	return timesheetViews;
}

function getTimesheetView(timesheet) {
	return	new TimesheetView(
		timesheet._id, 
		timesheet.date_start, 
		timesheet.date_end);
}