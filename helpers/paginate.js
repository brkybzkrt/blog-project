module.exports=paginate=(options)=>{

    let output=``


    if(options.hash.currentPage===1){
        output+=`<li class="page-item disabled">
        <a class="page-link" >First</a>
        </li>`
     
    }
    else{
        output+=`<li class="page-item">
        <a class="page-link" href="?page=1">First</a>
        </li>`
    }

    let i=(Number(options.hash.currentPage) >4 ? Number(options.hash.currentPage)-2: 1)

    if(i!==1){
        output+=`<li class="page-item disabled">
        <a class="page-link" >...</a>
        </li>`
    }

    for(;i<=(Number(options.hash.currentPage)+2) && i<=options.hash.pages; i++){
        if(i===options.hash.currentPage){
            output+=`<li class="page-item active">
            <a class="page-link">${i}</a>
            </li>`
        }
        else{
            output+=`<li class="page-item ">
            <a class="page-link" href="?page=${i}">${i}</a>
            </li>`
        }

        if(i===Number(options.hash.currentPage)+2 && i<options.hash.pages){
            output+=`<li class="page-item disabled">
        <a class="page-link" >...</a>
        </li>`
        }
    }

    if(Number(options.hash.currentPage)===Number(options.hash.pages)){
        output+=`<li class="page-item disabled">
        <a class="page-link" >Last</a>
        </li>`
    }
    else{
        output+=`<li class="page-item ">
        <a class="page-link" href="?page=${options.hash.pages}">Last</a>
        </li>`
    }
    return output
    
}