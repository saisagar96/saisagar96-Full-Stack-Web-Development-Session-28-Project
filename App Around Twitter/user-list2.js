var Twitter = require('twitter');
//console.log('starting');

 var client = require('.');

        var params = {screen_name: 'nodejs'};
        var one_way_followers = [];
        var one_way_following = [];
        var users_to_display = [];

            client.get('followers/ids', params, function(error, followers_results, response){
            if (error)
                throw error;

            var followers = followers_results.ids;

            client.get('friends/ids', params, function(error, following_results, response) {
            if (error)
                throw error;

                var following = following_results.ids;

            // client.get('oauth/authenticate', params, function(error, authenticate_results, response) {
            // if (error)
            //     throw error;
                
                // var authenticate = authenticate_results.ids;
                
                following.forEach(function(person) {
                if(followers.indexOf(person) === -1) {
                    one_way_following.push(person);
                } 
                });

                one_way_following = one_way_following.slice(0, 99);

                var one_way_following_string = one_way_following.join();
                console.log(one_way_following_string);
                client.get('users/lookup', {user_id: one_way_following_string}, function(error, user_results, response) {
                    user_results.forEach(function(user) {
                        var userObject = {
                            name: user.name,
                            screen_name: user.screen_name,
                            avatar: user.profile_image_url
                        };

                        users_to_display.push(userObject);
                    });
                    // console.log(users_to_display);
                    res.render('list', {users: users_to_display});
                });
            });
        });
    // });