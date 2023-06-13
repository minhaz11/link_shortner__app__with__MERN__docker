const mongoose = require('mongoose');
const linkSchema = require('../schema/linkSchema');
const Link = mongoose.model('Link',linkSchema)

const createLink = async(req, res) => {

    try {
        const main_link = req.body.main_link;
        
        if(!isValidURL(main_link)){
            return  res.json({error:true,message:'Invalid URL'});
        }

        const short_code = randString(12);

        const link = await new Link({
            main_link,
            short_code,
            expiry: Date.now() + 24*60*60*1000,
        });

        await link.save();
       
        return  res.status(200).json({short_link:req.protocol + '://' + req.get('host')+'/'+short_code});
    } catch (error) {
        return  res.status(500).json({error:true,message:'Internal Server Error'});
    }
}

const getLink = async(req, res) => {
    try {

        const code = req.params.code;
        const link = await Link.findOne({short_code:code});

        if(!link){
            return res.status(404).json({error:'Link not found'});
        }

        return  res.redirect(link.main_link);
    } catch (error) {
        return  res.status(500).json({error:true, message:'link not found'});
    }

}

function randString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


function isValidURL(url) {
    var pattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w]*)*\/?$/i;
    return pattern.test(url);
  }
  

module.exports = { createLink , getLink }