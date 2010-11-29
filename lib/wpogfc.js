console.log("sh.wal.wpogfc");
var sh = sh || { wal: { wpogfc: {} } }; 

(function($) {

   // Get the session information for making additional requests 
   sh.wal.wpogfc = {

     bindFriends: function() {
       // Rebind the handlers for the unordered list of friend names.
       // Assumption: li@data-id for the bind

       $("#friendsContainer li")
	 .bind(
	   "click",
	   function() {
	     var friendId, sharedFriends, sharedLikes; 
	     friendId = $(this).attr("data-id");  
	     sh.wal.wpogfc.clearFriend();

	     // $.getJSON(
	     //   "https://api.facebook.com/method/friends.getMutualFriends?target_uid=" + friendId + "&access_token=" 
	     //   //	       "https://api.facebook.com/method/friends.get?uid=" + friendId + "&access_token=" 
	     // 	 + sh.wal.wpogfc.session.access_token
	     // 	 + "&callback=?",
	     //   function(data) {
	     // 	 console.log(data);
	     // 	 // Manually code the display of friends
	     // 	 sharedFriends = sh.wal.wpogfc.getSharedFriends(friendId);
	     // 	 console.log(sharedFriends);
	     //   });

	     // FB.api(
	     //   '/' + friendId + '/friends', 
	     //   function(response) {
	     // 	 alert("FB.api friends call");
	     // 	 console.log(response);
	     //   });

	     FB.api(
	       '/' + friendId + '/likes', 
	       function(response) {
		 console.log(response);
		 console.log(sh.wal.wpogfc.likes);
		 for (var d in response.data) {
		   for (var l in sh.wal.wpogfc.likes) {
		     if(response.data[d].id == sh.wal.wpogfc.likes[l].id) {
		       console.info(response.data[d]);
		       $("#selectedFriendLikesContainer").append("<li>" + response.data[d].id + "</li>");
		     }

		   }   
		 }


	       });



	     // console.log(
	     //   "https://graph.facebook.com/" + friendId + "/likes?access_token=" 
	     // 	 + sh.wal.wpogfc.session.access_token
	     // );

	     // $.getJSON(
	     //   "https://graph.facebook.com/" + friendId + "/likes?access_token=" 
	     // 	 + sh.wal.wpogfc.session.access_token
	     // 	 + "&callback=?",
	     //   function(data) {
	     // 	 console.log(data);
	     // 	 // Manually code the display of friends
	     // 	 sharedLikes = sh.wal.wpogfc.getSharedLikes(friendId);
	     // 	 console.log(sharedLikes);
	     //   });



	     // Render the results 
	   }
	 );
     },

     clearFriend: function() {
       // Clear the selected friend information 
       // Assumption: selectedFriendLikesContainer selectedFriendFriendsContainer
       $("#selectedFriendLikesContainer").html("");
       $("#selectedFriendFriendsContainer").html("");
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

     init: function(session) {
       // This assumes the FB init has completed
       // FB.getSession()
       // access_token: "110614265673667|2._y03Gc0Ux8iHKbzTNI6BJA__.3600.1291014000-1178471455|jT2rbJeQ_UPzkPJJ1hW_C8ydYj0"
       // expires: 1291014000
       // secret: "9a9QI_mKr3CVxmFI2enYQQ__"
       // session_key: "2._y03Gc0Ux8iHKbzTNI6BJA__.3600.1291014000-1178471455"
       // sig: "163abc39f1e918fd555cf8d00ba61c0c"
       // uid: "1178471455"

       sh.wal.wpogfc.session = session;
       //       console.info(sh.wal.wpogfc.session);

       // Procedurally populate for initial rendering view of friends
       $.getJSON(
	 "https://graph.facebook.com/me/friends?access_token=" 
	   + sh.wal.wpogfc.session.access_token
	   + "&callback=?",
	 function(data) {
	   //       console.log(data);
	   sh.wal.wpogfc.friends = data.data;
	   // TODO: No DOM update in each loop
	   for (var p in sh.wal.wpogfc.friends) {
	     // id: "10720515"
	     // name: "Joya Iverson"
	     $("#friendsContainer").append(
	       "<li"
		 + " data-id='"
		 + sh.wal.wpogfc.friends[p].id 
		 + "'><a href='#" 
		 + sh.wal.wpogfc.friends[p].id 
		 + "'>"
		 + sh.wal.wpogfc.friends[p].name 
		 + "</a>"
		 + "</li>"
	     );
	   }
	   sh.wal.wpogfc.bindFriends();
	 }
       );

       // Procedurally populate for initial rendering view of likes
       $.getJSON(
	 "https://graph.facebook.com/me/likes?access_token=" 
	   + sh.wal.wpogfc.session.access_token
	   + "&callback=?",
	 function(data) {
	   sh.wal.wpogfc.likes = data.data;
	 }
       );

     }     

   };

 }(jQuery));