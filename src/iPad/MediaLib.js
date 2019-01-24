import IO from './IO';
import Localization from '../utils/Localization';

let path;
let samples;
let backgrounds;
let sprites;
let sounds;
let keys = {};

export default class MediaLib {
    static get path () {
        return path;
    }

    static get samples () {
        return samples;
    }

    static get sprites () {
        return sprites;
    }

    static get backgrounds () {
        return backgrounds;
    }

    static get sounds () {
        return sounds;
    }

    static get keys () {
        return keys;
    }

    static loadMediaLib (root, whenDone) {
        IO.requestFromServer(root + 'media.json', (result) => {
            let parsedResult = {
                "path":"./svglibrary/",
                "samples": [
                    "samples/Underthesea.txt",
                    "samples/Farm.txt",
                    "samples/Seasons.txt",
                    "samples/Friends.txt",
                    "samples/Dance.txt",
                    "samples/AnimalRace.txt",
                    "samples/Bump.txt",
                    "samples/QuickIntro.txt"
                ],
                "backgrounds": [
                    {"md5":"Farm.svg","width":480,"height":360,"ext":"svg","name":"Farm"},
                    {"md5":"Park.svg","width":480,"height":360,"ext":"svg","name":"Park"},
                    {"md5":"Suburbs.svg","width":480,"height":360,"ext":"svg","name":"Suburbs"},
                    {"md5":"City.svg","width":480,"height":360,"ext":"svg","name":"City"},
                    {"md5":"Library.svg","width":480,"height":360,"ext":"svg","name":"Library"},
                    {"md5":"Classroom.svg","width":480,"height":360,"ext":"svg","name":"Classroom"},
                    {"md5":"Theatre.svg","width":480,"height":360,"ext":"svg","name":"Theatre"},
                    {"md5":"Gym.svg","width":480,"height":360,"ext":"svg","name":"Gym"},
                    {"md5":"Gym2.svg","width":480,"height":360,"ext":"svg","name":"Gym"},
                    {"md5":"Bedroom.svg","width":480,"height":360,"ext":"svg","name":"Bedroom"},
                    {"md5":"EmptyRoom.svg","width":480,"height":360,"ext":"svg","name":"Empty Room"},
            
            
                    {"md5":"Summer.svg","width":480,"height":360,"ext":"svg","name":"Summer"},
                    {"md5":"Fall.svg","width":480,"height":360,"ext":"svg","name":"Fall"},
                    {"md5":"Winter.svg","width":480,"height":360,"ext":"svg","name":"Winter"},
                    {"md5":"Spring.svg","width":480,"height":360,"ext":"svg","name":"Spring"},
                    {"md5":"Creek.svg","width":480,"height":360,"ext":"svg","name":"River"},
                    {"md5":"Lake.svg","width":480,"height":360,"ext":"svg","name":"Lake"},
                  {"md5":"Woods.svg","width":480,"height":360,"ext":"svg","name":"Woods"},
            
                    {"md5":"BeachDay.svg","width":480,"height":360,"ext":"svg","name":"Beach Day"},
                    {"md5":"BeachSunrise.svg","width":480,"height":360,"ext":"svg","name":"Beach Sunset"},
                    {"md5":"BeachNight.svg","width":480,"height":360,"ext":"svg","name":"Beach Night"},
                    {"md5":"Underwater.svg","width":480,"height":360,"ext":"svg","name":"Underwater"},
            
                    {"md5":"Jungle.svg","width":480,"height":360,"ext":"svg","name":"Jungle"},
                    {"md5":"Savannah.svg","width":480,"height":360,"ext":"svg","name":"Savannah"},
                    {"md5":"Desert.svg","width":480,"height":360,"ext":"svg","name":"Desert"},
                    {"md5":"Arctic.svg","width":480,"height":360,"ext":"svg","name":"Arctic"},
                    {"md5":"Space.svg","width":480,"height":360,"ext":"svg","name":"Space"},
                    {"md5":"MoonBkg.svg","width":480,"height":360,"ext":"svg","name":"Moon"}
                ],
                "sprites": [
                    {"md5":"Blue.svg","width":151,"height":253,"ext":"svg","name":"Tic","order":"characters,02 funky","tags":["characters","02 funky"]},
                    {"md5":"Purple.svg","width":161,"height":185,"ext":"svg","name":"Tac","order":"characters,02 funky","tags":["characters","02 funky"]},
                    {"md5":"Red.svg","width":213,"height":198,"ext":"svg","name":"Toc","order":"characters,02 funky","tags":["characters","02 funky"]},
                    {"md5":"Dragon.svg","width":577,"height":532,"ext":"svg","name":"Dragon","order":"characters,02 funky","tags":["characters","04 magic"]},
                    {"md5":"Fairy.svg","width":235,"height":320,"ext":"svg","name":"Fairy","order":"characters,02 funky","tags":["characters","04 magic"]},
                    {"md5":"Wizard.svg","width":411,"height":443,"ext":"svg","name":"Wizard","order":"characters,02 funky","tags":["characters","04 magic"]},
            
                    {"md5":"Dog.svg","width":296,"height":213,"ext":"svg","name":"Dog","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Rabbit.svg","width":217,"height":208,"ext":"svg","name":"Rabbit","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Chicken.svg","width":142,"height":148,"ext":"svg","name":"Chicken","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Pig.svg","width":275,"height":211,"ext":"svg","name":"Pig","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Horse.svg","width":422,"height":417,"ext":"svg","name":"Horse","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Zebra.svg","width":408,"height":390,"ext":"svg","name":"Zebra","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Monkey.svg","width":387,"height":235,"ext":"svg","name":"Monkey","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Elephant.svg","width":659,"height":448,"ext":"svg","name":"Elephant","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Giraffe.svg","width":471,"height":655,"ext":"svg","name":"Giraffe","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Camel.svg","width":522,"height":420,"ext":"svg","name":"Camel","order":"characters,03 animals","tags":["characters","03 animals"]},
            
                    {"md5":"Butterfly.svg","width":128,"height":97,"ext":"svg","name":"Butterfly","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Fly.svg","width":109,"height":93,"ext":"svg","name":"Fly","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Bat.svg","width":174,"height":85,"ext":"svg","name":"Bat","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Bird.svg","width":146,"height":210,"ext":"svg","name":"Bird","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Snake.svg","width":269,"height":79,"ext":"svg","name":"Snake","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Lizard.svg","width":305,"height":179,"ext":"svg","name":"Lizard","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Frog.svg","width":195,"height":166,"ext":"svg","name":"Frog","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Duck.svg","width":155,"height":116,"ext":"svg","name":"Duck","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Crab.svg","width":223,"height":145,"ext":"svg","name":"Crab","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Seahorse.svg","width":80,"height":171,"ext":"svg","name":"Seahorse","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Starfish.svg","width":121,"height":123,"ext":"svg","name":"Starfish","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Fish1.svg","width":196,"height":109,"ext":"svg","name":"Fish","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Fish2.svg","width":169,"height":122,"ext":"svg","name":"Fish","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Whale.svg","width":752,"height":406,"ext":"svg","name":"Whale","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"Penguin.svg","width":176,"height":243,"ext":"svg","name":"Penguin","order":"characters,03 animals","tags":["characters","03 animals"]},
                    {"md5":"PolarBear.svg","width":481,"height":278,"ext":"svg","name":"Polar Bear","order":"characters,03 animals","tags":["characters","03 animals"]},
            
                    {"md5":"Girl1.svg","width":133,"height":318,"ext":"svg","name":"Child","order":"characters,01 family","tags":["characters","05 faces"]},
                    {"md5":"Girl2.svg","width":122,"height":298,"ext":"svg","name":"Child","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"Girl3.svg","width":145,"height":298,"ext":"svg","name":"Child","order":"characters,01 family","tags":["characters","05 faces"]},
                    {"md5":"Boy1.svg","width":138,"height":311,"ext":"svg","name":"Child","order":"characters,01 family","tags":["characters","05 faces"]},
                    {"md5":"Boy2.svg","width":156,"height":309,"ext":"svg","name":"Child","order":"characters,01 family","tags":["characters","05 faces"]},
                    {"md5":"Boy3.svg","width":134,"height":310,"ext":"svg","name":"Child","order":"characters,01 family","tags":["characters","05 faces"]},
                    {"md5":"TeenGirl1.svg","width":168,"height":363,"ext":"svg","name":"Teen","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"TeenGirl2.svg","width":200,"height":369,"ext":"svg","name":"Teen","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"TeenGirl3.svg","width":123,"height":368,"ext":"svg","name":"Teen","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"TeenBoy1.svg","width":144,"height":407,"ext":"svg","name":"Teen","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"TeenBoy2.svg","width":174,"height":398,"ext":"svg","name":"Teen","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"TeenBoy3.svg","width":134,"height":404,"ext":"svg","name":"Teen","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"Baby.svg","width":191,"height":159,"ext":"svg","name":"Baby","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"Mother.svg","width":224,"height":418,"ext":"svg","name":"Mother","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"Father.svg","width":210,"height":446,"ext":"svg","name":"Father","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"Grandmother.svg","width":149,"height":407,"ext":"svg","name":"Grandmother","order":"characters,01 family","tags":["characters","01 family"]},
                    {"md5":"Grandfather.svg","width":166,"height":402,"ext":"svg","name":"Grandfather","order":"characters,01 family","tags":["characters","01 family"]},
            
                    {"md5":"Girl.svg","width":156,"height":309,"ext":"svg","name":"Child","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Boy.svg","width":134,"height":319,"ext":"svg","name":"Child","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Teen2.svg","width":200,"height":369,"ext":"svg","name":"Teen","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Teen3.svg","width":144,"height":407,"ext":"svg","name":"Teen","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Farmer1.svg","width":209,"height":441,"ext":"svg","name":"Rancher","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Farmer.svg","width":220,"height":429,"ext":"svg","name":"Rancher","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Bike2.svg","width":368,"height":417,"ext":"svg","name":"Cyclist","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Bike.svg","width":368,"height":417,"ext":"svg","name":"Cyclist","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Car2.svg","width":640,"height":415,"ext":"svg","name":"Driver","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Car1.svg","width":638,"height":415,"ext":"svg","name":"Driver","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Aeroplane.svg","width":570,"height":394,"ext":"svg","name":"Pilot","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Astronaut.svg","width":238,"height":442,"ext":"svg","name":"Astronaut","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Inuit.svg","width":244,"height":390,"ext":"svg","name":"Northerner","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Scubadiver.svg","width":510,"height":235,"ext":"svg","name":"Scuba Diver","order":"characters,05 faces","tags":["characters","05 faces"]},
                    {"md5":"Rowboat.svg","width":589,"height":344,"ext":"svg","name":"Rower","order":"characters,05 faces","tags":["characters","05 faces"]},
            
                    {"md5":"Tree1.svg","width":284,"height":348,"ext":"svg","name":"Tree","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Tree3.svg","width":209,"height":388,"ext":"svg","name":"Tree","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Tree4.svg","width":306,"height":197,"ext":"svg","name":"Tree","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Evergreen.svg","width":201,"height":406,"ext":"svg","name":"Tree","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Weed.svg","width":132,"height":101,"ext":"svg","name":"Plant","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Pasture.svg","width":512,"height":128,"ext":"svg","name":"Tall Grass","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Cactus.svg","width":172,"height":362,"ext":"svg","name":"Cactus","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Daffodil.svg","width":160,"height":171,"ext":"svg","name":"Daffodils","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Daisy1.svg","width":95,"height":78,"ext":"svg","name":"Daisy","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Daisy2.svg","width":91,"height":81,"ext":"svg","name":"Daisy","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Daisy3.svg","width":77,"height":98,"ext":"svg","name":"Daisy","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Tulip2.svg","width":93,"height":169,"ext":"svg","name":"Tulip","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Flowers.svg","width":197,"height":119,"ext":"svg","name":"Flowers","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Apple.svg","width":112,"height":132,"ext":"svg","name":"Apple","order":"characters,06 plants","tags":["characters","06 plants"]},
                    {"md5":"Peach.svg","width":112,"height":111,"ext":"svg","name":"Peach","order":"characters,06 plants","tags":["characters","09 objects"]},
                    {"md5":"Mushroom.svg","width":128,"height":134,"ext":"svg","name":"Mushroom","order":"characters,06 plants","tags":["characters","06 plants"]},
            
                    {"md5":"Star.svg","width":80,"height":101,"ext":"svg","name":"Star","order":"characters,07 weather","tags":["characters","07 weather"]},
                    {"md5":"Star2.svg","width":64,"height":63,"ext":"svg","name":"Star","order":"characters,07 weather","tags":["characters","07 weather"]},
                    {"md5":"Star3.svg","width":74,"height":77,"ext":"svg","name":"Star","order":"characters,07 weather","tags":["characters","07 weather"]},
                    {"md5":"ShootingStar.svg","width":296,"height":78,"ext":"svg","name":"Shooting Star","order":"characters,07 weather","tags":["characters","07 weather"]},
                    {"md5":"Earth.svg","width":220,"height":220,"ext":"svg","name":"Earth","order":"characters,07 weather","tags":["characters","07 weather"]},
                    {"md5":"Planet.svg","width":393,"height":271,"ext":"svg","name":"Planet","order":"characters,07 weather","tags":["characters","07 weather"]},
                    {"md5":"Sun.svg","width":176,"height":176,"ext":"svg","name":"Sun","order":"characters,07 weather","tags":["characters","07 weather"]},
                    {"md5":"Moon.svg","width":204,"height":204,"ext":"svg","name":"Full Moon","order":"characters,07 weather","tags":["characters","09 weather"]},
                    {"md5":"CrescentMoon.svg","width":157,"height":160,"ext":"svg","name":"Moon","order":"characters,07 weather","tags":["characters","07 weather"]},
                    {"md5":"Cloud1.svg","width":238,"height":149,"ext":"svg","name":"Cloud","order":"characters,07 weather","tags":["characters","07 weather"]},
                    {"md5":"Thundercloud.svg","width":344,"height":270,"ext":"svg","name":"Storm Cloud","order":"characters,07 weather","tags":["characters","07 weather"]},
                    {"md5":"Tornado.svg","width":256,"height":328,"ext":"svg","name":"Tornado","order":"characters,07 weather","tags":["characters","07 weather"]},
            
                    {"md5":"Barn.svg","width":594,"height":380,"ext":"svg","name":"Barn","order":"characters,08 buildings","tags":["characters","08 buildings "]},
                    {"md5":"Fort.svg","width":576,"height":452,"ext":"svg","name":"Fort","order":"characters,08 buildings","tags":["characters","08 buildings"]},
                    {"md5":"Castle.svg","width":379,"height":548,"ext":"svg","name":"Castle","order":"characters,08 buildings","tags":["characters","08 buildings"]},
                    {"md5":"Igloo.svg","width":332,"height":194,"ext":"svg","name":"Igloo","order":"characters,08 buildings","tags":["characters","08 buildings"]},
                    {"md5":"House1.svg","width":631,"height":379,"ext":"svg","name":"House","order":"characters,08 buildings","tags":["characters","08 buildings"]},
                    {"md5":"House.svg","width":470,"height":258,"ext":"svg","name":"House","order":"characters,08 buildings","tags":["characters","08 buildings"]},
                    {"md5":"House3.svg","width":286,"height":323,"ext":"svg","name":"House","order":"characters,08 buildings","tags":["characters","08 buildings"]},
                    {"md5":"House4.svg","width":592,"height":341,"ext":"svg","name":"House","order":"characters,08 buildings","tags":["characters","08 buildings"]},
                    {"md5":"Apartment.svg","width":230,"height":480,"ext":"svg","name":"Apartment","order":"characters,08 buildings","tags":["characters","07 buildings"]},
                    {"md5":"School.svg","width":395,"height":334,"ext":"svg","name":"School","order":"characters,08 buildings","tags":["characters","07 buildings"]},
                    {"md5":"Shop.svg","width":474,"height":304,"ext":"svg","name":"Shop","order":"characters,08 buildings","tags":["characters","07 buildings"]},
            
                    {"md5":"Fence.svg","width":219,"height":123,"ext":"svg","name":"Fence","order":"characters,09 objects","tags":["characters","09 objects"]},
                    {"md5":"Mailbox.svg","width":71,"height":210,"ext":"svg","name":"Mailbox","order":"characters,09 objects","tags":["characters","09 objects"]},
                    {"md5":"Cake.svg","width":276,"height":270,"ext":"svg","name":"Cake","order":"characters,09 objects","tags":["characters","09 objects"]},
                    {"md5":"Ball.svg","width":126,"height":129,"ext":"svg","name":"Ball","order":"characters,09 objects","tags":["characters","09 objects"]},
                    {"md5":"Basketball.svg","width":96,"height":96,"ext":"svg","name":"Basketball","order":"characters,09 objects","tags":["characters","09 objects"]},
                    {"md5":"Soccerball.svg","width":96,"height":96,"ext":"svg","name":"Soccer Ball","order":"characters,09 objects","tags":["characters","09 objects"]},
                    {"md5":"SoccerNet.svg","width":219,"height":399,"ext":"svg","name":"Soccer Net","order":"characters,09 objects","tags":["characters","09 objects"]},
                    {"md5":"Bed.svg","width":370,"height":343,"ext":"svg","name":"Bed","order":"characters,09 objects","tags":["characters","09 objects"]},
                    {"md5":"NightTable.svg","width":175,"height":175,"ext":"svg","name":"Night Table","order":"characters,09 objects","tags":["characters","09 objects"]},
                    {"md5":"Stool.svg","width":159,"height":182,"ext":"svg","name":"Stool","order":"characters,09 objects","tags":["characters","09 objects"]},
                    {"md5":"Table.svg","width":399,"height":248,"ext":"svg","name":"Table","order":"characters,09 objects","tags":["characters","09 objects"]},
            
                    {"md5":"Car.svg","width":534,"height":220,"ext":"svg","name":"Car","order":"characters,10 transportation","tags":["characters","10 transportation"]},
                    {"md5":"Bus.svg","width":600,"height":319,"ext":"svg","name":"Bus","order":"characters,10 transportation","tags":["characters","10 transportation"]},
                    {"md5":"SailBoat.svg","width":356,"height":393,"ext":"svg","name":"Boat","order":"characters,10 transportation","tags":["characters","10 transportation"]},
                    {"md5":"Boat2.svg","width":488,"height":425,"ext":"svg","name":"Boat","order":"characters,10 transportation","tags":["characters","10 transportation"]},
                    {"md5":"Rocket.svg","width":254,"height":495,"ext":"svg","name":"Rocket","order":"characters,10 transportation","tags":["characters","10 transportation"]}
                ],
                "sounds": ["pop.mp3"]
            };
            path = parsedResult.path;
            samples = parsedResult.samples;
            sprites = parsedResult.sprites;
            backgrounds = parsedResult.backgrounds;
            sounds = parsedResult.sounds;

            MediaLib.localizeMediaNames();
            MediaLib.generateKeys();

            whenDone();
        });
    }

    static localizeMediaNames () {
        // Localize names of sprites
        for (let i = 0; i < sprites.length; i++) {
            sprites[i].name = Localization.localize('CHARACTER_' + sprites[i].md5);
        }

        // Localize names of backgrounds
        for (let i = 0; i < backgrounds.length; i++) {
            backgrounds[i].name = Localization.localize('BACKGROUND_' + backgrounds[i].md5);
        }
    }

    static generateKeys () {
        for (let i = 0; i < backgrounds.length; i++) {
            var bg = backgrounds[i];
            keys[bg.md5] = {width: bg.width, height: bg.height, name: bg.name};
        }

        for (let i = 0; i < sprites.length; i++) {
            var spr = sprites[i];
            keys[spr.md5] = {width: spr.width, height: spr.height, name: spr.name};
        }
    }
}
