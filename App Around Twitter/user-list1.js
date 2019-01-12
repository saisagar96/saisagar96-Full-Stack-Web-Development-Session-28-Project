var Twitter = require('twitter');
 
module.exports = function(res, screen_name) {
    var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
    });

    var params = {screen_name: 'mvjagan72'};

    var one_way_following = [];
    var users_to_display = [];
    var followers_results = [];
    client.get('followers/ids', params, function(error, users, response) {
    if (error) 

    var followers = followers_results.ids;

        client.get('friends/lists', params, function(error, following_results, response) {
        if (error) 

        var following = following_results.ids;

            following.forEach(function(person) {
            // If someone you follow does'nt follow you
            if(followers.indexOf(person) === -1) {
                one_way_following.push(person);
            }
            });

            // Only take the first hundred users
            one_way_following = one_way_following.slice(0, 99);

            // Turn array into a String
            var one_way_following_string = one_way_following.join();

            client.get('users/lookup', {user_id: one_way_following}, function(error, users_results, response) {
                users_results.forEach(function(user) {
                    var user = "";
                    var userObject = {
                    name:user.name,
                    screen_name: user.screen_name,
                    avatar:user.profile_image_url
                    };
                    users_to_display.push(userObject);
                });
                res.render('list', { users: users_to_display});
            });

        });  
    });
}