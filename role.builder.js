var roleControlLvl = require('role.controlLvl');

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
            var buildSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(buildSite != undefined)
            {
                if(creep.build(buildSite) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(buildSite);
                }
            }
            else
            {
                roleControlLvl.run(creep)
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