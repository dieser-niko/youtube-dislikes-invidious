// ==UserScript==
// @name         Return YouTube Dislike for Invidious
// @namespace    dieser-niko/youtube-dislikes-invidious
// @version      0.1
// @description  Show dislikes for a video on iteroni.com invidious instance
// @author       dieser-niko
// @match        https://*/watch?v=*
// @connect      returnyoutubedislikeapi.com
// @icon         https://iteroni.com/favicon-32x32.png
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
                $dislike_count.innerHTML = '<p id="dislikes"><i class="icon ion-ios-thumbs-down"></i> ' + jsonData.dislikes + '</p>'
            },
            anonymous: true
        });
    }
    let $dislike_count = document.getElementById("dislikes");
    doRequest(video_data.id);
})();
