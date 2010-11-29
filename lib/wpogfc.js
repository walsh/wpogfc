var sh = sh || { wal: { wpogfc: {} } };

(function($) {

  // Get the session information for making additional requests
  sh.wal.wpogfc = {

    bindFriends: function() {
      // Rebind the handlers for the unordered list of friend names.
      // Assumption: li@data-id for the bind

      $('#friendsContainer li')
         .bind(
          'click',
          function() {
            var friendId, friendName, sharedFriends, sharedLikes;
            friendId = $(this).attr('data-id');
            friendName = $(this).attr('data-name');
            sh.wal.wpogfc.clearFriend();
            sh.wal.wpogfc.status('Getting shared values...');

            $('#likesHeader').html('Shared Likes: ' + friendName);
            FB.api(
                '/' + friendId + '/likes',
                function(response) {
                  sh.wal.wpogfc.status('');
                  for (var d in response.data) {
                    for (var l in sh.wal.wpogfc.likes) {
                      if (response.data[d].id === sh.wal.wpogfc.likes[l].id) {
                        $('#selectedFriendLikesContainer')
                         .append(
                           '<li>' +
                             response.data[d].name +
                             '</li>');
                      }

                    }
                  }

                }
            );

            $('#friendsHeader').html('Shared Friends: ' + friendName);
            $.getJSON(
                'https://api.facebook.com' +
                 '/method/friends.getMutualFriends?target_uid=' +
                 friendId +
                 '&access_token=' +
                 sh.wal.wpogfc.session.access_token +
                 '&format=json&callback=?',
                function(data) {
                  for (var i in data) {
                    for (var p in sh.wal.wpogfc.friends) {
                      if (data[i] == sh.wal.wpogfc.friends[p].id) {
                        $('#selectedFriendFriendsContainer')
                         .append(
                         '<li>' +
                             sh.wal.wpogfc.friends[p].name +
                             '</li>');
                      }
                    }
                  }
                }
            );


          }
          );
    },

    status: function(msg) {
      $('#status').html(msg);
    },

    clearFriend: function() {
      // Clear the selected friend information
      //
      $('#likesHeader').html('Shared Likes');
      $('#friendsHeader').html('Shared Friends');
      $('#selectedFriendLikesContainer').html('');
      $('#selectedFriendFriendsContainer').html('');
    },

    getSharedFriends: function(mine, theirs) {
      // mine: Array
      // mine: Array
      return [];
    },

    getSharedLikes: function(mine, theirs) {
      // mine: Array
      // mine: Array
      return [];
    },

    getUserInfo: function() {
      $.getJSON(
          'https://graph.facebook.com/me/friends?access_token=' +
          sh.wal.wpogfc.session.access_token +
          '&callback=?',
          function(data) {
            sh.wal.wpogfc.friends = data.data;
            // TODO: No DOM update in each loop
            for (var p in sh.wal.wpogfc.friends) {
              // id: "10720515"
              // name: "Joya Iverson"
              $('#friendsContainer').append(
                  '<li' +
                  " data-id='" +
                  sh.wal.wpogfc.friends[p].id +
                  "' data-name='" +
                  sh.wal.wpogfc.friends[p].name +
                  "'><a href='#" +
                  sh.wal.wpogfc.friends[p].id +
                  "'>" +
                  sh.wal.wpogfc.friends[p].name +
                  '</a>' +
                  '</li>'
              );
            }
            sh.wal.wpogfc.bindFriends();
          }
      );

      // Procedurally populate for initial rendering view of likes
      $.getJSON(
          'https://graph.facebook.com/me/likes?access_token=' +
          sh.wal.wpogfc.session.access_token +
          '&callback=?',
          function(data) {
            sh.wal.wpogfc.likes = data.data;
          }
      );
    },

    init: function(session) {
      sh.wal.wpogfc.status('Initializing application...');

      // This assumes the FB init has completed with
      // FB.getSession() providing the session token:
      FB.getLoginStatus(
          function(response) {
            if (response.session) {
              sh.wal.wpogfc.status('Initializing application...');
              sh.wal.wpogfc.session = session;

              // Procedurally populate for initial rendering
              sh.wal.wpogfc.getUserInfo();
              sh.wal.wpogfc.status('');

            } else {
              sh.wal.wpogfc.status(
                  'Please log in with your Facebook account...');
              return;
            }
          });

      // Wait for the
      FB.Event.subscribe(
          'auth.sessionChange',
          function(response) {

            // Reset the application when logging out
            FB.getLoginStatus(
                function(response) {
                  if (response.session) {
                    sh.wal.wpogfc.status('Initializing application...');
                    sh.wal.wpogfc.session = response.session;

                    // Procedurally populate friends list
                    sh.wal.wpogfc.getUserInfo();
                    sh.wal.wpogfc.status('');

                  } else {
                    sh.wal.wpogfc.status(
                        'Please log in with your Facebook account...');
                    $('#friendsContainer').html('');
                    sh.wal.wpogfc.clearFriend();
                    return;
                  }
                });

          });

    }

  };

   sh.wal.wpogfc.init(FB.getSession());


}(jQuery));
