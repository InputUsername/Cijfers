$(function() {

	var calculateGrade = function() {
		var wantedGrade = parseFloat( $("#gradeWanted").val() );

		if (!wantedGrade) return;
		if (wantedGrade < 1 || wantedGrade > 10) return;

		var newGradeWeight = parseFloat( $("#gradeWeight").val() );

		if (!newGradeWeight) return;
		if (newGradeWeight < 0) return;

		var totalGrade = 0;
		var totalWeight = 0;

		$("#gradesGot div").each(function() {
			var grade = parseFloat( $(this).find(".gradeGotValue").val() );

			if (!grade) return;
			if (grade < 1 || grade > 10) return;

			var weight = parseFloat( $(this).find(".gradeGotWeight").val() );

			if (!weight) return;
			if (weight < 0) return;

			totalGrade += grade * weight;
			totalWeight += weight;
		});

		var neededGrade = ((wantedGrade * (totalWeight + newGradeWeight)) - totalGrade) / newGradeWeight;

		return Math.floor(neededGrade * 10) / 10;
	};

	var updateGrade = function() {
		var grade = calculateGrade();
		if (grade) $("#gradeNeeded").val(grade);
	};

	$("#gradeAdd").click(function() {
		$gradeDiv = $("<div></div>").addClass("gradeGot");

		$gradeValue = $("<input>")
			.addClass("gradeGotValue number")
			.attr({
				"type": "number",
				"value": "",
				"min": "1",
				"max": "10",
				"step": "0.1",
				"placeholder": "Cijfer"
			})
		;
		$gradeWeight = $("<input>")
			.addClass("gradeGotWeight number")
			.attr({
				"type": "number",
				"value": "",
				"min": "0",
				"step": "0.1",
				"placeholder": "Gewicht"
			})
		;
		$removeGrade = $("<input>")
			.addClass("gradeGotRemove")
			.attr({
				"type": "button",
				"value": "x"
			})
			.click(function() {
				$(this).parent().remove();
			})
		;

		$gradeDiv.append($gradeValue).append($gradeWeight).append($removeGrade);

		$("#gradesGot").append($gradeDiv);
	});

	$("#gradeCalculate").click(updateGrade);

});
