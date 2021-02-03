const Discord = require('discord.js');
require('dotenv').config();
let prefix = "$";

var timetable = [];
var command_list =["add", "remove", "show"];
var days_list = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var ampm_list = ["am","pm"];

var validate_list =[command_list, days_list, ampm_list];

function validate(x , y){
    if(y.includes(x)){
        return true;
    }else{
        return false;
    }
}

function validate_time(x){
    const [hours,minutes]= x.split('.');
    if((0<=hours<=12)&&(0<=minutes<=60) ){
        return true;
    }
    else{
        return false;
    }
}


const client = new Discord.Client();
console.log("BOT is Working!");


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {


    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    // const args = message.content.slice(prefix.length).trim().split(/ +/);
    // const command = args.shift().toLowerCase();
  
    const [command,...args]= message.content.trim().substring(prefix.length).trim().split(/ +/);

    if (command === 'args-info') {
      if (!args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
      }
  
      message.channel.send(`Command name: ${command}\nArguments: ${args}`);

    }
    if(command_list.includes(command)==false){
        message.channel.send(`Command name: ${command} is invalid, Please use correct command add, remove, show`);
    }
    if(command==="add"){
        if(  (validate(args[0],days_list))&&  (validate_time(args[1])) &&
         ( validate(args[2],ampm_list)  ) && (args[3].length!=null ) ){
            message.channel.send(`Command name: ${command}\n day : ${args[0]}
                \n time : ${args[1]}
                \n ampm : ${args[2]}
                \n classname : ${args[3]}`);

                let object = {
                    day: args[0],
                    time: args[1],
                    ampm: args[2],
                    classname: args[3],
                };
                timetable.push(object);
        }
    }

    if(command==="show"){
        message.channel.send(`Command name: ${command}
            and timetable ${JSON.stringify(timetable)}        
        `);

    }

    

console.log(timetable);

    console.log(command,args);


})

client.login(process.env.BOT_TOKEN);