//const { name } = require('ejs')
const express = require ('express');
const mongoose = require( 'mongoose');
const bodyParser = require('body-parser');
//const bcrypt = require ('bcryptjs');
const session = require('express-session');
const MongoStore = require ('connect-mongo');
const cookieparser = require('cookie-parser');
import Note from ('noote.js');
import User from ('user.js');
import authRoutes from  ('authroutes.js');
const jwt = require ('jsonwebtoken');




const app = express();
app.set('view engine','ejs');
app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
return jwt.sign({id},'cedmade secret',{
    expiresIn: maxAge
});
}

//const dbURI = 'mongodb+srv://cedrique:20066Cedrick.@noote.nimmrmn.mongodb.net/?retryWrites=true&w=majority&appName=noote'
mongoose.connect("mongodb+srv://cedrique:20066Cedrick.@noote.nimmrmn.mongodb.net/test")

app.use(session({
    secret: 'cedrique_made_key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb+srv://cedrique:20066Cedrick.@noote.nimmrmn.mongodb.net/test"
     
       }),
  }));


app.get('/single-note',(req,res) => {
 Note.findById('66af80738befca195be4653b')
 .then ((result) => {
   res.send(result)
 }
 )

 .catch((err) =>{
   console.log(err)
  })
})



app.listen("3000", () =>{
 console.log('listening');
})


app.use(express.static('views'));
app.use(express.urlencoded({extended: true}));

app.get('/note/create',(req,res)=>{
 res.render('create',{ title: 'create'});
}
)

app.get('/',(req,res)=> {
  //es.setHeader('Set-cookies','cookie1=user');
  res.cookie('ced',true);

res.render('welcome', { title: 'welcome'});
});
//routes
app.get('/home',(req,res)=> {
 res.redirect('/NOTES')

 res.render('home',{ title: 'home'});
});

app.get('/sign',(req,res)=> {
 res.render('sign',{ title: 'new account'});
});

   //signing up
app.get('/profile',(req,res) => {
    res.render('profile'  ,{ title: 'Profile' });
    });

app.get('/log',(req,res)=> {
res.render('log',{ title: 'login' });
});
//log in sessions

app.post('/log', async (req, res) => {
   try {
        const { username, password } = req.body;
        const user = await User.findOne({ username,password });

        if (user ) {
            req.session.userId = user._id;
            const token = createToken(user._id);
            res.cookie('jwt',token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({user: user._id}),
            res.redirect('/NOTES');
       } else {
            res.send('Invalid username or password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
  //about route

app.get('/about',(req,res)=> {
 res.render('about', { title: 'about' });
});

//all notes
app.get('/NOTES',(req,res)=> {
    Note.find()
    .then ((result) => {
   res.render('home', { title: 'All Notes',notes:result})
   })
   
   .catch((err) =>{
    console.log(err)
   })
   })
   //saving notes
   app.post('/NOTES',(req,res)=> {
   const note = new Note(req.body);
   
   note.save()
    .then((result)=> {
    res.redirect('/home');
    }
   )
   .catch((err) =>{
    console.log(err)
   })
   })
   //note body
   app.get('/notes/:id',(req,res) => {
    const id = req.params.id
   Note.findById(id)
   .then((result)=> {
   res.render('details', { note: result, title: 'Note details'});
   })
   .catch((err) =>{
    console.log(err)
   })
   })

   //deleting
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


    app.get('/NOTES', (req, res) => {
        if (!req.session.userId) {
          return res.redirect('/welcome');
        }

        res.send('home');
      });


app.get('/note/create',(req,res)=> {
 res.render('create',{ title: 'new note'});
});
app.use((req,res)=>{
 res.status(404).render('404',{ title:404});
})
