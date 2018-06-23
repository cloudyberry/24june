if (Meteor.isServer) {
	//tell meteor that this is run on server
	Meteor.methods({
		// Method for adding jokes
		//add more parameters if i have more entries
		addUnapproved: function(hideName, reviewName, semester, recommendation, diff, workload, steepness, reviewPost) {
			//cannot add if you are not logged in
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				var username = Meteor.user().username;
				var school = Meteor.user().profile.school;
				var yr = Meteor.user().profile.year;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				//bec jan is 0
				var day = new Date().getDate();
				//create own kind of string
				var date = (month + "/" + day + "/" + year).toString();
				//insert into collection
				if (hideName === "Yes") {
					username = "";
				}
				Reviews.insert({
					//add more if i have more entries
					reviewName: reviewName,
					reviewPost: reviewPost,
					year: yr,
					school: school,
					semester: semester,
					diff: diff,
					recommendation: recommendation,
					workload: workload,
					steepness: steepness,
					author: username,
					date: date,
					createdAt: new Date(),
					vetted:0,
					vetted: 0,
					likeScore: 0,
					commentScore: 0,
					dislikeScore: 0,
					voted: [username],
					userId: Meteor.userId(),
				}); //end of Reviews.insert

			} //end of else
		}, //end of addUnapproved

		addComments: function(commentPost) {
			//cannot add if you are not logged in
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				var school = Meteor.user().profile.school;
				var yr = Meteor.user().profile.year;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				//bec jan is 0
				var day = new Date().getDate();
				//create own kind of string
				var date = (month + "/" + day + "/" + year).toString();
				//insert into collection
				Comments.insert({
					//add more if i have more entries
					commentPost: commentPost,
					year: yr,
					school: school,
					semester: semester,
					date: date,
					createdAt: new Date(),
					userId: Meteor.userId(),
				}); //end of Reviews.insert

			} //end of else
		}, //end of addComments

		removeReview: function(reviewsId) {
			//if user of joke is not logged in, they can't
			//delete the joke
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Reviews.remove(reviewsId);
			}
		},

		addReviews: function(thisReview) {

				Reviews.update(thisReview,
					{ $set:
						{vetted:1}
					}
				);//ends update
		},//ends function
//reviewName, semester, recommendation, diff, workload, steepness, reviewPost
		editReview: function(thisReview, editName, editSem, editRecommendation, editDiff, editWorkload, editSteepness, editPost) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Reviews.update(thisReview,
					{ $set:
						{reviewName: editName,
						semester: editSem,
						recommendation: editRecommendation,
						diff: editDiff,
						workload: editWorkload,
						steepness: editSteepness,
						reviewPost: editPost,
					  vetted: 0}
					}
				);//ends update
			}//ends else
		},//ends function,
		returnSearch: function(reviewName) {
			Reviews.update(
				{"reviewName": reviewName},
				{ $set: {"searched":1}
				}
			 );//ends update
		},

		endSearch: function() {
			Reviews.update(
				{"searched":1},
				{ $set: {"searched":0}
				}
			);//ends update
		},

		countVote: function(thisReview, Name) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Reviews.update(thisReview, { $addToSet: { voted: Name}});
			}
		},

		userPointLike: function(reviewAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(reviewAuthor, { $inc: {'profile.likeScore': +1}});
			}
		},

		likeVote: function(thisUser, thisReview) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Reviews.update(thisReview, {$inc: {likeScore: +1}});
			}
		}, //end of likeVote

	//comments

		userPointDislike: function(reviewAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(reviewAuthor, { $inc: {'profile.dislikeScore': +1}});
			}
		}, //end of userPointDislike

		dislikeVote: function(thisUser, thisReview) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Reviews.update(thisReview, {$inc: {dislikeScore: +1}});
			}
		}, //end of dislike Vote

	});

}
