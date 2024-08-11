
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const noteSchema = new Schema( {
header:{
    type: String,
    required: true
},
content: {
    type: String,
    required: true
},
//username:{
   // type:String,
    //required:true
//}
},
 {timestamps: true});


const Note = mongoose.model('Note',noteSchema);

module.exports = Note;

export default noote;
