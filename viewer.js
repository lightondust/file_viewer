base_url_query = 'http://192.168.11.73:8812/file/';
base_url_file = 'http://192.168.11.73/sec/'

function getParentURL(url) {
    return url.slice(0, url.lastIndexOf('/'));
}

getURL = function (dir) {
    return base_url_query + dir;
}

// ディレクトリ内のファイルを表示する
getDirContents = function () {
    url = getURL(app.currentDir);
    $.getJSON(url).done(function (data) {
        app.files = data.files;
        app.filesView = app.files.slice(0, 10);
        app.imgs = data.imgs;
        app.imgsView = data.imgs.slice(0, 10);
        app.dirs = data.dirs;
    });
}

var app = new Vue({
    el: '#app',
    data: {
        base_url_file: base_url_file,
        message: 'Hello Vue!',
        files: [],
        filesView: [],
        imgs: [],
        imgsView: [],
        imgidx: 0,
        dirs: [],
        currentDir: '.'
    },
    methods: {
        getContents: getDirContents,
        updateDir: function (event) {
            app.currentDir += '/' + event.target.id;
            getDirContents();
        },
        parentDir: function () {
            app.currentDir = getParentURL(app.currentDir);
            getDirContents();
        },
        rootDir: function () {
            app.currentDir = '.';
            getDirContents();
        },
        pre: function () {
            app.imgidx -= 10
            app.imgsView = app.imgs.slice(app.imgidx, app.imgidx + 10);
        },
        next: function () {
            app.imgidx += 10
            app.imgsView = app.imgs.slice(app.imgidx, app.imgidx + 10);
        }
    }
});

getDirContents();


// 矢印キーの左右でページ移動する
function ChangePage() {
    // 前のページ（矢印キーの左：←）
    if (event.keyCode == 37) {
        app.pre();
    }
    // 次のページ（矢印キーの右：→）
    if (event.keyCode == 39) {
        app.next();
    }
}

window.document.onkeydown = ChangePage;