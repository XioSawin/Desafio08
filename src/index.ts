import express from 'express'

const app = express()

app.use(express.json());

let productos: any[] = []; //inicializado como array vacio, no sabemos qué va a ir adentro.

app.get('/producto', (req, res) => {

    if(!productos.length){ 
        res.json({error: 'no hay productos cargados'});
    }

    res.json(productos); //devolver los datos en formato json
})

app.post('/producto', (req, res) => {
    const {title, price, thumbnail} = req.body;

    let id = (productos.length)+1;

    const producto = {
        id, 
        title, 
        price, 
        thumbnail
    }

    productos.push(producto);
    res.sendStatus(201);
})

app.get('/producto/:id', (req, res)=>{ //get info by id
    const id = req.params.id;

    const producto = productos.find(producto => producto.id == id);

    if(!producto){ 
        res.json({error: 'producto no encontrado'});
    }

    res.json(producto);
})


app.listen(8080, () => {
    console.log("I´m driving driving on port 8080");
})