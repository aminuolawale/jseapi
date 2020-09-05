
module.exports = {
    notes: async (parent, args, {models}) => {
        return await models.Note.find();
    },
    note: async (parent, args, {models}) => {
      return models.Note.findById(args.id);
    },
    noteFeed: async (parent, args, {models}) =>{
      console.log("did we enter here at all?");
      // hardcode the query limit to 10
      const limit = 10;
      // initialize hasnextpage and cursro to false and an empty object respectively
      let hasNextPage = false;
      // if there is a cursor build a query for notes whose ids are less than the cursor
      let cursorQuery = {};
      if(args.cursor){
        cursorQuery = {_id:{$lt:args.cursor}};
      }
      // find limit +1 notes in the db with the query and sort from newest to oldest
      let notes = await models.Note.find(cursorQuery).sort({_id:-1}).limit(limit +1);
      // set value of hasnext page and trim the response to the real size of the limit
      hasNextPage = notes.length > limit? true:false;
      notes = notes.length > limit? notes.slice(0, -1):notes;
      // set the new cursor too the id of the last note in the response
      const newCursor = notes[notes.length-1]._id;
      // return the notes cursor and hasnextpage
      return {
        notes, cursor:newCursor, hasNextPage
      };
    },
    users: async (parent, args, {models}) =>{
      return models.User.find();
    },
    user: async (parent, args, {models}) => {
      return models.User.findOne({username:args.username});
    },
    me: async (parent, args, {models, user}) =>{
      return models.User.findOne({_id:user.id});
    }
  }