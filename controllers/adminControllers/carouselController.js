const { Carousel } = require('../../models/carousel');
const {base64Decrypt} = require('../../utilities/base64');

let carousel = {}

carousel.createCarousel = async (req, res) => {
    const newCarousel = new Banner({
        ...req.body,
        image_path: base64Decrypt(req.body.photo, 'SLIDE'),
        
    })
    try {
        const carousel  = await newCarousel.save()
        res.json({
            data: {
                carousel,
            },
            message: "Carousel was added suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
        
    }
}

carousel.carouselList = async (req, res) => {
    try {
        res.json({
            data: {
                carousel: await Carousel.find(),
            },
            message: "Suceesfully retrived!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })

    }
}

carousel.removeCarousel = async (req, res) => {
    try{
        res.json({
            data: {
                banner: await Carousel.findByIdAndDelete(req.params.id),
            },
            message: "Carousel was deleted suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })

    }
}
carousel.updateCarousel = async (req, res) => {
    
    try {
        const banner = await Carousel.findByIdAndUpdate(req.params.id,  {
            $set: {
                ...req.body,
                image_path: base64Decrypt(req.body.photo, 'SLIDE'),
            }
            },{new: true});
        res.json({
            data: {
                banner,
            },
            message: "Banner was updated suceesfully!",
            error: false
        })
    }catch(err){
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
        
    }
}

module.exports = carousel;