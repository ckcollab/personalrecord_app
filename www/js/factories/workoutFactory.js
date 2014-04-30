angular.module('personal_record.factories.workoutFactory', [])

.factory('WorkoutFactory', function() {
    var workoutFactory = {
        _last_set_viewed: undefined,
        current_set_index: 0,
        _sets: [],
        get_set: function(index) {
            this.current_set_index = index;
            this._last_set_viewed = this._sets[this.current_set_index];
            return this._last_set_viewed;
        },
        get_sets: function() {
            return this._sets;
        },
        get_previous_set: function() {
            this.current_set_index--;
            return this._sets[this.current_set_index];
        },
        get_next_set: function() {
            this.current_set_index++;
            return this._sets[this.current_set_index];
        },
        get_last_set_viewed: function() {
            return this._last_set_viewed;
        },
        add_set: function(set) {
            this.current_set_index++;
            this._sets.push(set);
            this._last_set_viewed = set;
        },
        set_set: function(index, set) {
            this._sets[index] = set;
        }
    };

    return workoutFactory;
});
