function doOnCurrentPageChanged(survey) {
    document
        .getElementById('surveyPrev')
        .style
        .display = !survey.isFirstPage
            ? "inline"
            : "none";
    document
        .getElementById('surveyNext')
        .style
        .display = !survey.isLastPage
            ? "inline"
            : "none";
    document
        .getElementById('surveyComplete')
        .style
        .display = survey.isLastPage
            ? "inline"
            : "none";
    document
        .getElementById('surveyProgress')
        .innerText = "Page " + (
    survey.currentPageNo + 1) + " of " + survey.visiblePageCount + ".";
    if (document.getElementById('surveyPageNo')) 
        document
            .getElementById('surveyPageNo')
            .value = survey.currentPageNo;
    }

// var defaultThemeColors = Survey
//     .StylesManager
//     .ThemeColors["bootstrap"];
// // defaultThemeColors["$text-color"] = "#000";
// // defaultThemeColors["$header-color"] = "#1ab394";


// Survey
//     .StylesManager
//     .applyTheme();

Survey
    .StylesManager
    .applyTheme("bootstrap");


var json = {
	title: "Little things to know you better",
	pages: [{
			title: "",
			questions: [
       	
				{
					name: "height",
					type: "text",
					title: "Height:",
					placeHolder: "5'5''",
					isRequired: true
				},
				{
					name: "age",
					type: "text",
					title: "Age:",
					placeHolder: "27",
					isRequired: false
				},
				{
					name: "city",
					type: "text",
					title: "City:",
					placeHolder: "Bangalore",
					isRequired: false
				}
			]
		},
		{
			title: "",
			questions: [{
					name: "work",
					type: "radiogroup",
					title: "Which from the below resonates with your nature of work",
					isRequired: true,
                    hasNone: true,
                    colCount: 2,
                    choices: [
                        "Desk job",
                        "Desk job with considerable amount of running around",
                        "Field job",
                        "Client facing"
                    ]
				},
				{
					name: "designation",
					type: "matrixdropdown",
                  	choices: [
                        "Most often", "Occasionally", "Rarely", "Never"
                    ],
                  
            		columns: [
                    	{
                          name: "rate",
                          title: "Please choose"
                      }
                    ],
					title: "Choose what resonates most with your typical work day attire",
					isRequired: false,
                    rows: [
                        {
                            value: "boardroom",
                            text: "BOARDROOM"
                        }, {
                            value: "bizzcasual",
                            text: "BUSINESS CASUAL"
                        }, {
                            value: "casual",
                            text: "CASUAL"
                        }, {
                            value: "fusion",
                            text: "FUSION"
                        }
                    ]
				},
				{
					name: "city",
					type: "radiogroup",
					title: "Marital Status (Optional)",
					isRequired: false,
					choices: [
						"Married",
						"Single",
						"Do not want to specify"
					]
				}
			]
		},
		{
			title: "Images",
			questions: [
              		{
						type: "radiogroup",
						name: "bodytype",
						title: "What category would your body type fall among below?",
						html: "<table><body><row><td><img src='https://res.cloudinary.com/mintash/image/upload/v1543314006/uploads/body-types.png' width='500px' /></td></row></body></table>",
						isRequired: false,
						colCount: 2,
						choices: [
							"Straight",
							"Pear",
							"Hourglass",
							"Heart",
                            "Oval"
						]
					},
					{
							type: "checkbox",
							name: "brand",
							title: "Which brand(s) from the below list are you likely to shop from for clothes/accessories you wear to office?",
							isRequired: true,
							colCount: 2,
							choices: [
								"Zara",
								"West side",
								"AND",
								"VanHeusen",
								"Allen Solly",
								"AND",
								"Marks & Spencer",
								"H&M",
								"Forever 21",
								"W"
							]
						},
						{
							type: "radiogroup",
							name: "brandsize",
							title: "What size fits best to you when you shop from the above mentioned brand?",
							isRequired: false,
							colCount: 2,
							choices: [
								"XXS",
								"S",
								"M",
								"L",
								"XL"
							]
						},
              			{
							type: "radiogroup",
							name: "attr",
							title: "What is the most important attribute you have in mind when choosing attire for work?",
							isRequired: true,
							colCount: 2,
							choices: [
								"Fit",
								"Functionality",
								"Aesthetics",
								"Comfort",
								"Other"
							]
						}
			]
		}
	]
};


window.survey = new Survey.Model(json);
survey.showProgressBar = "top";

survey
    .onComplete
    .add(function (result) {
//         document
//             .querySelector('#surveyResult')
//             .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
  			displayRegister(JSON.stringify(result.data, null, 3))
    });

jQuery(window).load(function(){
            data = {};

        });

// $(document).ready(function() {
  
//       $('a[href="#survey"]').click(function(event) {
//         event.preventDefault();
//         $(this).modal({
//           escapeClose: true,
//           clickClose: true,
//           showClose: true
//         });
        
//         $("#surveyElement").Survey({model: survey});
        
//     });
  
// });

$(document).ready(function() {
    $('a[href="#register_pop"]').click(function(event) {
      $(this).modal();
    });
  
 
});


$(document).ready(function() { 
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
  console.log('next clicked');
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar-survey li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar-survey li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});
});


