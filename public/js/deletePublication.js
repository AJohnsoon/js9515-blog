function deletePublication(event, form){
    event.preventDefault();
    let decision = confirm("Deseja realmente deletar essa categoria?")
    decision ? form.submit(alert('Category has been deleted')) : console.log('user canceled delete operation ')
}