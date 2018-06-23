Template.search.rendered = function() {
	$("#search-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#reviews-link").removeClass('selected');
	$("#login-link").removeClass('selected');
}

Template.search.helpers({

	nonAdmin: function() {
			var adminId = Meteor.users.findOne({username: 'Admin'})._id;
			var userId = Meteor.userId();
			if (userId !== adminId) {
			return true;
			}
		},

	reviews: function() {
		//get reviews from method: returnSearch
		//then sort by date
		var reviews = Reviews.find({"searched":1}, {sort: {createdAt: -1}});
		return reviews;
	},

	searched: function() {
		return Session.equals('searchReviewId', this._id);
	},
	/*inputAttributes: function() {
		return { 'class': 'easy-search-input', 'placeholder': 'Start Searching' };
	},
	players: function() {
		return Reviews.find({}, { sort: { createdAt: -1 } });
	},
	selectedName: function() {
		var review = ReviewsIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedJoke") });
		return review && review.reviewName;
	},
	index: function () {
		return ReviewsIndex;
	},
	resultsCount: function() {
		return ReviewsIndex.getComponentDict().get('count');
	},
	showMore: function() {
		return false;
	},
	renderTmpl: () => Template.renderTemplate
*/
});

Template.search.events({

	"click #apply-filters": function() {
		Session.set('searchReviewId',this._id);
		//Meteor.call("editReview", this._id);
		},//ends function

		"click #search-more": function() {
			Meteor.call('endSearch');
			Session.set('searchReviewId',null);

			//Meteor.call("editReview", this._id);
			},//ends function

	"submit .search-form": function() {
		//reviewName,semester,recommendation,diff,workload,steepness,reviewPost
		var reviewName = event.target.reviewName.value;
		var semester = event.target.semester.value;
		var recommendation = event.target.recommendation.value;
		var diff = event.target.diff.value;
		var workload = event.target.workload.value;
		var steepness = event.target.steepness.value;
		/*var thisReview = Reviews.find(
			{"reviewName": reviewName,
			"semester": semester,
			"recommendation": recommendation,
			"diff": diff,
			"workload": workload,
			"steepness": steepness})._id;*/
		//add new column and labels!

		Meteor.call('returnSearch', reviewName);
		event.target.reviewName.value = "";
		event.target.semester.value = "";

		Bert.alert("Your filters have been applied!", "success", "growl-top-right");

		return false; // prevent submit
	}
});

//returning a session that is selected
//checks if it is selected or empty
Template.User.helpers({
	selected: function() {
		return Session.equals("selectedReview", this.__originalId) ? "selected" : '';
	},
});

Template.User.events({
	'click': function() {
		Session.set("selectedReview", this.__originalId);
	}
});
