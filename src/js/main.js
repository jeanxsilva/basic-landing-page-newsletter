function debounce(func, delay = 400) {
    let ref;

    return (...args) => {
        clearTimeout(ref);
        ref = setTimeout(() => func.apply(this, args), delay);
    };
}

function validateInputUser() {
    console.log('ref');
    let input = document.getElementById('input-user-email');
    let alert = document.getElementById('small-alert');

    if (input) {
        if (input.value && input.value.length > 0) {
            if (validateEmail(input.value)) {
                alert.style.display = 'none';
                alert.className = '';
                input.className = input.className.replaceAll('invalid', '');

                return true;
            } else {
                alert.style.display = 'block';
                alert.className = 'invalid';
                input.className += ' invalid';
            }
        } else {
            alert.style.display = 'none';
            alert.className = '';
            input.className = input.className.replace('invalid', '');
        }
    }

    return false;
}

const onKeyUpEmail = debounce(validateInputUser);

function validateEmail(text) {
    return String(text)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function showAlert(title, message, type) {
    let alertContainer = document.getElementById("alert-container");

    let html = `
        <div class='alert-title'>
            <h4>${title}</h4>
        </div>
        <div class='alert-message'>
            <p>${message}</p>
        </div>
        <div class='alert-action'>
            <button onclick='closeAlert()'>Fechar</button>
        </div>
        `;

    switch (type) {
        case "error":
            alertContainer.className = "alert-error";
            break;
        default:
            break;
    }

    alertContainer.style.opacity = "1";
    alertContainer.innerHTML = html;

    setTimeout(() => { closeAlert(); }, 5000);
}

function closeAlert() {
    let alertContainer = document.getElementById("alert-container");
    alertContainer.style.opacity = "0";
    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, 500);
}

function showModal() {
    let modalContainer = document.getElementById("modal-container");
    modalContainer.style.display = "flex";
}

function closeModal() {
    let modalContainer = document.getElementById("modal-container");
    modalContainer.style.display = "none";

    document.getElementById('subscribed-email').innerHTML = '';
}

function subscribe() {
    if (validateInputUser()) {
        let userEmail = document.getElementById('input-user-email').value;
        document.getElementById('subscribed-email').innerHTML = userEmail;

        showModal();
    } else {
        showAlert("Erro", "É necessário informar um e-mail válido para se inscrever em nossa newsletter", "error");
    }
}