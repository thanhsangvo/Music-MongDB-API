
const deleteButton = document.querySelectorAll(".delete")

for (let i = 0; i < deleteButton.length; i++) {

    deleteButton[i].addEventListener('click', (_) => {
        fetch("/delete", {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: `${ deleteButton[i].value }`
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
        });
        deleteButton.removeEventListener('click', (_) => {} )
    
    }, {once: false});
}