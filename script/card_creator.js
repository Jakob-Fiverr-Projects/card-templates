var current_lang = "english"
const queryString = window.location.search.split("?")[1];
const category = queryString.split("&")[0].split("=")[1].replace(/%20/g, " ");
const name = queryString.split("&")[1].split("=")[1].replace(/%20/g, " ");
const back_img = document.getElementById("back_img");
const name_inp = document.getElementById("nameinp");

const canvas = document.getElementById("form_canvas");
const context = canvas.getContext("2d");
back_img.src= "data/categories/"+category+"/"+name
back_img.onload = update_canvas

function covert_cord(x, can) {
   return (can.width  * x)/ back_img.naturalWidth
}


function update_canvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    update_can(canvas, context)
}

function update_can(can, ctx) {
    ctx.drawImage(back_img, 0, 0, can.width, can.height);
    ctx.textAlign ="center"
    ctx.fillStyle = categories[category][name]["color"]
    ctx.textBaseline = 'middle';   
    ctx.font = can.width/14 + "px adobe-arabic";
    //ctx.font = "50px sans";
    
    ctx.fillText(name_inp.value,covert_cord(categories[category][name]["name"]["x"], can), covert_cord(categories[category][name]["name"]["y"], can));
}

function dlCanvas() {
    var cnv2 = document.createElement("canvas");
    cnv2.width =  back_img.naturalWidth;
    cnv2.height = back_img.naturalHeight;
    update_can(cnv2, cnv2.getContext("2d"))
    var dt = cnv2.toDataURL('image/png');
    dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
	
    dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename='+name.split(".")[0]+'.png');
	this.download = name.split(".")[0]+'.png';
    this.href = dt;
    cnv2.remove();
  };
document.getElementById("dl").addEventListener('click', dlCanvas, false);
update_canvas();