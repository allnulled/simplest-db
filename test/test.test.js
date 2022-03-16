const SimplestDB = require(__dirname + "/../src/simplest-db.js");

db = SimplestDB.create({ schema: "main", tables: { fichero: {} } });

main = async function() {
    try {
        const id1 = db.insert("fichero", { ruta: "/root/index.js" });
        const id2 = db.insert("fichero", { ruta: "/root/lib.1.js" });
        const id3 = db.insert("fichero", { ruta: "/root/lib.2.js" });
        const id4 = db.insert("fichero", { ruta: "/root/lib.3.js" });
        const files = db.select("fichero", f => ( f && f.ruta ? f.ruta : "" ).startsWith("/root/lib.1.js" ));
        db.update("fichero", id2, { ruta: "/root/lib2.1.js" });
        db.update("fichero", id3, { ruta: "/root/lib2.2.js" });
        db.update("fichero", id4, { ruta: "/root/lib2.3.js" });
        db.delete("fichero", id1);
        const files2 = db.select("fichero", f => ( f && f.ruta ? f.ruta : "" ).startsWith("/root" ));
        const fileIds2 = Object.keys(files2);
        if(fileIds2.length !== 3) {
            throw new Error("Error 1:");
        }
        // db.delete("fichero", id1);
        db.delete("fichero", id2);
        db.delete("fichero", id3);
        db.delete("fichero", id4);
        console.log("Seems to work in Node.js. Try on browser.");
    } catch (error) {
        console.error(error);
    }
};

main();