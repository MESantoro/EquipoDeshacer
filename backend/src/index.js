const express=require('express');
const app = express ();

const morgan = require ('morgan')
app.set('puerto' , 4000);
app.use(morgan('dev'))

app.use(require('./routes/routes'))

app.listen(app.get('puerto'), ()=>{
    console.log('El servidor esta corriendo en el puerto', app.get('puerto'))
})