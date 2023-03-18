

function submitSubscription() {
    let emailInput = document.getElementById('home-mail-input').value;

    sendToSIB(emailInput)
}

async function sendToSIB(email) {
    let requestBody = `-----------------------------438965319724666113548609642
Content-Disposition: form-data; name="EMAIL"

${email}
-----------------------------438965319724666113548609642
Content-Disposition: form-data; name="VORNAME"


-----------------------------438965319724666113548609642
Content-Disposition: form-data; name="SMS__COUNTRY_CODE"

+41
-----------------------------438965319724666113548609642
Content-Disposition: form-data; name="SMS"


-----------------------------438965319724666113548609642
Content-Disposition: form-data; name="email_address_check"


-----------------------------438965319724666113548609642
Content-Disposition: form-data; name="locale"

de
-----------------------------438965319724666113548609642--`

    let response = await fetch('https://dcf513be.sibforms.com/serve/MUIEAKPDVptU5d54WYdt1g8M3IiPM87UdtlA-HbmIQFbURcTch8bZ5JDz4s-XY1CSMD7JLqZHQ9aN-VRWJm6LRFaXXHOIojBuGfICunA68z2B_uv9bGTlwsFmahonQqQpgRFXig7pbF7ucGUSkV8hmJSQ_cFncdMUMkV03MX-LFHmeI3hGGwLO6kG1xyJ0dxJzei7oRPunF3bBF6?isAjax=1', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data; boundary=---------------------------438965319724666113548609642',
            'Origin': 'https://thecharmingtools.com'
            },
        body: requestBody
        });

    if(response?.ok) {
        document.getElementById('home-mail-input').value = '';
        window.location.href = $`/mailinglist-mobile.html?mail=${email}`
    } else {
        console.log(response.ok)
        alert("Something went wrong. Try again later.");
    }
}