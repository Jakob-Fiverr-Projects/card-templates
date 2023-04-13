var current_lang = "english"
const queryString = window.location.search.split("?")[1];
const category = queryString.split("&")[0].split("=")[1];
const name = queryString.split("&")[1].split("=")[1];
const back_img = document.getElementById("back_img");
const name_inp = document.getElementById("nameinp");

const canvas = document.getElementById("form_canvas");
const ctx = canvas.getContext("2d");

function switch_lang(lan) {
    current_lang = lan;
    back_img.src="./data/categories/"+category+"/"+name+"/"+current_lang+".png";
    back_img.onload = update_canvas
}

function covert_cord(x) {
   return (canvas.clientWidth/ back_img.naturalWidth) * x
}


function update_canvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.drawImage(back_img, 0, 0, canvas.width, canvas.height);
    ctx.textAlign ="center"
    ctx.textBaseline = 'middle';   
    ctx.font = "50px serif";
    if(current_lang == "arabic") {
        ctx.font = "50px adobe-arabic"; 
    }
    ctx.fillText(name_inp.value,covert_cord(categories[category][name]["name"]["x"]), covert_cord(categories[category][name]["name"]["y"]));
}

function dlCanvas() {
    var dt = canvas.toDataURL('image/png');
    dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

    dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
  
    this.href = dt;
  };
  document.getElementById("dl").addEventListener('click', dlCanvas, false);

switch_lang("english")