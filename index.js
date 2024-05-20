const express = require("express");
const {faker} = require('@faker-js/faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/about', (req, res) => {
    res.send("About Us");
});

app.get('/contact', (req, res) => {
    res.send("Contact Us");
});

app.get('/services', (req, res) => {
    res.json([
        {
            id: 1,
            name: "Web Development",
            description: "Web development is the work involved in developing a Web site for the Internet (World Wide Web) or an intranet (a private network)."
        },
        {
            id: 2,
            name: "Mobile Development",
            description: "Mobile app development is the act or process by which a mobile app is developed for mobile devices, such as personal digital assistants, enterprise digital assistants or mobile phones."
        },
        {
            id: 3,
            name: "SEO",
            description: "Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines."
        }
    ])
});

app.get('/services/:id', (req, res) => {
    const { id, name } = req.params;
    res.json({
        id, 
        name: "Web Development",
        description: "Web development is the work involved in developing a Web site for the Internet (World Wide Web) or an intranet (a private network)."
    })
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
        categoryId,
        productId,
        name: "Product Name",
        description: "Product Description"
    })
});

app.get('/users', (req, res) => {
    const { limit, offset} = req.query;
    if (limit && offset)
    {
        res.json({
            limit,
            offset,
        });
    }
    else
    {
        res.send('No limit and offset');
    }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

