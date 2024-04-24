const express = require('express'); // express requiere la libreria express
const app = express() // obj tipo express

app.use(express.json()); //app va a utilizar las librerias de json nuestras requests seran formato json

const frutas = [
    {id:1, name:'raspby', enroll:true},
    {id:2, name:'asdl,ds', enroll:true},
    {id:3, name:'asa', enroll:true}

]


const professors = [
    {id:11, name: 'ksmkdm', age:30, enroll:true},
    {id:12, name: 'kdsmkdmm', age:40, enroll:false},
    {id:13, name: 'ksdksnd', age: 23, enroll:true}
]


const books = [
    {id:1, name: 'askdmksdm', age:1930, enroll:true},
    {id:2, name: 'sdl,alsdsad,', age:1240, enroll:false},
    {id:3, name: 'as dsadnasdnansd', age: 2023, enroll:true}
]


const jedis = [
    {id: 1, name: 'okasokasoka', age: 42069, enroll: false},
    {id:2, name: 'ksdmksm', age:12133, enroll: true}
]


const students = [
    {id:9, name: 'jorge', age: 20, enroll:true},
    {id:2, name: 'mariana', age:30, enrroll: false},  //Bd local
    {id:3, name: 'antonio', age:25, enrroll:false}
];

const guitars = [
    {id:1, name: 'strat', model: 62, enroll:true},
    {id:2, name: 'les paul', model:70, enroll: false},  //Bd local
    {id:3, name: 'sg', model:59, enroll:false}
];


app.get('/', (req,res) =>{
    res.send('node js api'); //Método get lleva a ruta raiz y se hace una funcion callback de req y res dps del metodo get
});// res.send Este método se utiliza para enviar una respuesta HTTP al cliente desde el servidor

// parseInt() es una funcion
// .toString() es un método

app.get('/apiPractice/students', (req,res)=>{
    res.send(students);//Método get que lleva a la url students, y hace un callback de req y res del json 'students'
});

                                                      // Cuando se define una ruta con un parámetro dinámico se utilizan los (´:´) como en este caso :id
app.get('/apiPractice/students/:id', (req,res) =>{   // el uso de :id con los dos puntos (:) en una ruta en Express.js indica que estamos definiendo un parámetro dinámico en la ruta.
    const student = students.find(c=> c.id === parseInt(req.params.id)); // Aquí definimos la variable student que es igual al metodo .find, que busca el valor del parametro :id en el json students y dps se convierte en un int utilizando la funcion parseInt
    if (!student) return res.status(404).send('Estudiante no encontrado') // condicion retorno res de con estado 404 y un mensaje indicando que el estudiante no fue encontrado. con el metodo .send
    else res.send(student); // de lo contrario manda la var student que es igual al.find id mas la funct parseInt con propiedad req.params
});  

                     //students.find   parseInt(req.params.id)
/* Sintax método find() array.find(funcion(elemento, indice, arreglo) {
  // Condición de búsqueda
}); */


 // La propiedad req.params es un objeto que contiene propiedades asignadas a los “parámetros” de ruta nombrados. Por ejemplo, si tiene la ruta /student/:id, entonces la propiedad "id" está disponible como req.params.id.


/* Osea que la propiedad req.params
 despes va el punto (.) mas el parametro dinamico ejemplo : req.params.id
*/


 /*  Esta línea establece una ruta en tu aplicación Express.
  Indica que cuando se haga una solicitud GET a la ruta /apiPractice/students/:id, 
  se ejecutará la función  callback manejadora definida después de la coma after url*/

/* :id es un parámetro dinámico que captura el valor proporcionado en la URL
y lo hace accesible a través de req.params.id.*/


app.post('/apiPractice/students', (req,res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };
    students.push(student);
    res.send(student);
});

app.delete('/apiPractice/students/:id', (req, res) =>{
    const student = students.find(c=> c.id === parseInt(req.params.id))
    if(!student) return res.status(404).send('no se encuentra estudiante')
    
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
})



const port = process.env.port || 95;
app.listen(port, () => console.log(`escuchando en puerto ${port}...`));

app.get('/apiPractice/professors', (req, res) =>{
    res.send(professors);
})

app.get('/apiPractice/professors/:id', (req, res) =>{
    const professor = professors.find(c=> c.id === parseInt(req.params.id));
    if (!professor) return res.status(404).send('no se encuentra profesor');
    else res.send(professor)
})

app.post('/apiPractice/professors/', (req, res) =>{
    const professor = {
        id: professors.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')

    }
    professors.push(professor);
    res.send(professor);
})

app.get('/apiPractice/jedis', (req, res) =>{
    res.send(jedis)
})

app.get('/apiPractice/jedis/:id', (req, res) =>{
    const jedi = jedis.find(c=> c.id === parseInt(req.params.id));
    if (!jedi) res.status(404).send('no se encuentra jedi');
    else res.send(jedi)
})

app.post('/apiPractice/jedis/', (req, res)=>{
    const jedi = {
        id: jedi.length +1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    }
    jedis.push(jedi);
    res.send(jedi);
})

app.post('/apiPractice/guitars/', (req,res)=>{
    const guitar = {
        id: guitars.length + 1,
        name: req.body.name,
        model: parseInt(req.body.model),
        enroll: (req.body.enroll === 'true')
    }
    guitars.push(guitar);
    res.send(guitar);
})



app.get('/apiPractice/guitars/', (req,res)=>{
    res.send(guitars)
})


app.get('/apiPractice/guitars/:name', (req,res)=>{
    const guitar = guitars.find(c => c.name === JSON.stringify(guitars.params.name));
    if (!guitar) res.status(404).send('no se encuentra guitarra');
    else res.send(guitar)
})

app.get('/apiPractice/frutas', (req,res)=>{
    res.send(frutas);
})

app.get('/apiPractice/frutas/:id', (req,res)=>{
    const fruta = frutas.find(c=> c.id === parseInt(req.params.id));
    if(!fruta)res.status(404).send('no se encuentra fruta');
    else res.send(fruta)
})

app.post('/apiPractice/frutas/', (req,res)=>{
    const fruta = {
        id: frutas.length + 1,
        name: req.body.name,
        enroll: (req.body.enroll === 'true')
    };
    frutas.push(fruta);
    res.send(fruta);
})

app.get('/apiPractice/books'), (req,res)=>{
    res.send(books)
}

app.post('/apiPractice/books', (req,res)=>{
    const book = {
        id: books.length + 1,
        name: req.body.name,
        enroll: (req.body.enroll ==='true')
    }
    books.push(book);
    res.send(book)
})

app.post('/apiPractice/books', (req,res)=>{
    const book = books.find(c=> c.id === parseInt(req.params.id));
    if (!book) res.status(404).send('no se encuentra libro');
    else res.send(book) 
})


