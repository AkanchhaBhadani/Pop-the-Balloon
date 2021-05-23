class game{

    constructor(){
        this.image_array = new Array(8);
    }

    //loading and drawing image array
    load_and_draw()
    {
        let image_count = 8;
        for (var i = 0; i < 8; i++)
        {
            this.image_array[i] = new Image();
            if(i%2 == 0)
            {
                this.image_array[i].src = "../assets/images/balloon.png";
            }
            else
            {
                this.image_array[i].src = "../assets/images/brick.png";
            }
            this.image_array[i].onload = () => {
                start()
                if (image_count == 0){
                    this.draw();
                }};
        }
        
        function start ()
        {
            image_count--;
        }
    }
    draw()
    {
        var canvas = document.getElementById("game_area");
        var ctx = canvas.getContext("2d");
        for (var i = 0; i < 8; i++)
        {
            let pos = 100*(i+1);
            ctx.drawImage(this.image_array[i], pos, 550, 50, 50);
        }
    }
}
var new_game = new game();
new_game.load_and_draw();
