
const deleteButton = document.querySelectorAll(".delete")

for (let i = 0; i < deleteButton.length; i++) {

    deleteButton[i].addEventListener('click', (_) => {

        fetch("/delete", {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: `${deleteButton[i].value}`
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
        deleteButton.removeEventListener('click', (_) => { })

    }, { once: false });
}

const newTabButton = document.querySelectorAll(".newTab")

for (let i = 0; i < newTabButton.length; i++) {

    newTabButton[i].addEventListener('click', (_) => {

        fetch("/edit", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: `${newTabButton[i].value}`
            })
        })
            .then((res) => {
                console.log(res);
                if (res.ok)
                    return res.json();
            })
            .then((response) => {
                console.log(response);
                // window.location.reload(true);
                window.open(`/edit/${response}`)
            });

    }, { once: false });
}

const update = document.getElementById('formUpdate')
update.addEventListener('submit', (_) => {

    fetch('/update', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: document.getElementById("inputId").value,
            name: document.getElementById("inputName").value,
            musicURL: document.getElementById("inputMusicURL").value,
            imgURL: document.getElementById("inputImgURL").value
        })
    })
        .then((res) => {
            console.log(res);
            if (res.ok)
                return res.json();
        })
        .then((response) => {
            console.log(response);
            alert(response)
            // window.location.reload(true);
            // window.open(`/edit/${response}`)
        });

        update.removeEventListener('submit', (_) => { })

}, { once: false })

