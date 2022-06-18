

const { Schema, model } = require('mongoose');

const MensaheSchema = Schema({

    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usario',
        requiere: true
    },
    para: {
        type: Schema.Types.ObjectId,
        requiere: true,
        unique: true,
    },
    mensaje: {
        type: String,
        requiere: true,
    }
}, {
    timestamps: true,
});

MensaheSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    return object;
})






module.exports = model('Mensaje', MensaheSchema);