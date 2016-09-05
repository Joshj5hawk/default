module.exports =
{
    run: function(creep)
    {
        var controller = creep.room.controller;

        if (creep.memory.energizing == true && creep.carry.energy == 0) {
            console.log(creep + " Returning to Source");
            creep.memory.energizing = false;
        }
        else if (creep.memory.energizing == false && creep.carry.energy == creep.carryCapacity) {
            console.log(creep + " Going to Controller");
            creep.memory.energizing = true;
        }

        if (creep.memory.energizing == true) {
            //if (creep.transfer(spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(controller);
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