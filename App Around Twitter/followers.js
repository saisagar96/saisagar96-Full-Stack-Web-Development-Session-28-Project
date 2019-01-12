var Twitter = require('twitter');

module.exports = function(res, screen_name) {
    // console.log(screen_name);

    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
        });

        var params = {screen_name: screen_name};
        var followers_to_display = [];

     client.get('followers/ids', params, function(error,  followers_results, response) {
        if(error){
            // throw error;
         }
         //console.log(params);
         var followersList = followers_results.ids;
         var followersListString = followersList.join();

         //followersListString = followersListString.slice(0, 99);

         console.log(followersListString);
        client.get('users/lookup', {user_id:followersListString}, function(error, user_results, response) {
            if(error) {
                // throw error;
            }
            console.log(user_results);
            user_results.forEach(function(followers_List) {
                var userObject ={
                    name:followers_List.name,
                    screen_name:followers_List.screen_name,
                    avatar:followers_List.profile_image_url,
                    description:followers_List.description
                };
                followers_to_display.push(userObject);
                

            });
             res.render('twitter-profilecard', {users: followers_to_display});
            //console.log(followers_to_display);
        });
    });    
}