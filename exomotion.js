
function px(value) {
    // add 'px' to number | 0 -> 0px
    return value + "px";
}

function pc(value) {
    // add '%' to number | 0 -> 0%
    return String(value + "%")
}

function random_range(min, max) {
    // Random Range Function
    let r, f, v;
    r = Math.random();
    f = r * (max - min) + min;
    // document.write("Float: " + f + "<br>") // Presentation!
    v = parseInt(f);
    // document.write("Int: " + v + "<br>") // Presentation!
    return v;
}

let rnd = function (end = 100, start = 0) {
    // Random Range Function (ShortHand)
    return random_range(start, end);
}

function random_color_rgba(r, g, b, a = 1) {
    // Random rgba() color
    let rgb, o;
    rgb = {red: r, green: g, blue: b};
    if (r === undefined) {
        r = rnd(255);
    }
    if (g === undefined) {
        g = rnd(255);
    }
    if (b === undefined) {
        b = rnd(255);
    }
    o = String("rgba(" + r + "," + g + "," + b + "," + a + ")");
    return o;
}

let rcrgb = function (red, green, blue) {
    // Random rgba() color (ShortHand)
    return random_color_rgba(red, green, blue);
}

let rcrgba = function (red, green, blue,alpha) {
    // Random rgba() color (ShortHand)
    return random_color_rgba(red, green, blue,alpha);
}

function stroke_style(id, stroke, stroke_width) {
    // add stroke, stroke-width into element by id
    let st = document.getElementById(id);
    st.style.stroke = stroke;
    st.style.strokeWidth = stroke_width;
}

function svg_mk(id, width, height, bg_color) {
    // make svg
    let svg;
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", id);
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("style", "background-color:" + bg_color);
    return svg;
}

function cir_mk(id, fill, r, x, y) {
    // make circle(svg)
    let cir;
    cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    cir.setAttribute("id", id);
    cir.setAttribute("fill", fill);
    cir.setAttribute("r", r);
    cir.setAttribute("cx", x);
    cir.setAttribute("cy", y);
    return cir;
}

function append_ch(parent_id, child) {
    // append by id (ShortHand)
    document.getElementById(parent_id).appendChild(child);
}

function size_checker(id) {
    // get element width and height in client monitor
    let w, h;
    w = document.getElementById(id).clientWidth;
    h = document.getElementById(id).clientHeight;
    return {width: w, height: h};
}

function r_max(width, height) {
    // find max Radius by size
    let r;
    if (width > height) {
        r = height / 2;
    } else {
        r = width / 2;
    }
    return r;
}

function cuber(r, x, y, width, height) {
    let x_min, x_max, y_min, y_max;
    x_min = x - r;
    x_max = x + r;
    y_min = y - r;
    y_max = y + r;
    if (x_min > 0 && x_max < width) {
        if (y_min > 0 && y_max < height) {
            return true;
        }
    }
    return false;
}

function builder_circle_pro(parent_id, svg_id, svg_bg, cir_id, fill, stroke, stroke_width, counter) {
    // circle factory
    let parent, svg, max_r, cr, cx, cy, f, fc, sc, log, flag = 0;

    // id log
    log = [];

    // fill & stroke duplicate (auto)
    fc = String(fill);
    sc = String(stroke);

    // check the base size, get width and height.
    parent = size_checker(parent_id);

    // make and build svg.
    svg = svg_mk(svg_id, parent.width, parent.height, svg_bg);
    append_ch(parent_id, svg);

    // make circle
    max_r = r_max(parent.width, parent.height);
    while (flag < counter) {
        cr = rnd(max_r);
        cx = rnd(parent.width);
        cy = rnd(parent.height);
        if (fc.toLowerCase() === "auto") {
            fill = rcr();
        }
        if (sc.toLowerCase() === "auto") {
            stroke = rcr();
        }
        f = cuber(cr, cx, cy, parent.width, parent.height);
        if (f) {
            // id rise
            append_ch(svg_id, cir_mk(cir_id + flag, fill, cr, cx, cy));
            stroke_style(cir_id + flag, stroke, stroke_width);
            log.push(cir_id + flag)
            flag++;

        }
    }
    return log;
}