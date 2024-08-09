//const { name } = require('ejs')
const express = require ('express');
//const morgan = require ('morgan');  
const mongoose = require ('mongoose');
//const Note = require ('./models/noote');



const app = express();
 app.set('view engine','ejs');
 
//const dbURI = 'mongodb+srv://cedrique:20066Cedrick.@noote.nimmrmn.mongodb.net/?retryWrites=true&w=majority&appName=noote'
mongoose.connect("mongodb+srv://cedrique:20066Cedrick.@noote.nimmrmn.mongodb.net/test")
 const userSchema = new mongoose.Schema({
 name:String,
  dob:Number,
  password:String,
  email:String
 })
const userModel = mongoose.model("emp", userSchema);
//const emp1 = new userModel({
 // name:"cedrick codes",
  //age:23
  //})
//emp1.save();
const noteSchema = new mongoose.Schema({
  header:String,
  content:String
})
const noteModel = mongoose.model("note",noteSchema);
  //const note1 = new noteModel({
   //header:"the long journey",
   //content:"when I started coding I was a failure"
  //})
  //note1.save();

//{ useNewUrlParser: true, useUnifiedTopology: true})
       //.then((result) =>  console.log('connected'))
       //.catch((err) =>  console.log(err))

app.get('/single-note',(req,res) => {
  note.findById('66af80738befca195be4653b')
    .then ((result) => {
      res.send(result)
    }
  )

  .catch((err) =>{
    console.log('error')
  })
})



 app.listen("3000", () =>{
  console.log('listening');
 })

//app.use(morgan('dev'));

//app.get('/add-note',(req,res) =>{
//const note = new Note({
 //header: 'cedrick test',
  //content: 'i code bro',
//})
//Note.save()
  //.then((result) => {
   // res.send(result)
  //}
//)
  //.catch((err) =>{
  //  console.log('error');
 // }
//)
//})

app.use(express.static('views'));
app.use(express.urlencoded({extended: true}));

});
app.get('/note/create',(req,res)=>{
  res.render('create',{ title: 'create'});
}
)

app.get('/',(req,res)=> {
 res.render('welcome', { title: 'welcome'});
});

//app.post('/NOTES',(req,res) => {
//const user = new user(req.body)
//user.save()
 // .then((result) => {
   // res.redirect('/NOTES');
 // )
 // .catch((err) =>{
  //  console.log(err)
 // })
//})

app.get('/home',(req,res)=> {
  res.redirect('/NOTES')

  res.render('home',{ title: 'home',notes });
});

app.get('/sign',(req,res)=> {
  res.render('sign',{ title: 'new account'});
});
app.get('/log',(req,res)=> {
  res.render('log',{ title: 'log in'});
});
app.get('/about',(req,res)=> {
  res.render('about', { title: 'about' });
});

app.get('/NOTES',(req,res)=> {
  Note.find()
  .then ((result) => {
   res.render('home', { title: 'All Notes',notes:result})
})

.catch((err) =>{
  console.log('error')
})
})

app.post('/NOTES',(req,res)=> {
const note = new Note(req.body);

note.save()
  .then((result)=>  {
    res.redirect('/home');
  }
)
.catch((err) =>{
  console.log(err)
})
}
)
app.get('/notes/:id',(req,res)  => {
  const id = req.params.id
  Note.findById(id)
    .then((result)=> {
      res.render('details', { note: result, title: 'Note details'});
})
.catch((err) =>{
  console.log(err)
})
})
app.delete('/notes/:id',(req,res) =>{
  const id = req.params.id;

  Note.findByIdAndDelete(id)
    .then(result =>{
     res.json({redirect: '/Notes'})
    })
    .catch((err) =>{
      console.log(err)
    })
})

app.get('/note/create',(req,res)=> {
  res.render('create',{ title: 'new note'});
});
app.use((req,res)=>{
  res.status(404).render('404',{ title:404});
}
)

