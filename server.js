const app=require('./functions/index')
app.listen(process.env.PORT || 5000, () => {
        console.log("Server Online")
    })