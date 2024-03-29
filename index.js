window.api = {
    endpoint: "https://api.uios.computer"
};

window.auth ? null : window.auth = {};
auth.config = {
    apiKey: "AIzaSyBxGXe52WtXo_B5iKBo9BQZSfAwYFhLRO8",
    authDomain: "uios-83649.firebaseapp.com",
    projectId: "uios-83649",
    messagingSenderId: "47824486713",
    appId: "1:47824486713:web:51f3a124b42b1080"
};

window.cdn = {
    endpoint: "https://cdn.uios.computer/file/write-uios"
};

window.onload = ()=>{
    window.dom = {
        body: document.body,
        boot: document.getElementById("boot"),
        nav: document.body.find('nav')
    };

    window.global = window.globals;

    dom.body.dataset.load = "ing";

    init();
}

window.onpopstate = (event)=>{
    if (event.state) {
        var state = is.local(window.location.protocol) ? event.state.replace(/^#+/, '') : event.state;
        state.router({
            pop: true
        });
    } else {
        if (document.location) {//console.log({place});
        }
    }
    //console.log(event, "location: " + document.location + ", state: " + JSON.stringify(state));
}

function init() {
    console.log("Initializing...");

    window.rout.ing = function(href, GOT, n, m=GOT[n], root=GOT[0]) {
        return m.includes("#") || (root === 'room' && n === 1);
    }

    touch.events = {
        dbltap: on.touch.dbltap,
        drag: on.touch.drag,
        press: on.touch.press,
        tap: on.touch.tap
    };
    touch.ing = false;

    dom.body.dataset.theme = "meridiem";
    dom.body.addEventListener("click", function(e) {
        if (window.touch.ing === false) {
            on.touch.tap(e);
            //console.log(e.type,window.touch.ing);
        } else {
            window.touch.ing = false;
            //console.log(e.type,window.touch.ing);
        }
    });
    dom.body.addEventListener("touchstart", function(e) {
        window.touch.ing = true;
        touch.handler(event);
        //console.log(e.type);
    }, {
        passive: true
    });
    dom.body.addEventListener("touchmove", touch.handler, {
        passive: true
    });
    dom.body.addEventListener("touchcancel", touch.handler, false);
    dom.body.addEventListener("touchend", function(e) {
        //window.touch.ing = false;
        touch.handler(event);
        //console.log(e.type);
    });

    const authChange = function(e) {
        const load = function(e) {
            dom.body.dataset.load = "ed";
        };
        dom.body.dataset.load = "ed";
    };

    var url = window.location.pathname;
    if (window.globals.domains.subdomain === "uios") {
        var dir = rout.ed.dir(window.location.pathname);
        dir.splice(0, 1)
        var url = rout.ed.url(dir);
    }

    var uri = ((dom.boot.dataset.path ? dom.boot.dataset.path : url) + (window.location.search + window.location.hash));

    var go = false;
    if (window.firebase) {
        firebase.initializeApp(auth.config);
        const onAuthStateChanged = function(user) {
            auth.change(user).then(authChange);
            if (user) {//byId("avi").innerHTML = "<img onerror='model.error.image(this)' src='" + (cdn.endpoint + "/" + user.uid + "/avi.jpg") + "'>";
            } else {//byId("avi").innerHTML = "";
            }
        }
        firebase.auth().onAuthStateChanged(onAuthStateChanged);
        go ? null : uri.router().then(go = true);
    } else {
        uri.router().then(authChange);
    }

    console.log("Initialized");

    //CONNECTION
    window.connection = new RTCMultiConnection();

    // by default, socket.io server is assumed to be deployed on your own URL
    connection.socketURL = '/';

    // comment-out below line if you do not have your own socket.io server
    connection.socketURL = 'https://muazkhan.com:9001/';

    connection.socketMessageEvent = 'video-conference-demo';

    connection.session = {
        audio: true,
        video: true
    };

    connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
    };

    // STAR_FIX_VIDEO_AUTO_PAUSE_ISSUES
    // via: https://github.com/muaz-khan/RTCMultiConnection/issues/778#issuecomment-524853468
    var bitrates = 512;
    var resolutions = 'Ultra-HD';
    var videoConstraints = {};

    if (resolutions == 'HD') {
        videoConstraints = {
            width: {
                ideal: 1280
            },
            height: {
                ideal: 720
            },
            frameRate: 30
        };
    }

    if (resolutions == 'Ultra-HD') {
        videoConstraints = {
            width: {
                ideal: 1920
            },
            height: {
                ideal: 1080
            },
            frameRate: 30
        };
    }

    connection.mediaConstraints = {
        video: videoConstraints,
        audio: true
    };

    var CodecsHandler = connection.CodecsHandler;

    connection.processSdp = function(sdp) {
        var codecs = 'vp8';

        if (codecs.length) {
            sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());
        }

        if (resolutions == 'HD') {
            sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
                audio: 128,
                video: bitrates,
                screen: bitrates
            });

            sdp = CodecsHandler.setVideoBitrates(sdp, {
                min: bitrates * 8 * 1024,
                max: bitrates * 8 * 1024,
            });
        }

        if (resolutions == 'Ultra-HD') {
            sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
                audio: 128,
                video: bitrates,
                screen: bitrates
            });

            sdp = CodecsHandler.setVideoBitrates(sdp, {
                min: bitrates * 8 * 1024,
                max: bitrates * 8 * 1024,
            });
        }

        return sdp;
    }
    ;
    // END_FIX_VIDEO_AUTO_PAUSE_ISSUES

    // https://www.rtcmulticonnection.org/docs/iceServers/
    // use your own TURN-server here!
    connection.iceServers = [{
        'urls': ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302', 'stun:stun.l.google.com:19302?transport=udp', ]
    }];

    connection.onstream = function(event) {
        var existing = document.getElementById(event.streamid);
        if (existing && existing.parentNode) {
            existing.parentNode.removeChild(existing);
        }

        event.mediaElement.removeAttribute('src');
        event.mediaElement.removeAttribute('srcObject');
        event.mediaElement.muted = true;
        event.mediaElement.volume = 0;

        var video = document.createElement('video');

        try {
            video.setAttributeNode(document.createAttribute('autoplay'));
            video.setAttributeNode(document.createAttribute('playsinline'));
        } catch (e) {
            video.setAttribute('autoplay', true);
            video.setAttribute('playsinline', true);
        }

        if (event.type === 'local') {
            video.volume = 0;
            try {
                video.setAttributeNode(document.createAttribute('muted'));
            } catch (e) {
                video.setAttribute('muted', true);
            }
        }
        video.className = "height-100pct position-absolute width-100pct";
        if (!video.srcObject) {
            console.log({
                event
            });
            video.srcObject = event.stream;
            //video.src = "http://scienceandfilm.org/uploads/videos/files/Enigma_Trailer.mp4"
            
            var mediaElement = getHTMLMediaElement(video, {
                title: event.userid,
                showOnMouseEnter: false
            });
            //mediaElement = document.createElement("camera");
            //mediaElement.innerHTML = video.outerHTML;

            connection.videosContainer.appendChild(mediaElement);
            connection.videosContainer.dataset.cams = connection.videosContainer.children.length;

            const cam = connection.videosContainer.lastElementChild.firstElementChild;
            cam.onloadedmetadata = e=>cam.play();
        }

        mediaElement.id = event.streamid;
    }
    ;

    connection.onstreamended = function(event) {
        var mediaElement = document.getElementById(event.streamid);
        if (mediaElement) {
            mediaElement.parentNode.removeChild(mediaElement);
            connection.videosContainer.dataset.cams = connection.videosContainer.children.length;
        }
    }
    ;

    connection.onMediaError = function(e) {
        if (e.message === 'Concurrent mic process limit.') {
            if (DetectRTC.audioInputDevices.length <= 1) {
                alert('Please select external microphone. Check github issue number 483.');
                return;
            }

            var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
            connection.mediaConstraints.audio = {
                deviceId: secondaryMic
            };

            connection.join(connection.sessionid);
        }
    }
    ;

}
