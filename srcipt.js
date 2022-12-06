
// hey if you are looking at the source code for how this works just go to line 140
// most of this is just code to show stuff

// there is a lot of JSdoc here

// oh and the @ts-check stuff is to use typescript checking

//@ts-check
/**
 * @type {HTMLCanvasElement}
 */
//@ts-ignore
let screen = document.getElementById("screen")
//@ts-ignore
let ctx = new context(screen,"black","Arial",10)


let arr = ["a","b","c","d"]
let set = (x,axis)=>{
    return ()=>{
        //@ts-ignore
        ChangeLocation(x,document.getElementById(`${x}in`).value,axis)
        //@ts-ignore
        draw()
    }
}
for(let i=0;i<4;i++){
    //@ts-ignore
    document.getElementById(`${arr[i]}x`).onclick = set(arr[i],"x")
    //@ts-ignore
    document.getElementById(`${arr[i]}y`).onclick = set(arr[i],"y")
}

/**
 * 
 * @param {string} point
 * @param {number} num 
 * @param {string} axis 
 */


// A = line1[0], B = line1[1]
// C = line2[0], D = line2[1]
function ChangeLocation(point,num,axis) {
    switch(point){
        case "a":
            XorY(line1[0],axis,num)
            break;
        case "b":
            XorY(line1[1],axis,num)
            break;
        case "c":
            XorY(line2[0],axis,num)
            break;
        case "d":
            XorY(line2[1],axis,num)
            break;
    }
}

/**
 * 
 * @param {{x:number,y:number}} point 
 * @param {string} axis 
 * @param {number} set
 */
function XorY(point,axis,set){
    if(axis=="x"){
        point.x=set
    }else{
        point.y=set
    }
}




function draw(){
    ctx.color = "white"
    ctx.drawRect(0,0,1000,1000)
    ctx.color = "black"
    let M = collision(line1,line2)
    ctx.drawline(line1[0].x,line1[0].y,line1[1].x,line1[1].y)
    DL(line1[0],"A")
    DL(line1[1],"B")
    ctx.drawline(line2[0].x,line2[0].y,line2[1].x,line2[1].y)
    DL(line2[0],"C")
    DL(line2[1],"D")
    ctx.color = "black"
    //@ts-ignore
    document.getElementById("co").innerText = M
}

/**
 * @type {[{x:number,y:number},{x:number,y:number}]}
 */
let line1 = [
    {x:40,y:64},
    {x:46,y:163}
]
/**
 * @type {[{x:number,y:number},{x:number,y:number}]}
 */
let line2 = [
    {x:178,y:24},
    {x:24,y:135}
]
draw()
/**
 * 
 * @param {number} a 
 * @param {number} b 
 * @param {number} t 
 */
function lerp(a,b,t) {
    return a+(b-a)*t
}

/**
 * 
 * @param {{x:number,y:number}} l 
 * @param {string} txt 
 */
function DL(l,txt){
    ctx.color = "white"
    ctx.drawCircle(l.x,l.y,10,true)
    ctx.color = "black"
    ctx.drawCircle(l.x,l.y,10,false)
    ctx.color = "black"
    ctx.drawText(l.x,l.y,txt)
}

/**
 * 
 * @param {[{x:number,y:number},{x:number,y:number}]} line1 - first line
 * @param {[{x:number,y:number},{x:number,y:number}]} line2 - second line
 */


// ok here is the collision code
// you can use it if you want

// Line collision function explained
// I followed this tutorial so follow it too :D - https://youtu.be/fHOLQJo0FjQ 
// we have this lerp function
// a+(b-a)*t
// a first point | b second point
// t is a percentage of where it intercepts (0 to 1 or 0% to 100%)
// if t is not in bettween 0 and 1 then we are not colliding
// what we get is the position of where on the lines its colliding
// we use this function twice to get where the lines cross
// once for the x axis and the other of the y axis.

// what the collison function does is get the T value of the lerp function
// we do this twice to get the T of both of the lines
// if both T values are bettween 0 and 1 we are colliding
function collision(line1,line2){
    // tTop used to get t of first line
    const tTop = (line2[1].x-line2[0].x)*(line1[0].y-line2[0].y)-(line2[1].y-line2[0].y)*(line1[0].x-line2[0].x)
    // uTop used to get t of second line
    const uTop = (line2[0].y-line1[0].y)*(line1[0].x-line1[1].x)-(line2[0].x-line1[0].x)*(line1[0].y-line1[1].y)   //(line2[0].y-line1[0].y)*(line1[1].x-line1[0].x)-(line2[0].x-line1[0].x)*(line1[0].y-line1[1].y)
    // the bottom is what we divide by to get the t values of both lines
    const bottom = (line2[1].y-line2[0].y)*(line1[1].x-line1[0].x)-(line2[1].x-line2[0].x)*(line1[1].y-line1[0].y)

    //if its 0, well then we cant divide by 0 can we
    if(bottom!=0){
        //where on line 1 it crosses
        let t = tTop/bottom
        //where on line 2 it crosses
        let u = uTop/bottom
        console.log(`T1: ${t}  |  T2: ${u}`)
        console.log(`tTop: ${tTop}  |  uTop: ${uTop}`)
        console.log(`bottom: ${bottom}`)
        //if both values are in bettween 0 and 1 they are colliding
        if(t>=0&&t<=1&&u>=0&&u<=1){
            return true
        }
    }else{
        // tTop==0 
        // if tTop or uTop equals 0 and bottom equals 0 then the lines are vertically aligned
        // and 0 divided by 0 equals Nan is javascript so we use the isNaN function
        if(tTop==0&&uTop==0){
            return true
        }
    }
    // if none of them returned true by now 
    return false
}
// small challenge shorten this code :D
// the answer is 25 lines down


























// ok this is the answer:
// remove the if bottom not equal 0 
// remove all return statements
// replace with (t>=0&&t<=1&&u>=0&&u<=1)||(tTop==0&&uTop==0)
// :)