photoStore = new FS.Store.GridFS("my_photos");

Meteor.subscribe("my_photos");

photos = new FS.Collection("my_photos", {
    stores: [photoStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
      }
});

photos.allow({
    insert: function (userId, file) {
        return !!userId;
    },
    update: function (userId, file) {
        return file.creatorId == userId
    },
    download: function (userId, file) {
        return file.creatorId == userId
    },
    fetch: []
});
