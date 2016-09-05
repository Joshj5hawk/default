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
            console.log(creep + " Going to Spawn");
            creep.memory.energizing = true;
        }

        if (creep.memory.energizing == true) {
            if (creep.transfer(spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn1);
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