import {elem} from './createElem.js';


export async function editForm(comment) {


    let form = elem('form', 'form-edit')
   
      let h3 = elem('h3', '', 'Comment title')
    let inpTitle = elem('input', 'form-comment-input-title')
    inpTitle.setAttribute('maxlength', 40)
    inpTitle.value=comment[0].title
    let h3desc = elem('h3', '', 'Description')
    let txtArea = elem('textarea', 'form-comment-txtarea-title')
    txtArea.setAttribute('rows', 8)
    txtArea.setAttribute('cols',40)
    txtArea.setAttribute('maxlength', 256)
    txtArea.value=comment[0].description
    let btnForm = elem('button','editingComment','Edit comment')
    form.append(h3)
    form.append(inpTitle)
    form.append(h3desc)
    form.append(txtArea)
    form.append(btnForm)



    return form

}