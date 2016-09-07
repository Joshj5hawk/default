module.exports =
{
    run: function(creep)
    {
        var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.energy < s.energyCapacity});

        if (creep.memory.energizing == true && creep.carry.energy == 0) {
            console.log(creep + " Returning to Source");
            creep.memory.energizing = false;
        }
        else if (creep.memory.energizing == false && creep.carry.energy == creep.carryCapacity) {
            console.log(creep + " Going to Spawn");
            creep.memory.energizing = true;
        }

        if (creep.memory.energizing == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity});
            if(structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
}