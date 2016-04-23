Avatars = new FS.Collection("avatars", {
  stores: [
    new FS.Store.GridFS("avatarMega", {
      transformWrite: function(fileObj, readStream, writeStream) {
        var size = '300';
        gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
      }
    }),
    new FS.Store.GridFS("avatarMini", {
      transformWrite: function(fileObj, readStream, writeStream) {
        var size = '30';
        gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);

      }
    }),
  ]
});


Avatars.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download:function(){
    return true;
  }
});