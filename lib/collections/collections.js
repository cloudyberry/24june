Reviews = new Mongo.Collection('Reviews');
Modules = new Mongo.Collection('Modules');
Comments = new Mongo.Collection('Comments');
///////////////////

ReviewsIndex = new EasySearch.Index({
	engine: new EasySearch.MongoDB({
		sort: function() {
			return { createdAt: -1 };
		},
		selector: function(searchObject, options, aggregation) {
			let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
			categoryFilter = options.search.props.categoryFilter;

			if(_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
				selector.category = categoryFilter;
			}

			return selector;
		}
	}),
	//call back
	collection: Reviews,
	//sort by name of joke
	//can add more fields
	//need to add filtering kind of search
	fields: ['reviewName'],
	defaultSearchOptions: {
		//display 8 results
		limit: 8
	},
	permission: () => {
		return true;
	}
});
