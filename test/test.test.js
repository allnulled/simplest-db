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
        console.log("SimplestDB seems to work in Node.js. Try on browser.");
        const SimplestFS = SimplestDB.getFS();
        const rootIndexJs = SimplestFS.insert("fs", { path: "/root/index.js", contents: "console.log('Hiiii!')" });
        const fsRes1 = SimplestFS.select("fs", f => f.id === rootIndexJs);
        SimplestFS.update("fs", rootIndexJs, { contents: "console.log('Byeeeee!')" });
        const fsRes2 = SimplestFS.select("fs", f => f.id === rootIndexJs);
        SimplestFS.delete("fs", rootIndexJs);
        const fsRes3 = SimplestFS.select("fs", f => f.id === rootIndexJs);
        if(Object.keys(fsRes1).length !== 1) throw new Error("Error 4:");
        if(fsRes1[rootIndexJs].contents.indexOf("Hii") === -1) throw new Error("Error 5:");
        if(Object.keys(fsRes2).length !== 1) throw new Error("Error 6:");
        if(fsRes2[rootIndexJs].contents.indexOf("Byeee") === -1) throw new Error("Error 7:");
        if(Object.keys(fsRes3).length !== 0) throw new Error("Error 8:");
        console.log("SimplestFS seems to work in Node.js. Try on browser.");
        const SimplestCache = SimplestDB.getCache();
        const cacheId1 = SimplestCache.insert("cache", { key: "0001" });
        const cacheRes1 = SimplestCache.select("cache", i => i.key === "0001");
        SimplestCache.update("cache", cacheId1, { key: "0002" });
        const cacheRes2 = SimplestCache.select("cache", i => i.key === "0001");
        SimplestCache.delete("cache", cacheId1);
        const cacheRes3 = SimplestCache.select("cache");
        if(Object.keys(cacheRes1).length !== 1) throw new Error("Error 20:")
        if(Object.keys(cacheRes2).length !== 0) throw new Error("Error 31:")
        if(Object.keys(cacheRes3).length !== 0) throw new Error("Error 35:")
        console.log("SimplestCache seems to work in Node.js. Try on browser.");
    } catch (error) {
        console.error(error);
    }
};

main();