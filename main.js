require('prototype.spawn')();
var roleEnergizer = require('role.energizer');
var roleControlLvl = require('role.controlLvl');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');



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
        else if (creep.memory.role == 'controlLvl')
        {
            roleControlLvl.run(creep);
        }
        else if (creep.memory.role == 'builder')
        {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repair')
        {
            roleRepair.run(creep);
        }


    }

    var towers = Game.rooms.W22N52.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER});

    for (let tower of towers)
    {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var repairTarget = tower.pos.findClosestByRange(FIND_STRUCTURES);
        if(target != undefined)
        {
            tower.attack(target);
        }
        else if(repairTarget != undefined && repairTarget != STRUCTURE_WALL)
        {
            tower.repair(repairTarget);
        }
    }

    var amtCreeps = Object.keys(Game.creeps).length;

    var minEnergizer = 10;
    var amtEnergizer = _.sum(Game.creeps, (c) => c.memory.role == 'energizer');

    var minBuilder = 4;
    var amtBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder');

    var minControlLvl = 2;
    var amtControlLvl = _.sum(Game.creeps, (c) => c.memory.role == 'controlLvl');

    var minRepair = 3;
    var amtRepair = _.sum(Game.creeps, (c) => c.memory.role == 'repair');

    var maxCreeps = minEnergizer + minBuilder + minControlLvl + minRepair + 6;

    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

    global.debug = function()
    {
        console.log("Total Creeps: " + amtCreeps + "/" + maxCreeps);
        console.log("Energizers: " + amtEnergizer + "/" + minEnergizer);
        console.log("Controller Levelers: " + amtControlLvl + "/" + minControlLvl);
        console.log("Builders: " + amtBuilder + "/" + minBuilder);
        console.log("Repairers: " + amtRepair + "/" + minRepair);
    }

    for (let name in Memory.creeps)
    {
        if(Game.creeps[name] == undefined)
        {
            console.log("Cleared Memory of Dead Creep (RIP) " + name);
            debug();
            delete Memory.creeps[name];
        }
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
    if(amtCreeps < maxCreeps) {
        if (amtEnergizer < minEnergizer) {
            name = Game.spawns.Spawn1.createCustomCreep(energy, 'energizer');
            if (name == ERR_NOT_ENOUGH_ENERGY && amtEnergizer == 0) {
                name = Game.spawns.Spawn1.createCustomCreep(Game.spawns.Spawn1.room.energyAvailable, 'energizer')
            }
        }
        else if (amtControlLvl < minControlLvl) {
            name = Game.spawns.Spawn1.createCustomCreep(energy, 'controlLvl');
        }
        else if (amtBuilder < minBuilder) {
            name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
        }
        else if (amtRepair < minRepair) {
            name = Game.spawns.Spawn1.createCustomCreep(energy, 'repair');
        }
        else {
            name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
        }
        if (!(name < 0)) {
            console.log("Spawned new creep: " + name);
        }
    }

    global.spawnEnergizer = function ()
    {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'energizer');

        if (!(name < 0))
        {
            console.log("Spawning Energizer " + name)
        }
    }
    global.spawnControlLvl = function()
    {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'controlLvl');

        if (!(name < 0))
        {
            console.log("Spawning Control Leveler " + name);
        }
    }
    global.spawnBuilder = function()
    {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');

        if (!(name < 0))
        {
            console.log("Spawning Builder " + name);
        }
    }
    global.spawnRepair = function()
    {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repair');

        if (!(name < 0))
        {
            console.log("Spawning Repairer " + name);
        }
    }

}