const router = require('express').Router();
const config = require('config');

const cloudinary = require('cloudinary').v2;
const Ships = require('../models/Ships');
const multer = require('multer');
const upload = multer();
const streamifier = require('streamifier');

const cloud_name = config.get('cloud_name');
const api_key = config.get('api_key');
const api_secret = config.get('api_secret');

router.get('/changeURL', async (req, res) =>{
    try{
        let shipList = await Ships.find();

        shipList.forEach(async (ship) => {
            let colonIndex = ship.image.indexOf(':')
            let newString = ship.image.substring(0, colonIndex) + 's' + ship.image.substring(colonIndex);
            
            await Ships.updateOne({name : ship.name}, {$set: {image: newString}});
        })

        
    }catch(err){
        console.log(err);
    }

    console.log('in here');
    res.redirect('/')
})
router.post('/selected', async (req, res) => {
    let ships = req.body.ships;
    let returnArray = [];
    console.log(ships);
    if (ships[0] == 'All') {
        if (req.body.faction == 'axis') {
            returnArray = ['Italy', 'Finland', 'Japan', 'Germany', 'Axis Neutral / Instalations']
        }
        else {
            returnArray = ['France', 'New Zealand', 'United Kingdom', 'Australia', 'Greece', 'Poland', 'United States', 'Canada', 'Netherlands', 'Soviet Union', 'Allies Neutral / Instalations']
        }
    }
    else {
        returnArray = ships;
    }
    //console.log(returnArray);
    sendArray = await Ships.find({ nation: { $in: returnArray } });


    return res.status(200).json(sendArray);
});

router.post('/ship-url', upload.single('image'), async (req, res) => {
    console.log(req.file);
    console.log(req.body);

    cloudinary.config({
        cloud_name: "dd3ohuzsz",
        api_key: api_key,
        api_secret: api_secret
    })

    let data = await uploadFromBuffer(req);
    let linkToSave = data.url;

    console.log(linkToSave);
    return res.status(200).json(linkToSave);
});

function uploadFromBuffer(req) {
    return new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream({}, (error, result) => {
            if (result) {
                resolve(result);
            }
            else {
                reject(error);
            }
        });

        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    });

}

router.put('/update', async (req, res) => {
    let newProps = req.body;
    console.log(newProps);
    try {
        let ship = await Ships.findOneAndUpdate({ name: newProps.name }, { $set: newProps });
        res.status(200).json({ success: 'success' });
    } catch (err) {
        console.error(err);
    }
});

router.delete('/ship', async (req, res) => {
    let shipName = req.body.name;
    console.log(shipName);
    try {
        await Ships.remove({ name: shipName });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'error' });
    }
    res.status(200).json({ success: 'success' });
});
router.put('/', async (req, res) => {
    console.log(req.body);
    let { name, units, nation, points, image } = req.body;

    units = parseInt(units);
    points = parseInt(points);
    console.log(name, units, nation, points);

    try {
        let newShip = new Ships({
            name,
            number_available: units,
            nation,
            points,
            image,
            class: req.body.class
        });
        await newShip.save();
        res.status(200).json({ success: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'error' });
    }
});
module.exports = router;