var roleBuilder = require('role.builder');

module.exports =
{
    run: function(creep)
    {
        var spawn1 = Game.spawns.Spawn1;

        if (creep.memory.energizing == true && creep.carry.energy == 0) {
            console.log(creep + " Returning to Source");
            creep.memory.energizing = false;
        }
        else if (creep.memory.energizing == false && creep.carry.energy == creep.carryCapacity) {
            console.log(creep + " Going to Buildsite");
            creep.memory.energizing = true;
        }

        if (creep.memory.energizing == true) {
            var needRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (nR) => nR.hits < nR.hitsMax && nR.structureType != STRUCTURE_WALL});
        if(needRepair != undefined)
        {
            if(creep.repair(needRepair) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(needRepair);
            }
        }
        else
        {
            roleBuilder.run(creep);
        }

        }

        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};