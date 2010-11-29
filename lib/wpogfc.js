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
	     var friendId, friendName, sharedFriends, sharedLikes; 
	     friendId = $(this).attr("data-id");  
	     friendName = $(this).attr("data-name");  
	     sh.wal.wpogfc.clearFriend();
	     sh.wal.wpogfc.status("Getting shared likes...");
	     $("#likesHeader").html("Shared Likes: " + friendName);

	     FB.api(
	       '/' + friendId + '/likes', 
	       function(response) {
		 sh.wal.wpogfc.status("");
		 for (var d in response.data) {
		   for (var l in sh.wal.wpogfc.likes) {
		     if(response.data[d].id == sh.wal.wpogfc.likes[l].id) {
		       $("#selectedFriendLikesContainer").append("<li>" + response.data[d].name + "</li>");
		     }

		   }   
		 }


	       });

	   }
	 );
     },

     status: function(msg) {
       $("#status").html(msg);
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
       sh.wal.wpogfc.status("Initializing application...");
       // This assumes the FB init has completed
       // FB.getSession()
       // access_token: "110614265673667|2._y03Gc0Ux8iHKbzTNI6BJA__.3600.1291014000-1178471455|jT2rbJeQ_UPzkPJJ1hW_C8ydYj0"
       // expires: 1291014000
       // secret: "9a9QI_mKr3CVxmFI2enYQQ__"
       // session_key: "2._y03Gc0Ux8iHKbzTNI6BJA__.3600.1291014000-1178471455"
       // sig: "163abc39f1e918fd555cf8d00ba61c0c"
       // uid: "1178471455"

       sh.wal.wpogfc.session = session;

       // Procedurally populate for initial rendering view of friends
       $.getJSON(
	 "https://graph.facebook.com/me/friends?access_token=" 
	   + sh.wal.wpogfc.session.access_token
	   + "&callback=?",
	 function(data) {
	   sh.wal.wpogfc.friends = data.data;
	   // TODO: No DOM update in each loop
	   for (var p in sh.wal.wpogfc.friends) {
	     // id: "10720515"
	     // name: "Joya Iverson"
	     $("#friendsContainer").append(
	       "<li"
		 + " data-id='"
		 + sh.wal.wpogfc.friends[p].id 
		 + "' data-name='"
		 + sh.wal.wpogfc.friends[p].name 
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

       sh.wal.wpogfc.status("");
     }     

   };

 }(jQuery));