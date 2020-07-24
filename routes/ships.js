const router = require('express').Router();

const Ships = require('../models/Ships');

router.post('/selected', async (req, res) => {
    let ships = req.body.ships;
    let returnArray = [];
    console.log(ships);
    if (ships[0] == 'All') {
        if (req.body.faction == 'axis') {
            returnArray = ['Italy', 'Finland', 'Japan', 'Germany', 'Neutral / Instalations']
        }
        else {
            returnArray = ['France', 'New Zealand', 'United Kingdom', 'Australia', 'Greece', 'Poland', 'United States', 'Canada', 'Netherlands', 'Soviet Union', 'Neutral / Instalations']
        }
    }
    else {
        returnArray = ships;
    }
    //console.log(returnArray);
    sendArray = await Ships.find({ nation: { $in: returnArray } });


    return res.status(200).json(sendArray);
});
async function nationWrapper(ships) {
    return new Promise(async (resolve) => {
        let returnArray = []
        try {
            await ships.map(async (ship) => {
                //console.log(ship);
                let result = await Ships.find({ nation: ship });
                // new Promise.all(result => {
                //     result.map(ship => {
                //         returnArray.push(ship);

                //     });
                //     resolve();
                // });
                //console.log(result);
                console.log('pushed');
                returnArray.push(result);
            });
            console.log('about to resolve');
            resolve(returnArray);
        } catch (err) {
            console.log(err);
        }
    })
}
async function findNation(ship) {
    return new Promise((resolve, reject) => {
        Ships.find({ nation: ship }).then(result => {
            console.log(result);
            resolve(result)
        });
    })
}
router.put('/', async (req, res) => {
    console.log(req.body);
    let { name, units, nation, points } = req.body;

    units = parseInt(units);
    points = parseInt(points);
    console.log(name, units, nation, points);

    try {
        let newShip = new Ships({
            name,
            number_available: units,
            nation,
            points
        });
        await newShip.save();
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;