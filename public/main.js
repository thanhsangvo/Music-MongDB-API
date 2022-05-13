
const deleteButton = document.getElementById('delete-button')

deleteButton.addEventListener('click', (value) => {

    fetch("/delete", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: `${ deleteButton.value }`
        })
    })
    .then((res) => {
        console.log(`ahihi' ${res}`);
        if (res.ok) 
        return res.json();
    })
    .then((response) => {
        console.log(response);
        window.location.reload(true);
        deleteButton.removeEventListener('delete-button')
    });

});

