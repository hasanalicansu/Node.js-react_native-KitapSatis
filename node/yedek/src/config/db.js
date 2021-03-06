const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then(() => console.log("veritabanına bağlanıldı"))
  .catch((hata) => console.log("db baglantı hatası", hata));
