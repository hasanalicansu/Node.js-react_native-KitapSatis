const router =require("express").Router();
const authMiddleware = require('../middlewares/authMiddleware');
//controller
const userController =require("../controllers/userController")
//hesap oluşturma

const validatorMiddleware = require('../middlewares/validation_middleware');

router.post("/createAccount",userController.createNewAccount);
router.post("/login",userController.login);
router.get("/login/token",authMiddleware,userController.oturumAcanUserBilgileri)
router.patch("/updateAvatar",authMiddleware,userController.updateAvatar)//ID'li ürünün durumunu günceller



router.get('/forget-password', userController.forgetPasswordFormunuGoster);//token hatalıysa sayfa açılır
router.get('/success-password', userController.successPasswordFormunuGoster);//başarılı değiştirme
router.post('/forgetPassword',validatorMiddleware.validateEmail(), userController.forgetPassword);//email göderiri
router.get('/reset-password/:id/:token', userController.yeniSifreFormuGoster);//maildeki url ile gidilen sayfa
router.get('/reset-password', userController.yeniSifreFormuGoster);
router.post('/reset-password', validatorMiddleware.validateNewPassword(), userController.yeniSifreyiKaydet);//yeni şifre kaydetme için

module.exports = router;