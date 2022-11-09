import { elem } from "./createElem.js";


export async function addCommentForm() {

    let form = elem('form', 'form-addcomment');
   
    form.style.display = 'none';
    let h3 = elem('h3', '', 'Comment title');
    let inpTitle = elem('input', 'form-comment-input-title');
    inpTitle.setAttribute('maxlength', 40);
    let h3desc = elem('h3', '', 'Description');
    let txtArea = elem('textarea', 'form-comment-txtarea-title');
    txtArea.setAttribute('rows', 8);
    txtArea.setAttribute('cols',40);
    txtArea.setAttribute('maxlength', 256)
    let btnForm = elem('button','btnComent','Create comment');
    form.append(h3);
    form.append(inpTitle);
    form.append(h3desc);
    form.append(txtArea);
    form.append(btnForm);

    return form;

}

