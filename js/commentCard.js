import { elem } from "./createElem.js";


export function card(cmt) {

    let divCard = elem('div', 'cardComent', false, false, false, false, cmt.id)
    let h2 = elem('h2', false, 'Titel ot the comment')
    let h3 =elem('h3',false,'Description')
    let h4 = elem('h4', false, cmt.title)
    let p = elem('p', false, cmt.description)    
    let h6 = elem('h6', false,'Comment created on :'+ cmt.timeCreated)
    let span = elem('span', 'spanBtnsCmt')
    let btnEdit = elem('button', 'editComment', 'EDIT')
    let btnDlt = elem('button', 'delComment', 'DELETE')

    
    divCard.appendChild(h2)
    divCard.appendChild(h4)
    divCard.appendChild(h3)
    divCard.appendChild(p)
    divCard.appendChild(h6)
    span.appendChild(btnEdit)
    span.appendChild(btnDlt)
    divCard.appendChild(span)

    return divCard



}