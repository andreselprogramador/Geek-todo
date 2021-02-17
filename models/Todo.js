const {Schema, model} = require('mongoose');

const TodoSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    }
});

TodoSchema.method("toJSON", function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model("Todo", TodoSchema);