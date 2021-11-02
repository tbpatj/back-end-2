let houses = require("./db.json");
let globalID = houses.length + 1;

module.exports = {
    getAllHouses: (req, res) => {
        console.log(`request from ${req.headers.origin}`);
        res.status(200).send(houses);
    },
    deleteHouse: (req, res) => {
        let {curID} = req.params;
        
        let index = houses.findIndex( (elem) => {
            return elem.id === +curID;
        });
        console.log(index);
        houses.splice(index,1);
        res.status(200).send(houses);
    },
    createHouse: (req, res) => {
        console.log(req.body);
        let {address, price, imageURL} = req.body;
        
        if(Number(price)){
            let newHouse = {address, price, imageURL, id: globalID};
            globalID ++;
            houses.push(newHouse);
            res.status(200).send(houses);
        } else {
            console.log(`Bad Request from ${req.headers.origin}`);
            res.status(400).send("The price has to be a number");
        }
    },
    updateHouse: (req, res) => {
        let {type} = req.body;
        let {id} = req.params;
        let index = houses.findIndex( (elem) => elem.id === +id);
        
        if(index != -1 ){
            if(type === 'plus'){
                houses[index].price = houses[index].price + 10000;
            } else if(type === 'minus'){
                if(houses[index].price - 10000 > 0){
                    houses[index].price -= 10000;
                } else {
                    houses[index].price = 0;
                }
            }
            res.status(200).send(houses);
        }
        
    }

};