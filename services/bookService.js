

export async function getAllBoks(url){
    
    const data = await fetch(url)
 return  data.json()

}