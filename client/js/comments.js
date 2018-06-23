Template.comments.rendered = function() {
	$("#reviews-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#rankings-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
}

Template.comments.helpers({
	nonAdmin: function() {
			var adminId = Meteor.users.findOne({username: 'Admin'})._id;
			var userId = Meteor.userId();
			if (userId !== adminId) {
			return true;
			}
		},

    comms: function() {
      var comms = Comments.find({}, {sort: {createdAt: -1}});
      return comms;
    },
});
