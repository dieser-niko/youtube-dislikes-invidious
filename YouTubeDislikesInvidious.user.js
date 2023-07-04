// ==UserScript==
// @name         Return YouTube Dislike for Invidious
// @namespace    dieser-niko/youtube-dislikes-invidious
// @version      0.1
// @description  Show dislikes for a video on iteroni.com invidious instance
// @author       dieser-niko
// @match        https://*/watch?v=*
// @connect      returnyoutubedislikeapi.com
// @icon         https://invidious.io/favicon-32x32.png
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

let dislike_api = "https://returnyoutubedislikeapi.com/votes?videoId=";
let video_data = JSON.parse(document.getElementById('video_data').innerHTML);

(function() {
    'use strict';

    function doRequest(videoId) {
        let response = GM_xmlhttpRequest({
            method: 'GET',
            url: dislike_api + videoId,
            responseType: 'json',
            timeout: 10000,
            onload: function(data) {
                let jsonData = {};
                jsonData = JSON.parse(data.responseText);
                const num = jsonData.dislikes
                let dislikes = document.createElement("p");
                let dislike_icon = document.createElement("i");
                dislike_icon.classList.add("icon", "ion-ios-thumbs-down");
                dislikes.appendChild(dislike_icon);
                dislikes.append(" " + num.toLocaleString());
                $like_count.after(dislikes);
            },
            anonymous: true
        });
    }
    let $like_count = document.getElementById("likes");
    doRequest(video_data.id);
})();
