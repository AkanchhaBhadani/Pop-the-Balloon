class game{

    constructor(array_size){
        this.canvas = document.getElementById("game_area");
        this.ctx = this.canvas.getContext("2d");
        this.array_size = array_size;
        this.image_array = new Array(array_size);
        this.dart = document.createElement("img");
        this.pop = document.createElement("img");
        this.oops = document.createElement("img");
        this.obj_width = 50;
        this.obj_height = 50;
        this.canvas_positions = [];
        this.is_pos_occupied = {};
        this.is_brick_or_balloon = {};
        this.position_y = {};
        this.count = 0;
        this.is_left_key_pressed = {};
        this.dart_position_in_x = {};
        this.element_co_ordinates = {};
        this.dart_pos_y = 550;
    }

    //loading and drawing image array
    load_and_draw()
    {
        //dart
        this.dart.src = "../assets/images/dart.png";
        this.dart.onload = ()=>{
        this.ctx.drawImage(this.dart, 950, this.dart_pos_y, this.obj_width, this.obj_height);}
        
        //oops and pop
        this.pop.src = "../assets/images/pop.png";
        this.oops.src = "../assets/images/oops.png";
        this.pop.onload = ()=>{
            this.ctx.drawImage(this.pop, 950, 600, this.obj_width, this.obj_height);}
        this.oops.onload = ()=>{
                this.ctx.drawImage(this.oops, 950, 600, this.obj_width, this.obj_height);}

        //balloons and bricks
        let image_count = this.array_size;
        for (var i = 0; i < this.array_size; i++)
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
                loaded()
                if (image_count == 0){
                    this.draw();
                }};
            let pos = 100*(i+1)
            this.canvas_positions.push(pos);
        }
        
        function loaded ()
        {
            image_count--;
        }
    }

    draw()
    {
        for (var i = 0; i < this.array_size; i++)
        {
            let pos = 100*(i+1);
            this.ctx.drawImage(this.image_array[i], pos, 600, this.obj_height, this.obj_width);
        }
    }

    game_start(start_time_nxt_obj = Date.now())
    {
        var pos_ind = Math.floor(Math.random()*8);
        while (this.is_pos_occupied[pos_ind] == true)
        {
            pos_ind = Math.floor(Math.random()*8);
        }
        this.is_pos_occupied[pos_ind] = true;
        var img_array_pos = Math.floor(Math.random()*8);
        this.is_brick_or_balloon[this.canvas_positions[pos_ind]] = img_array_pos;
        this.position_y[this.canvas_positions[pos_ind]] = 600;
        var start_time = Date.now(); 
        this.move(start_time, pos_ind, img_array_pos, start_time_nxt_obj);
    }

    move(start_time, pos_ind, img_array_pos, start_time_nxt_obj)
    {
        var continue_obj_motion = true;
        var pos_y = this.position_y[this.canvas_positions[pos_ind]];
        var wait_interval = Math.random()*800;
        while(wait_interval < 400)
        {
            wait_interval = Math.random()*1000;
        }
        if (Date.now() - start_time > wait_interval)
        {
            start_time = Date.now();
            this.ctx.clearRect(this.canvas_positions[pos_ind],pos_y, this.obj_width, this.obj_height);
            pos_y-=50;
            this.element_co_ordinates[this.canvas_positions[pos_ind]] = pos_y;
            this.position_y[this.canvas_positions[pos_ind]] = pos_y;
            this.ctx.drawImage(this.image_array[img_array_pos],this.canvas_positions[pos_ind],this.position_y[this.canvas_positions[pos_ind]], this.obj_width, this.obj_height);
            
            if (Date.now() - start_time_nxt_obj > 2000 && this.count < 4)
            {
                start_time_nxt_obj = Date.now();
                this.count+=1;
                this.game_start( start_time_nxt_obj);
            }

            if (this.position_y[this.canvas_positions[pos_ind]] <= -this.obj_height)
            {
                this.position_y[this.canvas_positions[pos_ind]] = 600;
                continue_obj_motion = false;
                this.is_pos_occupied[pos_ind] = false;
            }
        }
        if (continue_obj_motion)
        {
            requestAnimationFrame(()=>{this.move(start_time, pos_ind, img_array_pos, start_time_nxt_obj);});
        }

        if ((!continue_obj_motion))
        {
            requestAnimationFrame(()=>{this.game_start()});
        }
    }

    move_dart(key)
    {
        if(key === "ArrowDown")
        {
            this.ctx.clearRect(948, this.dart_pos_y, 50, 50);
            if (this.dart_pos_y >= 550)
            {
                this.dart_pos_y = -50;
            }
            this.dart_pos_y += 50;
            this.ctx.drawImage(this.dart, 948, this.dart_pos_y, 50, 50);
        }

        if(key === "ArrowUp")
        {
            this.ctx.clearRect(948, this.dart_pos_y, 50, 50);
            if (this.dart_pos_y <= 0)
            {
                this.dart_pos_y = 600;
            }
            this.dart_pos_y -= 50;
            this.ctx.drawImage(this.dart, 948, this.dart_pos_y, 50, 50);
        }

        if (key === "ArrowLeft")
        {
            this.shoot_dart();
        }
    }

    shoot_dart()
    {
        if (this.is_left_key_pressed[this.dart_pos_y] == undefined || this.is_left_key_pressed[this.dart_pos_y] == false)
        {
            var time_at_start = Date.now();
            var curr_pos = 900;
            var pos_y = this.dart_pos_y;
            this.is_left_key_pressed[pos_y] = true;
            this.ctx.clearRect(curr_pos, pos_y, this.obj_height, this.obj_width);
            curr_pos -= 50;
            var first_movement = true;
            var to_continue = true;
            var this_to_do = this;
            to_do();
            function to_do()
            {
                if(Date.now() - time_at_start > 100)
                {
                    time_at_start = Date.now();
                    if (curr_pos <= 50)
                    {
                        this_to_do.dart_position_in_x[pos_y] = 900;
                        to_continue = false;
                        this_to_do.ctx.clearRect(curr_pos, pos_y, this_to_do.obj_width, this_to_do.obj_height);
                        this_to_do.is_left_key_pressed[pos_y] = false;
                        return;
                    }
                    if (!first_movement)
                    {
                        this_to_do.ctx.clearRect(curr_pos, pos_y, this_to_do.obj_height, this_to_do.obj_width);
                        curr_pos -= 100;
                    }
                    first_movement = false;
                    this_to_do.dart_position_in_x[pos_y] = curr_pos;
                    this_to_do.ctx.drawImage(this_to_do.dart,curr_pos, pos_y, this_to_do.obj_width, this_to_do.obj_height);
                }
                if (to_continue)
                {
                    requestAnimationFrame(()=>to_do());
                }
            }
        }
    }
}
var new_game = new game(8);
new_game.load_and_draw();
new_game.game_start();
addEventListener("keydown", (event)=>{new_game.move_dart(event.code);});
