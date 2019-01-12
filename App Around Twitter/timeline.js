var Twitter = require('twitter');

module.exports = function(res, screen_name) {
    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
        });

        var params = {screen_name: screen_name};
        var timeline_to_display = [];

    client.get('statuses/user_timeline', params, function(error,  tweets, response) {
        if(!error) {


            tweets.forEach(function(item){

                var userObject = { 
                     name:item.user.name,
                     screen_name:item.user.screen_name,
                     followers:item.user.followers_count,
                     tweet_text:item.text,
                     friends:item.user.friends_count,
                     likes:item.user.favourites_count,
                     tweets_count:item.user.statuses_count,
                     avatar:item.user.profile_image_url

                 };
               console.log(tweets);
            timeline_to_display.push(userObject);
            })
            console.log(timeline_to_display[0].friends);
        }
            res.render('homepage', {users: timeline_to_display, tweets_count:timeline_to_display[0].tweets_count,screen_name:timeline_to_display[0].screen_name, friends_count:timeline_to_display[0].friends, favourites_count:timeline_to_display[0].likes, followers_count:timeline_to_display[0].followers, avatar:timeline_to_display[0].avatar});
    });    
}