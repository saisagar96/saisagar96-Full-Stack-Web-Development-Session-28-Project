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
        var friends_to_display = [];

     client.get('friends/ids', params, function(error,  friends_results, response) {
        if(error){
            // throw error;
         }
         //console.log(params);
         var friendsList = friends_results.ids;
         var friendsListString = friendsList.join();

         //friendsListString = friendsListString.slice(0, 99);

         console.log(friendsListString);
        client.get('users/lookup', {user_id:friendsListString}, function(error, user_results, response) {
            if(error) {
                // throw error;
            }
            console.log(user_results);
            user_results.forEach(function(friends_List) {
                var userObject ={
                    name:friends_List.name,
                    screen_name:friends_List.screen_name,
                    avatar:friends_List.profile_image_url,
                    description:friends_List.description
                };
                friends_to_display.push(userObject);
                

            });
             res.render('twitter-profilecard', {users: friends_to_display});
            //console.log(friends_to_display);
        });
    });    
}