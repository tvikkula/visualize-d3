db.summary_flights_cancellations_bymonth.find().forEach(
    function(row) {
        row.Total = db.summary_flights_total_bymonth.findOne({'MonthOfYear': row.MonthOfYear}).Total;
        db.summary_flights_cancellations_bymonth.update(
            {_id: row._id},
            row
        );
    }
);

db.summary_flights_cancellations_bymonth.find().forEach(
    function(row) {
        row.CancelledPercentage = row.Cancelled / row.Total
	row.CancelledPercentage = row.CancelledPercentage.toFixed(5);
        db.summary_flights_cancellations_bymonth.update(
            {_id: row._id},
            row
        );
    }
);

db.summary_flights_cancellations_bymonth.find().forEach(
    function(row) {
	if (row.CancellationType === 'A') {
	    row.CancellationType = 'Carrier';
	} else if (row.CancellationType === 'B') {
            row.CancellationType = 'Weather';
        } else if (row.CancellationType === 'C') {
            row.CancellationType = 'NAS';
        } else if (row.CancellationType === 'D') {
            row.CancellationType = 'Security';
        }
	db.summary_flights_cancellations_bymonth.update(
	    {_id: row._id},
            row
	);
    }
);

db.summary_flights_cancellations_bymonth.find().forEach(
    function(row) {
        if (row.MonthOfYear === 1) {
            row.MonthOfYear = 'Jan';
        } else if (row.MonthOfYear === 2) {
            row.MonthOfYear = 'Feb';
        } else if (row.MonthOfYear === 3) {
            row.MonthOfYear = 'Mar';
        } else if (row.MonthOfYear === 4) {
            row.MonthOfYear = 'Apr';
        } else if (row.MonthOfYear === 5) {
            row.MonthOfYear = 'May';
        } else if (row.MonthOfYear === 6) {
            row.MonthOfYear = 'Jun';
        } else if (row.MonthOfYear === 7) {
            row.MonthOfYear = 'Jul';
        } else if (row.MonthOfYear === 8) {
            row.MonthOfYear = 'Aug';
        } else if (row.MonthOfYear === 9) {
            row.MonthOfYear = 'Sep';
        } else if (row.MonthOfYear === 10) {
            row.MonthOfYear = 'Oct';
        } else if (row.MonthOfYear === 11) {
            row.MonthOfYear = 'Nov';
        } else if (row.MonthOfYear === 12) {
            row.MonthOfYear = 'Dec';
        }
        db.summary_flights_cancellations_bymonth.update(
            {_id: row._id},
            row
        );
    }
);

db.summary_flights_cancellations_bymonth.remove({ '$or': [{CancellationType: ''}, {CancellationType: 'Security'} ] })
