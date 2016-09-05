var roleEnergizer = require('role.energizer');
var roleControlLvl = require('role.controlLvl');
var roleBuilder = require('role.builder');
var debug = false;



module.exports.loop = function()
{

    for (let name in Memory.creeps)
    {
        if(Game.creeps[name] == undefined)
        {
            console.log("Cleared Memory of Dead Creep (RIP) " + name);
            delete Memory.creeps[name];
        }
    }

    for (let name in Game.creeps)
    {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'energizer')
        {
            roleEnergizer.run(creep);
        }
        else if (creep.memory.role == "controlLvl")
        {
            roleControlLvl.run(creep);
        }
        else if (creep.memory.role == "builder")
        {
            roleBuilder.run(creep);
        }

    }


    var maxCreeps = 50;
    var amtCreeps = Object.keys(Game.creeps).length;

    var minEnergizer = 20
    var amtEnergizer = _.sum(Game.creeps, (c) => c.memory.role == 'energizer');

    var minBuilder = 10
    var amtBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder');

    var minControlLvl = 10
    var amtControlLvl = _.sum(Game.creeps, (c) => c.memory.role == 'controlLvl');

    global.debug = function()
    {
        console.log("Total Creeps: " + amtCreeps);
        console.log("Energizers: " + amtEnergizer);
        console.log("Builders: " + amtBuilder)
        console.log("Controller Levelers: " + amtControlLvl);
    }

    var name = undefined;
    /**Move = 50
     * Work = 100
     * Carry = 50
     * Attack = 80
     * Ranged_Attack = 150
     * Heal = 250
     * Claim = 600
     * Tough = 10
     */
    if(amtEnergizer < minEnergizer)
    {
        name = Game.spawns.Spawn1.createCreep([WORK,MOVE,CARRY,MOVE], undefined, {role: 'energizer', energizing: false});
    }
    else if(amtControlLvl < minControlLvl)
    {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'controlLvl', energizing: false});
    }
    else if(amtBuilder < minBuilder)
    {
        name = Game.spawns.Spawn1.createCreep([WORK,MOVE,CARRY,MOVE], undefined, {role: 'builder', energizing: false});
    }
    else
    {
        var newRoleRoll = _.random(0,2);
        var newRole = 'energizer';
        if(newRoleRoll == 0) {
            newRole = 'energizer';
        }
        else if(newRoleRoll == 1) {
            newRole = 'controlLvl';
        }
        else if(newRoleRoll == 2) {
            newRole = 'builder';
        }
        else{
                console.log("You dun effed up");
        }
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder', energizing: false});
    }

    if (!(name < 0))
    {
        console.log("Spawned new creep: " + name);
    }

    global.spawnEnergizer = function ()
    {
       name = Game.spawns.Spawn1.createCreep([WORK,MOVE,CARRY,MOVE], undefined, {role: 'energizer', energizing: false});
        if (!(name < 0))
        {
            console.log("Spawning Energizer " + name)
        }
    }
    global.spawnControlLvl = function()
    {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'controlLvl', energizing: false});

        if (!(name < 0))
        {
            console.log("Spawning Control Leveler " + name);
        }
    }
    global.spawnBuilder = function()
    {
        name = Game.spawns.Spawn1.createCreep([WORK,MOVE,CARRY,MOVE], undefined, {role: 'builder', energizing: false});

        if (!(name < 0))
        {
            console.log("Spawning Builder " + name);
        }
    }

}