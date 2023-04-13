import json
import os
from PIL import Image

def get_paths(d):
    return [os.path.join(d, o) for o in os.listdir(d) 
                        if os.path.isdir(os.path.join(d,o))]

def get_img_dim(path):
    im = Image.open(path)
    pix = im.load()
    for x in range(im.size[0]):
        for y in range(im.size[1]):
            if pix[x,y][0] == 255:
                if pix[x,y][1] == 0 and pix[x,y][2] == 0:
                    return x, y
    return 0, 0
    

out = {}                    
with open("./categories.js", "w+") as f:
    for cat_path in get_paths("./categories"):
        print(cat_path)
        cat_data = {}
        for template_path in get_paths(cat_path):
            print("   " + template_path)
            d = get_img_dim(template_path + "/english.png" )
            template_data = {
                "name": {"x": d[0], "y": d[1]}, 
            }
            cat_data[template_path.split("\\")[-1]] = template_data
        out[cat_path.split("\\")[-1]] = cat_data
    f.write("const categories = " + json.dumps(out))