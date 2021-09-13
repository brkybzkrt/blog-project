module.exports=searchRegex=(text)=> {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};