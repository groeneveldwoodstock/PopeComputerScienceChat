"use strict";

//elements
var conversation = $('.conversation');
var lastSentMessages = $('.messages--sent:last-child');
var lastReceivedMessages = $('.messages--received:last-child');
var textbar = $('.text-bar__field input');
var textForm = $('#form-message');
var thumber = $('.text-bar__thumb');
var computer = "";

var scrollTop = $(window).scrollTop();

var lastreply = "";
var rockPaperScissors = ["rock", "paper", "scissors"];
var jokes = ["I went to buy some camo pants but couldn’t find any.", "I failed math so many times at school, I can’t even count.","I failed math so many times at school, I can’t even count.","I can’t believe I got fired from the calendar factory. All I did was take a day off!","Don’t spell part backward. It’s a trap.","Most people are shocked when they find out how bad I am as an electrician.","R.I.P boiled water. You will be mist.","I used to think I was indecisive, but now I’m not too sure.","I don’t have an attitude problem. You have a perception problem.","I hope there’s no pop quiz on the class trip to the Coca-Cola factory.","I ate a clock yesterday, and it was very time-consuming.", "What do a tick and the Eiffel Tower have in common? They're both Paris sites.", "If April showers bring May flowers, what do May flowers bring? Pilgrims.", "I thought the dryer was shrinking my clothes. Turns out it was the refrigerator all along.", "Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.", "Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one!", "My wife said I should do lunges to stay in shape. That would be a big step forward." , "I'm afraid for the calendar. Its days are numbered.", "What's the best thing about Switzerland? I don't know, but the flag is a big plus.", "What did the ocean say to the beach?  Nothing, it just waved.", "I asked my dog what's two minus two. He said nothing."];
         //add some more jokes
var trivia = ["The hashtag symbol is technically called an octothorpe.","The 100 folds in a chef's hat represent 100 ways to cook an egg.","The longest wedding veil was longer than 63 football fields.","Some cats are allergic to people.","The unicorn is the national animal of Scotland.","The largest known living organism is an aspen grove.","M&M stands for Mars and Murrie.","You can hear a blue whale's heartbeat from more than 2 miles away.", "The word 'muscle' comes from a Latin term meaning 'little mouse.'", "Tic Tac mints are named after the sound their container makes.", "Dr. Seuss wrote Green Eggs and Ham as part of a bet.", "Peanuts can be used to make dynamite.", "The largest volcano in the solar system is three times taller than Mount Everest.", "An 11-year-old is responsible for naming Pluto.", "Armadillos swallow air to become buoyant when they swim.", "On Mars, sunsets are blue.", "Benjamin Franklin was inducted into the International Swimming Hall of Fame.", "Only two national flags have the color purple on them.", "A former NASA scientist invented the Super Soaker."];
//         // add some more trivia
var  day = ["Horrible, I have to deal with you.","Great, now that we had this talk.","Somewhere between better and best.","I am as happy as a tick on a big, fat dog.", "Do you really care?","It was fine until you asked.","Well actually, things are kinda tough at the moment"];
var  classes = ["Pope High School offers 4 computer science courses.\nTo find out more about one enter INTRO, APCSP, APCSA, or PGAS."];
//         // add some more responses
var good = ["That is great to hear!", "I am so happy for you!","You are a lucky human.", "Fantastic! Tell me more!", "Are you kidding?"];
var indifferent = ["I guess that is not too bad.", "Could be worse!", "Keep your chin up!", "Tomorrow is another day."];
var randomAnswers = ["Try asking something else!", "I don't know how to respond to that. Mr. Groeneveld made me to respond to certain words", "Want to ask me about Pope?", "Remember I know a lot of trivia. Mention trivia and I will give you some.", "You can ask me about my day.", "I can tell you a joke if you would like. Just mention joke." , "I don't know how to respond to that, sorry. I can tell you a joke to cheer you up though.", "I don't know about that but I know about Pope Computer Science courses!", "I can play rock paper scissors, just say rock, paper, or scissors. I am programmed to play fair!", "Say random and I will give you a random number."];
var helpAnswers = ["I can play rock paper scissors. Just say rock, paper, or scissors. I am programmed to play fair!", "I can tell you a joke if you would like. Just mention joke.", "Remember I know a lot of trivia. Mention trivia and I will give you some.", "Want to ask me about Pope Computer Science?", "Say random and I will give you a random number."]
var bad = ["Oh well, maybe tomorrow will be better.", "Sorry to hear that.","Not every day can be perfect."];
var negative = ["That was a bit negative. ", "Let's be more positive. "]
var positive = ["I like your positivity! ", "Great to hear it! "]
function get_random (list) {
  return list[Math.floor(Math.random()*(list.length))];
}
var Message = {
	currentText: "test",
	init: function(){
		var base = this;
		base.send();
	},
	send: function(){
		var base = this;
		textForm.submit(function( event ) {
		  	event.preventDefault();
			//base.createGroup();
			base.saveText();
			if(base.currentText != ''){
				base.createMessage();
				base.createReply();
				base.scrollDown();
			}
		});
	},
	saveText: function(){
		var base = this;
		base.currentText = textbar.val();
		textbar.val('');
	},
	createMessage: function(){
		var base = this;
		lastreply = base.currentText.toLowerCase();
		conversation.append($('<div class="messages messages--sent"></div>')
								.append($("<div></div>").addClass('message')
								.text(base.currentText)));
	},
	createReply: function(){
		var reply = getBotResponse('messages messages--sent') 
		conversation.append($('<div class="messages messages--received"></div>')
								.append($("<div></div>").addClass('message')
								.text(getBotResponse(lastreply))));
		//lastReceivedMessages = $('.messages--received:last-child');
	},
	createGroup: function(){
		if($('.messages:last-child').hasClass('messages--received')){
			conversation.append($('<div><div></div></div>')
							.addClass('messages messages--sent'));

			lastSentMessages = $('.messages--sent:last-child');
			//lastReceivedMessages = $('.messages--received:last-child');
		}
	},
	scrollDown: function(){
		var base = this;
		//conversation.scrollTop(conversation[0].scrollHeight);
		conversation.stop().animate({
			scrollTop: conversation[0].scrollHeight
		}, 500);
	}
};

var Thumb = {
	init: function(){
		var base = this;
		base.send();
	},
	send: function(){
		var base = this;
		thumber.on("mousedown", function(){
			Message.createGroup();
			base.create();
			base.expand();
		});
	},
	expand: function(){
		var base = this;
		var thisThumb = lastSentMessages.find('.message:last-child');
		var size = 20;
		
		var expandInterval = setInterval(function(){ expandTimer() }, 30);
		
		function stopExpand(){
			base.stopWiggle();
			clearInterval(expandInterval);
		}
		
		var firstExpand = false;
		function expandTimer() {
			
			if(size >= 130){
				stopExpand();
				base.remove();
			}
			else{
				if(size>50){
					size += 2;
					thisThumb.removeClass('anim-wiggle');
					thisThumb.addClass('anim-wiggle-2');
				}
				else{
					size += 1;
					thisThumb.addClass()
				}
				thisThumb.width(size);
				thisThumb.height(size);
				if(firstExpand){
					conversation.scrollTop(conversation[0].scrollHeight);
				}
				else{
					Message.scrollDown();
					firstExpand = true;
				}
			}
		}
		
		thumber.on("mouseup", function(){
			stopExpand();
		});
	},
	create: function(){
		lastSentMessages.append(
			$('<div></div>').addClass('message message--thumb thumb anim-wiggle')
		);
	},
	remove: function(){
		lastSentMessages.find('.message:last-child').animate({
			width: 0,
			height: 0
		}, 300);
		setTimeout(function(){
			lastSentMessages.find('.message:last-child').remove();
		}, 300);
	},
	stopWiggle: function(){
		lastSentMessages.find('.message').removeClass('anim-wiggle');
		lastSentMessages.find('.message').removeClass('anim-wiggle-2');
	}
	
}
function getBotResponse(input) {
    //rock paper scissors
    if (input == "rock") {
        computer = get_random(rockPaperScissors)
        if (computer=="rock"){
            return "I had rock too! We tied!"
        }
        else if (computer=="paper"){
            return "I had paper! I win!"
        }
        else {
            return "I had scissors! You win!"
        }
    } else if (input == "paper") {
        computer = get_random(rockPaperScissors)
        if (computer=="paper"){
            return "I had paper too! We tied!"
        }
        else if (computer=="scissors"){
            return "I had scissors! I win!"
        }
        else {
            return "I had rock! You win!"
        }
    } else if (input == "scissors") {
        computer = get_random(rockPaperScissors)
        if (computer=="scissors"){
            return "I had scissors too! We tied!"
        }
        else if (computer=="rock"){
            return "I had rock! I win!"
        }
        else {
            return "I had paper! You win!"
        }
    }

    // Simple responses
    if (input == "hello") 
    {
        return "Hello there!";
    } 
    else if (input == "goodbye") 
    {
        return "Talk to you later!";
    } 
    else if (input.includes("trivia")) 
    {
		    return "Here is some trivia! " + get_random(trivia); 
	  } 
    else if (input.includes("joke")) 
    {
		    return "Here is a joke! " + get_random(jokes); 
	  } 
    else if (input.includes("day"))
    {
        return get_random(day)+ "\nHow about you?"; 
    } 
    else if(input.includes("good")||input.includes("great")|| input.includes("awesome"))
    {
        return get_random(good); 
    } 
    else if(input.includes("bad") || input.includes("terrible"))
    {
        return get_random(bad); 
    } 
    else if(input.includes("classes") || input.includes("class") || input.includes("pope")|| input.includes("Pope"))
    {
        return get_random(classes);
    } else if(input.includes("fine") || input.includes("ok"))
    {
        return get_random(indifferent); 
    } 
    else if(input.includes("favorite") )
    {
        return "I can not answer subjective inputs."; 
    } 
    else if ((input.includes("who") || input.includes("Who") ) || input.includes("you") )
    {
        return "I Anton, a program created by Mr. Groeneveld. I can respond to certain input."; 
    } 
    else if (input.includes("INTRO") || input.includes("intro"))
    {
        return "Intro to Software Technology is for everyone! You learn about computers and code in HTML and JavaScript."; 
    }
    else if (input.includes("apcsp") || input.includes("APCSP"))
    {
        return "AP Computer Science Principles is for motivated and mature students. You learn about computers and code in Python. This is is an AP portfolio project and an AP Test. No coding experience is required but it is an advantage. APCSP Students should be independent learners and analytic thinkers."; 
    }
    else if (input.includes("apcsa") || input.includes("APCSA"))
    {
        return "AP Computer Science A is for students who have previously coded. You learn to code in JAVA, previous coding experience can be in another language. There is an AP Test. Students should be good independent learners and analytic thinkers."; 
    }
    else if (input.includes("PGAS") || input.includes("pgas") || input.includes("programming"))
    {
        return  "Programming, games, apps, and society is for students who have previously coded. You code in many languages to create apps and games. This is an independent study course. Students must keep up with a course calendar and submit work on time."; 
    }
    else if (input.includes("help"))
    {
        return get_random(helpAnswers);
    }
    else if (input.includes("random"))
    {
        return "Here is a random number: " + Math.floor(Math.random()*(100))
    }
    else if (input.includes(" no") || input.includes(" no ") || input.includes("no ") || input == "no")
    {
        return get_random(negative) + get_random(helpAnswers)
    }
    else if (input.includes(" yes") || input.includes(" yes ") || input.includes("yes ") || input =="yes")
    {
        return get_random(positive) + get_random(helpAnswers)
    }
    else 
    {
        return get_random(randomAnswers);
    }
}

var newMessage = Object.create(Message);
newMessage.init();

var newThumb = Object.create(Thumb);
newThumb.init();