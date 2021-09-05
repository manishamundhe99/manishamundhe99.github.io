runAnimation = () => {
    
        document.body.style.backgroundColor = "#FFA500";
        document.body.style.backgroundImage = "url('/images/background.jpj')";
      
	
console.log("JavaScript");
//let c = document.getElementById("myCanvas").style.background= "url('/images/background.jpg')";
let c = document.getElementById("myCanvas");
//c.style.background = ("/images/background.jpg");
let ctx = c.getContext("2d")
ctx.fillstyle = "blue";
//ctx.fillRect(0,0,canvas.width, canvas.height);
//ctx.fillRect(0,0,100,100)
let loadimage = (src,callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};


let imagepath = (framenumber, animation) => {
    //console.log("helo");
    //console.log("/images/" + animation + "/" + framenumber + ".png");
    return "/images/" + animation + "/" + framenumber + ".png";
}

let frames = {
    idle: [1,2,3,4,5,6,7,8],
    punch: [1,2,3,4,5,6,7],
    kick: [1,2,3,4,5,6,7],
    forward: [1,2,3,4,5,6],
    backward: [1,2,3,4,5,6],
    block: [1,2,3,4,5,6,7,8,9],
}

let loadimages = (callback) => {
    let images = {idle: [], punch: [], kick: [], forward: [], backward: [], block: [] };
    let imagesToLoad = 0;
    console.log("***************",images);
    ["idle","kick", "punch", "forward", "backward", "block"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;
        animationFrames.forEach((framenumber) => 
        {
            let path = imagepath(framenumber, animation);


            loadimage(path, (image) => {
            images[animation][framenumber -1] = image;
            imagesToLoad = imagesToLoad -1;

            if(imagesToLoad === 0){
                callback(images);
            }
            }); //load image

        }) //animationFrames

        
    });//for each
}; //loadimegs pural



let animate = (ctx,images,animation,callback) => {
    images[animation].forEach ((image,index) => {
        setTimeout(()=> {
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,100,100,300,300);
        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100)
} ;

loadimages((images) => { 
    //console.log("I am here")
    
    let quedAnimations = [];

    let aux = () => {
        let selectAnimation;

        if(quedAnimations.length === 0) {
            selectAnimation = "idle";
        }else{
            selectAnimation = quedAnimations.shift();
        }
        animate(ctx,images,selectAnimation,aux);
    };
    aux();
    document.getElementById("kick").onclick =()=> {
        quedAnimations.push("kick");
    };
    document.getElementById("punch").onclick =()=> {
        quedAnimations.push("punch");
    };
    document.getElementById("forward").onclick =()=> {
        quedAnimations.push("forward");
    };
    document.getElementById("backward").onclick =()=> {
        quedAnimations.push("backward");
    };
    document.getElementById("block").onclick =()=> {
        quedAnimations.push("block");
    };

    document.addEventListener("keyup",(event) => {
        const key = event.key;
        if(key === "ArrowLeft"){
            quedAnimations.push("kick");
        } else if(key === 'ArrowRight'){
            quedAnimations.push("punch");
        }
    }) ;

    });
      


};