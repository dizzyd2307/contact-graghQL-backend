const graphql = require('graphql');
const Contact = require('../schema/contact');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLArray, GraphQLList, GraphQLNonNull  } = graphql;

const ContactType = new GraphQLObjectType({
    name: 'Contact',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
        emailAddress: {type: new GraphQLList(GraphQLString)},
        contactNumber: {type: new GraphQLList(GraphQLString)}
    })
})

const rootQuery = new GraphQLObjectType({

    name: 'RootQueryType',
    fields: {
        // contact:{
        //     type: ContactType,
        //     args: { id: { type: GraphQLID } },
        //     resolve: (parent, args) => {
        //         return new Promise((resolve, reject) =>{
        //             Contact.findById(args.id);
        //         })
                

        //     }
        // },
        contacts:{
            type: new GraphQLList(ContactType),
            resolve: (parent,args) =>{
                return new Promise((resolve, reject) =>{
                    Contact.find({}, function(err,result){
                        if(err){
                            console.log(err)
                        }
                        if(result){
                            resolve(result)
                        }
                    })
                })
                
            }
        }
    }


})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addContact:{
            type: ContactType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                emailAddress: {type: new GraphQLList(GraphQLString)},
                contactNumber: {type: new GraphQLList(GraphQLString)}
            },
            resolve(parent, args){
                let contact = new Contact({
                    name: args.name,
                    lastName: args.lastName,
                    emailAddress: args.emailAddress,
                    contactNumber: args.contactNumber
                });
                return contact.save();
            }
        },
        updateContact:{
            type: ContactType,
            args:{
                id: { type: GraphQLID},
                name: { type: GraphQLString},
                lastName: {type: GraphQLString},
                emailAddress: {type: new GraphQLList(GraphQLString)},
                contactNumber: {type: new GraphQLList(GraphQLString)}
            },
            resolve(parent,args){
                Contact.findOne({_id: args.id}, function(err,res){
                    if(err){
                        return console.log(err);
                    }
                    if(res){
                        if(args.name){
                            res.name = args.name.trim();
                        }
                        if(args.lastName){
                            res.lastName = args.lastName.trim();
                        }
                        if(args.emailAddress){
                            res.emailAddress = args.emailAddress
                        }
                        if(args.contactNumber){
                            res.contactNumber = args.contactNumber
                        }

                       return res.save();
                    }
                })
            }
        },
        deleteContact:{
            type: ContactType,
            args:{
                id: { type: GraphQLID}
            },
            resolve(parent,args){
                Contact.remove({_id: args.id},function(err,res){
                    if(err){
                        return console.log(err);
                    }

                    if(res){
                        return console.log('Delete is perfect')
                    }
                })
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation
});

