const express = require('express');
const app = express();

const joi = require('joi'); //used for validation
app.use(express.json());

const books = [
    {title: 'Harry Potter', id: 1},
    {title: 'Twilight', id: 2},
    {title: 'Lorien Legacies', id: 3}
    ]

//home page
app.get('/',(req,res)=>{
    //console.log("hello");
    return res.send("Welcome");
});

//all books
app.get('/api/books',(req,res)=>{
   
   return res.send(books);
});

//return element with respect to id
app.get('/api/books/:id',(req,res)=>{
    if(books.find(b=>b.id === parseInt(req.params.id)))
    {
       return res.send(books.find(b=>b.id === parseInt(req.params.id)));
    }
    else{
        return res.send("Data not found");
    }
});

//add book
app.post('/api/books/',(req,res)=>{
    var book_title = req.body.title;
    //res.send(book_title);
    if(book_title.length <=3)
    {
        return res.send("Book title atleast consist of 3 characters");
    }
    const b={
        title: book_title, id: books.length+1
    }
    books.push(b);
    return res.status(200).send(books);
});

//update book
app.put('/api/books/:id',(req,res)=>{

    var bk = books.find(b=> b.id === parseInt(req.params.id))
    if(!bk)
    {
        return res.send("Data not found");
    }
    bk_title = req.body.title;
    if(bk_title.length <=3)
    {
        return res.send("Book title atleast consist of 3 characters");
    }
    bk.title = bk_title;
    return res.send(books);
})

//delete book

app.delete('/api/books/:id',(req,res)=>{
    const bk = books.filter(b=>b.id === parseInt(req.params.id)); 
    if(!bk)
    {
        return res.send("Data not found");
    }
    const ind = books.indexOf(bk);
    books.splice(ind,1);
    return res.send(books);
})

app.listen(3000,()=>{
    console.log('listening...');
});