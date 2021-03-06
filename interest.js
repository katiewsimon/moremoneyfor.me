console.log("aloha");


// input loan information
// input total income amount
// output data visualization
// options?
// 

// input form
// form field: loan balance
// form field: interest rate
// form field: loan term (years)
// form field: income



// html form

// declare function that will run when hit submit
	// take in 4 values from form
	// make calculations using those values

// income = 100000.0;
// loanBalance = 10000.0;
// presentAge = 22;
// endAge = 65;
// loanTerm = 10;
// interestRate = .04;


// function submitForm() {
// 	var loanBalance = document.getElementById("loanBalance");
// 	var interestRate = document.getElementById("interestRate");
// 	var loanTerm = document.getElementById("loanTerm");
// 	var annualIncome = document.getElementById("income");

// 	var presentAge = document.getElementById("age");
// 
jQuery(document).ready(function(){
		console.log("test message");
	$("#submitButton").click(function(){
		var loanBalance = $("#loanBalance").val();
		var interestRate = $("#interestRate").val();
		var loanTerm = $("#loanTerm").val();
		var income = $("#income").val();
		var presentAge = $("#presentAge").val();
		var endAge = 65;
		
		// Write these variables out to the charts (make more functions if need more)
		var savingsPercent = getSavingsPercent(income, loanBalance);
		var totalSavings = getTotalSavings(presentAge, endAge, income, savingsPercent);
		var ageLoanFree = getAgeLoanFree(presentAge, income, loanBalance);

		var years = [];
		var savings = [];

		for (var i = 0; i <= 65 - presentAge; i++) {
			var endAgeForLoop = (presentAge*1 + i*1);
			years.push(endAgeForLoop);
			savings.push(1*getTotalSavings(presentAge*1, endAgeForLoop*1, income*1, savingsPercent*1));
		}

		console.log("SAVINGS");
		console.log(savings);

		var data = {
	    labels : years,
	    datasets : [
	    {
	      fillColor : "rgba(172,194,132,0.4)",
	      strokeColor : "#065C27",
	      pointColor : "#white",
	      pointStrokeColor : "#A4BD99",
	      data : savings
	    }
	    ]
	  	}
	  	var savings = document.getElementById('savings').getContext('2d');
	  	new Chart(savings).Line(data);

		console.log("savingsPercent" + savingsPercent);
	});
});

// Get savings contribution as percent of income.
function getSavingsPercent(income, loanBalance) {

	var minimumPayment = loanBalance/loanTerm;
	var minimumPaymentPercent = minimumPayment/income;
	var iraAsPercent = 5500.0/income;

	if (iraAsPercent >= .2) {
		return .2;
	}
	else if (iraAsPercent < .2 && iraAsPercent > 0) {
		return iraAsPercent;
	}
}

function getTotalSavings(presentAge, endAge, income, savingsPercent) {

	var prevYearSavings = income * savingsPercent;
	var totalSavings = income * savingsPercent;
	var newYearSavings = 0;

	console.log("prevYearSavings is " + prevYearSavings);

	for (var i = presentAge; i <= endAge; i++) {

		prevYearSavings = income * savingsPercent;
		var returnOnTotalSavings = totalSavings * .05;

		if (savingsPercent < .2) {
			savingsPercent = savingsPercent + .01;
			newYearSavings = prevYearSavings * savingsPercent;
		}
		else {
			savingsPercent = .2;
			newYearSavings = prevYearSavings * savingsPercent;
		}

		income = income + income * .02;
		
		console.log("totalSavings is " + totalSavings);
		console.log("newYearSavings is " + newYearSavings)

		totalSavings = totalSavings + returnOnTotalSavings + newYearSavings;
	}
	console.log("totalsavings in function");
	console.log(totalSavings);
	return totalSavings;
}

function getAgeLoanFree(presentAge, income, loanBalance) {
	var yearsToLoanFree = loanBalance/(income * 2);
	return presentAge + yearsToLoanFree;
}


