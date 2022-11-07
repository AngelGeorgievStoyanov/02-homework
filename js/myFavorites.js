import {getBookById} from '../services/bookService.js'

export  function favorites(id){
    
   const book =  getBookById(id)

   return book

  

}