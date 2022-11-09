import {getBookById} from '../services/bookService.js'

export  function favorites(id){
    
   return  getBookById(id);

}