const app=require('./src/index')
app.listen(process.env.PORT || 5000, () => {
        console.log("Server Online")
    })