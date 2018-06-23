Template.rankings.rendered = function() {
	$("#rankings-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#reviews-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
}
//how to sort by highest votes?
Template.rankings.helpers({
	reviews: function() {
		//sort by latest date on top
		var reviews = Reviews.find({"vetted":1}, {sort: {'likeScore': -1}});
		return reviews;
	},

	comms: function() {
		//sort by latest date on top
		var comms = Comments.find({}, {sort: {createdAt: -1}});
		return comms;
	},

});

Template.rankings.events({
	"click #like": function() {
		var thisUser = Meteor.userId();
		var thisReview = Reviews.findOne({_id: this._id})._id;
		var reviewAuthor = Reviews.findOne({_id: this._id}).userId;
		var Name = Meteor.user().username;
		var thisReviewsVotes = Reviews.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		//detect doublevoting
		if (thisReviewsVotes.indexOf(Name) > -1) {
			Bert.alert("You cannot vote twice", "danger", "growl-top-right");
			// In the array!, meaning user has voted
		} else {
			// Not in the Array, Do stuff.
			Meteor.call("countVote", thisReview, Name);
			Meteor.call("userPointLike", reviewAuthor);
			Meteor.call("likeVote", thisUser, thisReview);
			Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

		}

		if (Name == thisReviewsVotes) {
			Bert.alert("You cannot vote for your own joke", "danger", "growl-top-right");
		}
	},
//comment

	"click #dislike": function() {
		var thisUser = Meteor.userId();
		var thisReview = Reviews.findOne({_id: this._id})._id;
		var reviewAuthor = Reviews.findOne({_id: this._id}).userId;
		var Name = Meteor.user().username;
		var thisReviewsVotes = Reviews.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		if (thisReviewsVotes.indexOf(Name) > -1) {
			Bert.alert("You cannot vote twice", "danger", "growl-top-right");
			// In the array!, meaning user has voted
		} else {
			// Not in the Array, Do stuff.
			Meteor.call("countVote", thisReview, Name);
			Meteor.call("userPointDislike", reviewAuthor);
			Meteor.call("dislikeVote", thisUser, thisReview);
			Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

		}

		if (Name == thisReviewsVotes) {
			Bert.alert("You cannot vote for your own review", "danger", "growl-top-right");
		}
	},

	/*"click #post-comment": function() {
		//id linked to specific joke
		Meteor.call("addComments", commentPost);
		Bert.alert("Your Comment Was Added", "success", "growl-top-right");
	},
	*/

});

/*
"click #comment": function() {
	var thisUser = Meteor.userId();
	var thisReview = Reviews.findOne({_id: this._id})._id;
	var reviewAuthor = Reviews.findOne({_id: this._id}).userId;
	var Name = Meteor.user().username;
	var thisReviewsVotes = Reviews.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

	if (thisReviewsVotes.indexOf(Name) > -1) {
		Bert.alert("You cannot vote twice", "danger", "growl-top-right");
		// In the array!, meaning user has voted
	} else {
		// Not in the Array, Do stuff.
		Meteor.call("countVote", thisReview, Name);
		Meteor.call("userPointDislike", reviewAuthor);
		Meteor.call("dislikeVote", thisUser, thisReview);
		Bert.alert("Your Vote Was Placed", "success", "growl-top-right");

	}

	if (Name == thisReviewsVotes) {
		Bert.alert("You cannot vote for your own review", "danger", "growl-top-right");
	}
},

});

*/
