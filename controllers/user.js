const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

exports.signup = async (req, res, next) => {
    const { email , password} = req.body
     try { 
         const emailExist = await User.find({email});
         if (emailExist.length >= 1) {
            return res.status(409).json({
                message: "email déja existe"
            })
        }
        const passwordBcrypt =  await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            password: passwordBcrypt
        });
        user.save()
          res.status(201).json({ message: 'Utilisateur créé'});
     } catch (err) {
                
        console.log(err);
        res.status(500).json({
            error: err
        });
     }
 
    };
       
    exports.login = async(req, res, next) => {
        const { email , password} = req.body
        try {
           const user =  await User.findOne({email});
           if(!user){
             return res.status(401).json({ error: 'Utilisateur non trouvé'});
           }
           const  comper =   await bcrypt.compare(password, user.password);
           if(!comper){
            return res.status(401).json({ error: 'Mot de passe incorrect'})
           }else{
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '2h'}
                    )
              });
           }
        } catch (error) {
            console.log(error);
                res.status(500).json( 'inscrire svp')
        }
    }
 
// exports.login = (req, res, next) => {
//     const {email ,password} = req.body;
//     User.findOne({ email })
//     .then(user => {
//         if(!user) {
//             return res.status(401).json({ error: 'Utilisateur non trouvé'});
//         }
//         bcrypt.compare(password, user.password)
//         .then(valid => {
//             if(!valid) {
//                 return res.status(401).json({ error: 'Mot de passe incorrect'})
//             }
//             res.status(200).json({
//               userId: user._id,
//               token: jwt.sign(
//                   { userId: user._id },
//                   'RANDOM_TOKEN_SECRET',
//                   { expiresIn: '24h'}
//                   )
//             });
//         })
//         .catch(error => res.status(500).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };