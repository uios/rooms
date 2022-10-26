window.mvc ? null : (window.mvc = {});

window.mvc.m ? null : (window.mvc.m = model = {
    error: {
        image: e=>{
            console.log('model.error.image', e);
            e.remove();
        }
    }
});

window.mvc.v ? null : (window.mvc.v = view = function(route) {
    console.log(108, {
        route
    });

    return new Promise(async function(resolve, reject) {
        var page = route.page;
        var path = route.path;
        var gut = route.hash ? rout.ed.dir(route.hash.split('#')[1]) : [];
        var get = (route ? route.GOT : rout.ed.dir(dom.body.dataset.path)).concat(gut);
        var root = get[0] || gut[0];

        window.GET = window.GET ? GET : rout.ed.dir(dom.body.dataset.path);

        if (root) {

            if (root === "room") {
                if (get.length > 1) {
                    var vp = dom.body.find('page[data-page="/room/*/"]');
                    connection.videosContainer = vp.find('room > section');

                    var roomid = get[1];
                    (function reCheckRoomPresence() {
                        connection.checkPresence(roomid, function(isRoomExist) {
                            if (isRoomExist) {
                                connection.join(roomid);
                                return;
                            }

                            setTimeout(reCheckRoomPresence, 5000);
                        });
                    }
                    )();

                    connection.openOrJoin(get[1], function(isRoomExist, roomid, error) {
                        if (error) {
                            alert(error);
                        } else if (connection.isInitiator === true) {
                            // if room doesn't exist, it means that current user will create the room
                            showRoomURL(roomid);
                        }
                    });
                }
                resolve(route);
            } else {
                resolve(route);
            }

        } else {

            const a = (d)=>{
                const data = JSON.parse(d);
                if (data.length > 0) {
                    var x = 0;
                    const vp = dom.body.find('page[data-page="/"]');
                    const card = vp.find('template').content.firstElementChild.cloneNode(true);
                    const feed = vp.find('feed');
                    feed.innerHTML = "";
                    do {
                        const room = data[x];
                        card.dataset.href = "/room/" + room.replace(' ', '').toLowerCase();
                        card.find('text').textContent = room;
                        feed.insertAdjacentHTML('beforeend', card.outerHTML);
                        x++;
                    } while (x < data.length);
                }
                resolve(route);
            }
            ajax('/cdn/json/rooms.json').then(a);

        }
    }
    );
}
);

window.mvc.c ? null : (window.mvc.c = controller = {

    menu: {

        close: ()=>{

            const nav = dom.body.find('body > nav');
            nav.dataset["960pxTransform"] = "translateX(-100%)";
            nav.firstElementChild.classList.add('display-none');

        }
        ,

        open: ()=>{

            const nav = dom.body.find('body > nav');
            nav.dataset["960pxTransform"] = "0";
            nav.firstElementChild.classList.remove('display-none');

        }

    },

    nav: {

        close: ()=>{

            const nav = document.body.find('body > main > nav');
            const transform = nav.dataset["960pxTransform"];
            const blocks = dom.body.find('main > pages');

            nav.dataset["960pxTransform"] = "translateX(-100%)";
            blocks.dataset["960pxTransform"] = "0";

        }
        ,

        toggle: (target)=>{

            const nav = document.body.find('body > main > nav');
            const transform = nav.dataset["960pxTransform"];
            const blocks = dom.body.find('main > pages');

            if (transform === "translateX(-100%)") {
                nav.dataset["960pxTransform"] = "translateX(0)";
                blocks.dataset["960pxTransform"] = "translateX(280px)";
            } else {
                nav.dataset["960pxTransform"] = "translateX(-100%)";
                blocks.dataset["960pxTransform"] = "0";
            }

        }
        ,

    },

    sign: {

        in: (event,f)=>{
            event.preventDefault();
            auth.account.login(event).then(e=>(f ? f : '/').router()).catch(e=>{
                var code = e.code;
                var message = e.message;
                alert(message);
            }
            );
        }

    }

});
