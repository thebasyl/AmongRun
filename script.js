const canvas = document.createElement('canvas');
canvas.width = 100;
canvas.height = 100;
document.body.append(canvas);
const context = canvas.getContext('2d');

let x = 0;

let velocity = 0;

const background = Math.floor(Math.random() * 2);
console.log(background);

window.requestAnimationFrame(loop);

let SHEET = new Image(20, 20);
SHEET.src = "./SpriteSheet.png";

let is_die = false;

class Block
{
    constructor()
    {
        this.x = Math.floor(Math.random() * 100)
        this.y = Math.floor(Math.random() * (-10 - -100 + 1)) + -100;
    }

    update()
    {
        this.y += 1;
        context.drawImage(SHEET, 10, 0, 4, 10, this.x, this.y, 4, 10)
        if(this.y > 100)
        {
            this.x = Math.floor(Math.random() * 100)
            this.y = Math.floor(Math.random() * (-10 - -100 + 1)) + -100;
        }
    }

    overlap()
    {
        if (!(this.x + 1 >= x + 9 || this.y >= 70 || 
            this.x + 3 <= x + 1 || this.y + 10 <= 60))
        {
            is_die = true;
        }
    }
}

let blocks = [new Block(), new Block(), new Block()];

setInterval(() => 
{
    blocks.push(new Block())
}, 2000);

function loop()
{
    context.drawImage(SHEET, 0 + background * 100, 10, 100, 100, 0, 0, 100, 100);
    context.drawImage(SHEET, 0, 0, 10, 10, x, 60, 10, 10);
    blocks.forEach(block => 
    {
        block.update();
        block.overlap();
    });
    x += velocity;
    if(x > 95 || x < -5)
    {
        is_die = true;
    }
    if(!is_die)
    {
        window.requestAnimationFrame(loop);
    }
}

document.addEventListener('keydown', key => 
{
    console.log(key.key)
    switch(key.key)
    {
        case "a":
            velocity = -1;
            break;
        case "d":
            velocity = 1;
            break;
    }
});