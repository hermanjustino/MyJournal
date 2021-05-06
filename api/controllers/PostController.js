
module.exports= {

    posts: async function(req,res) {

        try{
            const posts = await Post.find()
        res.send(posts)
        } catch(err) {
            res.serverError(err.toString())
        }

        console.log('Finished creating post object')
        return res.end()
       
    },

    create: function(req,res) {

        const title = req.param('title')
        const postBody =  req.param('postBody')

        console.log('My Title: ' + title)

          Post.create({title: title, body: postBody}).exec(function(err) {

            if (err) {

                return res.serverError(err.toString())

            }
            console.log('Finished creating object')

            res.redirect('/home')

            return res.end()
        })
    //     const newPost = {
    //         id: 4, 
    // title: title, 
    // body: postBody}
    //     allPosts.push(newPost)

        //res.end()
    },

    findById: function(req, res) {

        const postId = req.param('postId')


        const filteredPosts = allPosts
        .filter( p => {
            return p.id == postId
        })

        if(filteredPosts.length > 0) {
            res.send(filteredPosts[0])
        } else {
            res.send('Failed to find post by id: ' + postId)
        }

        res.send(postId)

    },

    delete: async function(req, res) {

        const postId = req.param('postId')

        await Post.destroy({id: postId})

        res.send('Finished deleting post now')
    }
}