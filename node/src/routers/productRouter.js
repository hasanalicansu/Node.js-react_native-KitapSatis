const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const productController = require("../controllers/productController");

router.post("/newProduct", authMiddleware, productController.createNewProduct);//Yeni ürün oluşturur
router.get("/plusCounterProduct/:id", authMiddleware, productController.plusCounterProduct); //ID'li ürün aramalarını getirir
router.get("/dellProduct/:id", authMiddleware, productController.dellProduct); //ID'li ürünü siler
router.patch("/updateProduct/:id",authMiddleware,productController.updateProduct)//ID'li ürünü günceller
router.patch("/updateSituationProduct/:id",authMiddleware,productController.updateSituationProduct)//ID'li ürünün durumunu günceller

router.get("/GetTenLastProduct", authMiddleware, productController.GetTenLastProduct); //Son eklenen 10 ürünü getirir
router.get("/GetTenMostProduct", authMiddleware, productController.GetTenMostProduct); //En çok tıklanan 10 ürünü getirir

router.get("/GetProductOwner/:id", authMiddleware, productController.GetProductOwner); //Ürünün sahibini getirir
router.get("/GetVisitorProduct/:id", authMiddleware, productController.GetVisitorProduct); //ÜMisafir kullanıcı için satılanlar gelir

router.get("/GetOwnerProductOnSale", authMiddleware, productController.GetOwnerProductOnSale); //Kullanıcının satıştaki ürünlrini getirir
router.get("/GetOwnerProductSold", authMiddleware, productController.GetOwnerProductSold); //Kullanıcının satılan ürünlerini getirir

router.get("/GetSearch", authMiddleware, productController.GetSearch); //Kullanıcının satılan ürünlerini getirir



module.exports = router;
