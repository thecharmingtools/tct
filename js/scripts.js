/*!
* Start Bootstrap - Creative v7.0.5 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY <= 200) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});

function changeMobileMenuVisibility() {
    let menu = document.getElementById("navbarResponsive");

    if (menu.classList.contains("show")) {
        menu.classList.remove("show")
    } else {
        menu.classList.add("show")
    }
}

function hideHamburger(destination) {
    document.getElementById("toggle").checked = false
    plausible('Menu-Click', {props: {destination: destination, mode: 'Mobile'}})
}

function handleHamburgerMenuChanged(input) {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
        return;
    }

    if (input.checked) {
        navbarCollapsible.classList.add('navbar-shrink')
        plausible('Open-Mobile-Menu')
    } else if (window.scrollY <= 200) {
        navbarCollapsible.classList.remove('navbar-shrink')
    }
}

function closeSubscribedAlert() {
    let alert = document.getElementById("subscribed-alert")
    let alertBackground = document.getElementById("subscribed-alert-background")
    for( child of alert.children) {
        console.log(child)
        child.style.display = "none"
    }

    alert.style.width = "10px"
    alert.style.height = "10px"

    setTimeout(() => {
        alert.style.visibility = "hidden";
        alertBackground.style.visibility = "hidden";
    }, 300)
}

window.onload = async () => {
    fetch('/data/liveDates.json').then(response => response.json()).then(
        async result => {
            if(result.nextDates.filter(date => date.active).length == 0) {
                let datesSection = document.getElementById('dates');
                datesSection.style.display = 'none';
            }

            for (let concert of result.nextDates) {
                setupLiveDate(concert)
            }
        }
    )
}

function setupLiveDate(concert) {
    let dateListItem = document.createElement('li');
    let dateItem = document.createElement('div')
    let horizontalLineListItem = document.createElement('li')
    let horizontalLine = document.createElement('hr')

    let formattedDate = new Date(Date.parse(concert.date)).toLocaleDateString("de-DE")

    let locationString = `${formattedDate}, ${concert.time} | <b>${concert.venue}</b> | ${concert.street}, ${concert.zip} ${concert.city}`;

    dateItem.innerHTML = locationString;
    dateListItem.append(dateItem);

    horizontalLineListItem.append(horizontalLine);

    document.getElementById('dates-list').append(dateListItem, horizontalLineListItem);
}

function loadJsonFile(location) {

}